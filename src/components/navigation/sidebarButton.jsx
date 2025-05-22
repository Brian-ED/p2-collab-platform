"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export const SidebarButton = ({ label, icon, section, route }) => {
  const router = useRouter();
  const { setSection } = useAppContext();

  const handleClick = () => {
    setSection(section);
    router.push(route);
  };

  return (
    <button
      className="flex items-center gap-3 text-white hover:bg-gray-100 hover:text-black p-2 w-full rounded-lg px-4 text-left transition-colors duration-200"
      onClick={handleClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
