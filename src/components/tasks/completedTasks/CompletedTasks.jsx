import "./completedTasks.css";
import { validateToken } from "../../../utils/api/validateToken";
import { getToken } from "../../../utils/jwt/tokenManipulation";
import { deleteCompletedTaskRequest } from "../../../utils/api/tasks";

function CompletedTasks({ tasksData, activeButton, setTaskData }) {
  const handleDeleteCompletedTask = async (id) => {
    const token = getToken();
    const isTokenValid = await validateToken(token);
    if (isTokenValid) {
      deleteCompletedTaskRequest(id);

      setTaskData((prevData) => ({
        ...prevData,
        completed: prevData.completed.filter((task) => task.id !== id),
      }));
    } else {
      console.error("Can't validate token");
    }
  };

  return (
    <div
      className={`completed-tasks ${
        activeButton === "completed" ? "active" : ""
      }`}
    >
      {tasksData.completed.length > 0 ? (
        <>
          <p className="total-tasks">
            Tasks completed: {tasksData.completed.length}
          </p>
          <ul className="tasks-list">
            {tasksData.completed.map((task) => (
              <li key={task.id}>
                <div className="list-upper-completed">
                  {task.description}
                  <button className="complete-task">
                    <svg
                      onClick={() => handleDeleteCompletedTask(task.id)}
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
                <div className="list-footer-completed">
                  <p className="completed-time">
                    Completed at:&nbsp;
                    { new Date(task.completed_time).toLocaleString("ua-UA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="no-completed-tasks-container">
            <h2>
              <span>
                Nothing here!
                <br />
              </span>
              You have'nt completed any task yet!
            </h2>
            <div className="thumb-up">
              <img
                className="thumb-up-img"
                src="/assets/imgs/explosion.png"
                alt=""
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CompletedTasks;
