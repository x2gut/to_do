import React, { useEffect, useState } from "react";
import "./header.css";
import { validateToken } from "../../utils/requests/validateToken";
import { useLocation } from "react-router-dom";

function Header() {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await validateToken(token);
        setIsAuth(response ? true : false);
      } else {
        setIsAuth(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, [location]);

  if (loading) {
    return null;
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-nav">
          {isAuth ? (
            <>
              <p>Hello, {sessionStorage.getItem("username")}!</p>
              <button
                className="header-logout"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="header-login">
                Login
              </a>
              <a href="/register" className="header-register">
                Sign up
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
