let userHeading = document.getElementById("task");
let discription = document.getElementById("disciption");
let btn = document.querySelector("#addButton");
let listContainer = document.getElementById("taskLists");

window.onload = function () {
    loadTasks();
};

function loadTasks() {
    let savedData = JSON.parse(localStorage.getItem("data") || "[]");
    savedData.forEach((task) => {
        addTaskToDOM(task.task, task.discription);
    });
}

function saveData() {
    let savedData = JSON.parse(localStorage.getItem("data") || "[]");
    const data = {
        task: userHeading.value,
        discription: discription.value,
    };
    savedData.push(data);
    localStorage.setItem("data", JSON.stringify(savedData));
}
function clearInput() {
    userHeading.value = ""
    discription.value = ""
}
function addTask() {
    if (userHeading.value.trim() === "") {
        alert("The Input Box Should Not Be Empty.");
    } else {
        saveData();
        addTaskToDOM(userHeading.value, discription.value);

    }

}
let taskTitle = userHeading.value;
let taskDisciption = discription.value
function addTaskToDOM(taskTitle, taskDisciption) {

    let li = document.createElement("li");
    li.innerText = taskTitle;

    let editBtn = document.createElement("button");
    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"/></svg>`;
    li.appendChild(editBtn);
    editBtn.classList.add("editBtn");

    let p = document.createElement("p");
    p.innerText = taskDisciption;
    p.classList.add("information");
    li.appendChild(p);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);

    editBtn.addEventListener("click", (e) => {
        userHeading.value = taskTitle;
        discription.value = taskDisciption;
        btn.innerText = "Update";
        li.remove()
        btn.onclick = () => {
            li.value = taskTitle;
            p.innerText = taskDisciption;
            btn.innerText = "Add Task";

            addTask()

        };
    });
}

function updateTask(li, p) {
    li.childNodes[0].nodeValue = userHeading.value;
    p.innerText = discription.value;

    // Update local storage
    let savedData = JSON.parse(localStorage.getItem("data") || "[]");
    savedData = savedData.map((task) => {
        if (task.task === li.childNodes[0].nodeValue) {
            return { task: userHeading.value, discription: discription.value };
        }
        return task;
    });
    localStorage.setItem("data", JSON.stringify(savedData));

}

listContainer.addEventListener(
    "click",
    (e) => {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("cheacked");
        } else if (e.target.tagName === "SPAN") {
            let li = e.target.parentElement;
            li.remove();

            // Remove from local storage
            let savedData = JSON.parse(localStorage.getItem("data") || "[]");
            savedData = savedData.filter(
                (task) => task.task !== li.childNodes[0].nodeValue
            );
            localStorage.setItem("data", JSON.stringify(savedData));
        }
    },
    false
);

