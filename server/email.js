import axios from 'axios';

const FROM_EMAIL = 'G.ondahlawoffice@gmail.com';
const FIRM_EMAIL = 'G.ondahlawoffice@gmail.com';
const FIRM_NAME = 'Gloria Ondah & Associates';
const BREVO_API = 'https://api.brevo.com/v3/smtp/email';

const SERVICE_DURATIONS = {
  'Initial Consultation': 30,
  'Legal Advisory Session': 60,
  'Contract Review Consultation': 45,
  'Business Compliance Consultation': 45,
  'Retainership Consultation': 15
};

export function isConfigured() {
  return !!process.env.BREVO_API_KEY;
}

function parseTimeSlot(timeStr) {
  const [time, period] = timeStr.split(' ');
  const [h, m] = time.split(':').map(Number);
  let hours = h;
  if (period === 'PM' && h !== 12) hours = h + 12;
  if (period === 'AM' && h === 12) hours = 0;
  return { hours, minutes: m };
}

function toICSDateUTC(year, month, day, watHours, minutes) {
  const utcHours = watHours - 1;
  const pad = (n) => String(n < 0 ? 0 : n).padStart(2, '0');
  return `${year}${pad(month)}${pad(day)}T${pad(utcHours)}${pad(minutes)}00Z`;
}

export function generateICS({ refCode, serviceName, clientName, clientEmail, date, time }) {
  const durationMins = SERVICE_DURATIONS[serviceName] || 30;
  const [year, month, day] = date.split('-').map(Number);
  const { hours, minutes } = parseTimeSlot(time);

  const dtStart = toICSDateUTC(year, month, day, hours, minutes);
  const totalEndMins = hours * 60 + minutes + durationMins;
  const endH = Math.floor(totalEndMins / 60);
  const endM = totalEndMins % 60;
  const dtEnd = toICSDateUTC(year, month, day, endH, endM);

  const stamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gloria Ondah & Associates//GOA Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${refCode}@goa-law.ng`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:Legal Consultation – ${serviceName}`,
    `DESCRIPTION:Booking Reference: ${refCode}\\nService: ${serviceName}\\nClient: ${clientName}\\n\\n${FIRM_NAME}\\nPhone: +234 902 963 3913\\nEmail: ${FIRM_EMAIL}`,
    `LOCATION:No. 28\\, 3rd Avenue\\, Gwarinpa Estate\\, Abuja / Virtual`,
    `ORGANIZER;CN=${FIRM_NAME}:mailto:${FIRM_EMAIL}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${FIRM_NAME}:mailto:${FIRM_EMAIL}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=${clientName}:mailto:${clientEmail}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  return lines.join('\r\n');
}

async function sendEmail({ to, subject, html, attachment }) {
  if (!isConfigured()) {
    console.log('[Email] BREVO_API_KEY not set — skipping email');
    return;
  }

  const recipients = Array.isArray(to)
    ? to.map(t => (typeof t === 'string' ? { email: t } : t))
    : [{ email: to }];

  const payload = {
    sender: { name: FIRM_NAME, email: FROM_EMAIL },
    to: recipients,
    subject,
    htmlContent: html
  };

  if (attachment) {
    payload.attachment = [{
      name: attachment.filename,
      content: Buffer.from(attachment.content).toString('base64')
    }];
  }

  try {
    await axios.post(BREVO_API, payload, {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    console.log(`[Email] Sent: "${subject}" → ${recipients.map(r => r.email).join(', ')}`);
  } catch (err) {
    const detail = err?.response?.data || err.message;
    console.error('[Email] Brevo send failed:', JSON.stringify(detail));
    throw err;
  }
}

export async function sendBookingConfirmation({ clientEmail, clientName, refCode, serviceName, date, time, price }) {
  const isPaid = price > 0;

  const icsContent = generateICS({ refCode, serviceName, clientName, clientEmail, date, time });
  const icsAttachment = { filename: `GOA-${refCode}.ics`, content: icsContent };

  const formattedDate = date.split('-').reverse().join('/');
  const bookingRows = `
    <tr style="border-bottom:1px solid #e8e0dc;">
      <td style="padding:12px 0;color:#888;font-size:14px;width:40%;">Reference</td>
      <td style="padding:12px 0;font-weight:bold;font-family:monospace;">${refCode}</td>
    </tr>
    <tr style="border-bottom:1px solid #e8e0dc;">
      <td style="padding:12px 0;color:#888;font-size:14px;">Service</td>
      <td style="padding:12px 0;">${serviceName}</td>
    </tr>
    <tr style="border-bottom:1px solid #e8e0dc;">
      <td style="padding:12px 0;color:#888;font-size:14px;">Date</td>
      <td style="padding:12px 0;">${formattedDate}</td>
    </tr>
    <tr style="border-bottom:1px solid #e8e0dc;">
      <td style="padding:12px 0;color:#888;font-size:14px;">Time</td>
      <td style="padding:12px 0;">${time} (West Africa Time)</td>
    </tr>
    ${isPaid
      ? `<tr><td style="padding:12px 0;color:#888;font-size:14px;">Amount Paid</td><td style="padding:12px 0;font-weight:bold;color:#2e7d32;">&#8358;${price.toLocaleString()}</td></tr>`
      : `<tr><td style="padding:12px 0;color:#888;font-size:14px;">Fee</td><td style="padding:12px 0;color:#2e7d32;font-weight:bold;">Complimentary</td></tr>`}
  `;

  const clientHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2e060f;">
      <div style="background:#440a18;padding:32px 40px;">
        <h1 style="color:#c28741;font-size:22px;margin:0;letter-spacing:1px;">GLORIA ONDAH &amp; ASSOCIATES</h1>
        <p style="color:#fefefe;font-size:13px;margin:6px 0 0;">Your Trusted Partner for Legal Solutions and Representation</p>
      </div>
      <div style="padding:40px;border:1px solid #e8e0dc;border-top:none;">
        <h2 style="color:#440a18;font-size:24px;margin-top:0;">Booking Confirmed</h2>
        <p>Dear ${clientName},</p>
        <p>Your consultation has been successfully scheduled. Please find your booking details below.</p>
        <p style="background:#fff8f0;border-left:3px solid #b87d39;padding:12px 16px;font-size:14px;color:#6b4c1e;">
          📅 A Google Calendar invitation has been sent directly to your inbox. You can also use the attached <strong>.ics</strong> file to manually add this appointment to your preferred calendar (Apple Calendar, Outlook, etc.).
        </p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0;">
          ${bookingRows}
        </table>
        <p style="font-size:14px;color:#555;">Our team will confirm meeting details before your appointment. For any questions:</p>
        <p style="font-size:14px;">
          <strong>Phone:</strong> 09029633913 &nbsp;|&nbsp; <strong>WhatsApp:</strong> 07054588490<br/>
          <strong>Email:</strong> G.ondahlawoffice@gmail.com
        </p>
        <p style="font-size:12px;color:#888;border-top:1px solid #e8e0dc;padding-top:16px;margin-top:32px;">
          Gloria Ondah &amp; Associates &nbsp;|&nbsp; CAC Reg: BN-3068204 &nbsp;|&nbsp; No. 28, 3rd Avenue, Gwarinpa Estate, Abuja
        </p>
      </div>
    </div>
  `;

  const firmHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2e060f;">
      <div style="background:#440a18;padding:24px 32px;">
        <h2 style="color:#c28741;margin:0;font-size:18px;">New Booking — ${refCode}</h2>
      </div>
      <div style="padding:32px;border:1px solid #e8e0dc;border-top:none;">
        <p><strong>A new consultation has been booked. The calendar invite is attached.</strong></p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          ${bookingRows}
        </table>
        <p style="font-size:14px;"><strong>Client:</strong> ${clientName}</p>
        <p style="font-size:14px;"><strong>Client Email:</strong> ${clientEmail}</p>
      </div>
    </div>
  `;

  await Promise.allSettled([
    sendEmail({
      to: clientEmail,
      subject: `Booking Confirmed — ${refCode} | ${FIRM_NAME}`,
      html: clientHtml,
      attachment: icsAttachment
    }),
    sendEmail({
      to: FIRM_EMAIL,
      subject: `[New Booking] ${refCode} — ${serviceName} on ${formattedDate}`,
      html: firmHtml,
      attachment: icsAttachment
    })
  ]);
}

export async function sendContactNotification({ name, email, phone, subject, message, refCode }) {
  await Promise.allSettled([
    sendEmail({
      to: [{ email: FIRM_EMAIL, name: FIRM_NAME }],
      subject: `New Contact Submission [${refCode}]: ${subject}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2e060f;">
          <div style="background:#440a18;padding:24px 32px;">
            <h2 style="color:#c28741;margin:0;font-size:18px;">New Website Enquiry</h2>
          </div>
          <div style="padding:32px;border:1px solid #e8e0dc;border-top:none;">
            <p><strong>Reference:</strong> ${refCode}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background:#f7f5f6;padding:16px;border-left:3px solid #b87d39;">${message}</div>
          </div>
        </div>
      `
    }),
    sendEmail({
      to: email,
      subject: `We received your message — ${FIRM_NAME}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2e060f;">
          <div style="background:#440a18;padding:32px 40px;">
            <h1 style="color:#c28741;font-size:22px;margin:0;">GLORIA ONDAH &amp; ASSOCIATES</h1>
          </div>
          <div style="padding:40px;border:1px solid #e8e0dc;border-top:none;">
            <p>Dear ${name},</p>
            <p>Thank you for contacting Gloria Ondah &amp; Associates. We have received your enquiry (Ref: <strong>${refCode}</strong>) and a member of our team will respond within one business day.</p>
            <p style="font-size:14px;color:#555;">If your matter is urgent, please call us directly at <strong>09029633913</strong> or send a WhatsApp message to <strong>07054588490</strong>.</p>
            <p style="font-size:12px;color:#888;border-top:1px solid #e8e0dc;padding-top:16px;margin-top:32px;">
              Gloria Ondah &amp; Associates &nbsp;|&nbsp; CAC Reg: BN-3068204
            </p>
          </div>
        </div>
      `
    })
  ]);
}
