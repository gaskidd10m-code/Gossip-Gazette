import { Pool } from '@neondatabase/serverless';

export const db = {
  async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const pool = new Pool({ connectionString: process.env.NEON_DATABASE_URL });
    try {
      const { rows } = await pool.query(text, params);
      return rows as T[];
    } finally {
      await pool.end();
    }
  }
};
