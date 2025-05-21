"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { FaFileContract, FaChartBar, FaCheck } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

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

  const getIcon = () => {
    switch (props.sectionAnchor) {
      case "group-contract":
        return <FaFileContract className="text-xl text-white" />;
      case "gantt":
        return <FaChartBar className="text-xl text-white" />;
      case "github":
        return <FaGithub className="text-xl text-white" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`p-6 rounded-xl transition-all duration-300 group cursor-pointer border shadow-md
        ${isComplete ? "bg-green-900/20 border-green-500" : "bg-[#1f1f24] border-[#333741] hover:border-white hover:shadow-lg"}
      `}
      onClick={handleClick}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Top Section (icon + text) */}
        <div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-3
              ${isComplete ? "bg-green-500" : "bg-[#2d2f38]"}
            `}
          >
            {isComplete ? (
              <FaCheck className="text-white text-sm" />
            ) : (
              getIcon()
            )}
          </div>

          <h4
            className={`text-md font-semibold mb-1 ${
              isComplete ? "text-green-300" : "text-white"
            }`}
          >
            {props.task}
          </h4>

          <p className="text-sm text-gray-400 mb-2">
            {isComplete ? "Completed" : "Click to complete this task"}
          </p>
        </div>

        {/* Bottom-aligned Progress */}
        <p
          className={`text-sm font-semibold text-right mt-4 ${
            isComplete ? "text-green-300" : "text-gray-500 group-hover:text-white"
          }`}
        >
          {clampedProgress}/{props.requiredAmount}
        </p>
      </div>
    </div>
  );
};
