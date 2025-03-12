"use client";

import { useState } from "react";

export const Title = () => {
  const [title, setTitle] = useState(0);

  function handleClick() {
    setTitle(title + 1);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Her er en tæller: {title}
      </button>
    </div>
  );
};
