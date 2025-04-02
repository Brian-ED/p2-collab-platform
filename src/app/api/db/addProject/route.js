import { auth } from "@/auth/authSetup";

import { addProject } from "@/lib/queries";

export async function POST(req) {
  const session = await auth();

  let origin = new URL(req.url);
  const formData = await req.formData();
  const projectName = formData.get("project-name");

  if (projectName.length > 50 || projectName.length == 0)
    return Response.json({ data: null, error: "Project name not valid!" });

  if (!!session) {
    const newProjectId = await addProject(session, projectName);

    origin.pathname = `/projects/${newProjectId}`;

    return Response.redirect(origin);
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
