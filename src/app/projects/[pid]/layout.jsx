"use client";

import { LoginButton } from "@/components/loginButton";
import Link from "next/link";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

import { FaBars, FaX } from "react-icons/fa6";

export default function ProjectsLayout({ children }) {
  const [sidebar, setSidebar] = useState(false);
  const { setSection } = useAppContext();

  return (
    <div className="min-h-screen bg-backdrop">
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

          <nav>{/* NAVBAR BUTTONS */}</nav>
          <LoginButton />
        </div>
      </header>

      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar transition-all duration-250 ${
          sidebar ? "w-64" : "w-0"
        }`}
      >
        {sidebar && (
          <nav className="p-4 overflow-hidden">
            <button
              className="cursor-pointer hover:bg-gray-100 hover:text-black p-2 w-full rounded-lg px-4 text-left"
              onClick={() => setSection("overview")}
            >
              Overview
            </button>
            <button
              className="cursor-pointer hover:bg-gray-100 hover:text-black p-2 w-full rounded-lg px-4 text-left"
              onClick={() => setSection("group contract")}
            >
              Group contract
            </button>
            <button
              className="cursor-pointer hover:bg-gray-100 hover:text-black p-2 w-full rounded-lg px-4 text-left"
              onClick={() => setSection("gantt")}
            >
              Gantt
            </button>
            <button
              className="cursor-pointer hover:bg-gray-100 hover:text-black p-2 w-full rounded-lg px-4 text-left"
              onClick={() => setSection("kanban")}
            >
              Kanban board
            </button>
            <button
              className="cursor-pointer hover:bg-gray-100 hover:text-black p-2 w-full rounded-lg px-4 text-left"
              onClick={() => setSection("github")}
            >
              GitHub
            </button>
          </nav>
        )}
      </div>

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
