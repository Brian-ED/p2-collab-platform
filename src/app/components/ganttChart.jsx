"use client";

const data = [
  {
    id: 1,
    title: "Test1",
    description: "This is test1",
    startDate: new Date("17-03-2025"),
    endDate: new Date("18-03-2025"),
    percentComplete: 50,
    dependency: null,
  },
  {
    id: 2,
    title: "Test2",
    description: "This is test2",
    startDate: null,
    endDate: null,
    percentComplete: 25,
    dependency: { id: 1, length: 5 },
  },
  {
    id: 3,
    title: "Test3",
    description: "This is test3",
    startDate: null,
    endDate: null,
    percentComplete: 0,
    dependency: { id: 2, length: 3 },
  },
];

export const GanttChart = () => {
  return (
    <div>
      <div className="bg-trackcolor h-12 w-screen"></div>
      <div className="bg-trackcolorodd h-12 w-screen"></div>
    </div>
  );
};
