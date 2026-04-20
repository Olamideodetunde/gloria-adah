import { Router } from 'express';
import { pool } from '../db.js';
import { sendContactNotification } from '../email.js';

const router = Router();

function makeRef() {
  return `GOA-${Math.floor(1000 + Math.random() * 9000)}`;
}

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const refCode = makeRef();

    await pool.query(
      `INSERT INTO contact_submissions (ref_code, name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [refCode, name, email, phone, subject, message]
    );

    try {
      await sendContactNotification({ name, email, phone, subject, message, refCode });
    } catch (emailErr) {
      console.error('[Contact] Email failed (non-fatal):', emailErr.message);
    }

    res.json({ refCode });
  } catch (err) {
    console.error('[Contact] POST error:', err.message);
    res.status(500).json({ error: 'Submission failed. Please try again.' });
  }
});

export default router;
