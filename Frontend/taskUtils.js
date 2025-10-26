function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Manage task actions (Complete, Remove, Edit)
function manageTask(e, callback) {
  const li = e.target.closest("li");

  const title = li.querySelector(".task-title").textContent;
  let tasks = loadTasks();

  if (e.target.classList.contains("remove")) {
    tasks = tasks.filter((t) => t.title !== title);
    saveTasks(tasks);
    if (callback) callback(); 
  } else if (e.target.classList.contains("complete")) {
    const task = tasks.find((t) => t.title === title);
    task.completed = !task.completed;
    saveTasks(tasks);
    if (callback) callback(); 
  } else if (e.target.classList.contains("edit")) {
    const taskToEdit = tasks.find((t) => t.title === title);
    
    if (callback) callback(li, taskToEdit);
  }
}