var totalTasks = 0;

$(document).ready(function(){
    $("inputdiv").hide();
    $("button").click(function () {
        $("inputdiv").slideToggle();
    });
});

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
    $('#new').css('cursor','default');
}

function disableNewButton(){
    document.getElementById('new').disabled = true;
    $('#new').css('cursor','not-allowed');
}

function newListener() {
    disableNewButton();
}

function addListener() {
    enableNewButton();
    document.getElementById('counter').innerHTML = "[ " + (++totalTasks) + " tasks ]";
    var title = document.getElementById('input-title').value;
    var description = document.getElementById('input-description').value;
    addTask(title, description);
}

function canceListener() {
    enableNewButton();
}

function addTask(title, description) {
    var task = document.createElement("div");
    task.className = "task";
    var tasktitle = document.createElement("task-title");
    var titletext = document.createTextNode(title);
    tasktitle.appendChild(titletext);
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.onclick = function(){checkboxClicked(checkbox);};
    var taskdescription = document.createElement("p");
    var descriptiontext = document.createTextNode(description);
    taskdescription.appendChild(descriptiontext);
    task.appendChild(tasktitle);
    task.appendChild(checkbox);
    task.appendChild(taskdescription);
    document.getElementById('list').appendChild(task);
}
