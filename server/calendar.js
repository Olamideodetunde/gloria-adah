import { google } from 'googleapis';

function getCalendarClient() {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) return null;

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
}

// Returns busy time ranges for a given Lagos-local date (YYYY-MM-DD).
// WAT is UTC+1 with no DST, so converting is a fixed offset.
export async function getBusyTimes(dateStr) {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    if (!calendar || !calendarId) return [];

    const [y, m, d] = dateStr.split('-').map(Number);
    // 00:00 Lagos = 23:00 UTC previous day; 24:00 Lagos = 23:00 UTC same day
    const dayStartUTC = new Date(Date.UTC(y, m - 1, d - 1, 23, 0, 0));
    const dayEndUTC = new Date(Date.UTC(y, m - 1, d, 23, 0, 0));

    const result = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStartUTC.toISOString(),
        timeMax: dayEndUTC.toISOString(),
        timeZone: 'Africa/Lagos',
        items: [{ id: calendarId }],
      },
    });

    const busy = result.data?.calendars?.[calendarId]?.busy || [];
    return busy.map(b => ({ start: new Date(b.start), end: new Date(b.end) }));
  } catch (err) {
    console.error('[Calendar] freebusy query failed:', err.message);
    return [];
  }
}

export async function createCalendarEvent({
  refCode,
  clientName,
  clientEmail,
  clientPhone,
  clientCompany,
  serviceName,
  practiceArea,
  date,
  time,
  price,
}) {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendar || !calendarId) {
      console.warn('[Calendar] Not configured — skipping event creation');
      return null;
    }

    const [year, month, day] = date.split('-').map(Number);
    const [hourStr, minuteStr] = time.replace(/\s*(AM|PM)/i, '').split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr || '0', 10);
    const isPM = /PM/i.test(time);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;

    const startDateTime = new Date(year, month - 1, day, hour, minute);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

    const pad = n => String(n).padStart(2, '0');
    const fmt = d =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;

    const description = [
      `Booking Ref: ${refCode}`,
      `Service: ${serviceName}`,
      practiceArea ? `Practice Area: ${practiceArea}` : '',
      `Client: ${clientName}`,
      `Email: ${clientEmail}`,
      `Phone: ${clientPhone}`,
      clientCompany ? `Company: ${clientCompany}` : '',
      price > 0 ? `Fee: ₦${Number(price).toLocaleString()}` : 'Fee: Free Consultation',
    ].filter(Boolean).join('\n');

    const event = await calendar.events.insert({
      calendarId,
      sendUpdates: 'all',
      requestBody: {
        summary: `[GOA] ${serviceName} — ${clientName}`,
        description,
        attendees: [
          { email: clientEmail, displayName: clientName }
        ],
        start: { dateTime: fmt(startDateTime), timeZone: 'Africa/Lagos' },
        end: { dateTime: fmt(endDateTime), timeZone: 'Africa/Lagos' },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 },
          ],
        },
      },
    });

    console.log(`[Calendar] Event created: ${event.data.id} for ${refCode}`);
    return event.data.id;
  } catch (err) {
    console.error('[Calendar] Failed to create event:', err.message);
    return null;
  }
}
