import axios from 'axios';

const BASE = 'https://api.paystack.co';

function headers() {
  return { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` };
}

export function isConfigured() {
  return !!process.env.PAYSTACK_SECRET_KEY;
}

export async function initializePayment({ email, amountNGN, reference, metadata }) {
  const { data } = await axios.post(
    `${BASE}/transaction/initialize`,
    {
      email,
      amount: amountNGN * 100,
      reference,
      currency: 'NGN',
      metadata,
      callback_url: `${process.env.SITE_URL || ''}/api/bookings/verify`
    },
    { headers: headers() }
  );
  return data.data;
}

export async function verifyPayment(reference) {
  const { data } = await axios.get(`${BASE}/transaction/verify/${reference}`, {
    headers: headers()
  });
  return data.data;
}
