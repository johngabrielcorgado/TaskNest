const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const noTasks = document.getElementById("noTasks");

let editMode = false;
let currentTask = null;

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

  if (editMode) {
    // Update existing task
    const titleElem = currentTask.querySelector(".task-title");
    const metaElem = currentTask.querySelector(".task-meta");

    titleElem.textContent = title;
    metaElem.textContent = `Due: ${dueDate} | Priority: ${priority}`;

    editMode = false;
    currentTask = null;

    // Reset button text
    taskForm.querySelector("button[type='submit']").textContent = "Add Task";
  } else {
    // Create new task
    const li = document.createElement("li");
    li.classList.add("task-item");

    li.innerHTML = `
      <div>
        <span class="task-title">${title}</span><br>
        <small class="task-meta">Due: ${dueDate} | Priority: ${priority}</small>
      </div>
      <div class="actions">
        <button class="complete">✔</button>
        <button class="edit">✎</button>
        <button class="remove">✖</button>
      </div>
    `;

    taskList.appendChild(li);
    noTasks.style.display = "none";
  }

  taskForm.reset();
}

// Function to manage clicks (Complete / Edit / Delete)
function manageTask(e) {
  const li = e.target.closest("li");

  if (e.target.classList.contains("remove")) {
    li.remove();

    if (taskList.children.length === 0) {
      noTasks.style.display = "block";
    }
  } else if (e.target.classList.contains("complete")) {
    li.classList.toggle("completed");
  } else if (e.target.classList.contains("edit")) {
    const title = li.querySelector(".task-title").textContent;
    const meta = li.querySelector(".task-meta").textContent;

    // Extract date and priority from meta text
    const [_, dueDateText, priorityText] = meta.match(
      /Due:\s(.*?)\s\|\sPriority:\s(.*)/
    );

    document.getElementById("taskTitle").value = title;
    document.getElementById("taskDueDate").value = dueDateText;
    document.getElementById("taskPriority").value = priorityText;

    editMode = true;
    currentTask = li;

    // Change button label to “Save Changes”
    taskForm.querySelector("button[type='submit']").textContent =
      "Save Changes";
  }
}

taskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", manageTask);
