import { GanttChart } from "@/components/ganttChart";
import { testTasks } from "@/components/ganttTempData";

export default function Projects() {
  return (
    <>
      <GanttChart tasks={testTasks} />
    </>
  );
}
