import { auth } from "@/auth/authSetup";

import { checkIfUserOwnsProject } from "@/lib/queries";

export async function GET(req) {
  let projectId = new URL(req.url).searchParams.get("projectId");
  projectId = parseInt(projectId);

  const session = await auth();
  let userOwnsProject;
  if (Number.isInteger(projectId)) {
    userOwnsProject = await checkIfUserOwnsProject(session, projectId);
  } else {
    userOwnsProject = false;
  }
  return Response.json({ userOwnsProject: userOwnsProject });
}
