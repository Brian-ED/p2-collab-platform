"use client";

import { Overview } from "@/components/projects/overview";
import { GanttChart } from "@/components/projects/ganttChart";
import { Loading } from "@/components/loading";
import { useAppContext } from "@/context/AppContext";

import { useState, useEffect } from "react";
import { useParams, redirect } from "next/navigation";

export default function Projects() {
  const { section } = useAppContext();
  const { pid } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  // TODO: Make a not authorized page.
  useEffect(() => {
    fetch(`/api/db/ownsProject?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.userOwnsProject) redirect("/");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      {section === "overview" && <Overview />}
      {section === "calendar" && <h1 className="text-2xl">calendar</h1>}
      {section === "gantt" && <GanttChart />}
      {section === "trello" && <h1 className="text-2xl">trello</h1>}
      {section === "github" && <h1 className="text-2xl">github</h1>}
    </>
  );
}
