"use client";

import dayjs from "dayjs";
import { useState } from "react";

/* const data = [
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
    startDate: new Date("2025-03-19"),
    endDate: new Date("2025-03-20"),
    percentComplete: 25,
  },
  {
    id: 3,
    title: "Test3 yabba dabba doo shit on my shoe",
    description: "This is test3",
    startDate: new Date("2025-03-20"),
    endDate: new Date("2025-03-21"),
    percentComplete: 0,
  },
  {
    id: 4,
    title: "Test4",
    description: "This is test4",
    startDate: new Date("2025-03-22"),
    endDate: new Date("2025-03-23"),
    percentComplete: 0,
  },
  {
    id: 5,
    title: "Test5",
    description:
      "Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor",
    startDate: new Date("2025-03-24"),
    endDate: new Date("2025-03-30"),
    percentComplete: 0,
  },
]; */

const GanttTask = ({
  id,
  title,
  description,
  startDate,
  endDate,
  percentComplete,
}) => {
  const [hover, setHover] = useState(false);
  const taskDuration = dayjs(endDate).diff(dayjs(startDate), "day");

  return (
    <div className="h-12 w-fit flex">
      <div
        className={`rounded-lg bg-taskcolor h-8 m-auto ml-10 flex group/task`}
        style={{ width: "calc(var(--spacing) * " + taskDuration * 20 + ")" }}
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
          <p className="text-black p-2 m-auto pb-1">{`${startDate.getDate()}/${startDate.getMonth()} - ${endDate.getDate()}/${endDate.getMonth()}`}</p>
          <p className="text-black p-2 m-auto pt-0">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const GanttChart = (tasks) => {
  const data = tasks.tasks;

  const tasksDuration = dayjs(data[data.length - 1].endDate).diff(
    dayjs(data[0].startDate),
    "day"
  );

  let bgLength = tasksDuration * 20;

  let dates = [dayjs(data[0].startDate)];
  for (let i = 1; i < tasksDuration + 1; i++) {
    dates[i] = dayjs([dates[i - 1].add(1, "day")]);
  }

  return (
    <div className="overflow-x-scroll">
      <div className="[&>*:nth-child(odd)]:bg-trackcolorodd [&>*:nth-child(even)]:bg-trackcolor">
        {data.map((task) => (
          <div
            style={{ width: "calc(var(--spacing) * " + (bgLength + 20) + ")" }}
            className="flex flex-row"
            key={task.id}
          >
            <div
              style={{
                width:
                  "calc(var(--spacing) * " +
                  dayjs(task.startDate).diff(dates[0], "day") * 20 +
                  ")",
              }}
            ></div>
            <GanttTask {...task} />
          </div>
        ))}
      </div>
      <div className="bg-amber-300 h-6 w-fit flex">
        {dates.map((date) => (
          <div key={date.format("DD/MM/YYYY")} className="w-20">
            <p className="text-black m-auto text-center">
              {date.format("DD/MM")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
