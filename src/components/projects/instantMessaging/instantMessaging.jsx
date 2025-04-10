"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Message } from "@/components/projects/instantMessaging/message";

export const InstantMessaging = () => {
  const { pid } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(`/api/chat?projectId=${pid}`);

    eventSource.onmessage = (event) => {
      setMessages(JSON.parse(event.data).messages);
    };
  }, []);

  return (
    <div>
      <p>Message</p>
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message.message}
          sender={message.users.name}
          time={message.time_sent}
        />
      ))}
    </div>
  );
};
