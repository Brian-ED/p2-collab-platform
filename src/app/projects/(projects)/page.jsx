"use client";

import { BoxedProject } from "@/components/boxed-project";
import { AddProjectButton } from "@/components/addProjectButton";
import { Loading } from "@/components/loading";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch("/api/db/getProjects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  if (projects.error != null) return <p>{projects.error}</p>;
  if (projects.data.length === 0)
    return (
      <div className="flex flex-row">
        <div className="m-auto mt-20">
          <AddProjectButton />
        </div>
      </div>
    );

  return (
    <div className="flex flex-row">
      <div className="m-auto mt-20 grid grid-cols-5 gap-15">
        <AddProjectButton />
        {projects.data.map((project) => (
          <BoxedProject
            key={project.id}
            title={project.project_name}
            memberNames={project.members}
            onClick={() => redirect("/projects/" + project.id)}
          />
        ))}
      </div>
    </div>
  );
}
