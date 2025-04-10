"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Message } from "@/components/projects/instantMessaging/message";
import { IoSend } from "react-icons/io5";

export const InstantMessaging = () => {
  const { pid } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(`/api/chat?projectId=${pid}`);

    eventSource.onmessage = (event) => {
      setMessages(JSON.parse(event.data).messages);
    };
  }, []);

  const sendMessage = () => {
    const data = new URLSearchParams(
      new FormData(document.querySelector("#message"))
    );
    fetch(`/api/chat?projectId=${pid}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message.message}
          sender={message.users.name}
          time={message.time_sent}
        />
      ))}
      <form
        action={() => {
          sendMessage();
        }}
        className="flex w-[calc(100%-var(--spacing)*68)] rounded-3xl bg-button fixed bottom-5"
        id="message"
      >
        <input
          type="text"
          name="message"
          maxLength={255}
          className="w-[96%] mx-auto outline-hidden"
        />
        <button type="submit" className="hover:cursor-pointer outline-hidden">
          <IoSend className="mx-2" />
        </button>
      </form>
    </div>
  );
};
