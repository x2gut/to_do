import React, { useEffect, useState } from "react";

import CategorySelect from "../selectors/category/CategorySelect";
import {
  addCategory,
  deleteCategory,
  getActiveCategory,
  setActiveCategory,
} from "../../utils/api/categories";

export const Categories = ({
  task,
  categories,
  setCategories,
  setOriginalTasksData,
}) => {
  const defaultOption = {
    value: "addNewOption",
    label: "Add a new category...",
    color: "#777",
  };

  const [isAdding, setIsAdding] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [idToAdd, setIdToAdd] = useState(null);
  const [categoryInputData, setCategoryInputData] = useState("");

  const removeOption = (data) => {
    setCategories((prevOptions) =>
      prevOptions.filter((option) => option.value !== data.value)
    );

    if (selectedOption.value === data.value) {
      setSelectedOption(defaultOption);
    }
    //API
    deleteCategory(data.label, task.id);
  };

  useEffect(() => {
    const fetchActiveCategoroy = async () => {
      //API
      const activeCategory = await getActiveCategory(task.id);

      if (activeCategory !== undefined) {
        const newOption = {
          value: `${activeCategory.active_category}Value`,
          label: activeCategory.active_category,
        };

        setSelectedOption(newOption);
      } else {
        null;
      }
    };

    fetchActiveCategoroy();
  }, []);

  return (
    <>
      {isAdding && idToAdd === task.id ? (
        <>
          <form
            action="#"
            className="category-add-form"
            onSubmit={(event) => {
              event.preventDefault();
              setCategories([
                {
                  value: `${categoryInputData}`,
                  label: categoryInputData,
                },
                ...categories,
              ]);
              addCategory(categoryInputData);
              setCategoryInputData("");
              setIsAdding(false);
            }}
          >
            <input
              className="category-input"
              type="text"
              placeholder="Add a new category"
              value={categoryInputData}
              onChange={(event) => setCategoryInputData(event.target.value)}
            />
          </form>
        </>
      ) : (
        <CategorySelect
          value={selectedOption}
          loadOptions={categories}
          removeOption={removeOption}
          onChange={(selectedOption) => {
            if (selectedOption.value === "addNewOption") {
              setIsAdding(true);
              setIdToAdd(task.id);
            } else {
              setSelectedOption(selectedOption);
              setOriginalTasksData((prevData) => {
                console.log(prevData.active)
                const updatedActiveTasks = prevData.active.map((t) =>
                  t.id === task.id
                    ? { ...t, active_category: selectedOption.label }
                    : t
                );
                console.log(updatedActiveTasks)
                return { ...prevData, active: updatedActiveTasks };
              });
              //API
              setActiveCategory(task.id, selectedOption.label);
            }
          }}
        />
      )}
    </>
  );
};
