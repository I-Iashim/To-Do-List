let userHeading = document.getElementById("task");
let content = document.querySelector(".content");
let btn = document.querySelector(".content button");
let discription = document.querySelector("#disciption");
let listContainer = document.querySelector("#taskLists");

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML)
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

function addTask() {
    btn.innerText = "Add Task";
    if(userHeading.value === "" ) {
        alert("The Input Box Should Not Be Empty.");
    } else {
        let li = document.createElement("li");
        li.innerText = userHeading.value;
        listContainer.appendChild(li);

        let editBtn = document.createElement("button");
        editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"/></svg>`;
        li.appendChild(editBtn);
        editBtn.classList.add('editBtn')

        let p = document.createElement("p");
        p.innerText = discription.value;
        p.classList.add("information");
        li.appendChild(p);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        editBtn.addEventListener("click", () => {
            userHeading.value = li.childNodes[0].nodeValue.trim(); 
            discription.value = p.innerText;
            btn.innerText = "Update";
            btn.onclick = () => {
                
                li.childNodes[0].nodeValue = userHeading.value; 
                p.innerText = discription.value;
                li.remove()
                addTask()
                btn.innerText = "Add Task";
                userHeading.value = "";
                discription.value = "";
            };
        });
    }
    
        userHeading.value = "";
        discription.value = "";
        saveData()
}


listContainer.addEventListener("click",(e) => {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("cheacked");
            saveData()
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData()
            
        }
    },
    false
);

showTask()
