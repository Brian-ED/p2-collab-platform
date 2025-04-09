import { useEffect } from "react";

export const InstantMessaging = () => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/api/socket");
    
    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send("Hello, WebSocket!");
    };
    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
    return () => {
      ws.close();
    };
  }, []);

  return <div></div>;
};
