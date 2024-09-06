function registerUser(username, password) {
  return fetch("http://localhost:8000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      is_active: true,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "error") return data.message;
      return null;
    });
}

export default registerUser;
