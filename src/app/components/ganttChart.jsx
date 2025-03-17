"use client";

import { useState } from "react";

const data = [
  {
    id: 1,
    title: "Test1",
    description: "This is test1",
    startDate: new Date("2025-03-17"),
    endDate: new Date("2025-03-18"),
    percentComplete: 50,
  },
  {
    id: 2,
    title: "Test2",
    description: "This is test2",
    startDate: null,
    endDate: null,
    percentComplete: 25,
  },
  {
    id: 3,
    title: "Test3 yabba dabba doo shit on my shoe",
    description: "This is test3",
    startDate: null,
    endDate: null,
    percentComplete: 0,
  },
  {
    id: 4,
    title: "Test4",
    description: "This is test4",
    startDate: null,
    endDate: null,
    percentComplete: 0,
  },
  {
    id: 5,
    title: "Test5",
    description:
      "Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor",
    startDate: null,
    endDate: null,
    percentComplete: 0,
  },
];

const GanttTask = ({
  id,
  title,
  description,
  startDate,
  endDate,
  percentComplete,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="h-12 w-screen flex">
      <div
        className="rounded-lg bg-taskcolor h-8 m-auto ml-0 flex group/task w-150"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <p className="m-auto ml-1 overflow-hidden group-hover/task:overflow-visible whitespace-nowrap">
          {title}
        </p>
        <div
          className={`absolute bg-white mt-10 ml-5 rounded-sm max-w-100 max-h-50 overflow-y-hidden ${
            hover ? "scale-100" : "scale-0"
          }`}
        >
          <p className="text-black p-2 m-auto">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const GanttChart = () => {
  return (
    <div>
      <div className="[&>*:nth-child(odd)]:bg-trackcolorodd [&>*:nth-child(even)]:bg-trackcolor">
        {data.map((task) => (
          <GanttTask key={task.id} {...task} />
        ))}
      </div>
      <div className="bg-amber-300 h-8 flex">
        <p className="text-black m-auto ml-2">fat one glorp</p>
      </div>
    </div>
  );
};
