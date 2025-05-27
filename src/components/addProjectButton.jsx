"use client";

import { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export const AddProjectButton = () => {
  const [click, setClick] = useState(false);
  const modalRef = useRef(null);

  useOutsideClick(modalRef, () => setClick(false), click);

  return (
    <>
      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex justify-center items-center transition-transform duration-300 ${
          click
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className="relative bg-[#2e333a] border border-gray-600 rounded-xl p-8 w-full max-w-md shadow-lg text-white"
        >
          {/* Close button */}
          <IoMdClose
            className="absolute top-4 right-4 text-white hover:text-gray-400 cursor-pointer text-2xl"
            onClick={() => setClick(false)}
          />

          <h2 className="text-2xl font-bold mb-6 text-center">
            Add New Project
          </h2>

          <form
            id="addProjectForm"
            action="/api/db/addProject"
            method="POST"
            className="flex flex-col gap-4"
          >
            {/* Project name */}
            <label htmlFor="project-name" className="text-white font-medium">
              Project Name
            </label>
            <input
              type="text"
              name="project-name"
              placeholder="Project Name"
              required
              maxLength={50}
              className="px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Project due date */}
            <label htmlFor="due-date" className="text-white font-medium">
              Project Due Date
            </label>
            <input
              id="due-date"
              type="date"
              name="due-date"
              required
              className="px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />

            {/* Submit - triggers the action attribute on the form and calls the api */}
            <input
              type="submit"
              value="Add Project"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md cursor-pointer transition"
            />
          </form>
        </div>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setClick(true)}
        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold cursor-pointer transition"
      >
        Add New Project
      </button>
    </>
  );
};
