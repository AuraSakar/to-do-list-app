const addTaskInput = document.querySelector(".add-task input");
const addTaskButton = document.querySelector("#add-task-button");
const removeTaskButtons = document.querySelectorAll(".remove-button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let saveTasks = () => {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
};

// localStorage.setItem("tasks",JSON.stringify(tasks));

// we have defined the tasks as an empy array at the begining

let addTask = (task) => {
    tasks.push(task);
    saveTasks();
    displayTasks();
};

let deleteTask = (index) => {
    tasks.splice(index,1);
    saveTasks();
    displayTasks();
};

/*
<div class="task">
    <div class="symbol"></div>
    <p class="task-name">Task A</p>
    <button class="remove-button">Remove</button>
</div>
*/

let displayTasks = () => {

    const tasksContainer = document.querySelector("#tasks");
    tasksContainer.innerHTML = "";

    tasks.forEach((task,idx) => {
        
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        
        let symbolDiv = document.createElement("div");
        symbolDiv.classList.add("symbol");

        let p = document.createElement("p");
        p.classList.add("task-name");
        p.innerText = `${idx+1}. ${task}`;

        let removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.innerText = "Remove";

        removeButton.addEventListener("click", (evt) => {
            deleteTask(idx);
        });

        taskDiv.appendChild(symbolDiv);
        taskDiv.appendChild(p);
        taskDiv.appendChild(removeButton);

        tasksContainer.appendChild(taskDiv);

    });
};

addTaskButton.addEventListener("click",() => {
    console.log(addTaskInput.value);
    let task = addTaskInput.value.trim();
    if(!tasks.includes(task)){
        if(task !== ""){
            addTask(task);
        }
    } else {
        console.log("task already exists.");
        alert("Task already exists.");
    }

    addTaskInput.value = "";
    
    
});

window.addEventListener("load",(evt) => {
    displayTasks();
});