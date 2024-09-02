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

export function deleteCompletedTaskRequest(taskId) {
  const token = getToken();

  return fetch(`http://localhost:8000/users/delete/completed_task`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: taskId,
    }),
  });
}

export function deleteActiveTaskRequest(taskId) {
  const token = getToken();

  return fetch(`http://localhost:8000/users/delete/active_task`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: taskId,
    }),
  });
}

export function completeTaskRequest(taskId) {
  const token = getToken();

  fetch("http://localhost:8000/users/complete_task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: taskId,
    }),
  });
}


export function updateTaskRequest(taskId, newTask) {
  const token = getToken();

  fetch("http://localhost:8000/users/update_task", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: taskId,
      new_task: newTask
    })
  })
}