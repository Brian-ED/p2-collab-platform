"use client";

import { ProjectSetup } from "@/components/projects/overview/projectSetup";
import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export const Overview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [setupProgress, setSetupProgress] = useState(null);
  const { pid } = useParams();

  useEffect(() => {
    fetch(`/api/db/projectSetup?projectId=${pid}`)
      .then((res) => res.json())
      .then((response) => {
        const validGroupContractCategories = response.data.categories.filter(
          (category) => category.ruleCount >= 3
        );

        const ganttChartCount = response.data.totalGanttTasks;
        const gitHubUrl = !!response.data.gitHubUrl;

        setSetupProgress({
          groupContractCount: validGroupContractCategories.length,
          ganttChartCount,
          gitHubUrl: gitHubUrl ? 1 : 0,
        });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="px-10 py-4 text-white">
      <h1 className="text-5xl font-bold mb-2">Project Overview</h1>
      <p className="text-lg text-gray-400 mb-6">
        Welcome! Use this dashboard to set up and manage your project.
      </p>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Overview Section Includes:</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Introduction to the project section</li>
          <li>Explanation of core functionalities</li>
          <li>Project-specific information</li>
          <li>Navigation back to project selection</li>
          <li>Users with access to the project</li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-2">Get started with your project!</h3>
        <p className="text-gray-400 mb-6">
          Complete the tasks below to lay a strong foundation for your project.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProjectSetup setupProgress={setupProgress} />
        </div>
      </div>
    </div>
  );
};