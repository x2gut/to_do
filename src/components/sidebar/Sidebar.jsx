import {
  AiOutlineMenu,
  AiOutlineOrderedList,
  AiOutlinePoweroff,
  AiOutlineSearch,
} from "react-icons/ai";
import "./sidebar.css";
import { useState } from "react";

export const Sidebar = ({ categories, handleFilter }) => {
  const [btnStatus, setBtnStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = categories.filter((category) =>
    category.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={btnStatus ? "sidebar" : "sidebar closed"}>
      <div className="sidebar-container">
        <header className="sidebar-header">
          <div className="sidebar-header-wrapper">
            <img
              className="sidebar-logo-img"
              src="/assets/icons/main-logo.svg"
              alt="todo-main-logo"
            />
            <h3 className="sidebar-title">ToDo App</h3>
          </div>
          <button
            onClick={() => setBtnStatus(!btnStatus)}
            className="sidebar-btn"
          >
            <AiOutlineMenu size={28} />
          </button>
        </header>
        <h4>Categories</h4>
        <main className="sidebar-content">
          <div className="input-container">
            <AiOutlineSearch
              size={25}
              color="#9E9E9E"
              className="sidebar-input-search-icon"
            />
            <input
              type="text"
              className="sidebar-input"
              placeholder="Search..."
              onChange={handleChange}
            />
          </div>

          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li className="sidebar-list-item">
                <button
                  onClick={() => {
                    handleFilter("all");
                  }}
                >
                  <AiOutlineOrderedList
                    size={25}
                    className="btn-orderedlist-icon"
                  />
                  All
                </button>
              </li>
              {searchTerm.length > 0
                ? filteredData.map((category, index) => (
                    <li key={index} className="sidebar-list-item">
                      <button
                        onClick={() => {
                          handleFilter(category.label);
                        }}
                      >
                        {category.label}
                      </button>
                    </li>
                  ))
                : categories.map((category, index) =>
                    category.value !== "addNewOption" ? (
                      <li key={index} className="sidebar-list-item">
                        <button
                          onClick={() => {
                            handleFilter(category.label);
                          }}
                        >
                          {category.label}
                        </button>
                      </li>
                    ) : null
                  )}
            </ul>
          </nav>
        </main>
        <footer className="sidebar-footer">
          <div className="sidebar-user-container">
            <div className="sidebar-user-profile">
              <div className="user-picture">
                <img src="/assets/icons/avatar.svg" alt="" />
              </div>
              <div className="profile-info">
                <p className="sidebar-profile-username">
                  {localStorage.getItem("username")}
                </p>
              </div>
              <button
                className="sidebar-logout-btn"
                onClick={(event) => {
                  event.preventDefault();
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                }}
              >
                <AiOutlinePoweroff size={25} color="#808080" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
