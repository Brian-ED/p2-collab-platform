"use client";

import { useState } from "react";

const NavButtons = [
    {
        name: "Overview",
        link: "overview",
        logo: "overview.svg",
    },
    {
        name: "Gantt",
        link: "gantt",
        logo: "gantt.svg",
    },
    {
        name: "Trello",
        link: "trello",
        logo: "trello.svg",
    },
    {
        name: "Calendar",
        link: "calendar",
        logo: "calendar.svg",
    },
];

const Button = ({ name, link, logo, section }) => {
    return (
        <div>
            <button
                className="border-[#222831] text-black border-2 px-2 h-full bg-white hover:bg-white/40 mr-1"
                onClick={() => section(link)}
            >
                {name}
            </button>
        </div>
    );
};

export const ProjectsNavbar = ({ section, setSection }) => {
    return (
        <nav>
            <div className="bg-[#00ADB5] w-screen h-12 flex flex-row">
                {NavButtons.map((button) => (
                    <Button
                        key={button.name}
                        {...button}
                        section={setSection}
                    />
                ))}
            </div>
        </nav>
    );
};
