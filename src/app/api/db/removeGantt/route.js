import { auth } from "@/auth/authSetup";
import {
  removeGanttTask,
  checkIfUserHasAccessToProject,
  checkIfUserOwnsProject,
} from "@/lib/queries";

export async function DELETE(req) {
  console.log(req);

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
    let taskId = new URL(req.url).searchParams.get("taskId");
    taskId = parseInt(taskId);
    //await removeGanttTask(taskId);

    console.log("task id: " + taskId);

    return Response.json({ data: "ok", error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
