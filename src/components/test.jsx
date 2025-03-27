"use client";

import { useState } from "react";

export const Test = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button className="text-4xl" onClick={() => setCount(count + 1)}>
        {count}
      </button>
    </div>
  );
};
