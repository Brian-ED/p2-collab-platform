"use server";

import prisma from "@/lib/prisma";

export async function addUser(name, userId, email) {
  const count = await prisma.users.count({
    where: {
      user_id: userId,
    },
  });

  if (count === 0) {
    return await prisma.users.create({
      data: {
        name: name,
        user_id: userId,
        email: email,
      },
    });
  }
}

export async function checkIfUserOwnsProject(session, projectId) {
  if (!!session === false) return false;
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
  if (!!session === false) return false;
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

  return !!count;
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
    include: {
      assigned_users: true,
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

export async function addProject(session, projectName, projectDueDate) {
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
      project_due_date: projectDueDate,
    },
  });

  return creation.id;
}

export async function addGanttTask(
  projectId,
  title,
  description,
  startDate,
  endDate,
  hoursNeeded,
  assignedUsers
) {
  await prisma.gantt_charts.create({
    data: {
      project_id: projectId,
      title: title,
      description: description,
      start_date: startDate,
      end_date: endDate,
      hours_needed: hoursNeeded,
      assigned_users: {
        connect: assignedUsers,
      },
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

export async function getGroupContract(projectId) {
  const result = await prisma.group_contracts.findMany({
    where: {
      project_id: projectId,
    },
    select: {
      id: true,
      category_title: true,
      group_contract_rules: {
        select: {
          id: true,
          rule_description: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
  return result;
}

export async function addGroupContractCategory(projectId, category_title) {
  const result = await prisma.group_contracts.create({
    data: {
      category_title,
      project_id: parseInt(projectId),
    },
  });
  return result;
}

export async function updateGroupContractCategory(categoryId, newTitle) {
  return await prisma.group_contracts.update({
    where: { id: categoryId },
    data: { category_title: newTitle },
  });
}

export async function addGroupContractRule(groupContractId, ruleDescription) {
  return await prisma.group_contract_rules.create({
    data: {
      group_contract_id: groupContractId,
      rule_description: ruleDescription,
    },
  });
}

export async function updateGroupContractRule(ruleId, newDescription) {
  return await prisma.group_contract_rules.update({
    where: { id: ruleId },
    data: { rule_description: newDescription },
  });
}

export const deleteCategory = async (categoryId) => {
  // Delete associated rules first
  await prisma.group_contract_rules.deleteMany({
    where: {
      group_contract_id: categoryId,
    },
  });

  // Delete the category
  return await prisma.group_contracts.delete({
    where: { id: categoryId },
  });
};

export const deleteRule = async (ruleId) => {
  return await prisma.group_contract_rules.delete({
    where: { id: ruleId },
  });
};

export async function getMessages(projectId) {
  const messages = await prisma.messages.findMany({
    where: {
      projects: {
        id: projectId,
      },
    },
    orderBy: {
      time_sent: "asc",
    },
    select: {
      id: true,
      users: {
        select: {
          name: true,
        },
      },
      message: true,
      time_sent: true,
    },
  });

  return messages;
}

export async function addMessage(projectId, session, message) {
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

  return await prisma.messages.create({
    data: {
      project_id: projectId,
      sender_id: id,
      message: message,
    },
    select: {
      id: true,
      users: {
        select: {
          name: true,
        },
      },
      message: true,
      time_sent: true,
    },
  });
}

export async function getUsersWithAccess(projectId) {
  const owner = await prisma.projects.findFirst({
    where: {
      id: projectId,
    },
    select: {
      users: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  const users = await prisma.access.findMany({
    where: {
      project_id: projectId,
    },
    select: {
      id: true,
      permissions: {
        select: {
          name: true,
        },
      },
      users: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return { owner: owner, users: users };
}

export async function removeAccessFromUser(projectId, accessId) {
  try {
    await prisma.access.delete({
      where: {
        id: accessId,
        project_id: projectId,
      },
    });
    return { data: "Access deleted", error: null };
  } catch {
    return { data: null, error: "Not authorized" };
  }
}

export async function grantAccessToUser(projectId, email) {
  try {
    const id = (
      await prisma.users.findFirst({
        where: {
          email: email,
        },
        select: {
          id: true,
        },
      })
    ).id;

    const userOwnsProject = await prisma.projects.count({
      where: {
        users: {
          email: email,
        },
        id: projectId,
      },
    });

    if (!!userOwnsProject) return { data: null, error: "User owns project" };

    const data = await prisma.access.create({
      data: {
        permission: 1,
        project_id: projectId,
        user_id: id,
      },
    });

    return { data: data, error: null };
  } catch {
    return { data: null, error: "Not authorized" };
  }
}

export async function getProjectInfo(projectId) {
  try {
    const [contractCategories, ganttTaskCount] = await Promise.all([
      prisma.group_contracts.findMany({
        where: { project_id: projectId },
        select: {
          id: true,
          category_title: true,
          _count: {
            select: {
              group_contract_rules: true,
            },
          },
        },
      }),
      prisma.gantt_charts.count({
        where: { project_id: projectId },
      }),
    ]);

    const data = {
      totalCategories: contractCategories.length,
      categories: contractCategories.map((category) => ({
        id: category.id,
        title: category.category_title,
        ruleCount: category._count.group_contract_rules,
      })),
      totalGanttTasks: ganttTaskCount,
    };

    return { data: data, error: null };
  } catch (err) {
    console.log(err);
    return { data: null, error: "Not authorized" };
  }
}

export async function getProjectDueDate(pid) {
  return (
    await prisma.projects.findFirst({
      where: { id: pid },
      select: { project_due_date: true },
    })
  ).project_due_date;
}

export async function getGithubUrl(pid) {
  return (
    await prisma.projects.findFirst({
      where: {
        id: pid,
      },
      select: {
        github_url: true,
      },
    })
  ).github_url;
}

export async function setProjectGithub(pid, github_url) {
  return await prisma.projects.update({
    where: {
      id: pid,
    },
    data: {
      github_url: github_url,
    },
  });
}

export async function getProjectGithub(pid) {
  return (
    await prisma.projects.findFirst({
      where: {
        id: pid,
      },
      select: {
        github_url: true,
      },
    })
  ).github_url;
}

export async function getKanbanEntries(projectId) {
  const result = await prisma.kanban.findMany({
    where: {
      projects: {
        id: projectId,
      },
    },
  });
  return result;
}

export async function addKanbanEntry(projectId, name, description, status) {
  await prisma.kanban.create({
    data: {
      project_id: projectId,
      name: name,
      description: description,
      status: status,
    },
  });
}

export async function editKanbanStatus(entryId, status) {
  await prisma.kanban.update({
    where: {
      id: entryId,
    },
    data: {
      status: status,
    },
  });
}

export async function checkIfEntryBelongsToProject(projectId, entryId) {
  const count = await prisma.kanban.count({
    where: {
      projects: {
        id: projectId,
      },
      id: entryId,
    },
  });
  return !!count;
}

export async function removeKanbanEntry(entryId) {
  await prisma.kanban.delete({
    where: {
      id: entryId,
    },
  });
}
