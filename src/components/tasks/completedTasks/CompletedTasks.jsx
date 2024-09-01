import { useState, useEffect } from "react";

import "./completedTasks.css";
import divideArrayIntoChunks from "../../../utils/divideArray";
import LoadMoreBtn from "../../loadMoreBtn/LoadMoreBtn";

function CompletedTasks({ tasksAmount, onDelete, tasks, activeButton }) {
  const dividedTasks = divideArrayIntoChunks(tasks, 10);
  const [chunksToDisplay, setChunkstoDisplay] = useState(1);
  const [elementsToDisplay, setElementsToDisplay] = useState([]);

  useEffect(() => {
    const getFlattenedChunks = (chunksArray, chunksToDisplay) => {
      return chunksArray.slice(0, chunksToDisplay).flat();
    };

    const updatedElements = getFlattenedChunks(dividedTasks, chunksToDisplay);

    setElementsToDisplay(updatedElements);
  }, [tasks, chunksToDisplay]);
  return (
    <div
      className={`completed-tasks ${
        activeButton === "completed" ? "active" : ""
      }`}
    >
      <p className="total-tasks">Tasks completed: {tasksAmount}</p>
      <ul className="tasks-list">
        {elementsToDisplay.map((item, index) => (
          <li key={index}>
            {item}
            <button className="complete-task">
            <svg
              onClick={() => onDelete(index)}
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
          </li>
        ))}
      </ul>
      {dividedTasks.length > chunksToDisplay && (
        <LoadMoreBtn
          onClick={() => setChunkstoDisplay((prevChunk) => prevChunk + 1)}
        />
      )}
    </div>
  );
}

export default CompletedTasks;
