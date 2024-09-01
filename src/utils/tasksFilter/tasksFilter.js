export function filterActiveTasks(taskObject) {
  const tasks = taskObject["tasks"];
  const activeTasks = tasks.filter((task) => task["is_completed"] === false);
  return activeTasks;
}

export function filterCompletedTasks(taskObject) {
  const tasks = taskObject["tasks"];
  const completedTasks = tasks.filter((task) => task["is_completed"] === true);
  return completedTasks;
}
