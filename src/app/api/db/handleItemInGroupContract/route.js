import { auth } from "@/auth/authSetup";
import {
  getGroupContract,
  addGroupContractCategory,
  addGroupContractRule,
  updateGroupContractCategory,
  updateGroupContractRule,
  deleteCategory,
  deleteRule,
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

  return Response.json({ data: null, error: "Not authorized" });
}

export async function PATCH(req) {
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
    try {
      const body = await req.json();

      // Update rule
      if (body.ruleId && body.rule_description) {
        const updatedRule = await updateGroupContractRule(
          body.ruleId,
          body.rule_description
        );
        return Response.json({ data: updatedRule, error: null });
      }

      // Update category title
      if (body.categoryId && body.category_title) {
        const updatedCategory = await updateGroupContractCategory(
          body.categoryId,
          body.category_title
        );
        return Response.json({ data: updatedCategory, error: null });
      }

      return Response.json({ data: null, error: "Invalid payload" });
    } catch (error) {
      console.error("PATCH error:", error);
      return Response.json({ data: null, error: "Failed to update item" });
    }
  }

  return Response.json({ data: null, error: "Not authorized" });
}

export async function DELETE(req) {
  let projectId = new URL(req.url).searchParams.get("projectId");
  projectId = parseInt(projectId);
  const session = await auth();

  console.log(req);

  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      (await checkIfUserOwnsProject(session, projectId)) ||
      (await checkIfUserHasAccessToProject(session, projectId));
  }

  if (!!session && userHasAccess) {
    const body = await req.json();
    const { categoryId, ruleId } = body;

    try {
      let deleted = null;

      if (categoryId) {
        deleted = await deleteCategory(categoryId);
      } else if (ruleId) {
        deleted = await deleteRule(ruleId);
      }
      return Response.json({ data: deleted, error: null });
    } catch (error) {
      return Response.json({
        data: null,
        error: "Something went wrong deleting the item: " + error,
      });
    }
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
