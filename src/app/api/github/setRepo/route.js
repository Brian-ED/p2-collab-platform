import { auth } from "@/auth/authSetup";
import {
  checkIfUserHasAccessToProject,
  checkIfUserOwnsProject,
  setProjectGithub,
} from "@/lib/queries";

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

    return Response.json({ data: "GitHub project updated", error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
