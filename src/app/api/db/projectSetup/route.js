import { auth } from "@/auth/authSetup";

import {
  getProjectInfo,
  checkIfUserOwnsProject,
  checkIfUserHasAccessToProject,
  getGithubUrl,
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
    const response = await getProjectInfo(projectId);
    const gitHubUrl = await getGithubUrl(projectId);
    
    // Append the GitHub URL to the response object
    response.data.gitHubUrl = gitHubUrl;

    return Response.json(response);
  } else {
    return Response.json({ response: null, error: "Not authorized" });
  }
}
