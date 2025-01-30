let userHeading = document.getElementById("task");
let description = document.getElementById("disciption");
let btn = document.querySelector("#addButton");
let taskList = document.querySelector("#tasks");
let firstBackground = document.querySelector("#firstBackground");
let secondBackground = document.querySelector("#secondBackground");
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let newDate = document.getElementById("date").innerText = `${day}/${month}/${year}`

let AddButton = document.querySelector(".addButton");
AddButton.addEventListener("click", () => {
    firstBackground.classList.add("hide");
    secondBackground.classList.remove("hide");
});
function loadTasks() {
    let savedData = JSON.parse(localStorage.getItem("data") || "[]");
    savedData.forEach((task) => {
        addTaskToDOM(task.task, task.description);
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
}
function addTask() {
    if (userHeading.value.trim() === "") {
        alert("The Input Box Should Not Be Empty.");
    } else {
        saveData();
        addTaskToDOM(userHeading.value, description.value);
    }
    firstBackground.classList.remove("hide");
    secondBackground.classList.add("hide");
}
function addTaskToDOM(taskTitle, taskDescription) {
    let html = `<div class="task"><div class="task-title-box"><div style="display: flex; gap: 10px;"><label class="container"><input type="checkbox" class="checkbox" id="check"><svg viewBox="0 0 64 64" height="2em" width="2em"><path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path></svg></label><h3>${taskTitle}</h3></div><div><p class="task-discription">${taskDescription}</p></div><div><div class="task-edit-box"><svg class="editBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"/></svg><p class="remove-button">&#x2716;</p></div></div></div></div>`;
    taskList.innerHTML += html;
    removeBtn();
}
function removeBtn() {
    let removeButtons = taskList.querySelectorAll(".remove-button");
    removeButtons.forEach(removeBtn => {
        removeBtn.addEventListener('click', () => {
            removeTask(removeBtn);
        });
    });
    let editButtons = taskList.querySelectorAll(".editBtn");
    editButtons.forEach(editBtn => {
        editBtn.addEventListener('click', () => {
            editTask(editBtn);
        });
    });
}
function removeTask(removeBtn) {
    let taskElement = removeBtn.closest('.task');
    let taskTitle = taskElement.querySelector('h3').textContent; 
    taskElement.remove(); 
    let savedData = JSON.parse(localStorage.getItem("data") || "[]");
    savedData = savedData.filter(task => task.task !== taskTitle);
    localStorage.setItem("data", JSON.stringify(savedData));
}
function editTask(editBtn) {
    let taskElement = editBtn.closest('.task');
    let taskTitle = taskElement.querySelector('h3').textContent;
    let taskDescription = taskElement.querySelector('.task-discription').textContent;
    userHeading.value = taskTitle; 
    description.value = taskDescription;
    removeTask(editBtn); 
    firstBackground.classList.add("hide");
    secondBackground.classList.remove("hide"); 
}
loadTasks();
btn.addEventListener("click", addTask);
