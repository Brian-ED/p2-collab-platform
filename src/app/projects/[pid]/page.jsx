"use client";

import { Overview } from "@/components/projects/overview";
import { GroupContract } from "@/components/projects/groupContract";
import { GanttChart } from "@/components/projects/ganttChart";
import { Loading } from "@/components/loading";
import { useAppContext } from "@/context/AppContext";

import { useState, useEffect } from "react";
import { useParams, redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Projects() {
  const { section, setSection } = useAppContext();
  const { pid } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const setHashSection = (hash) => {
    if (hash === "#overview") setSection("overview");
    else if (hash === "#group-contract") setSection("group contract");
    else if (hash === "#calender") setSection("calender");
    else if (hash === "#gantt") setSection("gantt");
    else if (hash === "#trello") setSection("trello");
    else if (hash === "#github") setSection("github");
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
      {section === "group contract" && <GroupContract />}
      {section === "calendar" && <h1 className="text-2xl">calendar</h1>}
      {section === "gantt" && <GanttChart />}
      {section === "trello" && <h1 className="text-2xl">trello</h1>}
      {section === "github" && <h1 className="text-2xl">github</h1>}
    </>
  );
}
