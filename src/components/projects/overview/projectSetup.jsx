"use client";

import { SetupTask } from "@/components/projects/overview/setupTask";

import { useState, useEffect } from "react";

useEffect(() => {
    fetch(`/api/db/handleItemInGroupContract?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setContractRules(data.data);
        setIsLoading(false);
      });
  }, []);

export const ProjectSetup = () => {
    useEffect(() => {
        fetch(`/api/db/handleItemInGroupContract?projectId=${pid}`)
          .then((res) => res.json())
          .then((data) => {
            setContractRules(data.data);
            setIsLoading(false);
          });
      }, []);
  return (
    <div>
      <SetupTask task="Create 3 group contract categories" requiredAmount="3" />
    </div>
  );
};
