import { auth } from "@/auth/authSetup";

import {
  addKanbanEntry,
  checkIfUserHasAccessToProject,
  checkIfUserOwnsProject,
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
    console.log(formData);
    const entryName = formData.get("kanban-name");
    if (entryName.length > 50 || entryName.length < 1)
      return Response.json({ data: null, error: "Name not valid" });

    const entryDescription = formData.get("kanban-description");
    if (entryDescription.length > 255 || entryDescription.length < 0)
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
