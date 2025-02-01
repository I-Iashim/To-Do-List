let backButton = document.querySelector("#backButton")
let userHeading = document.getElementById("task");
let description = document.getElementById("disciption");
let btn = document.querySelector("#addButton");
let updateBtn = document.querySelector("#updateButton");
let taskList = document.querySelector("#tasks");
let firstBackground = document.querySelector("#firstBackground");
let secondBackground = document.querySelector("#secondBackground");
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let newDate = document.getElementById("date").innerText = `${day}/${month}/${year}`;


backButton.addEventListener("click",()=>{
    firstBackground.classList.remove("hide");
    secondBackground.classList.add("hide");
})
let AddButton = document.querySelector(".addButton");
AddButton.addEventListener("click", () => {
    firstBackground.classList.add("hide");
    secondBackground.classList.remove("hide");
});

function loadTasks() {
    let savedData = JSON.parse(localStorage.getItem("data") || "[]");
    taskList.innerHTML = ""; // Clear the task list before loading
    savedData.forEach((task, index) => {
        addTaskToDOM(task.task, task.description, index);
    });
}

function saveData() {
    let savedData = JSON.parse(localStorage.getItem("data") || "[]");
    let data = {
        task: userHeading.value,
        description: description.value,
    };
    savedData.push(data);
    localStorage.setItem("data", JSON.stringify(savedData));
}

function clearInput() {
    userHeading.value = "";
    description.value = "";
    btn.classList.remove("hide");
    updateBtn.classList.add("hide");
}

function addTask() {
    if (userHeading.value.trim() === "") {
        alert("The Input Box Should Not Be Empty.");
    } else {
        saveData();
        addTaskToDOM(userHeading.value, description.value, JSON.parse(localStorage.getItem("data")).length - 1);
        firstBackground.classList.remove("hide");
        secondBackground.classList.add("hide");
        clearInput();
    }
}

function addTaskToDOM(taskTitle, taskDescription, index) {
    let html = `
        <div class="task" data-index="${index}">
            <div class="task-title-box">
            <div style="display: flex; gap:5px;flex-direction:column">
                <div style="display: flex; gap: 10px;align-items: center;">
                    <label class="container">
                        <input type="checkbox" class="checkbox" id="check">
                        <svg viewBox="0 0 64 64" height="2em" width="2em">
                            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                        </svg>
                    </label>
                    <h3>${taskTitle}</h3>
                </div>
                <div>
                    <p class="task-discription">${taskDescription}</p>
                    </div>
                </div>
                <div>
                    <div class="task-edit-box">
                        <svg class="editBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"/>
                        </svg>
                        <p class="remove-button">&#x2716;</p>
                    </div>
                </div>
            </div>
        </div>`;

    taskList.innerHTML += html;
    removeBtn();
}

function removeBtn() {
    let removeButtons = taskList.querySelectorAll(".remove-button");
    removeButtons.forEach(removeBtn => {
        removeBtn.addEventListener('click', () => {
            let taskElement = removeBtn.closest('.task');
            let index = taskElement.getAttribute('data-index');
            removeTask(index, taskElement);
        });
    });

    let editButtons = taskList.querySelectorAll(".editBtn");
    editButtons.forEach(editBtn => {
        editBtn.addEventListener('click', () => {
            firstBackground.classList.add("hide")
            secondBackground.classList.remove("hide")
            let taskElement = editBtn.closest('.task');
            let index = taskElement.getAttribute('data-index');
            editTask(index);
        });
    });
}

function removeTask(index, taskElement) {
    let savedData = JSON.parse(localStorage.getItem("data") || "[]");
    savedData.splice(index, 1); // Remove the task from local storage

    localStorage.setItem("data", JSON.stringify(savedData)); // Update localstorage

    taskElement.remove(); // Remove the task from the DOM
    updateTaskIndices(); // Update indices for remaining tasks
}

function updateTaskIndices() {
    let tasks = taskList.querySelectorAll('.task');
    tasks.forEach((task, i) => {
        task.setAttribute('data-index', i); // Update data-index in DOM
    });
}

function editTask(index) {
    let savedData = JSON.parse(localStorage.getItem("data") || "[]");
    let taskToEdit = savedData[index];

    userHeading.value = taskToEdit.task;
    description.value = taskToEdit.description;

    // Show the update button and hide the add button
    updateBtn.classList.remove("hide");
    btn.classList.add("hide");

    updateBtn.onclick = function() {

        savedData[index] = { task: userHeading.value, description: description.value };
        localStorage.setItem("data", JSON.stringify(savedData));


        clearInput();
        loadTasks();
        firstBackground.classList.remove("hide")
        secondBackground.classList.add("hide")
        btn.classList.remove("hide");
        updateBtn.classList.add("hide");
    };
}

loadTasks();
btn.addEventListener("click", addTask);
