"use client";

import dayjs from "dayjs";
import { useState, useEffect, useRef } from "react";

const GanttTask = ({
  id,
  title,
  description,
  startDate,
  endDate,
  percentComplete, //TODO: Should just be "complete" as we won't have percentages.
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
          <p className="text-black p-2 m-auto pb-1">{`${dayjs(startDate).format(
            "DD/MM"
          )} - ${dayjs(endDate).format("DD/MM")}`}</p>
          <p className="text-black p-2 m-auto pt-0">{description}</p>
        </div>
      </div>
    </div>
  );
};

const isCurrentDateInChart = (day, dates) => {
  for (let x of dates) {
    if (day.isSame(x, "day")) {
      return true;
    }
  }
  return false;
};

export const GanttChart = (tasks) => {
  let data = tasks.tasks;

  data = data.toSorted((a, b) => {
    if (dayjs(a.startDate).diff(dayjs(b.startDate, "day")) === 0) {
      return a.endDate - a.startDate - (b.endDate - a.startDate);
    }
    return dayjs(a.startDate).diff(dayjs(b.startDate, "day"));
  });

  const lastEndDate = data.toSorted((a, b) =>
    dayjs(b.endDate).diff(dayjs(a.endDate, "day"))
  )[0].endDate;

  const tasksDuration = dayjs(lastEndDate).diff(
    dayjs(data[0].startDate),
    "day"
  );

  let bgLength = tasksDuration * 20;

  if (bgLength < 22 * 20) bgLength = 22 * 20;

  let dates = [dayjs(data[0].startDate)];

  if (tasksDuration + 1 > 22) {
    for (let i = 1; i < tasksDuration + 1; i++) {
      dates[i] = dayjs([dates[i - 1].add(1, "day")]);
    }
  } else {
    for (let i = 1; i < 23; i++) {
      dates[i] = dayjs([dates[i - 1].add(1, "day")]);
    }
  }

  let currentDate = dayjs();
  //currentDate = currentDate.add(1, "month");

  let inChart = isCurrentDateInChart(currentDate, dates);

  return (
    // the height of this div needs to be more dynamic i think, just setting it to '157' is bad
    <div className="overflow-auto relative h-156">
      {inChart && (
        <div
          className="w-0.5 bg-currentdatecolor absolute"
          style={{
            height: "calc(var(--spacing) * " + data.length * 12 + ")",
            marginLeft:
              "calc(var(--spacing) * " +
              (dayjs(currentDate).diff(dayjs(dates[0]), "day") * 20 + 10) +
              ")",
          }}
        ></div>
      )}
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
      {/* this keeps it at the bottom, but only if the parent div has a fixed height */}
      <div className="bg-ganttbottom h-6 w-fit flex sticky bottom-0">
        {dates.map((date) => (
          <div key={date.format("DD/MM/YYYY")} className="w-20">
            <p
              className={`${
                dayjs(currentDate).isSame(date, "day")
                  ? "text-currentdatecolor"
                  : "text-black"
              } m-auto text-center`}
            >
              {date.format("DD/MM")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
