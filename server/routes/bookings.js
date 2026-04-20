import { Router } from 'express';
import { pool } from '../db.js';
import { initializePayment, verifyPayment, isConfigured as paystackConfigured } from '../paystack.js';
import { sendBookingConfirmation } from '../email.js';

const router = Router();

function makeRef() {
  return `GOA-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
}

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
      await sendBookingConfirmation({
        clientEmail, clientName, refCode,
        serviceName: serviceType,
        date: appointmentDate,
        time: appointmentTime,
        price: 0
      });
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
        await sendBookingConfirmation({
          clientEmail: booking.client_email,
          clientName: booking.client_name,
          refCode: booking.ref_code,
          serviceName: booking.service_type,
          date: booking.appointment_date,
          time: booking.appointment_time,
          price: booking.service_price
        });
      }

      res.json({ status: 'success', refCode: reference });
    } else {
      res.json({ status: 'failed', message: 'Payment not successful' });
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
        await sendBookingConfirmation({
          clientEmail: booking.client_email,
          clientName: booking.client_name,
          refCode: booking.ref_code,
          serviceName: booking.service_type,
          date: booking.appointment_date,
          time: booking.appointment_time,
          price: booking.service_price
        });
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
