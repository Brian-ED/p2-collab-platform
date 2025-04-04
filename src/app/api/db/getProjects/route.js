import { auth } from "@/auth/authSetup";

import { getProjectMembers, getUserProjects } from "@/lib/queries";

export async function GET() {
  const session = await auth();
  if (!!session) {
    const data = await getUserProjects(session);

    for (let i = 0; i < data.length; i++) {
      data[i].members = [await getProjectMembers(data[i].id)];
    }

    return Response.json({ data: data, error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
