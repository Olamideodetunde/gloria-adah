import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logPath = path.join(__dirname, '..', 'error.log');

const logStream = fs.createWriteStream(logPath, { flags: 'a' });

function log(msg) {
  logStream.write(`[IMPORTS TEST] ${msg}\n`);
}

async function testImports() {
  log('Starting imports test...');
  
  const modules = [
    'express',
    'cors',
    'helmet',
    'express-rate-limit',
    'dotenv/config',
    'mysql2/promise',
    '@getbrevo/brevo',
    'googleapis',
    'cloudinary',
    'multer'
  ];

  for (const mod of modules) {
    try {
      log(`Testing import of: ${mod}`);
      await import(mod);
      log(`✓ ${mod} loaded successfully.`);
    } catch (err) {
      log(`✗ FAILED to load ${mod}. Error: ${err.message}`);
    }
  }

  log('Imports test complete.');
}

testImports();
