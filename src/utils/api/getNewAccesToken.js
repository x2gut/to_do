export function getNewAccesToken(refreshToken) {
  refreshToken = localStorage.getItem("refresh_token");

  return fetch("http://localhost:8000/jwt/login/get_new_access_token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });
}
