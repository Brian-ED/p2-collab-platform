import { auth } from "@/auth/authSetup";

import {
  addKanbanEntry,
  checkIfUserHasAccessToProject,
  checkIfUserOwnsProject,
  editKanbanStatus,
  checkIfEntryBelongsToProject,
  removeKanbanEntry,
} from "@/lib/queries";

export async function POST(req) {
  let projectId = new URL(req.url).searchParams.get("projectId");
  projectId = parseInt(projectId);

  const session = await auth();
  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      (await checkIfUserOwnsProject(session, projectId)) ||
      (await checkIfUserHasAccessToProject(session, projectId));
  }

  if (userHasAccess && !!session) {
    const formData = await req.formData();
    const entryName = formData.get("kanban-name");
    if (entryName.length > 30 || entryName.length < 1)
      return Response.json({ data: null, error: "Name not valid" });

    const entryDescription = formData.get("kanban-description");
    if (entryDescription.length > 150 || entryDescription.length < 0)
      return Response.json({ data: null, error: "Description not valid" });

    const entryStatus = formData.get("kanban-status");
    if (
      !(
        entryStatus === "backlog" ||
        entryStatus === "progress" ||
        entryStatus === "review" ||
        entryStatus === "done"
      )
    )
      return Response.json({ data: null, error: "Status not valid" });

    await addKanbanEntry(projectId, entryName, entryDescription, entryStatus);

    return Response.json({ data: "ok", error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}

export async function PATCH(req) {
  let projectId = new URL(req.url).searchParams.get("projectId");
  projectId = parseInt(projectId);

  const session = await auth();
  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      (await checkIfUserOwnsProject(session, projectId)) ||
      (await checkIfUserHasAccessToProject(session, projectId));
  }

  if (userHasAccess && !!session) {
    const data = await req.json();

    await editKanbanStatus(data.entryId, data.entryStatus);

    return Response.json({ data: "ok", error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}

export async function DELETE(req) {
  let projectId = new URL(req.url).searchParams.get("projectId");
  projectId = parseInt(projectId);
  let entryId = new URL(req.url).searchParams.get("entryId");
  entryId = parseInt(taskId);

  const session = await auth();
  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      ((await checkIfUserOwnsProject(session, projectId)) ||
        (await checkIfUserHasAccessToProject(session, projectId))) &&
      (await checkIfEntryBelongsToProject(projectId, entryId));
  }

  if (userHasAccess && !!session) {
    await removeKanbanEntry(entryId);

    console.log("entry id: " + entryId);

    return Response.json({ data: "ok", error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
