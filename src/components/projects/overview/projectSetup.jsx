"use client";

import { SetupTask } from "@/components/projects/overview/setupTask";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export const ProjectSetup = () => {
  const { pid } = useParams();

  const [groupContractCount, setGroupContractCount] = useState(0);
  const [ganttChartCount, setGanttChartCount] = useState(0);
  const [gitHubIssues, setGitHubIssues] = useState(0);

  useEffect(() => {
    fetch(`/api/db/projectSetup?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div>
      <SetupTask task="Create 3 group contract categories" requiredAmount="3" />
    </div>
  );
};
