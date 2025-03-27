import { auth } from "@/auth/authSetup";

import { getGanttTasks } from "@/app/lib/queries";

export async function GET(req) {
  console.log(req);
  const session = await auth();
  if (!!session) {
    const data = await getGanttTasks(2);
    return Response.json(data);
  } else {
    return Response.json({ error: "Not authorized" });
  }
}
