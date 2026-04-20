import { Router } from 'express';
import { createHash } from 'crypto';
import { pool } from '../db.js';

const router = Router();

function getAdminToken() {
  const password = process.env.ADMIN_PASSWORD || 'GOA-Admin-2024';
  const secret = process.env.ADMIN_SECRET || 'goa-law-secret-key';
  return createHash('sha256').update(`${password}:${secret}`).digest('hex');
}

export function verifyAdminToken(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  if (token === getAdminToken()) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

router.post('/login', (req, res) => {
  const { password } = req.body;
  const expected = process.env.ADMIN_PASSWORD || 'GOA-Admin-2024';
  if (!password || password !== expected) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  res.json({ token: getAdminToken() });
});

router.get('/stats', verifyAdminToken, async (req, res) => {
  try {
    const [bRes, cRes, pRes] = await Promise.all([
      pool.query('SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status=\'confirmed\') as confirmed FROM bookings'),
      pool.query('SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status=\'unread\') as unread FROM contact_submissions'),
      pool.query('SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE is_published=true) as published FROM blog_posts')
    ]);
    res.json({
      bookings: { total: parseInt(bRes.rows[0].total), confirmed: parseInt(bRes.rows[0].confirmed) },
      contacts: { total: parseInt(cRes.rows[0].total), unread: parseInt(cRes.rows[0].unread) },
      posts: { total: parseInt(pRes.rows[0].total), published: parseInt(pRes.rows[0].published) }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/bookings', verifyAdminToken, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 100');
    res.json({ bookings: rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

router.patch('/bookings/:id/status', verifyAdminToken, async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query('UPDATE bookings SET status=$1 WHERE id=$2', [status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

router.get('/contacts', verifyAdminToken, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 100');
    res.json({ contacts: rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

router.patch('/contacts/:id/status', verifyAdminToken, async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query('UPDATE contact_submissions SET status=$1 WHERE id=$2', [status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

export default router;
