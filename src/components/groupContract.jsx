"use client";

import { useState } from "react";

const GroupContract = () => {
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

  // Add a rule to a category
  const addRule = (categoryId) => {
    setContractRules((prevRules) =>
      prevRules.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              rules: [...category.rules, { id: Date.now(), description: "New rule added here" }],
            }
          : category
      )
    );
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
          </div>
          <button onClick={() => addRule(category.id)}>Add Rule</button>
        </div>
      ))}
    </div>
  );
};

export default GroupContract;
