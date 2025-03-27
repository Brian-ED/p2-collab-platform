"use client";

import { GanttChart } from "@/components/ganttChart";
import { testTasks } from "@/components/ganttTempData";
import { useAppContext } from "@/context/AppContext";

export default function Projects() {
  const { section } = useAppContext();
  return (
    <>
      {section === "overview" && <h1 className="text-2xl">overview</h1>}
      {section === "calendar" && <h1 className="text-2xl">calendar</h1>}
      {section === "gantt" && <GanttChart tasks={testTasks} />}
      {section === "trello" && <h1 className="text-2xl">trello</h1>}
      {section === "github" && <h1 className="text-2xl">github</h1>}
    </>
  );
}
