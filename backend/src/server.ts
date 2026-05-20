import { app } from './app';
import { env } from './config/env';
import { pool } from './db/pool';

async function bootstrap() {
  try {
    await pool.query('SELECT 1');
    app.listen(env.port, () => {
      console.log(`Harmony CRM API running on http://localhost:${env.port}/api`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

bootstrap();
