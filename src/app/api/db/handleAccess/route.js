import { auth } from "@/auth/authSetup";
import {
  checkIfUserOwnsProject,
  checkIfUserHasAccessToProject,
  removeAccessFromUser,
  getUsersWithAccess,
  grantAccessToUser,
} from "@/lib/queries";

export async function GET(req) {
  let projectId = new URL(req.url).searchParams.get("projectId");
  projectId = parseInt(projectId);

  const session = await auth();

  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      (await checkIfUserOwnsProject(session, projectId)) ||
      (await checkIfUserHasAccessToProject(session, projectId));
  }

  if (!!session && userHasAccess) {
    const data = await getUsersWithAccess(projectId);
    return Response.json({ data: data, error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}

export async function DELETE(req) {
  let searchParams = new URL(req.url).searchParams;
  let projectId = searchParams.get("projectId");
  let accessId = searchParams.get("accessId");
  projectId = parseInt(projectId);
  accessId = parseInt(accessId);

  const session = await auth();

  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess = await checkIfUserOwnsProject(session, projectId);
  }

  if (!!session && userHasAccess) {
    const data = await removeAccessFromUser(projectId, accessId);
    return Response.json(data);
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}

export async function POST(req) {
  let searchParams = new URL(req.url).searchParams;
  let projectId = searchParams.get("projectId");
  projectId = parseInt(projectId);

  const session = await auth();

  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess = await checkIfUserOwnsProject(session, projectId);
  }

  if (!!session && userHasAccess) {
    const formData = await req.formData();
    const email = formData.get("email");

    const data = await grantAccessToUser(projectId, email);

    return Response.json(data);
  }
  return Response.json({ data: null, error: "Not authorized" });
}
