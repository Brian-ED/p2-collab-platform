import { auth } from "@/auth/authSetup";

import {
  getProjectDueDate,
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
    const response = await getProjectDueDate(projectId);

    return Response.json({ data: { timeLeft: response }, error: null });
  } else {
    return Response.json({ response: null, error: "Not authorized" });
  }
}
