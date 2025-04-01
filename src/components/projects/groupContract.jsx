"use client";

import { FaPlus, FaTrash } from "react-icons/fa";
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
        title: newRuleInputs[categoryId],
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
      <button
        onClick={() => addCategory()}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <input
          type="text"
          placeholder={`Enter new category`}
          value={newRuleInputs[category.id] || ""}
          onChange={(e) => handleInputChange(category.id, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitOnEnter(e, category.id);
            }
          }}
          className="border p-2 rounded w-[30%] mr-2 transition-all h-10 duration-300 focus:h-25 resize-none"
        />
        Add category
      </button>
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
            <div className="mt-2 flex items-start">
              <textarea
                type="text"
                placeholder={`Enter new rule for ${category.title.toLowerCase()}`}
                value={newRuleInputs[category.id] || ""}
                onChange={(e) => handleInputChange(category.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitOnEnter(e, category.id);
                  }
                }}
                className="border p-2 rounded w-[30%] mr-2 transition-all h-10 duration-300 focus:h-25 resize-none"
              />
              <button
                onClick={() => {
                  addRule(category.id);
                }}
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-2.5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 flex-shrink-0]>"
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
