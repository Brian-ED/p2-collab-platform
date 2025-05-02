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
    <div>
      <h1 className="text-2xl">overview</h1>
      <p className="text-lg">
        this is the overview section of the projects page
      </p>
      <div className="mt-4">
        <p className="text-xl italic">here there will be:</p>
        <ul className="list-disc list-inside ml-2">
          <li>an introduction to the projects section</li>
          <li>
            an explanation of the different functionalities of the projects
            section
          </li>
          <li>details about the user&apos;s project</li>
          <li>a way to get back to the main page, to select other projects</li>
          <li>a list of the users with access to the project</li>
        </ul>
      </div>
      <div className="mx-auto w-[50%] py-26">
        <div className="mb-6">
          <h3 className="text-2xl text-center">
            Get started with your project!
          </h3>
          <p className="text-center">
            Complete the tasks below to lay a strong foundation for your
            project.
          </p>
        </div>
        <ProjectSetup setupProgress={setupProgress} />
      </div>
    </div>
  );
};