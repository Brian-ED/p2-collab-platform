"use client";

import { FaPlus, FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan, FaArrowRightLong } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useOutsideClick } from "@/hooks/useOutsideClick"; // Custom hook
import { Loading } from "@/components/loading";
import { InfoModalButton } from "@/components/projects/infoModalButton";
import { groupContract } from "@/lib/test.json";

export const GroupContract = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { pid } = useParams();

  const [contractRules, setContractRules] = useState([]);
  // The objects inside the contractRules array looks like the following:
  // {
  //      id: 1,
  //      category_title: "Meetings",
  //      group_contract_rules: [
  //        {id: 1, rule_description: "notify members if you are late"},
  //        {id: 2, rule_description: "we use discord for communication"},
  //      ],
  // }

  useEffect(() => {
    fetch(`/api/db/handleItemInGroupContract?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setContractRules(data.data);
        setIsLoading(false);
      });
  }, []);

  // State for creating new categories
  const [newCategoryInputs, setNewCategoryInputs] = useState("");

  // State for creating new rules inside categories
  const [newRuleInputs, setNewRuleInputs] = useState({});

  // State for selecting a category to edit
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // State for the title to edit in a category
  const [editedCategoryTitle, setEditedCategoryTitle] = useState("");

  // State for selecting a rule to edit
  const [editingRuleId, setEditingRuleId] = useState(null);

  // State for the text to edit in a rule
  const [editedRuleText, setEditedRuleText] = useState("");

  // Handle input changes for a new rule
  const handleCategoryInputChange = (value) => {
    setNewCategoryInputs(value);
  };

  // Add a new category
  const addCategory = async () => {
    if (newCategoryInputs === "") {
      return;
    }

    try {
      const res = await fetch(
        `/api/db/handleItemInGroupContract?projectId=${pid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_title: newCategoryInputs,
            projectId: pid,
          }),
        }
      );

      const { data } = await res.json();

      const newCategory = {
        id: data.id,
        category_title: data.category_title,
        group_contract_rules: [],
      };

      setContractRules((prevRules) => [...prevRules, newCategory]);
      setNewCategoryInputs("");
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  // Update the category title
  const saveEditedCategory = async (categoryId) => {
    // Make sure the edited category title is not empty
    const trimmedTitle = editedCategoryTitle.trim();

    if (trimmedTitle === "") {
      cancelEdit();
      return;
    }

    try {
      const res = await fetch(
        `/api/db/handleItemInGroupContract?projectId=${pid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryId: categoryId,
            category_title: editedCategoryTitle,
          }),
        }
      );

      const { data, error } = await res.json();
      if (error) {
        console.error("Failed to update category title:", error);
        return;
      }

      setContractRules((prevRules) =>
        prevRules.map((category) =>
          category.id === categoryId
            ? { ...category, category_title: data.category_title }
            : category
        )
      );

      cancelEdit();
    } catch (error) {
      console.error("Error updating category title:", error);
    }
  };

  // Handle input changes for a new rule
  const handleRuleInputChange = (categoryId, value) => {
    setNewRuleInputs((prevInputs) => ({ ...prevInputs, [categoryId]: value }));
  };

  // Add a rule to a category
  const addRule = async (categoryId) => {
    // Prevent users from adding an empty rule
    if (!newRuleInputs[categoryId] || newRuleInputs[categoryId.trim === ""]) {
      return;
    }

    const ruleText = newRuleInputs[categoryId];
    if (!ruleText || ruleText.trim() === "") return;

    try {
      const res = await fetch(
        `/api/db/handleItemInGroupContract?projectId=${pid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            group_contract_id: categoryId,
            rule_description: ruleText,
          }),
        }
      );

      const response = await res.json();
      const newRule = response.data;

      setContractRules((prevRules) =>
        prevRules.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                group_contract_rules: [
                  ...category.group_contract_rules,
                  newRule,
                ],
              }
            : category
        )
      );
      // Clear the input field after submitting
      setNewRuleInputs((prevInputs) => ({ ...prevInputs, [categoryId]: "" }));
    } catch (error) {
      console.error("Failed to add rule:", error);
    }
  };

  // Edit either the category title or a rule
  const handleEdit = (item) => {
    if ("rule_description" in item) {
      // It's a rule
      setEditingRuleId(item.id);
      setEditedRuleText(item.rule_description);
    } else if ("category_title" in item) {
      // It's a category
      setEditingCategoryId(item.id);
      setEditedCategoryTitle(item.category_title.trim());
    }
  };

  const cancelEdit = () => {
    setEditingRuleId(null);
    setEditedRuleText("");
    setEditingCategoryId(null);
    setEditedCategoryTitle("");
  };

  const savedEditedRule = async (categoryId, ruleId) => {
    try {
      const res = await fetch(
        `/api/db/handleItemInGroupContract?projectId=${pid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ruleId: ruleId,
            rule_description: editedRuleText,
          }),
        }
      );

      const { data, error } = await res.json();

      if (error) {
        console.error("Failed to update rule:", error);
        return;
      }

      // Update the local state with the new rule description
      setContractRules((prevRules) =>
        prevRules.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                group_contract_rules: category.group_contract_rules.map(
                  (rule) =>
                    rule.id === ruleId
                      ? { ...rule, rule_description: data.rule_description }
                      : rule
                ),
              }
            : category
        )
      );
      cancelEdit();
    } catch (error) {
      console.log("Error saving edited rule", error);
    }
  };

  // Leave edit mode when mouse clicks outside the textfield
  const textareaRef = useRef(null);
  useOutsideClick(
    textareaRef,
    () => {
      if (editingRuleId !== null) {
        const category = contractRules.find((category) =>
          category.group_contract_rules.some(
            (rule) => rule.id === editingRuleId
          )
        );
        if (!category) return;

        const rule = category.group_contract_rules.find(
          (rule) => rule.id === editingRuleId
        );
        if (!rule) return;

        const trimmedNewText = editedRuleText.trim();
        const trimmedOldText = rule.rule_description.trim();

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

  const deleteCategory = async (categoryId) => {
    try {
      const res = await fetch(
        `/api/db/handleItemInGroupContract?projectId=${pid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryId: categoryId,
          }),
        }
      );

      const { error } = await res.json();

      if (error) {
        console.error("Failed to delete category: ", error);
        return;
      }

      // Remove category in the UI
      setContractRules((prevRules) =>
        prevRules.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const deleteRule = async (categoryId, ruleId) => {
    try {
      const res = await fetch(
        `/api/db/handleItemInGroupContract?projectId=${pid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ruleId: ruleId,
          }),
        }
      );

      const { error } = await res.json();
      console.log(error);

      if (error) {
        console.error("Failed to delete rule:", error);
        return;
      }

      setContractRules((prevRules) =>
        prevRules.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                group_contract_rules: category.group_contract_rules.filter(
                  (rule) => rule.id != ruleId
                ),
              }
            : category
        )
      );
    } catch (error) {
      console.log("Error deleting rule", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-10">
        <InfoModalButton
          heading={groupContract.heading}
          description={groupContract.description}
        />
        <h2 className="text-5xl font-bold">Group Contract</h2>
      </div>
      <div className="flex items-center border-2 border-white rounded-full overflow-hidden w-full max-w-md mt-10">
        <input
          type="text"
          placeholder={`Enter category`}
          onChange={(e) => handleCategoryInputChange(e.target.value)}
          value={newCategoryInputs}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addCategory();
            }
          }}
          className="flex-grow p-3 focus:outline-none"
        />
        <button
          onClick={addCategory}
          className="flex justify-center bg-blue-700 text-white w-20 p-4 rounded-full hover:bg-blue-800 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
      {contractRules.map((category, index) => (
        <div key={index} className="mt-5">
          <div className="py-4">
            <div className="flex">
              {editingCategoryId === category.id ? (
                <input
                  type="text"
                  value={editedCategoryTitle}
                  onChange={(e) => setEditedCategoryTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEditedCategory(category.id);
                    } else if (e.key === "Escape") {
                      cancelEdit();
                    }
                  }}
                  onBlur={() => saveEditedCategory(category.id)}
                  onFocus={(e) => {
                    const value = e.target.value;
                    e.target.setSelectionRange(value.length, value.length);
                  }}
                  className="border p-1 rounded font-bold text-xl"
                  autoFocus
                />
              ) : (
                <h3 className="text-xl font-bold my-2">
                  {category.category_title}
                </h3>
              )}
              <div className="flex gap-2 items-center pl-2">
                <div className="relative group">
                  <button
                    onClick={() => handleEdit(category)}
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
                    onClick={() => deleteCategory(category.id)}
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

            <ul>
              {category.group_contract_rules.map((rule) => (
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
                      <span>{rule.rule_description}</span>
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
                placeholder={`Set a rule for ${category.category_title.toLowerCase()}`}
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
                // Hide the scrollbar on Windows
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
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
