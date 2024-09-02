import React, { useEffect, useState } from "react";

import CompletedTasks from "../completedTasks/CompletedTasks";
import Tabs from "../../tabs/Tabs";

import Validator from "../../../utils/validation/validation.js";
import ActiveTasks from "../activeTasks/ActiveTasks.jsx";

import "./tasksMain.css";
import { addTask, getTasks } from "../../../utils/requests/tasks.js";
import { validateToken } from "../../../utils/requests/validateToken.js";
import {
  filterActiveTasks,
  filterCompletedTasks,
} from "../../../utils/tasksFilter/tasksFilter.js";

function TasksMain() {
  let validator = new Validator();

  const token = localStorage.getItem("access_token");

  const [inputData, setInputData] = useState("");
  const [activeButton, setActiveButton] = useState("active");
  const [borderColor, setBorderColor] = useState("");
  const [tasksData, setTasksData] = useState({
    active: [],
    completed: [],
  });
  const [isLoading, setIsLoading] = useState(true); // состояние загрузки

  const handleChange = (event) => {
    setInputData(event.target.value);
  };

  const handleAddTask = async () => {
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
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false); // завершение загрузки
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Если данные еще загружаются, показываем индикатор загрузки или ничего
  if (isLoading) {
    return <p>Loading tasks...</p>; // Вы можете заменить это на индикатор загрузки
  }

  return (
    <div className="container">
      <div className="tasks-add-container">
        <div className="tasks-wrapper">
          <div className="tasks-form">
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
            <button onClick={handleAddTask} className="add-btn">
              +
            </button>
          </div>
          <Tabs activeButton={activeButton} setActiveButton={setActiveButton} />
        </div>
        <ActiveTasks
          tasksData={tasksData}
          setTasksData={setTasksData}
          activeButton={activeButton}
        />
        <CompletedTasks
          tasksData={tasksData}
          setTaskData={setTasksData}
          activeButton={activeButton}
        />
      </div>
    </div>
  );
}

export default TasksMain;
