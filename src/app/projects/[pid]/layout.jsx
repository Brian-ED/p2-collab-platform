"use client";

import { LoginButton } from "@/components/loginButton";
import { SidebarButton } from "@/components/navigation/sidebarButton";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

// Icons
import { FaHome } from "react-icons/fa";
import { FaBars, FaX, FaChartGantt, FaGithub } from "react-icons/fa6";
import { RiContractFill } from "react-icons/ri";
import { BsFillKanbanFill } from "react-icons/bs";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";

export default function ProjectsLayout({ children }) {
  const router = useRouter();
  const { setSection, sidebar, setSidebar } = useAppContext();

  return (
    <div className="min-h-screen bg-backdrop">
      {/* Top navbar */}
      <header className="bg-navbar fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebar(!sidebar)}
              className="p-2 rounded-md hover:bg-gray-100 hover:text-black"
            >
              {!sidebar && <FaBars size={25} />}
              {sidebar && <FaX size={25} />}
            </button>
            <h1 className="ml-4 text-xl font-semibold text-white">
              <Link href="/projects">P2 Collab Platform</Link>
            </h1>
          </div>
          {/* Header links in the navbar */}
          <nav></nav>
          <LoginButton />
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar transition-all duration-250 ${
          sidebar ? "w-64" : "w-0"
        }`}
      >
        {sidebar && (
          <nav className="p-4 flex flex-col h-full justify-between">
            <div className="space-y-1">
              <SidebarButton
                label="Overview"
                icon={<FaHome />}
                section="overview"
                route=""
              />
              <SidebarButton
                label="Group contract"
                icon={<RiContractFill />}
                section="group-contract"
                route="#group-contract"
              />
              <SidebarButton
                label="Gantt"
                icon={<FaChartGantt />}
                section="gantt"
                route="#gantt"
              />
              <SidebarButton
                label="Kanban board"
                icon={<BsFillKanbanFill />}
                section="kanban"
                route="#kanban"
              />
              <SidebarButton
                label="GitHub"
                icon={<FaGithub />}
                section="github"
                route="#github"
              />
              <SidebarButton
                label="Messages"
                icon={<BiSolidMessageSquareDetail />}
                section="messaging"
                route="#messaging"
              />
            </div>

            {/* Setting floating at the bottom - casued by the justify between property on the nav element */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <SidebarButton
                label="Settings"
                icon={<IoSettingsSharp />}
                section="settings"
                route="#settings"
              />
            </div>
          </nav>
        )}
      </div>

      {/* Main content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebar ? "ml-64" : "ml-0"
        }`}
      >
        <div className="p-2" style={{ height: "calc(-4rem + 100vh)" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
