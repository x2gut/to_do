import React, { useEffect, useState } from "react";

import CompletedTasks from "../completedTasks/CompletedTasks";
import Tabs from "../../tabs/Tabs";

import Validator from "../../../utils/validation/validation.js";
import ActiveTasks from "../activeTasks/ActiveTasks.jsx";

import "./tasksMain.css";
import { addTask, getTasks } from "../../../utils/api/tasks.js";
import { validateToken } from "../../../utils/api/validateToken.js";
import {
  filterActiveTasks,
  filterCompletedTasks,
} from "../../../utils/tasksFilter/tasksFilter.js";
import { Sidebar } from "../../sidebar/Sidebar.jsx";
import { getCategories } from "../../../utils/api/categories.js";

function TasksMain() {
  let validator = new Validator();

  const defaultOption = {
    value: "addNewOption",
    label: "Add a new category...",
    color: "#777",
  };

  const token = localStorage.getItem("access_token");

  const [inputData, setInputData] = useState("");
  const [activeButton, setActiveButton] = useState("active");
  const [borderColor, setBorderColor] = useState("");
  const [tasksData, setTasksData] = useState({
    active: [],
    completed: [],
  });
  const [filteredTasksData, setFilteredTasksData] = useState({
    active: [],
    completed: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadOptions, setLoadOptions] = useState([defaultOption]);

  const handleChange = (event) => {
    setInputData(event.target.value);
  };

  const handleFilter = (categoryValue) => {
    if (categoryValue === "all") {
      setFilteredTasksData({ ...tasksData });
    } else {
      const filteredActiveTasks = tasksData.active.filter(
        (task) => task.active_category === categoryValue
      );

      setFilteredTasksData({
        ...filteredTasksData,
        active: filteredActiveTasks,
      });
    }
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    if (validator.minLength(inputData, 4)) {
      const isTokenValid = await validateToken(token);
      if (isTokenValid) {
        await addTask(inputData);
        setInputData("");
        await fetchTasks();
      } else {
        console.error("Invalid token. Cannot add task.");
      }
    } else {
      setBorderColor("red");
    }
  };

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

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      const completedTasks = filterCompletedTasks(data);
      const activeTasks = filterActiveTasks(data);
      setTasksData({
        active: activeTasks,
        completed: completedTasks,
      });
      setFilteredTasksData({
        active: activeTasks,
        completed: completedTasks,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="page-content">
      <Sidebar categories={loadOptions} handleFilter={handleFilter} />
      <div className="container">
        <div className="tasks-add-container">
          <h3 className="tasks-title">What we gonna do today?</h3>
          <div className="tasks-wrapper">
            <form action="#" className="tasks-form" onSubmit={handleAddTask}>
              <input
                value={inputData}
                onChange={(event) => {
                  if (inputData.length > 0) {
                    setBorderColor("");
                  }
                  handleChange(event);
                }}
                type="text"
                placeholder="Add a new task"
                style={{ borderColor: borderColor ? "red" : "initial" }}
              />
              <button className="add-btn">+</button>
            </form>
            <Tabs
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          </div>
          <ActiveTasks
            categories={loadOptions}
            setCategories={setLoadOptions}
            filteredTasksData={filteredTasksData}
            setOriginalTasksData={setTasksData}
            setFilteredTasksData={setFilteredTasksData}
            activeButton={activeButton}
          />
          <CompletedTasks
            tasksData={filteredTasksData}
            setTaskData={setFilteredTasksData}
            activeButton={activeButton}
          />
        </div>
      </div>
    </div>
  );
}

export default TasksMain;
