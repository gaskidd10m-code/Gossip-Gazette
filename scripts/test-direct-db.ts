import { Pool } from '@neondatabase/serverless';
import 'dotenv/config';

async function run() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const name = "Test Category 123";
    const slug = name.toLowerCase().replace(/ /g, '-');
    const result = await pool.query(`INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *`, [name, slug]);
    console.log("Result:", result.rows[0]);
    await pool.query(`DELETE FROM categories WHERE id = $1`, [result.rows[0].id]);
    console.log("Deleted");
  } catch (err) {
    console.error("DB Error:", err);
  } finally {
    await pool.end();
  }
}

run();
