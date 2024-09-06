import { saveToken } from "../jwt/tokenManipulation";
import { getNewAccesToken } from "./getNewAccesToken";

export function validateToken(token) {
  const refreshToken = localStorage.getItem("refresh_token");

  return fetch("http://localhost:8000/jwt/login/token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        sessionStorage.setItem("username", data.username);
        return true;
      });
    } else if (response.status === 401) {
      return response.json().then((data) => {
        if (data.detail === "Token has expired") {
          return getNewAccesToken(refreshToken).then((response) => {
            if (response.ok) {
              return response.json().then((data) => {
                saveToken(data.access_token, "access_token");
                return true;
              });
            }
          });
        }
      });
    } else {
      localStorage.removeItem("acces_token");
      localStorage.removeItem("refresh_token");
      return false;
    }
  });
}
