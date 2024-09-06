import React, { useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import ConfettiExplosion from "react-confetti-explosion";

import "./activeTasks.css";
import {
  completeTaskRequest,
  deleteActiveTaskRequest,
  updateTaskRequest,
} from "../../../utils/api/tasks";
import { validateToken } from "../../../utils/api/validateToken.js";
import { getToken } from "../../../utils/jwt/tokenManipulation.js";
import Modal from "../../modal/Modal.jsx";
import divideArrayIntoChunks from "../../../utils/divideArray.js";
import LoadMoreBtn from "../../loadMoreBtn/LoadMoreBtn.jsx";
import { Categories } from "../../categories/Categories.jsx";

function ActiveTasks({ tasksData, setTasksData, activeButton }) {
  const [showModal, setShowModal] = useState(false);
  const [inputData, setInputData] = useState("");
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);


  const dividedArray = divideArrayIntoChunks(tasksData.active, 5);

  const handleTaskDelete = async (id) => {
    const token = getToken();
    const isTokenValid = validateToken(token);
    if (isTokenValid) {
      await deleteActiveTaskRequest(id);

      setTasksData((prevData) => ({
        ...prevData,
        active: prevData.active.filter((task) => task.id !== id),
      }));
    } else {
      console.error("Can't validate token");
    }
  };

  const handleTaskComplete = async (id) => {
    const token = getToken();
    const isTokenValid = await validateToken(token);
    if (isTokenValid) {
      await completeTaskRequest(id);
      const completedTask = tasksData.active.find((task) => task.id === id);

      setTasksData((prevData) => ({
        ...prevData,
        active: prevData.active.filter((task) => task.id !== id),
        completed: [
          ...prevData.completed,
          { ...completedTask, is_completed: true },
        ],
      }));
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 2200);
    }
  };

  const handleModalSubmit = async (id, newTask) => {
    const token = getToken();
    const isTokenValid = validateToken(token);
    if (isTokenValid) {
      await updateTaskRequest(id, newTask);

      setTasksData((prevData) => ({
        ...prevData,
        active: prevData.active.map((task) =>
          task.id === id ? { ...task, description: newTask } : task
        ),
      }));

      setShowModal(false);
    } else {
      console.error("Can't validate token");
    }
  };

  const handleShowMoreClick = () => {
    setCurrentLevel((prevLevel) =>
      Math.min(prevLevel + 1, dividedArray.length)
    );
  };

  return (
    <div
      className={`active-tasks ${activeButton === "active" ? "active" : ""}`}
    >
      <p className="total-tasks">Tasks to do: {tasksData.active.length}</p>
      <ul className="tasks-list">
        {dividedArray.slice(0, currentLevel).map((chunk, index) => (
          <React.Fragment key={index}>
            {chunk.map((task) => (
              <li key={task.id}>
                <div className="list-upper">
                  {task.description}
                  <div className="manipulate-btn">
                    <button
                      className="edit-task"
                      onClick={() => {
                        setShowModal(!showModal);
                        setIdToUpdate(task.id);
                      }}
                    >
                      <AiFillEdit size={21} />
                    </button>
                    <button
                      className="delete-task"
                      onClick={() => handleTaskDelete(task.id)}
                    >
                      <AiOutlineDelete size={21} />
                    </button>
                    <button
                      className="complete-task"
                      onClick={() => handleTaskComplete(task.id)}
                    >
                      <svg
                        width="18"
                        height="13"
                        viewBox="0 0 18 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.7851 1.67391L6.7851 12.6739C6.72125 12.7378 6.64542 12.7885 6.56196 12.8231C6.4785 12.8577 6.38904 12.8755 6.29869 12.8755C6.20834 12.8755 6.11888 12.8577 6.03542 12.8231C5.95196 12.7885 5.87614 12.7378 5.81229 12.6739L0.999785 7.86141C0.870782 7.7324 0.798309 7.55744 0.798309 7.375C0.798309 7.19256 0.870782 7.0176 0.999785 6.88859C1.12879 6.75959 1.30375 6.68712 1.48619 6.68712C1.66863 6.68712 1.84359 6.75959 1.9726 6.88859L6.29869 11.2155L16.8123 0.701094C16.9413 0.572091 17.1163 0.499619 17.2987 0.499619C17.4811 0.499619 17.6561 0.572091 17.7851 0.701094C17.9141 0.830097 17.9866 1.00506 17.9866 1.1875C17.9866 1.36994 17.9141 1.5449 17.7851 1.67391Z"
                          fill="#9E78CF"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="list-footer">
                  <p>
                    Until <time dateTime="2024-10-05">05.10.2024</time>
                  </p>
                  <Categories task={task} />
                </div>
                {showModal && (
                  <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setInputData={setInputData}
                    inputData={inputData}
                    onSubmit={() => handleModalSubmit(idToUpdate, inputData)}
                  />
                )}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      {currentLevel < dividedArray.length && (
        <LoadMoreBtn onClick={handleShowMoreClick} />
      )}
      {showConfetti && (
        <ConfettiExplosion force={0.4} particleCount={30} width={400} />
      )}
    </div>
  );
}

export default ActiveTasks;
