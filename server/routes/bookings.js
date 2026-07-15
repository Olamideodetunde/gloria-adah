import { Router } from 'express';
import { pool } from '../db.js';
import { initializePayment, verifyPayment, isConfigured as paystackConfigured } from '../paystack.js';
import { sendBookingConfirmation } from '../email.js';
import { createCalendarEvent, getBusyTimes } from '../calendar.js';

const router = Router();

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

function makeRef() {
  return `GOA-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
}

// Convert "YYYY-MM-DD" + "HH:MM AM/PM" (Lagos local) to a UTC Date object.
function lagosSlotToUTC(dateStr, slotStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const [time, period] = slotStr.split(' ');
  const [h, mn] = time.split(':').map(Number);
  let hours = h;
  if (period === 'PM' && h !== 12) hours = h + 12;
  if (period === 'AM' && h === 12) hours = 0;
  return new Date(Date.UTC(y, m - 1, d, hours - 1, mn, 0));
}

// GET /api/bookings/availability?date=YYYY-MM-DD&duration=30
router.get('/availability', async (req, res) => {
  try {
    const { date } = req.query;
    const duration = parseInt(req.query.duration, 10) || 30;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'Valid date (YYYY-MM-DD) required' });
    }

    const [busyRanges, dbRows] = await Promise.all([
      getBusyTimes(date),
      pool.query(
        `SELECT appointment_time FROM bookings
         WHERE appointment_date = $1 AND status IN ('confirmed', 'awaiting_payment')`,
        [date]
      ),
    ]);

    const dbBookedTimes = new Set(dbRows.rows.map(r => r.appointment_time));
    const now = new Date();

    const slots = TIME_SLOTS.map(time => {
      const startUTC = lagosSlotToUTC(date, time);
      const endUTC = new Date(startUTC.getTime() + duration * 60000);
      const isPast = startUTC.getTime() <= now.getTime();
      const calendarConflict = busyRanges.some(b => startUTC < b.end && endUTC > b.start);
      const dbConflict = dbBookedTimes.has(time);
      return {
        time,
        available: !isPast && !calendarConflict && !dbConflict,
        reason: isPast ? 'past' : (calendarConflict || dbConflict) ? 'booked' : null,
      };
    });

    res.json({ date, duration, slots });
  } catch (err) {
    console.error('[Bookings] Availability error:', err.message);
    res.status(500).json({ error: 'Could not load availability' });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      serviceType, servicePrice, practiceArea,
      appointmentDate, appointmentTime,
      clientName, clientEmail, clientPhone, clientCompany, description
    } = req.body;

    if (!serviceType || !appointmentDate || !appointmentTime || !clientName || !clientEmail || !clientPhone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Race-condition guard: someone else may have grabbed this slot since the page loaded.
    const existing = await pool.query(
      `SELECT 1 FROM bookings
       WHERE appointment_date = $1
         AND appointment_time = $2
         AND status IN ('confirmed', 'awaiting_payment')
       LIMIT 1`,
      [appointmentDate, appointmentTime]
    );
    if (existing.rowCount > 0) {
      return res.status(409).json({ error: 'That time was just booked by someone else. Please choose another slot.' });
    }

    const refCode = makeRef();
    const price = parseInt(servicePrice, 10) || 0;

    await pool.query(
      `INSERT INTO bookings
        (ref_code, service_type, service_price, practice_area, appointment_date, appointment_time,
         client_name, client_email, client_phone, client_company, description, payment_status, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [
        refCode, serviceType, price, practiceArea || null,
        appointmentDate, appointmentTime,
        clientName, clientEmail, clientPhone, clientCompany || null, description || null,
        price === 0 ? 'free' : 'pending',
        price === 0 ? 'confirmed' : 'awaiting_payment'
      ]
    );

    if (price === 0) {
      await Promise.all([
        sendBookingConfirmation({
          clientEmail, clientName, refCode,
          serviceName: serviceType,
          date: appointmentDate,
          time: appointmentTime,
          price: 0
        }),
        createCalendarEvent({
          refCode, clientName, clientEmail,
          clientPhone, clientCompany,
          serviceName: serviceType,
          practiceArea: practiceArea || null,
          date: appointmentDate,
          time: appointmentTime,
          price: 0
        })
      ]);
      return res.json({ refCode, requiresPayment: false });
    }

    if (!paystackConfigured()) {
      return res.json({ refCode, requiresPayment: true, paystackConfigured: false });
    }

    try {
      const paymentData = await initializePayment({
        email: clientEmail,
        amountNGN: price,
        reference: refCode,
        metadata: { clientName, serviceType, appointmentDate, appointmentTime }
      });

      return res.json({
        refCode,
        requiresPayment: true,
        paystackConfigured: true,
        authorizationUrl: paymentData.authorization_url,
        accessCode: paymentData.access_code
      });
    } catch (paystackErr) {
      console.error('[Bookings] Paystack init error:', paystackErr.message);
      return res.json({
        refCode,
        requiresPayment: true,
        paystackConfigured: false,
        paystackError: 'Payment gateway unavailable. Please contact us directly to complete payment.'
      });
    }
  } catch (err) {
    console.error('[Bookings] POST error:', err.message);
    res.status(500).json({ error: 'Booking failed. Please try again.' });
  }
});

router.get('/verify', async (req, res) => {
  const { reference } = req.query;
  const siteUrl = process.env.FRONTEND_URL || process.env.SITE_URL || '';
  if (!reference) return res.redirect(`${siteUrl}/booking?status=failed`);

  try {
    const result = await verifyPayment(reference);
    if (result.status === 'success') {
      await pool.query(
        `UPDATE bookings SET payment_status='paid', status='confirmed', paystack_reference=$1 WHERE ref_code=$2`,
        [result.reference, reference]
      );

      const { rows } = await pool.query('SELECT * FROM bookings WHERE ref_code=$1', [reference]);
      const booking = rows[0];
      if (booking) {
        await Promise.all([
          sendBookingConfirmation({
            clientEmail: booking.client_email,
            clientName: booking.client_name,
            refCode: booking.ref_code,
            serviceName: booking.service_type,
            date: booking.appointment_date,
            time: booking.appointment_time,
            price: booking.service_price
          }),
          createCalendarEvent({
            refCode: booking.ref_code,
            clientName: booking.client_name,
            clientEmail: booking.client_email,
            clientPhone: booking.client_phone,
            clientCompany: booking.client_company,
            serviceName: booking.service_type,
            practiceArea: booking.practice_area,
            date: booking.appointment_date,
            time: booking.appointment_time,
            price: booking.service_price
          })
        ]);
      }

      res.redirect(`${siteUrl}/booking?status=success&refCode=${reference}`);
    } else {
      res.redirect(`${siteUrl}/booking?status=failed`);
    }
  } catch (err) {
    console.error('[Bookings] Verify error:', err.message);
    res.status(500).json({ error: 'Verification failed' });
  }
});

router.post('/verify-inline', async (req, res) => {
  const { reference } = req.body;
  if (!reference) return res.status(400).json({ error: 'Reference required' });

  try {
    const result = await verifyPayment(reference);
    if (result.status === 'success') {
      await pool.query(
        `UPDATE bookings SET payment_status='paid', status='confirmed', paystack_reference=$1 WHERE ref_code=$2`,
        [result.reference, reference]
      );

      const { rows } = await pool.query('SELECT * FROM bookings WHERE ref_code=$1', [reference]);
      const booking = rows[0];
      if (booking) {
        await Promise.all([
          sendBookingConfirmation({
            clientEmail: booking.client_email,
            clientName: booking.client_name,
            refCode: booking.ref_code,
            serviceName: booking.service_type,
            date: booking.appointment_date,
            time: booking.appointment_time,
            price: booking.service_price
          }),
          createCalendarEvent({
            refCode: booking.ref_code,
            clientName: booking.client_name,
            clientEmail: booking.client_email,
            clientPhone: booking.client_phone,
            clientCompany: booking.client_company,
            serviceName: booking.service_type,
            practiceArea: booking.practice_area,
            date: booking.appointment_date,
            time: booking.appointment_time,
            price: booking.service_price
          })
        ]);
      }

      res.json({ status: 'success', refCode: reference });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (err) {
    console.error('[Bookings] Inline verify error:', err.message);
    res.status(500).json({ error: 'Verification failed' });
  }
});

export default router;
