"use client";

import { Overview } from "@/components/projects/overview";
import { GanttChart } from "@/components/projects/ganttChart";
import { testTasks } from "@/components/projects/ganttTempData";
import { useAppContext } from "@/context/AppContext";

export default function Projects() {
  const { section } = useAppContext();
  return (
    <>
      {section === "overview" && <Overview />}
      {section === "calendar" && <h1 className="text-2xl">calendar</h1>}
      {section === "gantt" && <GanttChart tasks={testTasks} />}
      {section === "trello" && <h1 className="text-2xl">trello</h1>}
      {section === "github" && <h1 className="text-2xl">github</h1>}
    </>
  );
}
