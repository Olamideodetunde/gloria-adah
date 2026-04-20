import sgMail from '@sendgrid/mail';

const FROM_EMAIL = 'G.ondahlawoffice@gmail.com';
const FIRM_NAME = 'Gloria Ondah & Associates';

function isConfigured() {
  return !!process.env.SENDGRID_API_KEY;
}

function init() {
  if (isConfigured()) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
}

init();

export async function sendBookingConfirmation({ clientEmail, clientName, refCode, serviceName, date, time, price }) {
  if (!isConfigured()) {
    console.log('[Email] SENDGRID_API_KEY not set — skipping booking confirmation email');
    return;
  }
  const isPaid = price > 0;
  const msg = {
    to: clientEmail,
    from: { email: FROM_EMAIL, name: FIRM_NAME },
    subject: `Booking Confirmed — ${refCode} | ${FIRM_NAME}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2e060f;">
        <div style="background:#440a18;padding:32px 40px;">
          <h1 style="color:#c28741;font-size:22px;margin:0;letter-spacing:1px;">GLORIA ONDAH & ASSOCIATES</h1>
          <p style="color:#fefefe;font-size:13px;margin:6px 0 0;">Your Trusted Partner for Legal Solutions and Representation</p>
        </div>
        <div style="padding:40px;border:1px solid #e8e0dc;border-top:none;">
          <h2 style="color:#440a18;font-size:24px;">Booking Confirmed</h2>
          <p>Dear ${clientName},</p>
          <p>Your consultation has been successfully scheduled. Please find your booking details below.</p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0;">
            <tr style="border-bottom:1px solid #e8e0dc;">
              <td style="padding:12px 0;color:#888;font-size:14px;">Reference</td>
              <td style="padding:12px 0;font-weight:bold;font-family:monospace;">${refCode}</td>
            </tr>
            <tr style="border-bottom:1px solid #e8e0dc;">
              <td style="padding:12px 0;color:#888;font-size:14px;">Service</td>
              <td style="padding:12px 0;">${serviceName}</td>
            </tr>
            <tr style="border-bottom:1px solid #e8e0dc;">
              <td style="padding:12px 0;color:#888;font-size:14px;">Date</td>
              <td style="padding:12px 0;">${date}</td>
            </tr>
            <tr style="border-bottom:1px solid #e8e0dc;">
              <td style="padding:12px 0;color:#888;font-size:14px;">Time</td>
              <td style="padding:12px 0;">${time} (WAT)</td>
            </tr>
            ${isPaid ? `<tr><td style="padding:12px 0;color:#888;font-size:14px;">Amount Paid</td><td style="padding:12px 0;font-weight:bold;">₦${price.toLocaleString()}</td></tr>` : '<tr><td style="padding:12px 0;color:#888;font-size:14px;">Fee</td><td style="padding:12px 0;color:#2e7d32;font-weight:bold;">Complimentary</td></tr>'}
          </table>
          <p style="font-size:14px;color:#555;">Our team will be in touch with the meeting details before your appointment. If you need to reschedule or have any questions, please contact us:</p>
          <p style="font-size:14px;"><strong>Phone:</strong> 09029633193 | <strong>WhatsApp:</strong> 07054588490<br/><strong>Email:</strong> G.ondahlawoffice@gmail.com</p>
          <p style="font-size:12px;color:#888;border-top:1px solid #e8e0dc;padding-top:16px;margin-top:32px;">
            Gloria Ondah & Associates | CAC Reg: BN-3068204 | No. 28, 3rd Avenue, Gwarinpa Estate, Abuja
          </p>
        </div>
      </div>
    `
  };
  try {
    await sgMail.send(msg);
    console.log(`[Email] Booking confirmation sent to ${clientEmail}`);
  } catch (err) {
    console.error('[Email] Failed to send booking confirmation:', err?.response?.body || err.message);
  }
}

export async function sendContactNotification({ name, email, phone, subject, message, refCode }) {
  if (!isConfigured()) {
    console.log('[Email] SENDGRID_API_KEY not set — skipping contact notification email');
    return;
  }

  const notifyMsg = {
    to: FROM_EMAIL,
    from: { email: FROM_EMAIL, name: FIRM_NAME },
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
  };

  const ackMsg = {
    to: email,
    from: { email: FROM_EMAIL, name: FIRM_NAME },
    subject: `We received your message — ${FIRM_NAME}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2e060f;">
        <div style="background:#440a18;padding:32px 40px;">
          <h1 style="color:#c28741;font-size:22px;margin:0;">GLORIA ONDAH & ASSOCIATES</h1>
        </div>
        <div style="padding:40px;border:1px solid #e8e0dc;border-top:none;">
          <p>Dear ${name},</p>
          <p>Thank you for contacting Gloria Ondah & Associates. We have received your enquiry (Ref: <strong>${refCode}</strong>) and a member of our team will respond within one business day.</p>
          <p style="font-size:14px;color:#555;">If your matter is urgent, please call us directly at <strong>09029633193</strong> or send a WhatsApp message to <strong>07054588490</strong>.</p>
          <p style="font-size:12px;color:#888;border-top:1px solid #e8e0dc;padding-top:16px;margin-top:32px;">
            Gloria Ondah & Associates | CAC Reg: BN-3068204 | No. 28, 3rd Avenue, Gwarinpa Estate, Abuja
          </p>
        </div>
      </div>
    `
  };

  try {
    await sgMail.sendMultiple([notifyMsg, ackMsg]);
    console.log(`[Email] Contact notification sent for ${refCode}`);
  } catch (err) {
    console.error('[Email] Failed to send contact email:', err?.response?.body || err.message);
  }
}
