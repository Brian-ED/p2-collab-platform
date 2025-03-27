"use client";

import { useState } from "react";

const GroupContract = () => {
  const [contractRules, setContractRules] = useState([
    {
      id: 1,
      title: "Meetings",
      rules: ["Attend on time", "Notify if you are late"],
    },
  ]);

  // Add a new rule category
  const addCategory = () => {
    setRules(...rules, { id: Date.now(), title: "", rules: [] });
  };

  // Update the category title
  const updateCategoryTitle = (id, newTitle) => {
    setRules(
      rules.map((category) => {
        category.id === id ? { ...category, title: newTitle } : category;
      })
    );
  };

  // Add a rule to a category
  const addRule = (id) => {
    setContractRules((category) => {
      category.id === category
        ? { ...category, contractRules: [...category.rules, ""] }
        : category;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Group Contract</h2>
    </div>
  );
};

export default GroupContract;
