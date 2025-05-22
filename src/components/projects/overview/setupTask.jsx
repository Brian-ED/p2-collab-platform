"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { FaGithub, FaChartGantt  } from "react-icons/fa6";
import { RiContractFill } from "react-icons/ri";


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
    const baseClass = "text-xl";
    const colorClass = isComplete ? "text-green-400" : "text-white";

    switch (props.sectionAnchor) {
      case "group-contract":
        return <RiContractFill className={`${baseClass} ${colorClass}`} />;
      case "gantt":
        return <FaChartGantt className={`${baseClass} ${colorClass}`} />;
      case "github":
        return <FaGithub className={`${baseClass} ${colorClass}`} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`p-6 min-h-[180px] flex flex-col justify-between rounded-xl border shadow-md transition-colors ease-in-out duration-300 group cursor-pointer
        ${isComplete
          ? "bg-green-900/20 border-green-500 cursor-default"
          : "bg-[#2e333a] border-[#3d454e] hover:border-white hover:shadow-md"}
      `}
      onClick={handleClick}
    >
      <div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors
            ${isComplete ? "bg-green-900/30" : "bg-[#3b4048]"}
          `}
        >
          {getIcon()}
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

      <p
        className={`text-sm font-semibold text-right ${
          isComplete ? "text-green-300" : "text-gray-500 group-hover:text-white"
        }`}
      >
        {clampedProgress}/{props.requiredAmount}
      </p>
    </div>
  );
};
