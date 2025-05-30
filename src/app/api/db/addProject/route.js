import { auth } from "@/auth/authSetup";

import { addProject } from "@/lib/queries";

import dayjs from "dayjs"

export async function POST(req) {
  const session = await auth();

  let origin = new URL(req.url);
  const formData = await req.formData();
  const projectName = formData.get("project-name");
  const projectDueDate = formData.get("due-date");

  if (projectName.length > 50)
    return Response.json({ data: null, error: "Project name too long!" });

  if (projectName.length < 1)
    return Response.json({ data: null, error: "Project name too short!" });

  if (!!session) {
    const newProjectId = await addProject(session, projectName, dayjs(projectDueDate));

    origin.pathname = `/projects/${newProjectId}`;

    return Response.redirect(origin);
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
