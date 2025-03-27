import { auth } from "@/auth/authSetup";

import { getGanttTasks } from "@/app/lib/queries";

export async function GET(req) {
  const projectId = new URL(req.url).searchParams.get("projectId");
  const session = await auth();
  if (!!session) {
    const data = await getGanttTasks(projectId);
    return Response.json(data);
  } else {
    return Response.json({ error: "Not authorized" });
  }
}
