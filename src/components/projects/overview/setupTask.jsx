"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export const SetupTask = (props) => {
  const clampedProgress = Math.min(props.progress, props.requiredAmount);
  const isComplete = clampedProgress >= props.requiredAmount;

  const router = useRouter();
  const { setSection } = useAppContext();

  const handleClick = () => {
    setSection(props.sectionAnchor);
    router.push(`#${props.sectionAnchor}`);
  };

  const content = (
    <div
      className={`group flex justify-between items-center border p-4 my-4 rounded-lg transition-all duration-300 ${
        isComplete
          ? "bg-green-100 border-green-400 text-green-800 shadow-md"
          : "bg-transparent border-gray-400 hover:shadow-lg cursor-pointer hover:border-white"
      }`}
      onClick={!isComplete ? handleClick : undefined}
    >
      <div className="flex gap-2 items-center">
        {isComplete && "✅"}
        <p
          className={`text-base transition-colors duration-300 ${
            isComplete
              ? "text-green-800"
              : "text-gray-400 group-hover:text-white"
          }`}
        >
          {props.task}
        </p>
      </div>
      <span
        className={`text-sm font-semibold transition-colors duration-300 ${
          isComplete ? "text-green-800" : "text-gray-400 group-hover:text-white"
        }`}
      >
        {clampedProgress}/{props.requiredAmount}
      </span>
    </div>
  );

  return content;
};
