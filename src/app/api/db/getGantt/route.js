import { auth } from "@/auth/authSetup";

import { getGanttTasks, checkIfUserOwnsProject } from "@/lib/queries";

export async function GET(req) {
  const projectId = new URL(req.url).searchParams.get("projectId");
  const session = await auth();
  const userOwnsProject = await checkIfUserOwnsProject(session, projectId);
  if (!!session && userOwnsProject) {
    const data = await getGanttTasks(projectId);
    return Response.json({ data: data, error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
