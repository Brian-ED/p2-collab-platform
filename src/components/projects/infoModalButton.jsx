"use client";

import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

export const InfoModalButton = ({ heading, description }) => {
  const [open, setOpen] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* The floating info button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-20 z-10 cursor-pointer right-6 rounded-full bg-blue-600 text-white p-3 shadow-lg hover:bg-blue-700 transition-all"
        aria-label="Feature information"
      >
        <BsFillInfoCircleFill className="w-5 h-5" />
      </button>

      {/* The modal overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
        >
          {/* The contenct of the modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-xl p-6 w-[50vw] h-[75vh] shadow-2xl transform transition-transform duration-300 overflow-auto"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold focus:outline-none"
              aria-label="Close modal"
            >
              <IoClose className="text-black w-10 h-10 cursor-pointer" />
            </button>
            <h2 className="text-5xl text-black font-bold mb-4">{heading}</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 text-sm text-blue-600 cursor-pointer hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
