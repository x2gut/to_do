import React from "react";
import "./Tabs.css";

function Tabs({ activeButton, setActiveButton }) {
  return (
    <div className="tabs">
      <div className="tabs-container">
        <nav className="tabs-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <button
                className={`btn--active ${
                  activeButton === "active" ? "active" : ""
                }`}
                onClick={() => setActiveButton("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn--completed ${
                  activeButton === "completed" ? "active" : ""
                }`}
                onClick={() => setActiveButton("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Tabs;
