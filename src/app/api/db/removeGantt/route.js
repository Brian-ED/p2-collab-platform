import { auth } from "@/auth/authSetup";
import {
  removeGanttTask,
  checkIfUserHasAccessToProject,
  checkIfUserOwnsProject,
  checkIfTaskBelongsToProject,
} from "@/lib/queries";

export async function DELETE(req) {
  let projectId = new URL(req.url).searchParams.get("projectId");
  projectId = parseInt(projectId);
  let taskId = new URL(req.url).searchParams.get("taskId");
  taskId = parseInt(taskId);

  const session = await auth();
  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      ((await checkIfUserOwnsProject(session, projectId)) ||
        (await checkIfUserHasAccessToProject(session, projectId))) &&
      (await checkIfTaskBelongsToProject(projectId, taskId));
  }

  if (userHasAccess && !!session) {
    await removeGanttTask(taskId);

    console.log("task id: " + taskId);

    return Response.json({ data: "ok", error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
