"use client";

import {
  FaUsers,
  FaClock,
} from "react-icons/fa6";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

export const OverviewInfo = ({ label, value, sectionAnchor }) => {
  const getIcon = () => {
    const iconClass = "text-white text-xl";

    switch (sectionAnchor) {
      case "team members":
        return <FaUsers className={iconClass} />;
      case "duration":
        return <FaClock className={iconClass} />;
      case "advice":
        return <FaRegArrowAltCircleUp className={iconClass} />;
    }
  };

  return (
    <div className="flex items-center gap-4 p-5 rounded-xl bg-[#2e333a] border border-[#3d454e] shadow-md min-h-[100px]">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3b4048]">
        {getIcon()}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-white font-medium text-base">{value}</span>
      </div>
    </div>
  );
};
