"use client";

import { useState, useEffect, useParams } from "react";

export const SetupTask = (props) => {
  const { pid } = useParams();

  

  return (
    <>
      <h3 className="text-2xl text-center">Get started with your project!</h3>
      <div className="flex justify-between border p-2 my-4">
        <p>{props.task}</p>
        <span>{props.requiredAmount}</span>
      </div>
    </>
  );
};
