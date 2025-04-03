"use server";

import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionTimeoutMillis: 10000,
  connectionString: process.env.DATABASE_URL,
  allowExitOnIdle: false,
});

export async function addUser(name, userId) {
  const result = await pool.query(
    "SELECT * FROM users WHERE (name = $1) AND (user_id = $2);",
    [name, userId]
  );

  if (result.rowCount === 0) {
    await pool.query(
      "INSERT INTO users (name, user_id) VALUES ($1, $2) ON CONFLICT (user_id) DO NOTHING;",
      [name, userId]
    );
  }
}

export async function checkIfUserOwnsProject(session, projectId) {
  const userId = session.user.image.split("/")[4].split("?")[0];
  const result = await pool.query(
    "select projects.id, users.user_id as uid from projects inner join users on projects.user_id = users.id where users.user_id = $1 and projects.id = $2;",
    [userId, projectId]
  );
  return !!result.rowCount;
}

export async function checkIfUserHasAccessToProject(session, projectId) {
  const userId = session.user.image.split("/")[4].split("?")[0];
  const result = await pool.query(
    "select access.id, access.project_id, users.user_id as uid from access inner join projects on access.project_id = projects.id inner join users on access.user_id = users.id where users.user_id = $1 and access.project_id = $2;",
    [userId, projectId]
  );
  return !!result.rowCount;
}

export async function getGanttTasks(projectId) {
  const result = await pool.query(
    "SELECT id, title, description, start_date as startdate, end_date as enddate, completed FROM gantt_charts WHERE (project_id = $1);",
    [projectId]
  );
  return result.rows;
}

export async function getUserProjects(session) {
  const userId = session.user.image.split("/")[4].split("?")[0];
  const result = await pool.query(
    `
    SELECT p.id AS project_id, p.project_name AS project_name, null AS permissions
    FROM projects p
    JOIN users u ON p.user_id = u.id
    WHERE (u.user_id = $1)
    UNION ALL
    SELECT a.project_id, p.project_name, a.permission
    FROM access a
    LEFT JOIN users u ON a.user_id = u.id
    LEFT JOIN projects p ON a.project_id = p.id
    WHERE (u.user_id = $2)
    ORDER BY project_id;
    `,
    [userId, userId]
  );
  return result.rows;
}

export async function getProjectMembers(projectId) {
  const result = await pool.query(
    `
    SELECT users.name AS name, users.id AS id FROM users
    JOIN access ON users.id = access.user_id
    WHERE access.project_id = $1
    UNION ALL
    SELECT users.name as name, users.id AS id FROM users
    JOIN projects ON users.id = projects.user_id
    WHERE projects.id = $2;
    `,
    [projectId, projectId]
  );
  return result.rows;
}

export async function addProject(session, projectName) {
  const userId = session.user.image.split("/")[4].split("?")[0];
  const id = (
    await pool.query("SELECT id FROM users WHERE (user_id = $1);", [userId])
  ).rows[0].id;

  await pool.query(
    "INSERT INTO projects (user_id, project_name) VALUES ($1, $2);",
    [id, projectName]
  );

  const result = await pool.query(
    "SELECT id FROM projects WHERE (project_name = $1) and (user_id = $2);",
    [projectName, id]
  );

  return result.rows[0].id;
}

export async function addGanttTask(projectId, title, description, startDate, endDate) {
  await pool.query(
    "INSERT INTO gantt_charts (project_id, title, description, start_date, end_date, completed) VALUES ($1, $2, $3, $4, $5, $6);",
    [projectId, title, description, startDate, endDate, false]
  );
}

export async function removeGanttTask(taskId) {
  await pool.query(
    "DELETE FROM gantt_charts WHERE id='$1';",
    [taskId]
  );
}