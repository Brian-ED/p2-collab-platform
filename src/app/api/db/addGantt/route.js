import { auth } from "@/auth/authSetup";
import dayjs from "dayjs";

import {
  addGanttTask,
  checkIfUserHasAccessToProject,
  checkIfUserOwnsProject,
} from "@/lib/queries";

export async function POST(req) {
  let projectId = new URL(req.url).searchParams.get("projectId");
  projectId = parseInt(projectId);

  const session = await auth();
  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      (await checkIfUserOwnsProject(session, projectId)) ||
      (await checkIfUserHasAccessToProject(session, projectId));
  }

  if (userHasAccess && !!session) {
    const formData = await req.formData();
    const taskTitle = formData.get("gantt-title");
    if (taskTitle.length > 50 || taskTitle.length < 1)
      return Response.json({ data: null, error: "Title not valid" });

    const taskDescription = formData.get("gantt-description");
    if (taskDescription.length > 255 || taskDescription.length < 0)
      return Response.json({ data: null, error: "Description not valid" });

    const taskStartDate = formData.get("gantt-startdate");
    const taskEndDate = formData.get("gantt-enddate");
    if (
      !dayjs(taskStartDate).isValid() ||
      !dayjs(taskEndDate).isValid() ||
      dayjs(taskEndDate).diff(dayjs(taskStartDate), "day") < 1
    )
      return Response.json({ data: null, error: "Dates not valid" });

    await addGanttTask(
      projectId,
      taskTitle,
      taskDescription,
      taskStartDate,
      taskEndDate
    );

    return Response.json({ data: "ok", error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
