import { auth } from "@/auth/authSetup";

import {
  checkIfUserOwnsProject,
  checkIfUserHasAccessToProject,
} from "@/lib/queries";

export async function GET(req) {
  let projectId = new URL(req.url).searchParams.get("projectId");
  projectId = parseInt(projectId);

  const session = await auth();
  let userOwnsProject = false,
    userHasAccess = false,
    permissions = false;
  if (Number.isInteger(projectId)) {
    userOwnsProject = await checkIfUserOwnsProject(session, projectId);
    if (!userOwnsProject) {
      userHasAccess = await checkIfUserHasAccessToProject(session, projectId);
    }

    // TODO: Make proper permissions
    if (userOwnsProject || userHasAccess) permissions = "full";
  }

  return Response.json({
    userOwnsProject: userOwnsProject,
    userHasAccess: userHasAccess,
    permissions: permissions,
  });
}
