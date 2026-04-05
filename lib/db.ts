import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.NEON_DATABASE_URL });

export const db = {
  async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(text, params);
      return rows;
    } finally {
      client.release();
    }
  }
};
