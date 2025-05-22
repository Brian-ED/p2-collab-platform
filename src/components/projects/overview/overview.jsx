"use client";

import { ProjectSetup } from "@/components/projects/overview/projectSetup";
import { ProjectOverview } from "@/components/projects/overview/projectOverview";
import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export const Overview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [setupProgress, setSetupProgress] = useState(null);
  const [setupOverview, setSetupOverview] = useState(null);
  const { pid } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const [setupRes, membersRes] = await Promise.all([
          fetch(`/api/db/projectSetup?projectId=${pid}`),
          fetch(`/api/db/getProjectMembers?projectId=${pid}`),
        ]);

        const setupData = await setupRes.json();
        const membersData = await membersRes.json();

        // Count of the members belonging to the project
        const memberCount = membersData.data.length;

        const validGroupContractCategories = setupData.data.categories.filter(
          (category) => category.ruleCount >= 3
        );

        const ganttChartCount = setupData.data.totalGanttTasks;
        const gitHubUrl = !!setupData.data.gitHubUrl;

        setSetupProgress({
          groupContractCount: validGroupContractCategories.length,
          ganttChartCount,
          gitHubUrl: gitHubUrl ? 1 : 0,
        });

        setSetupOverview({
          groupMembers: memberCount,
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch project data", err);
      }
    }

    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="px-10 py-4 text-white">
      <h1 className="text-5xl font-bold mb-2">Project Overview</h1>
      <p className="text-lg text-gray-400 mb-6">
        Welcome! This dashboard helps you set up, track, and manage your project
        progress
      </p>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Project details</h2>
        <p className="text-gray-400 mb-6">
          Key metrics and info about your project.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProjectOverview overviewInformation={setupOverview} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Project setup checklist
        </h2>
        <p className="text-gray-400 mb-6">
          Complete these steps to ensure your project is off to a solid start.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProjectSetup setupProgress={setupProgress} />
        </div>
      </div>
    </div>
  );
};
