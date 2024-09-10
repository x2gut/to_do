import { getToken } from "../jwt/tokenManipulation";

export function addTask(taskContent) {
  const token = getToken();

  return fetch(`http://localhost:8000/tasks/add`, {
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

  return fetch(`http://localhost:8000/tasks/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteCompletedTaskRequest(taskId) {
  const token = getToken();

  return fetch(`http://localhost:8000/tasks/delete/completed`, {
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

  return fetch(`http://localhost:8000/tasks/delete/active`, {
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

export function completeTaskRequest(taskId, completedTime) {
  const token = getToken();

  fetch("http://localhost:8000/tasks/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: taskId,
      completed_time: completedTime
    }),
  });
}


export function updateTaskRequest(taskId, newTask) {
  const token = getToken();

  fetch("http://localhost:8000/tasks/update", {
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