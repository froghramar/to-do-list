var totalTasks = 0;

function checkboxClicked(box) {
    if(box.checked){
        box.parentNode.style.backgroundColor = 'cyan';
    }
    else{
        box.parentNode.style.backgroundColor = 'white';
    }
}

function enableNewButton(){
    document.getElementById('new').disabled = false;
    document.getElementById("new").style.cursor = "default";
}

function disableNewButton(){
    document.getElementById('new').disabled = true;
    document.getElementById("new").style.cursor = "not-allowed";
}

function newListener() {
    disableNewButton();
    document.getElementById('inputdiv').style.display = "block";
}

function clearInput() {
    document.getElementById('input-title').value = "";
    document.getElementById('input-description').value = "";
}

function addListener() {
    enableNewButton();
    document.getElementById('inputdiv').style.display = "none";
    document.getElementById('counter').innerHTML = "[ " + (++totalTasks) + " tasks ]";
    var title = document.getElementById('input-title').value;
    var description = document.getElementById('input-description').value;
    addTask(title, description);
    clearInput();
}

function canceListener() {
    enableNewButton();
    document.getElementById('inputdiv').style.display = "none";
    clearInput();
}

function createTaskTitle(title) {
    var tasktitle = document.createElement("task-title");
    var titletext = document.createTextNode(title);
    tasktitle.appendChild(titletext);
    return tasktitle;
}

function createTaskDescription(description) {
    var taskdescription = document.createElement("p");
    var descriptiontext = document.createTextNode(description);
    taskdescription.appendChild(descriptiontext);
    return taskdescription;
}

function createCheckbox() {
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.onclick = function(){checkboxClicked(checkbox);};
    return checkbox;
}

function addTask(title, description) {
    var task = document.createElement("div");
    task.className = "task";
    task.appendChild(createTaskTitle(title));
    task.appendChild(createCheckbox());
    task.appendChild(createTaskDescription(description));
    document.getElementById('list').appendChild(task);
}
