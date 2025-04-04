"use server";

import prisma from "@/lib/prisma";

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
  let userId = session.user.image.split("/")[4].split("?")[0];

  const count = await prisma.projects.count({
    where: {
      id: projectId,
      users: {
        user_id: userId,
      },
    },
  });
  return !!count;
}

export async function checkIfUserHasAccessToProject(session, projectId) {
  const userId = session.user.image.split("/")[4].split("?")[0];

  const count = await prisma.access.count({
    where: {
      users: {
        user_id: userId,
      },
      projects: {
        id: projectId,
      },
    },
  });

  return count;
}

export async function getGanttTasks(projectId) {
  const result = await prisma.gantt_charts.findMany({
    where: {
      projects: {
        id: projectId,
      },
    },
  });
  return result;
}

export async function getUserProjects(session) {
  const userId = session.user.image.split("/")[4].split("?")[0];

  const result = await prisma.projects.findMany({
    where: {
      OR: [
        {
          users: {
            user_id: userId,
          },
        },
        {
          access: {
            some: {
              users: {
                user_id: userId,
              },
            },
          },
        },
      ],
    },
  });

  return result;
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

export async function addGanttTask(
  projectId,
  title,
  description,
  startDate,
  endDate
) {
  await pool.query(
    "INSERT INTO gantt_charts (project_id, title, description, start_date, end_date, completed) VALUES ($1, $2, $3, $4, $5, $6);",
    [projectId, title, description, startDate, endDate, false]
  );
}
