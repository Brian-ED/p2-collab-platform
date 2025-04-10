export async function GET(request) {
  const encoder = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  let interval;

  // Helper to send SSE-formatted messages
  const send = async (data) => {
    const formatted = `data: ${data}\n\n`;
    await writer.write(encoder.encode(formatted));
  };

  // Start pushing events
  const start = async () => {
    await send("Connected to SSE stream");

    interval = setInterval(async () => {
      const message = JSON.stringify({ time: new Date().toISOString() });
      await send(message);
    }, 2000);
  };

  // Handle client disconnect
  request.signal?.addEventListener("abort", () => {
    clearInterval(interval);
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
