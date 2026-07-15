import { Router } from 'express';
import { pool } from '../db.js';
import { verifyAdminToken } from './admin.js';

const router = Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM services ORDER BY id ASC');
    res.json({ services: rows });
  } catch (err) {
    console.error('[Services] Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Update a service (Admin only)
router.patch('/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { price, duration } = req.body;
    
    // Validate inputs
    if (price === undefined || duration === undefined) {
      return res.status(400).json({ error: 'Price and duration are required' });
    }

    await pool.query(
      'UPDATE services SET price=$1, duration=$2 WHERE id=$3',
      [price, duration, id]
    );
    
    // Fetch the updated service to return
    const { rows } = await pool.query('SELECT * FROM services WHERE id=$1', [id]);
    res.json({ success: true, service: rows[0] });
  } catch (err) {
    console.error('[Services] Update error:', err.message);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

export default router;
