import React, { useEffect, useState } from "react";

import CategorySelect from "../Selectors/CategorySelect";
import {
  addCategory,
  deleteCategory,
  getActiveCategory,
  getCategories,
  setActiveCategory,
} from "../../utils/api/categories";

export const Categories = ({ task }) => {
  const defaultOption = {
    value: "addNewOption",
    label: "Add a new category...",
    color: "#777",
  };

  const [isAdding, setIsAdding] = useState(false);
  const [loadOptions, setLoadOptions] = useState([defaultOption]);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [idToAdd, setIdToAdd] = useState(null);
  const [categoryInputData, setCategoryInputData] = useState("");

  const removeOption = (data) => {
    setLoadOptions((prevOptions) =>
      prevOptions.filter((option) => option.value !== data.value)
    );

    if (selectedOption.value === data.value) {
      setSelectedOption(defaultOption);
    }
    //API
    deleteCategory(data.label, task.id);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        //API
        const categoriesData = await getCategories();

        const newOptions = categoriesData.map((item) => ({
          value: `${item}Value`,
          label: item,
        }));

        if (Array.isArray(categoriesData)) {
          setLoadOptions((prevData) => [...newOptions, ...prevData]);
        } else {
          console.warn("Expected an array but got:", categoriesData);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const fetchActiveCategoroy = async () => {
      //API
      const activeCategory = await getActiveCategory(task.id);
      console.log(activeCategory);

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

    fetchCategories();
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
              setLoadOptions([
                {
                  value: `${categoryInputData}`,
                  label: categoryInputData,
                },
                ...loadOptions,
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
          loadOptions={loadOptions}
          removeOption={removeOption}
          onChange={(selectedOption) => {
            if (selectedOption.value === "addNewOption") {
              setIsAdding(true);
              setIdToAdd(task.id);
            } else {
              setSelectedOption(selectedOption);
              //API
              setActiveCategory(task.id, selectedOption.label);
            }
          }}
        />
      )}
    </>
  );
};
