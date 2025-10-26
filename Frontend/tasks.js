
const allTaskList = document.getElementById("allTaskList");
const noTasks = document.getElementById("noTasks");

// Function to display ALL tasks, including action buttons
function displayAllTasks() {
  const tasks = loadTasks(); // Util function
  allTaskList.innerHTML = "";

  if (tasks.length === 0) {
    noTasks.style.display = "block";
    return;
  }

  noTasks.style.display = "none";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item${task.completed ? " completed" : ""}`;
    li.innerHTML = `
      <div>
        <span class="task-title">${task.title}</span><br>
        <small class="task-meta">Due: ${task.dueDate} | Priority: ${task.priority}</small>
      </div>
      <div class="actions">
        <button class="complete">✔</button>
        <button class="edit">✎</button> <button class="remove">✖</button>
      </div>
    `;

    allTaskList.appendChild(li);
  });
}

function handleAllManageTask(e) {
  
  manageTask(e, (li, task) => {
    if (e.target.classList.contains("edit")) {
      const title = encodeURIComponent(task.title);
      window.location.href = `index.html?edit=${title}`;
    } else {
      displayAllTasks();
    }
  });
}


allTaskList.addEventListener("click", handleAllManageTask);


displayAllTasks();