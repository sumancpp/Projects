document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("new-task");
  const taskList = document.getElementById("task-list");
  const addTaskBtn = document.getElementById("add-task-btn");
  const categorySelect = document.getElementById("category");
  const prioritySelect = document.getElementById("priority");
  const dueDateInput = document.getElementById("due-date");
  const dueTimeInput = document.getElementById("due-time");
  const searchTask = document.getElementById("search-task");
  const filters = document.querySelectorAll(".filter");
  const darkModeToggle = document.getElementById("darkModeToggle");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    const dueTime = dueTimeInput.value;

    if (taskText !== "") {
      const newTask = {
        id: Date.now(),
        text: taskText,
        category,
        priority,
        dueDate,
        dueTime,
        completed: false,
      };
      tasks.push(newTask);
      taskInput.value = "";
      categorySelect.value = "Work";
      prioritySelect.value = "Low";
      dueDateInput.value = "";
      dueTimeInput.value = "";

      saveTasks();
      renderTasks();
    }
  });

  function renderTasks(filter = "all", searchText = "") {
    taskList.innerHTML = "";
    const filteredTasks = tasks
      .filter((task) => {
        if (filter === "all") return true;
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
      })
      .filter((task) =>
        task.text.toLowerCase().includes(searchText.toLowerCase())
      );

    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.toggle("completed", task.completed);
      li.setAttribute("data-id", task.id);

      const taskText = document.createElement("span");
      const isOverdue = checkIfOverdue(task.dueDate, task.dueTime);
      taskText.textContent = `${task.text} [${task.category}] (Priority: ${task.priority}, Due: ${task.dueDate} at ${task.dueTime})`;

      if (isOverdue) {
        taskText.style.color = "red";
      }

      li.appendChild(taskText);

      const actions = document.createElement("div");

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Undo" : "Complete";
      completeBtn.classList.add("complete-btn");
      completeBtn.addEventListener("click", () => toggleComplete(task.id));
      actions.appendChild(completeBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => deleteTask(task.id));
      actions.appendChild(deleteBtn);

      li.appendChild(actions);
      taskList.appendChild(li);
    });
  }

  function checkIfOverdue(dueDate, dueTime) {
    if (!dueDate || !dueTime) return false;

    const dueDateTime = new Date(`${dueDate}T${dueTime}`);
    const currentDateTime = new Date();

    return currentDateTime > dueDateTime;
  }

  function toggleComplete(taskId) {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
  }

  function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderTasks();
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  filters.forEach((filterBtn) => {
    filterBtn.addEventListener("click", () => {
      document.querySelector(".filter.active").classList.remove("active");
      filterBtn.classList.add("active");
      renderTasks(filterBtn.getAttribute("data-filter"), searchTask.value);
    });
  });

  searchTask.addEventListener("input", () => {
    renderTasks(
      document.querySelector(".filter.active").getAttribute("data-filter"),
      searchTask.value
    );
  });

  darkModeToggle.addEventListener("click", toggleDarkMode);

  function toggleDarkMode() {
    const body = document.body;

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      darkModeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#EFFD5F" fill="none">
            <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" stroke-width="1.5" />
            <path d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>`;
      darkModeToggle.style.backgroundColor = "#333";
    } else {
      darkModeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="darkblue" fill="none">
            <path d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>`;
      darkModeToggle.style.backgroundColor = "#f4f4f9";
    }
  }

  renderTasks();
});
