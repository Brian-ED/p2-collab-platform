import { auth } from "@/auth/authSetup";

export async function POST(req) {
  const session = await auth();

  console.log(req);

  if (!!session) {
    return Response.json({ data: "POST HANDLED", error: null });
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
