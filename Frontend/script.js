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

  // Create task item element
  const li = document.createElement("li");
  li.classList.add("task-item");

  li.innerHTML = `
    <div>
      <span class="task-title">${title}</span><br>
      <small class="task-meta">Due: ${dueDate} | Priority: ${priority}</small>
    </div>
  `;

  // Append to the list
  taskList.appendChild(li);

  // Hide "no tasks" message
  noTasks.style.display = "none";

  // Reset the form
  taskForm.reset();
}

// Event listener for form submission
taskForm.addEventListener("submit", addTask);
