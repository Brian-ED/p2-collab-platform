"use server";

import prisma from "@/lib/prisma";

import dayjs from "dayjs";

export async function addUser(name, userId) {
  const count = await prisma.users.count({
    where: {
      name: name,
      user_id: userId,
    },
  });

  if (count === 0) {
    await prisma.users.create({
      data: {
        name: name,
        user_id: userId,
      },
    });
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

export async function checkIfTaskBelongsToProject(projectId, taskId) {
  const count = await prisma.gantt_charts.count({
    where: {
      projects: {
        id: projectId,
      },
      id: taskId,
    },
  });
  return !!count;
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
  const result = await prisma.projects.findFirst({
    where: {
      OR: [
        {
          access: {
            some: {
              project_id: projectId,
            },
          },
        },
        { id: projectId },
      ],
    },
    select: {
      users: {
        select: {
          id: true,
          name: true,
        },
      },
      access: {
        select: {
          users: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  let members = [];

  members[0] = { id: result.users.id, name: result.users.name };
  for (let i = 0; i < result.access.length; i++) {
    members[i + 1] = {
      id: result.access[i].users.id,
      name: result.access[i].users.name,
    };
  }

  return members;
}

export async function addProject(session, projectName) {
  const userId = session.user.image.split("/")[4].split("?")[0];
  const id = (
    await prisma.users.findFirst({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
      },
    })
  ).id;

  const creation = await prisma.projects.create({
    data: {
      user_id: id,
      project_name: projectName,
    },
  });

  return creation.id;
}

export async function addGanttTask(
  projectId,
  title,
  description,
  startDate,
  endDate
) {
  await prisma.gantt_charts.create({
    data: {
      project_id: projectId,
      title: title,
      description: description,
      start_date: dayjs(startDate),
      end_date: dayjs(endDate),
    },
  });
}

export async function removeGanttTask(taskId) {
  await prisma.gantt_charts.delete({
    where: {
      id: taskId,
    },
  });
}
