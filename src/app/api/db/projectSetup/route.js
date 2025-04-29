import { auth } from "@/auth/authSetup";

import {
  getProjectInfo,
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
    const data = await getProjectInfo(projectId);
    return Response.json(data);
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
