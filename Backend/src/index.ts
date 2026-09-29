import dotenv from 'dotenv';
dotenv.config();

const missing = ['DATABASE_URL', 'JWT_SECRET'].filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.error(`Missing required environment variable(s): ${missing.join(', ')}`);
  process.exit(1);
}

import app from './server';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});