import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logPath = path.join(__dirname, '..', 'error.log');

fs.writeFileSync(logPath, 'Startup script reached successfully! Node.js is executing files.\n', 'utf8');
console.log('Test startup ran successfully');
