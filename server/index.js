import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './db.js';
import bookingsRouter from './routes/bookings.js';
import contactRouter from './routes/contact.js';
import postsRouter from './routes/posts.js';
import adminRouter from './routes/admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const PORT = isProd
  ? parseInt(process.env.PORT || '5000', 10)
  : parseInt(process.env.API_PORT || '3001', 10);

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '2mb' }));

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many requests. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: 'Too many requests.' }
});

app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.use('/api/bookings', formLimiter, bookingsRouter);
app.use('/api/contact', formLimiter, contactRouter);
app.use('/api/posts', postsRouter);
app.use('/api/admin', adminLimiter, adminRouter);

if (isProd) {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.use((err, _req, res, _next) => {
  console.error('[API] Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

initDb()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[API] Server running on port ${PORT} (${isProd ? 'production' : 'development'})`);
    });
  })
  .catch((err) => {
    console.error('[API] DB init failed:', err.message);
    process.exit(1);
  });
