import { auth } from "@/auth/authSetup";
import {
  checkIfUserOwnsProject,
  checkIfUserHasAccessToProject,
  getMessages,
  addMessage,
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
    const encoder = new TextEncoder();
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    let sendDataInterval;
    let pullDBDataInterval;
    let messages = await getMessages(projectId);

    // RETURN DATA
    const send = async (data) => {
      const formatted = `data: ${data}\n\n`;
      await writer.write(encoder.encode(formatted));
    };

    // START FUNCTION
    const start = async () => {
      await send(JSON.stringify({ messages: messages }));

      sendDataInterval = setInterval(async () => {
        const message = JSON.stringify({ messages: messages });
        await send(message);
      }, 2000);

      pullDBDataInterval = setInterval(async () => {
        const result = await getMessages(projectId);
        messages = result;
      }, 5000);
    };

    // USER DISCONNECTS
    req.signal?.addEventListener("abort", () => {
      console.log("User disconnected");
      clearInterval(sendDataInterval);
      clearInterval(pullDBDataInterval);
      writer.close();
    });

    start();

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  return Response.json({ data: null, error: "Not authorized" });
}

export async function POST(req) {
  let projectId = new URL(req.url).searchParams.get("projectId");
  projectId = parseInt(projectId);

  const formData = await req.formData();
  const message = formData.get("message");

  if (message.length > 255)
    return Response.json({ data: null, error: "Message is too long" });

  if (message.length < 1)
    return Response.json({
      data: null,
      error: "Message must contain one character",
    });

  const session = await auth();
  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      (await checkIfUserOwnsProject(session, projectId)) ||
      (await checkIfUserHasAccessToProject(session, projectId));
  }

  if (userHasAccess && !!session) {
    await addMessage(projectId, session, message);
  }
}
