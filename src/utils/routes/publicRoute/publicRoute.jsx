import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { validateToken } from "../../requests/validateToken";

function PublicRoute() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (token) {
          const response = await validateToken(token);
          setIsAuth(response ? true : false);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.log("Unexpected error:", error);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? <Navigate to="/tasks" /> : <Outlet />;
}

export default PublicRoute;
