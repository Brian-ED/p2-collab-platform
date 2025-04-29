"use client";

import { SetupTask } from "@/components/projects/overview/setupTask";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export const ProjectSetup = () => {
  const { pid } = useParams();

  const [setupProgress, setSetupProgress] = useState({});

  useEffect(() => {
    fetch(`/api/db/projectSetup?projectId=${pid}`)
      .then((res) => res.json())
      .then((response) => {
        // Count how many group contract categories have at least three rules attached to them
        const validGroupContractCategories = response.data.categories.filter(
          (category) => category.ruleCount >= 3
        );

        // Get the gantt tasks count from the response
        const ganttChartCount = response.data.totalGanttTasks;

        setSetupProgress({
          groupContractCount: validGroupContractCategories.length,
          ganttChartCount: ganttChartCount,
        });
      });
  }, []);
  console.log("HERE");

  return (
    <div>
      <SetupTask
        task="Create three contract categories, each containing at least three rules."
        requiredAmount="3"
        progress={setupProgress.groupContractCount}
      />
      <SetupTask
        task="Plan out your project by creating at least five Gantt tasks."
        requiredAmount="5"
        progress={setupProgress.ganttChartCount}
      />
    </div>
  );
};
