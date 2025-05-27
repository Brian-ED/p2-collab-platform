"use client";

import { OverviewInfo } from "@/components/projects/overview/overviewInfo";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const ProjectOverview = ({ overviewInformation }) => {
  const timeLeft =
    dayjs.utc(overviewInformation.timeLeft).diff(dayjs.utc(), "day") + 1;

  return (
    <>
      <OverviewInfo
        label="Team members"
        value={overviewInformation.groupMembers}
        sectionAnchor="team members"
      />
      <OverviewInfo
        label="Time left for this project"
        value={`${timeLeft} ${timeLeft > 1 ? "days" : "day"}`}
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
