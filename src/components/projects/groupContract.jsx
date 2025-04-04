"use client";

import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";

export const GroupContract = () => {
  const [contractRules, setContractRules] = useState([]);
  // The objects inside the contractRules array looks like the following:
  // {
  //      id: 1,
  //      title: "Meetings",
  //      rules: [
  //        { id: 101, description: "Attend on time" },
  //        { id: 102, description: "Notify if you are late" },
  //      ],
  // }

  // State for creating new categories
  const [newCategoryInputs, setNewCategoryInputs] = useState("");

  // State for creating new rules inside categories
  const [newRuleInputs, setNewRuleInputs] = useState({});

  // Handle input changes for a new rule
  const handleCategoryInputChange = (value) => {
    setNewCategoryInputs(value);
  };

  // Add a new category
  const addCategory = () => {
    if (newCategoryInputs === "") {
      return;
    }

    setContractRules((prevRules) => [
      ...prevRules,
      {
        id: Date.now(),
        title: newCategoryInputs,
        rules: [],
      },
    ]);
    setNewCategoryInputs("");
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
  const handleRuleInputChange = (categoryId, value) => {
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
    // Clear the input field after submitting
    setNewRuleInputs((prevInputs) => ({ ...prevInputs, [categoryId]: "" }));
  };

  return (
    <div className="p-4">
      <h2 className="text-5xl font-bold mb-4">Group Contract</h2>
      <div className="flex mb-6">
        <p className="text-lg">
          Welcome to your group contract! This is where you and your team set
          clear expectations and create guidelines for collaboration throughout
          your project. To add a category - like meetings, communication, or any
          other area where your group wants to define rules - simply type it
          into the input field below.
        </p>
      </div>
      <input
        type="text"
        placeholder={`Enter new category`}
        onChange={(e) => handleCategoryInputChange(e.target.value)}
        value={newCategoryInputs}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addCategory();
          }
        }}
        className="border p-2 rounded w-[30%] mr-2"
      />
      <button
        onClick={addCategory}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-2.5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <FaPlus className="text-sm" />
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
                onChange={(e) =>
                  handleRuleInputChange(category.id, e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent the deafult feature, e.g. a new line
                    addRule(category.id);
                  }
                }}
                className="border p-2 rounded w-[25%] mr-2 transition-all h-10 duration-300 focus:h-25 resize-none"
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
