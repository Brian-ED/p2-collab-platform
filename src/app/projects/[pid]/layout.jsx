"use client";

import { useState } from "react";

export default function ProjectsLayout({ children }) {
    const [sidebar, setSidebar] = useState(false);
    const [section, setSection] = useState("overview");

    return (
        <div className="min-h-screen bg-gray-600">
            <header className="bg-slate-800 fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center justify-between px-4 h-16">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebar(!sidebar)}
                            className="p-2 rounded-md hover:bg-gray-100"
                        >
                            X
                        </button>
                        <h1 className="ml-4 text-xl font-semibold text-white">
                            P2 Collab Platform
                        </h1>
                    </div>

                    <nav>{/* NAVBAR BUTTONS */}</nav>
                </div>
            </header>

            <div
                className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-700 transition-all duration-300 ${
                    sidebar ? "w-64" : "w-0"
                }`}
            >
                <nav className="p-4 overflow-hidden">
                    <button
                        className="cursor-pointer hover:bg-gray-100 hover:text-black p-2 w-full rounded-lg px-4 text-left"
                        onClick={() => setSection("overview")}
                    >
                        Overview
                    </button>
                    <button
                        className="cursor-pointer hover:bg-gray-100 hover:text-black p-2 w-full rounded-lg px-4 text-left"
                        onClick={() => setSection("calendar")}
                    >
                        Calender
                    </button>
                    <button
                        className="cursor-pointer hover:bg-gray-100 hover:text-black p-2 w-full rounded-lg px-4 text-left"
                        onClick={() => setSection("gantt")}
                    >
                        Gantt
                    </button>
                    <button
                        className="cursor-pointer hover:bg-gray-100 hover:text-black p-2 w-full rounded-lg px-4 text-left"
                        onClick={() => setSection("trello")}
                    >
                        Trello
                    </button>
                    <button
                        className="cursor-pointer hover:bg-gray-100 hover:text-black p-2 w-full rounded-lg px-4 text-left"
                        onClick={() => setSection("github")}
                    >
                        GitHub
                    </button>
                </nav>
            </div>

            <main
                className={`pt-16 transition-all duration-300 ${
                    sidebar ? "ml-64" : "ml-0"
                }`}
            >
                <div className="p-2">{children}</div>
            </main>
        </div>
    );
}
