import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionTimeoutMillis: 10000,
  connectionString: process.env.DATABASE_URL,
  allowExitOnIdle: false,
});

export async function addUser(name, userId) {
  await pool.query(
    `INSERT INTO users (name, user_id) VALUES ('${name}', '${userId}'g) ON CONFLICT (user_id) DO NOTHING;`
  );
}
