import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.NEON_DATABASE_URL,
  idleTimeoutMillis: 100,
  max: 5,
  allowExitOnIdle: true
});

export const db = {
  async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const { rows } = await pool.query(text, params);
    return rows as T[];
  }
};

export const dynamic = 'force-dynamic';
