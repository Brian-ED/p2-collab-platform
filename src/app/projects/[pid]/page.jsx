"use client";

import { Overview } from "@/components/projects/overview/overview";
import { GroupContract } from "@/components/projects/groupContract";
import { GanttChart } from "@/components/projects/ganttChart";
import { KanbanBoard } from "@/components/projects/kanbanBoard";
import { Permissions } from "@/components/projects/permissions";
import { Loading } from "@/components/loading";
import { Github } from "@/components/projects/github/github";
import { useAppContext } from "@/context/AppContext";

import { useState, useEffect } from "react";
import { useParams, redirect } from "next/navigation";
import { InstantMessaging } from "@/components/projects/instantMessaging/instantMessaging";

export default function Projects() {
  const { section, setSection } = useAppContext();
  const { pid } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const setHashSection = (hash) => {
    if (hash === "") setSection("overview");
    else if (hash === "#group-contract") setSection("group-contract");
    else if (hash === "#gantt") setSection("gantt");
    else if (hash === "#kanban") setSection("kanban");
    else if (hash === "#github") setSection("github");
    else if (hash === "#messaging") setSection("messaging");
    else if (hash === "#permissions") setSection("permissions");
  };

  // TODO: Make a not authorized page.
  useEffect(() => {
    fetch(`/api/db/ownsProject?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.userOwnsProject && !data.userHasAccess) redirect("/");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setHashSection(window.location.hash);
  }, [pid]);

  if (isLoading) return <Loading />;

  return (
    <>
      {section === "overview" && <Overview />}
      {section === "group-contract" && <GroupContract />}
      {section === "calendar" && <h1 className="text-2xl">calendar</h1>}
      {section === "gantt" && <GanttChart />}
      {section === "kanban" && <KanbanBoard />}
      {section === "github" && <Github />}
      {section === "messaging" && <InstantMessaging />}
      {section === "permissions" && <Permissions />}
    </>
  );
}
