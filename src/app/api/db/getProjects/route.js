import { auth } from "@/auth/authSetup";

import { getUserProjects } from "@/lib/queries";

export async function GET() {
  const session = await auth();
  if (!!session) {
    const data = await getUserProjects(session);
    return Response.json({ data: data, error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
