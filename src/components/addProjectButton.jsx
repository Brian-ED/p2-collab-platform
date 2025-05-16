"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const AddProjectButton = ({ setProjects }) => {
  const [click, setClick] = useState(false);

  const ellipses = "whitespace-nowrap overflow-hidden overflow-ellipsis";

  const sendProject = () => {
    const data = new URLSearchParams(
      new FormData(document.querySelector("#addProjectForm"))
    );

    fetch(`/api/db/addProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error !== null) setProjects({ error: data.error });
      });
  };

  return (
    <>
      <div
        className={`absolute z-20 bg-white mt-52 rounded-sm max-w-100 max-h-50 overflow-y-hidden h-full w-full ${
          click ? "scale-100" : "scale-0"
        }`}
      >
        <IoMdClose
          className="fill-black size-8 absolute hover:cursor-pointer right-1 top-1"
          onClick={() => setClick(false)}
        />
        <form
          id="addProjectForm"
          action={() => {
            sendProject();
          }}
          className="flex flex-col gap-5 items-center"
        >
          <input
            type="text"
            name="project-name"
            placeholder="Project name"
            defaultValue=""
            maxLength={50}
            className="w-[calc(100%-var(--spacing)*20)] text-center mt-15 text-black"
          />
          <input
            type="submit"
            value="Add Project"
            className="bg-blue-600 hover:bg-blue-500 hover:cursor-pointer text-white w-25 h-8 rounded-sm"
          />
        </form>
      </div>
      <button
        onClick={() => setClick(!click)}
        className="py-5 rounded-md bg-blue-600 hover:bg-blue-500 hover:cursor-pointer size-50"
      >
        <div className={`${ellipses} leading-10`}>Add new project</div>
      </button>
    </>
  );
};
