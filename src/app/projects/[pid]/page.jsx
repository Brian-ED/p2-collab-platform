"use client";

import { ProjectsNavbar } from "@/app/components/nav/projectsnavbar";
import { useState } from "react";
import { GanttChart } from "@/app/components/ganttChart";
import { useState } from "react";

export default function Projects() {
    const [section, setSection] = useState("overview");
    return (
        <main>
            <ProjectsNavbar section={section} setSection={setSection} />
            {section === "overview" && <h1>overview</h1>}
            {section === "gantt" && <h1>gantt</h1>}
            {section === "trello" && <h1>trello</h1>}
            {section === "calendar" && <h1>calendar</h1>}
        </main>
    );
}
