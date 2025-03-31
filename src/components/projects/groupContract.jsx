"use client";

import { useState } from "react";

export const GroupContract = () => {
  const [contractRules, setContractRules] = useState([
    {
      id: 1,
      title: "Meetings",
      rules: [
        { id: Date.now(), description: "Attend on time" },
        { id: Date.now() + 1, description: "Notify if you are late" },
      ],
    },
    {
      id: 2,
      title: "Communication",
      rules: [
        {
          id: Date.now(),
          description: "We use Discord and Messenger to communicate",
        },
        {
          id: Date.now() + 1,
          description: "Always notify the members if you can't come to school!",
        },
      ],
    },
  ]);

  const [newRuleInputs, setNewRuleInputs] = useState({});

  // Add a new rule category
  const addCategory = () => {
    setContractRules((prevRules) => [
      ...prevRules,
      {
        id: Date.now(),
        title: "",
        rules: [],
      },
    ]);
  };

  // Update the category title
  const updateCategoryTitle = (id, newTitle) => {
    setContractRules((prevRules) =>
      prevRules.map((category) =>
        category.id === id ? { ...category, title: newTitle } : category
      )
    );
  };

  // Handle input changes for a new rule
  const handleInputChange = (categoryId, value) => {
    setNewRuleInputs((prevInputs) => ({ ...prevInputs, [categoryId]: value }));
  };

  // Add a rule to a category
  const addRule = (categoryId) => {
    // Prevent users from adding an empty rule
    if (!newRuleInputs[categoryId] || newRuleInputs[categoryId.trim === ""]) {
      return;
    }

    setContractRules((prevRules) =>
      prevRules.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              rules: [
                ...category.rules,
                { id: Date.now(), description: newRuleInputs[categoryId] },
              ],
            }
          : category
      )
    );
    // Clear the input field after adding a rule
    setNewRuleInputs((prevInputs) => ({ ...prevInputs, [categoryId]: "" }));
  };

  // Allow user to submit rule when hitting "enter"
  const submitOnEnter = (e, categoryId) => {
      e.preventDefault(); // Prevent the deafult feature, e.g. a new line
      addRule(categoryId);
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4">Group Contract</h2>
      {contractRules.map((category) => (
        <div key={category.id} className="">
          <div className="py-4">
            <h3 className="text-xl font-bold my-2">{category.title}</h3>
            <ul>
              {category.rules.map((rule) => (
                <li key={rule.id} className="py-3 flex content-center border-b">
                  {rule.description}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex">
              <input
                type="text"
                placeholder={`Enter new rule for ${category.title.toLowerCase()}`}
                value={newRuleInputs[category.id] || ""}
                onChange={(e) => handleInputChange(category.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitOnEnter(e, category.id);
                  }
                }}
                className="border p-2 rounded w-full"
              />
              <button onClick={() => addRule(category.id)}>Add Rule</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
