import { getToken } from "../jwt/tokenManipulation";

export function addTask(taskContent) {
  const token = getToken();

  return fetch(`http://localhost:8000/users/add/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      task: taskContent,
    }),
  });
}

export function getTasks() {
  const token = getToken();

  return fetch(`http://localhost:8000/users/get/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteTask(indexToDelete) {
  const token = getToken();

  const params = {
    token: token,
    task: taskContent,
  };

  const queryString = new URLSearchParams(params).toString();
  return fetch(`http://localhost:8000/users/delete/task?${queryString}`);
}

export function deleteCompletedTaskRequest(task) {
  const token = getToken();

  return fetch(`http://localhost:8000/users/delete/completed_task`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      task: task,
    }),
  });
}

export function deleteActiveTaskRequest(task) {
  const token = getToken();

  return fetch(`http://localhost:8000/users/delete/active_task`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      task: task,
    }),
  });
}

export function completeTaskRequest(task) {
  const token = getToken();

  fetch("http://localhost:8000/users/complete_task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      task: task,
    }),
  });
}


export function updateTaskRequest(task, newTask) {
  const token = getToken();

  fetch("http://localhost:8000/users/update_task", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      task: task,
      new_task: newTask
    })
  })
}