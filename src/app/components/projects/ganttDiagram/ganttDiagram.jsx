import { Task } from "@/app/components/projects/ganttDiagram/task";

export const GanttDiagram = () => {
  return (
    <div className="[&>*:nth-child(even)]:bg-gray-500 overflow-x-scroll">
      <Task length={1} />
      <Task length={4} startDate={1} />
      <Task length={8} startDate={100} />
      <Task length={10} />
      <Task length={12} />
      <Task length={14} />
    </div>
  );
};
