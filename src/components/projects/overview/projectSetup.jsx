"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { SetupTask } from "@/components/projects/overview/setupTask";
import { Loading } from "@/components/loading";

export const ProjectSetup = () => {
  const [isLoading, setIsLoading] = useState(true);
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

        // Get the gantt tasks count and the gitHubUrl value from the response
        const ganttChartCount = response.data.totalGanttTasks;
        const gitHubUrl = !!response.data.gitHubUrl; // Either empty or contains a GitHub URL | true if not empty false if empty

        setSetupProgress({
          groupContractCount: validGroupContractCategories.length,
          ganttChartCount: ganttChartCount,
          gitHubUrl: gitHubUrl ? 1 : 0,
        });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <SetupTask
        task="Create three group contract categories, each containing at least three rules."
        requiredAmount="3"
        progress={setupProgress.groupContractCount}
        sectionAnchor="group-contract"
      />
      <SetupTask
        task="Plan out your project by creating at least five Gantt tasks."
        requiredAmount="5"
        progress={setupProgress.ganttChartCount}
        sectionAnchor="gantt"
      />
      <SetupTask
        task="Integrate a GitHub repositroy."
        requiredAmount="1"
        progress={setupProgress.gitHubUrl}
        sectionAnchor="github"
      />
    </div>
  );
};
