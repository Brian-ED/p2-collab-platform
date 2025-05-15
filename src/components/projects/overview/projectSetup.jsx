"use client";

import { SetupTask } from "@/components/projects/overview/setupTask";

export const ProjectSetup = ({ setupProgress }) => {
    return (
      <div>
        <SetupTask
          task="Create three group contract categories, each containing at least three rules."
          requiredAmount={3}
          progress={setupProgress.groupContractCount}
          sectionAnchor="group-contract"
        />
        <SetupTask
          task="Plan out your project by creating at least five Gantt tasks."
          requiredAmount={5}
          progress={setupProgress.ganttChartCount}
          sectionAnchor="gantt"
        />
        <SetupTask
          task="Integrate a GitHub repository."
          requiredAmount={1}
          progress={setupProgress.gitHubUrl}
          sectionAnchor="github"
        />
      </div>
    );
  };