import { auth } from "@/auth/authSetup";

import {
  getProjectMembers,
  checkIfUserOwnsProject,
  checkIfUserHasAccessToProject,
} from "@/lib/queries";

export async function GET(req) {
  let projectId = new URL(req.url).searchParams.get("projectId");
  projectId = parseInt(projectId);

  const session = await auth();

  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      (await checkIfUserOwnsProject(session, projectId)) ||
      (await checkIfUserHasAccessToProject(session, projectId));
  }

  if (!!session && userHasAccess) {
    const data = await getProjectMembers(projectId);

    return Response.json({ data: data, error: "null" });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
