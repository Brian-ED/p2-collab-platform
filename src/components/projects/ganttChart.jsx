"use client";

import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { Loading } from "@/components/loading";

import { FaPlus, FaX } from "react-icons/fa6";

const GanttTask = ({
  id,
  title,
  description,
  startdate,
  enddate,
  percentComplete, //TODO: Should just be "complete" as we won't have percentages.
}) => {
  const [hover, setHover] = useState(false);
  const [removeTaskHover, setRemoveTaskHover] = useState(false);
  const [removeTaskClicked, setRemoveTaskClicked] = useState(false);
  const taskDuration = dayjs(enddate).diff(dayjs(startdate), "day");

  return (
    <div className="h-12 w-fit flex">
      <div
        className={`rounded-lg bg-taskcolor h-8 m-auto ml-10 flex flex-row justify-start group/task overflow-hidden`}
        style={{ width: "calc(var(--spacing) * " + taskDuration * 20 + ")" }}
        onMouseEnter={async () => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <div
          className="flex"
          onMouseEnter={() => setRemoveTaskHover(true)}
          onMouseLeave={() => setRemoveTaskHover(false)}
          onClick={() => setRemoveTaskClicked(!removeTaskClicked)}
        >
          {hover && <FaX size={20} className="m-auto ml-2 text-red-600" />}
        </div>
        <div
          className={`absolute bg-white mt-7 ml-9 z-60 text-black text-sm whitespace-nowrap transition-all duration-150 border-1 px-1 ${
            removeTaskHover ? "scale-100" : "scale-0"
          }`}
        >
          <span>Remove task...</span>
        </div>
        <p className="ml-2 m-auto overflow-hidden group-hover/task:overflow-visible whitespace-nowrap">
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
      <div
        className={`bg-white h-fit w-fit text-black border-2 p-2 z-80 ${
          removeTaskClicked ? "scale-100" : "scale-0"
        }`}
      >
        <p>Are you sure you want to remove this task?</p>
        <div className="flex flex-row justify-center mt-2">
          <button
            className="mx-2 border-2 px-2 rounded-full hover:bg-gray-500/30"
            onClick={() => setRemoveTaskClicked(false)}
          >
            Yes
          </button>
          <button
            className="mx-2 border-2 px-2 rounded-full hover:bg-gray-500/30"
            onClick={() => setRemoveTaskClicked(false)}
          >
            No
          </button>
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

const AddGanttTask = ({ submitFunction }) => {
  return (
    <div
      className={
        "absolute z-50 w-fit h-fit bg-white top-2 left-12 border-2 border-black text-black flex flex-col text-center p-2 transition-all duration-150"
      }
    >
      <form action={() => submitFunction()} id="addTask">
        <h3 className="text-center font-bold text-lg mb-2">
          Add new Gantt task
        </h3>
        <label className="font-semibold" htmlFor="title">
          Title:
        </label>
        <br />
        <input className="border-1 mb-2 " type="text" name="gantt-title" />
        <br />
        <label className="font-semibold" htmlFor="description">
          Description:
        </label>
        <br />
        <textarea
          className="border-1 mb-2 text-sm resize-none"
          rows="3"
          cols="21"
          name="gantt-description"
        />
        <br />
        <label className="font-semibold" htmlFor="startdate">
          Start date:
        </label>
        <br />
        <input className="mb-2" type="date" name="gantt-startdate" />
        <br />
        <label className="font-semibold" htmlFor="enddate">
          End date:
        </label>
        <br />
        <input className="mb-4" type="date" name="gantt-enddate" />
        <br />
        <input
          className="border-2 px-2 rounded-full hover:bg-gray-500/30"
          type="submit"
          value="Add task"
        />
      </form>
    </div>
  );
};

export const GanttChart = () => {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { pid } = useParams();
  const [addTaskHover, setAddTaskHover] = useState(false);
  const [addTaskClicked, setAddTaskClicked] = useState(false);
  const [addTask, setAddTask] = useState(false);

  useEffect(() => {
    fetch(`/api/db/getGantt?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
      });
  }, [addTask]);

  const addNewGanttTask = () => {
    setIsLoading(true);
    const data = new URLSearchParams(
      new FormData(document.querySelector("#addTask"))
    );
    fetch(`/api/db/addGantt?projectId=${pid}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(() => {
      setAddTask(!addTask);
      setAddTaskClicked(false);
    });
  };

  if (isLoading) return <Loading />;
  if (tasks.error != null) return <p>{tasks.error}</p>;
  if (tasks.data.length === 0) {
    return (
      <>
        <h1 className="text-xl">No tasks...</h1>
        <div className="relative flex flex-row w-fit">
          <h2 className="text-lg m-auto">Add your first task:</h2>
          <div
            className="h-12 w-12 flex"
            onMouseEnter={() => setAddTaskHover(true)}
            onMouseLeave={() => setAddTaskHover(false)}
            onClick={() => setAddTaskClicked(!addTaskClicked)}
          >
            <FaPlus className="text-green-500 m-auto z-20" size={30} />

            <div
              className={`absolute bg-white mt-7 ml-9 z-60 text-black text-sm whitespace-nowrap transition-all duration-150 border-1 px-1 ${
                addTaskHover ? "scale-100" : "scale-0"
              }`}
            >
              <span>Add task...</span>
            </div>
          </div>
        </div>

        <div
          className={`relative transition-all duration-150 w-fit h-fit ${
            addTaskClicked ? "scale-100" : "scale-0"
          }`}
        >
          <AddGanttTask submitFunction={addNewGanttTask} />
        </div>
      </>
    );
  }

  let data = tasks.data;

  data = data.toSorted((a, b) => {
    if (dayjs(a.startdate).diff(dayjs(b.startdate, "day")) === 0) {
      return dayjs(a.enddate).diff(dayjs(b.enddate, "day"));
    }
    return dayjs(a.startdate).diff(dayjs(b.startdate, "day"));
  });

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
          className="w-0.5 bg-currentdatecolor absolute z-10"
          style={{
            height: "calc(var(--spacing) * " + (data.length + 1) * 12 + ")",
            marginLeft:
              "calc(var(--spacing) * " +
              (dayjs(currentDate).diff(dayjs(dates[0]), "day") * 20 + 10) +
              ")",
          }}
        ></div>
      )}

      <div className="[&>*:nth-child(odd)]:bg-trackcolorodd [&>*:nth-child(even)]:bg-trackcolor relative">
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
        <div
          className="h-12 flex flex-row"
          style={{
            width: "calc(var(--spacing) * " + (bgLength + 20) + ")",
          }}
        >
          <div
            className="h-12 w-12 flex"
            onMouseEnter={() => setAddTaskHover(true)}
            onMouseLeave={() => setAddTaskHover(false)}
            onClick={() => setAddTaskClicked(!addTaskClicked)}
          >
            <FaPlus className="text-green-500 m-auto z-20" size={30} />

            <div
              className={`absolute bg-white mt-7 ml-9 z-60 text-black text-sm whitespace-nowrap transition-all duration-150 border-1 px-1 ${
                addTaskHover ? "scale-100" : "scale-0"
              }`}
            >
              <span>Add task...</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-ganttbottom h-6 w-fit flex sticky bottom-0 z-100">
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
      <div
        className={`fixed top-[35%] transition-all duration-150 w-fit h-fit ${
          addTaskClicked ? "scale-100" : "scale-0"
        }`}
      >
        <AddGanttTask submitFunction={addNewGanttTask} />
      </div>
    </div>
  );
};
