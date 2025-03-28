"use client";

import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const GanttTask = ({
  id,
  title,
  description,
  startdate,
  enddate,
  percentComplete, //TODO: Should just be "complete" as we won't have percentages.
}) => {
  const [hover, setHover] = useState(false);
  const taskDuration = dayjs(enddate).diff(dayjs(startdate), "day");

  return (
    <div className="h-12 w-fit flex">
      <div
        className={`rounded-lg bg-taskcolor h-8 m-auto ml-10 flex group/task`}
        style={{ width: "calc(var(--spacing) * " + taskDuration * 20 + ")" }}
        onMouseEnter={async () => {
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
          className={`absolute z-20 bg-white mt-10 ml-5 rounded-sm max-w-100 max-h-50 overflow-y-hidden ${
            hover ? "scale-100" : "scale-0"
          }`}
        >
          <p className="text-black p-2 m-auto pb-1">{`${dayjs(startdate).format(
            "DD/MM"
          )} - ${dayjs(enddate).format("DD/MM")}`}</p>
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

export const GanttChart = () => {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { pid } = useParams();

  useEffect(() => {
    fetch(`/api/db/getGantt?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data < 0 || data.error) setTasks(data);
        setIsLoading(false);
      });
  }, []);

  console.log(tasks);

  if (isLoading) return <p>Loading...</p>;
  if (tasks === null || tasks.length < 0) return <p>No tasks</p>;
  if (tasks.error && tasks.error === "Not authorized")
    return <p>Not authorized</p>;

  let data = tasks;

  console.log(data);

  data = data.toSorted((a, b) => {
    if (dayjs(a.startdate).diff(dayjs(b.startdate, "day")) === 0) {
      return dayjs(a.enddate).diff(dayjs(b.enddate, "day"));
    }
    return dayjs(a.startdate).diff(dayjs(b.startdate, "day"));
  });

  console.log(data);

  const lastEndDate = data.toSorted((a, b) =>
    dayjs(b.enddate).diff(dayjs(a.enddate, "day"))
  )[0].enddate;

  const tasksDuration = dayjs(lastEndDate).diff(
    dayjs(data[0].startdate),
    "day"
  );

  let bgLength = tasksDuration * 20;

  if (bgLength < 22 * 20) bgLength = 22 * 20;

  let dates = [dayjs(data[0].startdate)];

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
    <div
      className="overflow-auto relative"
      style={{ height: "calc(100vh - 5rem)" }}
    >
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
            style={{
              width: "calc(var(--spacing) * " + (bgLength + 20) + ")",
            }}
            className="flex flex-row"
            key={task.id}
          >
            <div
              style={{
                width:
                  "calc(var(--spacing) * " +
                  dayjs(task.startdate).diff(dates[0], "day") * 20 +
                  ")",
              }}
            ></div>
            <GanttTask {...task} />
          </div>
        ))}
      </div>
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
