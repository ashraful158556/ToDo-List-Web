document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `
        ${taskText} 
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function editTask(button) {
    let newTask = prompt("Edit your task:", button.parentElement.firstChild.textContent.trim());
    if (newTask) {
        button.parentElement.firstChild.textContent = newTask;
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push(li.firstChild.textContent.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${task} 
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    });
}
