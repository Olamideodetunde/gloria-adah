import axios from 'axios';

const FROM_EMAIL = process.env.BREVO_SENDER_EMAIL || 'info@gloriaondahlaw.com';
const FIRM_EMAIL = process.env.BREVO_SENDER_EMAIL || 'info@gloriaondahlaw.com';
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
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:14px 0;color:#6b7280;font-size:14px;width:35%;font-weight:500;">Reference</td>
      <td style="padding:14px 0;color:#111827;font-size:14px;font-weight:600;font-family:monospace;letter-spacing:1px;">${refCode}</td>
    </tr>
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:14px 0;color:#6b7280;font-size:14px;font-weight:500;">Service</td>
      <td style="padding:14px 0;color:#111827;font-size:14px;font-weight:600;">${serviceName}</td>
    </tr>
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:14px 0;color:#6b7280;font-size:14px;font-weight:500;">Date</td>
      <td style="padding:14px 0;color:#111827;font-size:14px;font-weight:600;">${formattedDate}</td>
    </tr>
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:14px 0;color:#6b7280;font-size:14px;font-weight:500;">Time</td>
      <td style="padding:14px 0;color:#111827;font-size:14px;font-weight:600;">${time} <span style="color:#9ca3af;font-weight:normal;">(WAT)</span></td>
    </tr>
    ${isPaid
      ? `<tr><td style="padding:14px 0;color:#6b7280;font-size:14px;font-weight:500;">Amount Paid</td><td style="padding:14px 0;font-weight:bold;color:#059669;font-size:14px;">&#8358;${price.toLocaleString()}</td></tr>`
      : `<tr><td style="padding:14px 0;color:#6b7280;font-size:14px;font-weight:500;">Fee</td><td style="padding:14px 0;color:#059669;font-weight:bold;font-size:14px;">Complimentary</td></tr>`}
  `;

  const clientHtml = `
    <div style="background-color:#f9fafb;padding:40px 0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
        <div style="background-color:#17202d;padding:40px;text-align:center;">
          <h1 style="color:#eb9f24;font-family:Georgia,serif;font-size:22px;margin:0;letter-spacing:1.5px;text-transform:uppercase;">Gloria Ondah &amp; Associates</h1>
          <p style="color:#9ca3af;font-size:12px;margin:8px 0 0;letter-spacing:1px;text-transform:uppercase;">Legal Solutions &amp; Representation</p>
        </div>
        
        <div style="padding:48px 40px;">
          <h2 style="color:#111827;font-size:24px;margin:0 0 24px 0;font-family:Georgia,serif;font-weight:normal;">Booking Confirmed</h2>
          <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 24px 0;">Dear ${clientName},</p>
          <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 32px 0;">Your consultation has been successfully scheduled. We look forward to speaking with you. Please review your booking details below.</p>
          
          <div style="background-color:#fef3c7;border-left:4px solid #f59e0b;padding:16px 20px;border-radius:0 6px 6px 0;margin-bottom:32px;">
            <p style="color:#92400e;font-size:14px;line-height:1.5;margin:0;">
              <strong style="color:#b45309;">&#128197; Calendar Invite:</strong> A Google Calendar invitation has been sent to your inbox. You can also use the attached <strong>.ics</strong> file to manually add this appointment to your preferred calendar.
            </p>
          </div>

          <div style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:8px 24px;margin-bottom:32px;">
            <table style="width:100%;border-collapse:collapse;">
              ${bookingRows}
            </table>
          </div>

          <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0 0 16px 0;">Our team will confirm any final meeting details with you shortly. If you have any immediate questions, feel free to reach out:</p>
          
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
            <tr>
              <td style="padding:6px 0;color:#374151;font-size:15px;"><strong>Phone:</strong> 0902 963 3913</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#374151;font-size:15px;"><strong>WhatsApp:</strong> 0705 458 8490</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#374151;font-size:15px;"><strong>Email:</strong> <a href="mailto:info@gloriaondahlaw.com" style="color:#2563eb;text-decoration:none;">info@gloriaondahlaw.com</a></td>
            </tr>
          </table>
        </div>

        <div style="background-color:#f3f4f6;padding:32px 40px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:#6b7280;font-size:12px;line-height:1.5;margin:0;">
            <strong>Gloria Ondah &amp; Associates</strong><br>
            CAC Reg: BN-3068204<br>
            No. 28, 3rd Avenue, Gwarinpa Estate, Abuja
          </p>
        </div>
      </div>
    </div>
  `;

  const firmHtml = `
    <div style="background-color:#f9fafb;padding:40px 0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1);">
        <div style="background-color:#17202d;padding:24px 32px;border-bottom:3px solid #eb9f24;">
          <h2 style="color:#ffffff;margin:0;font-size:18px;font-weight:500;letter-spacing:0.5px;">New Booking Alert <span style="color:#9ca3af;font-size:14px;margin-left:8px;font-family:monospace;">${refCode}</span></h2>
        </div>
        <div style="padding:32px;">
          <div style="background-color:#ecfdf5;border-left:4px solid #10b981;padding:16px;border-radius:0 6px 6px 0;margin-bottom:24px;">
            <p style="margin:0;color:#065f46;font-size:15px;"><strong>A new consultation has been booked!</strong> The calendar invite is attached.</p>
          </div>
          
          <h3 style="color:#374151;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px 0;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Booking Details</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
            ${bookingRows}
          </table>
          
          <h3 style="color:#374151;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px 0;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Client Information</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:14px;width:35%;font-weight:500;">Name</td>
              <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">${clientName}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:14px;font-weight:500;">Email</td>
              <td style="padding:8px 0;color:#2563eb;font-size:14px;font-weight:600;"><a href="mailto:${clientEmail}" style="color:#2563eb;text-decoration:none;">${clientEmail}</a></td>
            </tr>
          </table>
        </div>
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
        <div style="background-color:#f9fafb;padding:40px 0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1);">
            <div style="background-color:#17202d;padding:24px 32px;border-bottom:3px solid #eb9f24;">
              <h2 style="color:#ffffff;margin:0;font-size:18px;font-weight:500;letter-spacing:0.5px;">New Website Enquiry <span style="color:#9ca3af;font-size:14px;margin-left:8px;font-family:monospace;">${refCode}</span></h2>
            </div>
            <div style="padding:32px;">
              <h3 style="color:#374151;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px 0;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Contact Details</h3>
              <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
                <tr style="border-bottom:1px solid #f3f4f6;">
                  <td style="padding:12px 0;color:#6b7280;font-size:14px;width:30%;font-weight:500;">Name</td>
                  <td style="padding:12px 0;color:#111827;font-size:14px;font-weight:600;">${name}</td>
                </tr>
                <tr style="border-bottom:1px solid #f3f4f6;">
                  <td style="padding:12px 0;color:#6b7280;font-size:14px;font-weight:500;">Email</td>
                  <td style="padding:12px 0;color:#2563eb;font-size:14px;font-weight:600;"><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></td>
                </tr>
                <tr style="border-bottom:1px solid #f3f4f6;">
                  <td style="padding:12px 0;color:#6b7280;font-size:14px;font-weight:500;">Phone</td>
                  <td style="padding:12px 0;color:#111827;font-size:14px;font-weight:600;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;color:#6b7280;font-size:14px;font-weight:500;">Subject</td>
                  <td style="padding:12px 0;color:#111827;font-size:14px;font-weight:600;">${subject}</td>
                </tr>
              </table>
              
              <h3 style="color:#374151;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px 0;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Message</h3>
              <div style="background-color:#f9fafb;border:1px solid #e5e7eb;padding:20px;border-radius:6px;color:#374151;font-size:15px;line-height:1.6;white-space:pre-wrap;">${message}</div>
            </div>
          </div>
        </div>
      `
    }),
    sendEmail({
      to: email,
      subject: `We received your message — ${FIRM_NAME}`,
      html: `
        <div style="background-color:#f9fafb;padding:40px 0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
            <div style="background-color:#17202d;padding:40px;text-align:center;">
              <h1 style="color:#eb9f24;font-family:Georgia,serif;font-size:22px;margin:0;letter-spacing:1.5px;text-transform:uppercase;">Gloria Ondah &amp; Associates</h1>
              <p style="color:#9ca3af;font-size:12px;margin:8px 0 0;letter-spacing:1px;text-transform:uppercase;">Legal Solutions &amp; Representation</p>
            </div>
            <div style="padding:48px 40px;">
              <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 24px 0;">Dear ${name},</p>
              <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 24px 0;">Thank you for contacting Gloria Ondah &amp; Associates. We have received your enquiry (Ref: <strong style="color:#111827;font-family:monospace;">${refCode}</strong>) and a member of our team will respond within one business day.</p>
              
              <div style="background-color:#f3f4f6;border-left:4px solid #9ca3af;padding:16px 20px;border-radius:0 6px 6px 0;margin-bottom:32px;">
                <p style="color:#4b5563;font-size:14px;line-height:1.5;margin:0;">
                  If your matter is urgent, please call us directly at <strong style="color:#111827;">0902 963 3913</strong> or send a WhatsApp message to <strong style="color:#111827;">0705 458 8490</strong>.
                </p>
              </div>
            </div>
            <div style="background-color:#f3f4f6;padding:32px 40px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="color:#6b7280;font-size:12px;line-height:1.5;margin:0;">
                <strong>Gloria Ondah &amp; Associates</strong><br>
                CAC Reg: BN-3068204<br>
                No. 28, 3rd Avenue, Gwarinpa Estate, Abuja
              </p>
            </div>
          </div>
        </div>
      `
    })
  ]);
}
