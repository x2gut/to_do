import { getToken } from "../jwt/tokenManipulation";

export const getCategories = () => {
  const accessToken = getToken();

  return fetch("http://localhost:8000/user/categories/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.categories || [];
    })
    .catch((error) => {
      console.error("Failed to fetch categories:", error);
      return [];
    });
};

export const addCategory = (categoryContent) => {
  const accessToken = getToken();

  return fetch("http://localhost:8000/user/categories/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      category: categoryContent,
    }),
  });
};

export const deleteCategory = (categoryContent, taskId) => {
  const accessToken = getToken();

  return fetch("http://localhost:8000/user/categories/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      task_id: taskId,
      category: categoryContent,
    }),
  });
};

export const getActiveCategory = (taskId) => {
  const accessToken = getToken();

  return fetch(`http://localhost:8000/user/categories/active?task_id=${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok)  {
        return undefined
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};


export const setActiveCategory = (taskId, category) => {
  const accessToken = getToken();

  return fetch(`http://localhost:8000/user/categories/set`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      id: taskId,
      category: category
    })
  })
    .then((response) => {
      response.json();
    })
    .then((data) => {
      return data;
    })
}
