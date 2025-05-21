"use client";

import { useRouter, usePathname } from "next/navigation";

import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

export const Error = ({ error }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(true);

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
      {/* The modal overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-100 transition-opacity duration-300"
        >
          {/* The contenct of the modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-xl p-6 w-[50vw] h-[75vh] shadow-2xl transform transition-transform duration-300 overflow-auto"
          >
            <button
              onClick={() => {
                if (pathname != "/projects") {
                  router.push("/projects");
                } else {
                  window.location.reload();
                }
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold focus:outline-none"
              aria-label="Close modal"
            >
              <IoClose className="text-black w-10 h-10 cursor-pointer" />
            </button>
            <h2 className="text-5xl text-black font-bold mb-4">Error</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{error}</p>
            <button
              onClick={() => {
                if (pathname != "/projects") {
                  router.push("/projects");
                } else {
                  window.location.reload();
                }
              }}
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
