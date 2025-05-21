"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export const SetupTask = (props) => {
  const clampedProgress = Math.min(props.progress, props.requiredAmount);
  const isComplete = clampedProgress >= props.requiredAmount;

  const router = useRouter();
  const { setSection } = useAppContext();

  const handleClick = () => {
    if (!isComplete) {
      setSection(props.sectionAnchor);
      router.push(`#${props.sectionAnchor}`);
    }
  };

  return (
    <div
      className={`p-6 rounded-xl border shadow-md transition-all duration-300 group cursor-pointer 
        ${isComplete ? "bg-green-900/20 border-green-500" : "bg-[#2a2e36] border-[#3c3f46] hover:border-white hover:shadow-xl"}
      `}
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        {/* Custom square checkbox */}
        <div
          className={`w-5 h-5 mt-1 flex items-center justify-center border-2 rounded-sm text-xs font-bold
            ${isComplete ? "bg-green-500 border-green-500 text-white" : "border-gray-500"}
          `}
        >
          {isComplete && "✓"}
        </div>

        <div className="flex-1">
          <p className={`text-sm font-medium mb-2 group-hover:text-white ${isComplete ? "text-green-300" : "text-gray-300"}`}>
            {props.task}
          </p>
          <p className={`text-sm font-semibold text-right ${isComplete ? "text-green-300" : "text-gray-500 group-hover:text-white"}`}>
            {clampedProgress}/{props.requiredAmount}
          </p>
        </div>
      </div>
    </div>
  );
};
