"use client";

import { OverviewInfo } from "@/components/projects/overview/overviewInfo";

export const ProjectOverview = ({ overviewInformation }) => {
  return (
    <>
      <OverviewInfo
        label="Team members"
        value={overviewInformation.groupMembers}
        sectionAnchor="team members"
      />
      <OverviewInfo
        label="Time left for this project"
        value={"42 days"}
        sectionAnchor="duration"
      />
      <OverviewInfo
        label="Quick advice"
        value={"Remember to add sources to your text!"}
        sectionAnchor="advice"
      />
    </>
  );
};
