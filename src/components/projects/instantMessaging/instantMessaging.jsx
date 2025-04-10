"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

export const InstantMessaging = () => {
  const { pid } = useParams();

  useEffect(() => {
    const eventSource = new EventSource(`/api/chat?projectId=${pid}`);

    eventSource.onopen = () => {
      console.log("Forbindelse oprettet!");
    };

    eventSource.onmessage = (event) => {
      console.log(JSON.parse(event.data));
    };
  }, []);

  return <div>Message</div>;
};
