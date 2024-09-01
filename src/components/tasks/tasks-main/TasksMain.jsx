import React, { useEffect, useState } from "react";

import CompletedTasks from "../completedTasks/CompletedTasks";
import Tabs from "../../tabs/Tabs";

import Validator from "../../../utils/validation/validation.js";
import ActiveTasks from "../activeTasks/ActiveTasks.jsx";

import "./tasksMain.css";
import {
  addTask,
  completeTaskRequest,
  deleteCompletedTaskRequest,
  getTasks,
} from "../../../utils/requests/tasks.js";
import { validateToken } from "../../../utils/requests/validateToken.js";
import {
  filterActiveTasks,
  filterCompletedTasks,
} from "../../../utils/tasksFilter/tasksFilter.js";

function TasksMain() {
  let validator = new Validator();

  const token = localStorage.getItem("access_token");

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [inputData, setInputData] = useState("");
  const [activeButton, setActiveButton] = useState("active");
  const [borderColor, setBorderColor] = useState("");

  const handleChange = (event) => {
    setInputData(event.target.value);
  };

  const deleteTask = (indexToRemove) => {
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  };

  const deleteCompletedTask = (indexToRemove) => {
    setCompletedTasks(
      completedTasks.filter((_, index) => index !== indexToRemove)
    );
    deleteCompletedTaskRequest(completedTasks[indexToRemove]);
  };

  const completeTask = (indexToComplete) => {
    const taskToComplete = tasks.find((_, index) => index === indexToComplete);
    completeTaskRequest(taskToComplete);
    setCompletedTasks([...completedTasks, taskToComplete]);
    deleteTask(indexToComplete);
  };

  const handleAddTask = async () => {
    if (validator.minLength(inputData)) {
      const isTokenValid = await validateToken(token);
      if (isTokenValid) {
        await addTask(inputData);
        setTasks([...tasks, inputData]);
        setInputData("");
      } else {
        console.error("Invalid token. Cannot add task.");
      }
    } else {
      setBorderColor("red");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();

        const activeTasks = filterActiveTasks(data);
        setTasks(activeTasks.map((item) => item.description));

        const completedTasks = filterCompletedTasks(data);
        setCompletedTasks(completedTasks.map((item) => item.description));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container">
      <div className="tasks-add-container">
        <div className="tasks-wrapper">
          <div className="tasks-form">
            <input
              value={inputData}
              onChange={() => {
                if (inputData.length > 0) {
                  setBorderColor("");
                }
                handleChange(event);
              }}
              type="text"
              placeholder="Add a new task"
              style={{ borderColor: borderColor ? "red" : "initial" }}
            />
            <button onClick={handleAddTask} className="add-btn">
              +
            </button>
          </div>
          <Tabs activeButton={activeButton} setActiveButton={setActiveButton} />
        </div>
      </div>
      <ActiveTasks
        tasksAmount={tasks.length}
        tasks={tasks}
        onComplete={completeTask}
        onDelete={deleteTask}
        activeButton={activeButton}
      />
      <CompletedTasks
        tasksAmount={completedTasks.length}
        onDelete={deleteCompletedTask}
        tasks={completedTasks}
        activeButton={activeButton}
      />
    </div>
  );
}

export default TasksMain;
