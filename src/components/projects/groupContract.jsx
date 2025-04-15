"use client";

import { FaPlus, FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState, useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick"; // Custom hook

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

  // State for selecting a rule to edit
  const [editingRuleId, setEditingRuleId] = useState(null);

  // State for the text to edit in a rule
  const [editedRuleText, setEditedRuleText] = useState("");

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

  // Edit a rule
  const handleEdit = (rule) => {
    setEditingRuleId(rule.id);
    setEditedRuleText(rule.description);
  };

  const cancelEdit = () => {
    setEditingRuleId(null);
    setEditedRuleText("");
  };

  const savedEditedRule = (categoryId, ruleId) => {
    setContractRules((prevRules) =>
      prevRules.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              rules: category.rules.map((rule) =>
                rule.id === ruleId
                  ? { ...rule, description: editedRuleText }
                  : rule
              ),
            }
          : category
      )
    );
    cancelEdit();
  };

  // Leave edit mode when mouse clicks outside the textfield
  const textareaRef = useRef(null);
  useOutsideClick(
    textareaRef,
    () => {
      if (editingRuleId !== null) {
        const category = contractRules.find((category) =>
          category.rules.some((rule) => rule.id === editingRuleId)
        );
        if (!category) return;

        const rule = category.rules.find((rule) => rule.id === editingRuleId);
        if (!rule) return;

        const trimmedNewText = editedRuleText.trim();
        const trimmedOldText = rule.description.trim();

        // Only save if the text is actually changed, otherwise just cancel edit
        if (trimmedNewText !== trimmedOldText && trimmedNewText !== "") {
          savedEditedRule(category.id, editingRuleId);
        } else {
          cancelEdit(); // Nothing happend, just cancel edit
        }
      }
    },
    editingRuleId !== null
  );

  const deleteCategory = (categoryId) => {
    setContractRules((prevRules) =>
      prevRules.filter((category) => category.id != categoryId)
    );
  };

  const deleteRule = (categoryId, ruleId) => {
    setContractRules((prevRules) =>
      prevRules.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              rules: category.rules.filter((rule) => rule.id != ruleId),
            }
          : category
      )
    );
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
            <button
              onClick={() => deleteCategory(category.id)}
              className="text-red-600 hover:text-red-800"
              aria-label="Delete Category"
            >
              <FaRegTrashCan />
            </button>
            <ul>
              {category.rules.map((rule) => (
                <li
                  key={rule.id}
                  className="py-3 content-center border-b border-gray-400"
                >
                  <div className="flex items-center justify-between">
                    {editingRuleId === rule.id ? (
                      <textarea
                        ref={textareaRef}
                        value={editedRuleText}
                        onChange={(e) => setEditedRuleText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            savedEditedRule(category.id, rule.id);
                          } else if (e.key === "Escape") {
                            cancelEdit();
                          }
                        }}
                        onFocus={(e) => {
                          const value = e.target.value;
                          e.target.setSelectionRange(
                            value.length,
                            value.length
                          );
                        }}
                        autoFocus
                        className="border p-2 rounded w-full resize-none"
                      />
                    ) : (
                      <span>{rule.description}</span>
                    )}
                    <div className="flex gap-2">
                      <div className="relative group">
                        <button
                          onClick={() => handleEdit(rule)}
                          className="text-white hover:text-white/75 flex items-center"
                          aria-label="Edit"
                        >
                          <FaRegEdit />
                        </button>

                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden w-max rounded bg-gray-800 px-2 py-1 group-hover:block">
                          Edit
                          <div className="absolute left-1/2 top-full -translate-x-1/2 w-3 h-2 bg-gray-800 rotate-180 [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]"></div>
                        </div>
                      </div>

                      <div className="relative group">
                        <button
                          onClick={() => deleteRule(category.id, rule.id)}
                          className="white hover:text-white/75 flex items-center"
                          aria-label="Delete"
                        >
                          <FaRegTrashCan />
                        </button>

                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden w-max rounded bg-gray-800 px-2 py-1 text-sm group-hover:block">
                          Delete
                          <div className="absolute left-1/2 top-full -translate-x-1/2 w-3 h-2 bg-gray-800 rotate-180 [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
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
