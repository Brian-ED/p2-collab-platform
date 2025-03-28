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

  const result = await pool.query(
    `SELECT * FROM users WHERE (name = '${name}') AND (user_id = '${userId}');`
  );

  if (result.rowCount == 0) {
    await pool.query(
      `INSERT INTO users (name, user_id) VALUES ('${name}', '${userId}') ON CONFLICT (user_id) DO NOTHING;`
    );
  }
}

export async function checkIfUserOwnsProject(session, projectId) {
  const userId = session.user.image.split("/")[4].split("?")[0];
  const result = await pool.query(
    `select projects.id, users.user_id as uid from projects inner join users on projects.user_id = users.id where users.user_id = '${userId}' and projects.id = ${projectId};`
  );
  return !!result.rowCount;
}

export async function getGanttTasks(projectId) {
  const result = await pool.query(
    `SELECT id, title, description, start_date as startdate, end_date as enddate, completed FROM gantt_charts WHERE (project_id = ${projectId});`
  );
  return result.rows;
}

export async function getUserProjects(session) {
  const userId = session.user.image.split("/")[4].split("?")[0];
  const result = await pool.query(`
    SELECT p.id AS project_id, null AS permissions
    FROM projects p
    JOIN users u ON p.user_id = u.id
    WHERE (u.user_id = '${userId}')
    UNION ALL
    SELECT a.project_id, a.permission
    FROM access a
    LEFT JOIN users u ON a.user_id = u.id
    WHERE (u.user_id = '${userId}');
    `);
  return result.rows;
}
