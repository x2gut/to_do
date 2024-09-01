import { saveToken } from "../jwt/tokenManipulation";

async function loginUser(username, password) {
  try {
    const response = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        is_active: true,
        password: password,
      }),
    });

    if (response) {
      const data = await response.json();

      if (!response.ok) {
        return data.detail;
      } else {
        saveToken(data.refresh_token, "refresh_token");
        saveToken(data.access_token, "access_token");
        return null;
      }
    }
  } catch (error) {
    return `An unexpected error occurred: ${error}`;
  }
}

export default loginUser;
