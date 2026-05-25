import { defineConfig } from '@prisma/internals';
import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

console.log('DATABASE_URL:', process.env.DATABASE_URL);

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://localhost/mydb',
    },
  },
});


