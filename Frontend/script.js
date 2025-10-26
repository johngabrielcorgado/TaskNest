const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const noTasks = document.getElementById("noTasks");

// Function to create and add a new task
function addTask(e) {
  e.preventDefault(); 

  const title = document.getElementById("taskTitle").value.trim();
  const dueDate = document.getElementById("taskDueDate").value;
  const priority = document.getElementById("taskPriority").value;

  if (!title || !dueDate) {
    alert("Please fill in both title and due date.");
    return;
  }

  const li = document.createElement("li");
  li.classList.add("task-item");

  li.innerHTML = `
    <div>
      <span class="task-title">${title}</span><br>
      <small class="task-meta">Due: ${dueDate} | Priority: ${priority}</small>
    </div>
    <div>
      <button class="complete"> ✔ </button>
      <button class="remove">X  </button>
    </div>
  `;

  taskList.appendChild(li);
  noTasks.style.display = "none";
  taskForm.reset();
}

function manageTask(e) {
  if (e.target.classList.contains("remove")) {
    e.target.closest("li").remove();

  } 
  else if (e.target.classList.contains("complete")) {
    const li = e.target.closest("li");
    li.classList.toggle("completed");
    
  }
}

taskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", manageTask);
