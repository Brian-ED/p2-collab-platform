"use client";

import { useState } from "react";

const GroupContract = () => {
  const [contractRules, setContractRules] = useState([
    {
      id: 1,
      title: "Meetings",
      rules: [
        { id: Date.now(), description: "Attend on time" },
        { id: Date.now(), description: "Notify if you are late" },
      ],
    },
  ]);

  // Add a new rule category
  const addCategory = () => {
    setContractRules(...contractRules, {
      id: Date.now(),
      title: "",
      rules: [],
    });
  };

  // Update the category title
  const updateCategoryTitle = (id, newTitle) => {
    setContractRules(
      rules.map((category) => {
        category.id === id ? { ...category, title: newTitle } : category;
      })
    );
  };

  // Add a rule to a category
  const addRule = (categoryId) => {
    setContractRules((category) => {
      category.id === categoryId
        ? { ...category, rules: { id: Date.now(), description: "" } }
        : category;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Group Contract</h2>
      {contractRules.map((category) => (
        <div key={category.id}>
          <h3>{category.title}</h3>
          <div>
            {category.rules.map((rule) => (
                <ul>
                    <li key = {rule.id}>{rule.description}</li>
                </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupContract;
