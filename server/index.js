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
import uploadRouter from './routes/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT || '5000', 10);

const app = express();

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
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
app.use('/api/upload', adminLimiter, uploadRouter);

async function startServer() {
  if (isProd) {
    const distPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(distPath));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createVite } = await import('vite');
    const vite = await createVite({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.use((err, _req, res, _next) => {
    console.error('[API] Unhandled error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  });

  await initDb();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[GOA] Server running on port ${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[GOA] Startup failed:', err.message);
  process.exit(1);
});
