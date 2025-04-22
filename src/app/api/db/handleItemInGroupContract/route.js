import { auth } from "@/auth/authSetup";
import {
  getGroupContract,
  addGroupContractCategory,
  addGroupContractRule,
  checkIfUserOwnsProject,
  checkIfUserHasAccessToProject,
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
    const data = await getGroupContract(projectId);
    return Response.json({ data: data, error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}

export async function POST(req) {
  const session = await auth();

  if (!session) {
    return Response.json({ data: null, error: "Not authorized" });
  }

  try {
    const body = await req.json();
    
    // Add category
    if (body.category_title && body.projectId) {
      const data = await addGroupContractCategory(
        body.projectId,
        body.category_title
      );
      return Response.json({ data, error: null });
    }

    // Add rule
    if (body.group_contract_id && body.rule_description) {
      const data = await addGroupContractRule(
        body.group_contract_id,
        body.rule_description
      );
      return Response.json({ data, error: null });
    }

    return Response.json({ data: null, error: "Invalid request body" });

  } catch (error) {
    console.error("POST error:", error);
    return Response.json({ data: null, error: "Invalid JSON" });
  }
}

export async function DELETE(req) {
  const session = await auth();

  console.log(req);

  if (!!session) {
    return Response.json({ data: "DELETE HANDLED", error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}

export async function PATCH(req) {
  const session = await auth();

  console.log(req);

  if (!!session) {
    return Response.json({ data: "PATCH HANDLED", error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
