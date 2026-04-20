import { Router } from 'express';
import { pool } from '../db.js';
import { verifyAdminToken } from './admin.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { category, limit = 20, offset = 0 } = req.query;
    let query = `SELECT id, slug, title, excerpt, category, cover_image, author, published_at, created_at
                 FROM blog_posts WHERE is_published = true`;
    const params = [];
    if (category) { params.push(category); query += ` AND category = $${params.length}`; }
    query += ` ORDER BY published_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), parseInt(offset));
    const { rows } = await pool.query(query, params);
    res.json({ posts: rows });
  } catch (err) {
    console.error('[Posts] GET all error:', err.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/all', verifyAdminToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, slug, title, excerpt, category, cover_image, author, is_published, published_at, created_at, updated_at
       FROM blog_posts ORDER BY created_at DESC`
    );
    res.json({ posts: rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM blog_posts WHERE slug = $1 AND is_published = true`,
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: 'Post not found' });
    res.json({ post: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

router.post('/', verifyAdminToken, async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, cover_image, author, is_published } = req.body;
    if (!title || !slug || !content) return res.status(400).json({ error: 'title, slug, and content are required' });
    const published_at = is_published ? new Date().toISOString() : null;
    const { rows } = await pool.query(
      `INSERT INTO blog_posts (slug, title, excerpt, content, category, cover_image, author, is_published, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [slug, title, excerpt || null, content, category || 'Insights', cover_image || null, author || 'Gloria Ondah', !!is_published, published_at]
    );
    res.status(201).json({ post: rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'A post with this slug already exists' });
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.put('/:id', verifyAdminToken, async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, cover_image, author, is_published } = req.body;
    const existing = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [req.params.id]);
    if (!existing.rows.length) return res.status(404).json({ error: 'Post not found' });
    const old = existing.rows[0];
    const nowPublished = !!is_published;
    const published_at = nowPublished && !old.is_published ? new Date().toISOString() : old.published_at;
    const { rows } = await pool.query(
      `UPDATE blog_posts SET slug=$1,title=$2,excerpt=$3,content=$4,category=$5,cover_image=$6,
       author=$7,is_published=$8,published_at=$9,updated_at=NOW() WHERE id=$10 RETURNING *`,
      [slug || old.slug, title || old.title, excerpt ?? old.excerpt, content || old.content,
       category || old.category, cover_image ?? old.cover_image, author || old.author,
       nowPublished, published_at, req.params.id]
    );
    res.json({ post: rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Slug already in use' });
    res.status(500).json({ error: 'Failed to update post' });
  }
});

router.delete('/:id', verifyAdminToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM blog_posts WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;
