"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Message } from "@/components/projects/instantMessaging/message";
import { IoSend } from "react-icons/io5";
import { useAppContext } from "@/context/AppContext";

export const InstantMessaging = () => {
  const { pid } = useParams();
  const { sidebar } = useAppContext();
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
    })
      .then((data) => data.json())
      .then((response) => {
        if (response.data[0] === "Message sent") {
          const returnedMessage = response.data[1];
          let currentMessages = messages.concat([returnedMessage]);
          setMessages(currentMessages);
        }
      });
  };

  return (
    <div id="message-container" className="mx-auto my-2 mb-2">
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
        className={`flex ${
          sidebar ? "w-[calc(100%-var(--spacing)*68)]" : "w-[99%]"
        } rounded-3xl bg-button fixed bottom-5 duration-280 transition-all`}
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
