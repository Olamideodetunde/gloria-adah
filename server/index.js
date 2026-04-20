import express from 'express';
import cors from 'cors';
import { initDb } from './db.js';
import bookingsRouter from './routes/bookings.js';
import contactRouter from './routes/contact.js';
import postsRouter from './routes/posts.js';
import adminRouter from './routes/admin.js';

const app = express();
const PORT = parseInt(process.env.API_PORT || '3001', 10);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.use('/api/bookings', bookingsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/posts', postsRouter);
app.use('/api/admin', adminRouter);

app.use((err, _req, res, _next) => {
  console.error('[API] Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

initDb()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[API] Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[API] DB init failed:', err.message);
    process.exit(1);
  });
