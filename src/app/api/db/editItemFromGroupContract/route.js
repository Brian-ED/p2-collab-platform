import { auth } from "@/auth/authSetup";

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
