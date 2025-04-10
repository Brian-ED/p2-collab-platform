"use client";

import { useEffect } from "react";

export const InstantMessaging = () => {
  useEffect(() => {
    const eventSource = new EventSource("/api/chat");

    console.log(eventSource);

    eventSource.onopen = () => {
      console.log("Forbindelse oprettet!");
    };

    eventSource.onmessage = (event) => {
      console.log(event);
    };
  }, []);

  return <div>Message</div>;
};