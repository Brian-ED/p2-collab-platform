import { auth } from "@/auth/authSetup";

import {
  addProject,
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
    let origin = new URL(req.url);
    const formData = await req.formData();
    const taskTitle = formData.get("gantt-title");

    console.log(taskTitle);

    origin.pathname = `/projects/${projectId}#gantt`;

    return Response.redirect(origin);
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
