// script.js

// Import utilities (assuming taskUtils.js is loaded first)

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const noTasks = document.getElementById("noTasks");
const viewAllBtn = document.getElementById("viewAllBtn");

let editMode = false;
let currentTask = null;

function displayTasks(limit = 3) {
  // ... (displayTasks function remains the same) ...
  taskList.innerHTML = "";
  const tasks = loadTasks();

  if (tasks.length === 0) {
    noTasks.style.display = "block";
    viewAllBtn.style.display = "none";
    return;
  }

  noTasks.style.display = "none";
  viewAllBtn.style.display = "block";

  tasks.slice(0, limit).forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div>
        <span class="task-title">${task.title}</span><br>
        <small class="task-meta">Due: ${task.dueDate} | Priority: ${task.priority}</small>
      </div>
      <div class="actions">
        <button class="complete">✔</button>
        <button class="edit">✎</button>
        <button class="remove">✖</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Function to populate the form for editing
function setupEditForm(task) {
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDueDate").value = task.dueDate;
    document.getElementById("taskPriority").value = task.priority;
    editMode = true;
    // Set a temporary "currentTask" marker. Since we don't have the <li> yet, 
    // we use the task object and rely on the title for identification in addTask.
    currentTask = task; 
    taskForm.querySelector("button[type='submit']").textContent = "Save Changes";

    // Scroll to the top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Add / Edit task
function addTask(e) {
  e.preventDefault();

  const title = document.getElementById("taskTitle").value.trim();
  const dueDate = document.getElementById("taskDueDate").value;
  const priority = document.getElementById("taskPriority").value;

  if (!title || !dueDate) {
    alert("Please fill in both title and due date.");
    return;
  }

  const tasks = loadTasks();

  if (editMode) {
    // Determine the title of the task being edited.
    // If currentTask is an <li> (from in-page edit), get the title from the element.
    // If currentTask is a task object (from tasks.html redirect), use its title property.
    const originalTitle = currentTask.title || currentTask.querySelector(".task-title").textContent;
    const index = tasks.findIndex((t) => t.title === originalTitle);

    if (index > -1) {
      // Retain the completed status of the original task
      tasks[index] = { title, dueDate, priority, completed: tasks[index].completed }; 
    }

    // After saving, clear the 'edit' state
    editMode = false;
    currentTask = null;
    taskForm.querySelector("button[type='submit']").textContent = "Add Task";
    
    // Clear the URL parameter
    if (history.pushState) {
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({path: newurl}, '', newurl);
    }
    
  } else {
    tasks.push({ title, dueDate, priority, completed: false });
  }

  saveTasks(tasks);
  displayTasks();
  taskForm.reset();
}

// Updated manageTask for index.html only (using the utility but wrapping it)
function handleManageTask(e) {
  manageTask(e, (li, task) => {
    if (e.target.classList.contains("edit")) {
      // Specific logic for in-page editing in index.html
      currentTask = li; // Set the <li> element as currentTask
      setupEditForm(task);
    }
    // For complete/remove, the displayTasks() is called by the utility's callback.
  });
}

// Check for edit parameter on load
function checkEditParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const editTitle = urlParams.get('edit');
    if (editTitle) {
        const tasks = loadTasks();
        const taskToEdit = tasks.find(t => t.title === editTitle);
        if (taskToEdit) {
            setupEditForm(taskToEdit);
        }
    }
}


// Go to full task page
viewAllBtn.addEventListener("click", () => {
  window.location.href = "tasks.html";
});

// Init
taskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleManageTask);
checkEditParameter(); // Check for URL parameter on page load
displayTasks();