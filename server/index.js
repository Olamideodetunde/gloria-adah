import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logPath = path.join(__dirname, '..', 'error.log');
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

function logToFile(type, message) {
  const timestamp = new Date().toISOString();
  logStream.write(`[${timestamp}] [${type}] ${message}\n`);
}

const originalWrite = process.stdout.write;
const originalErrWrite = process.stderr.write;

process.stdout.write = function(chunk, encoding, callback) {
  logToFile('INFO', chunk.toString().trim());
  return originalWrite.apply(process.stdout, arguments);
};

process.stderr.write = function(chunk, encoding, callback) {
  logToFile('ERROR', chunk.toString().trim());
  return originalErrWrite.apply(process.stderr, arguments);
};

process.on('uncaughtException', (err) => {
  logToFile('CRASH', `Uncaught Exception: ${err.stack || err}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logToFile('CRASH', `Unhandled Rejection at: ${promise}, reason: ${reason?.stack || reason}`);
});

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { initDb } from './db.js';
import bookingsRouter from './routes/bookings.js';
import contactRouter from './routes/contact.js';
import postsRouter from './routes/posts.js';
import adminRouter from './routes/admin.js';
import uploadRouter from './routes/upload.js';
import servicesRouter from './routes/services.js';

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
app.use('/api/services', servicesRouter);

async function startServer() {
  if (isProd) {
    const distPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(distPath));
    app.get('/*splat', (_req, res) => {
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
  
  app.listen(PORT, () => {
    console.log(`[GOA] Server running on port ${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[GOA] Startup failed:', err.message);
  process.exit(1);
});

export default app;
