import { GanttChart } from "@/app/components/ganttChart";

import { GroupContract } from "@/app/components/projects/groupContract/groupContract";

export default function Projects() {
  return (
    <div>
      <GanttChart />
      <GroupContract />
    </div>
  );
}
