const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage when page loads
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));
};

// Event listener for Add button
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

// Function to add a task to the list
function addTask(text, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <div class="task-item">
      <input type="checkbox" ${completed ? "checked" : ""}>
      <span>${text}</span>
    </div>
    <button class="delete">Delete</button>
  `;

  const checkbox = li.querySelector("input[type='checkbox']");
  const deleteBtn = li.querySelector(".delete");

  // Mark task as completed/uncompleted
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete task
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  saveTasks();
}

// Save current tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    const text = li.querySelector("span").innerText;
    const completed = li.querySelector("input[type='checkbox']").checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
