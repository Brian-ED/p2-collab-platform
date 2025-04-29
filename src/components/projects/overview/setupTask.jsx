"use client";

import { useState, useEffect, useParams } from "react";

export const SetupTask = (props) => {
    const [finishedTasks, setFinishedTasks] = useState(0);

  return (
    <>
      <div className="flex justify-between border p-2 my-4">
        <p>{props.task}</p>
        <span>{props.progress}/{props.requiredAmount}</span>
      </div>
    </>
  );
};
