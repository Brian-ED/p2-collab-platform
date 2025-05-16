import { auth } from "@/auth/authSetup";
import {
  checkIfUserHasAccessToProject,
  checkIfUserOwnsProject,
  setProjectGithub,
  getProjectGithub,
} from "@/lib/queries";

export async function GET(req) {
  const searchparams = new URL(req.url).searchParams;
  let projectId = searchparams.get("projectId");

  projectId = parseInt(projectId);

  const session = await auth();
  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      (await checkIfUserOwnsProject(session, projectId)) ||
      (await checkIfUserHasAccessToProject(session, projectId));
  }

  if (!!session && userHasAccess) {
    const githubUrl = await getProjectGithub(projectId);

    return Response.json({
      data: githubUrl,
      error: null,
    });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}

export async function PATCH(req) {
  const searchparams = new URL(req.url).searchParams;
  let projectId = searchparams.get("projectId");

  projectId = parseInt(projectId);

  const session = await auth();
  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      (await checkIfUserOwnsProject(session, projectId)) ||
      (await checkIfUserHasAccessToProject(session, projectId));
  }

  if (!!session && userHasAccess) {
    const formData = await req.formData();

    const githubUrl = formData.get("github-repo");

    await setProjectGithub(projectId, githubUrl);

    return Response.json({
      data: ["GitHub repo set.", githubUrl],
      error: null,
    });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
