"use server";

import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionTimeoutMillis: 10000,
  connectionString: process.env.DATABASE_URL,
  allowExitOnIdle: false,
});

export async function addUser(name, userId) {
  // TODO: Clean data before querying. SQL-injections are possible.

  // TODO: Query if the user exists already, to prevet IDs from going up.
  await pool.query(
    `INSERT INTO users (name, user_id) VALUES ('${name}', '${userId}') ON CONFLICT (user_id) DO NOTHING;`
  );
}

export async function getGanttTasks(projectId) {
  const result = await pool.query(
    `SELECT id, title, description, start_date, end_date, completed FROM gantt_charts WHERE (project_id = ${projectId});`
  );
  return result.rows;
}
