var totalTasks = 0;

window.onload = function() {
    updateCounter();
    var rad = document.filterform.filter;
    var prev = null;
    for(var i = 0; i < rad.length; i++) {
        rad[i].onclick = function() {
            filter();
        };
    }
}

function found(text, pattern){
    return text.includes(pattern);
}

function review(item, pattern) {
    var filterType = findSelection('filter');
    var checked = item.getElementsByClassName('checkbox')[0].checked;
    if((filterType == "checked" && checked == false) || (filterType == "unchecked" && checked == true)){
        item.classList.remove("active");
        return;
    }
    var childs = item.childNodes;
    var selected = false;
    for (var i = 0; i < childs.length; i++) {
        if(childs[i].nodeType === 1){
            var text = childs[i].innerHTML;
            if(found(text, pattern)){
                selected = true;
                break;
            }
        }
    }
    if(selected){
        item.classList.add("active");
        totalTasks++;
    }
    else item.classList.remove("active");
}

function filter() {
    var pattern = document.getElementById('searchbox').value;
    var tasks = document.getElementById('list').childNodes;
    totalTasks = 0;
    for (var i = 0; i < tasks.length; i++) {
        if(tasks[i].nodeType === 1){
            review(tasks[i], pattern);
        }
    }
    updateCounter();
}

function findSelection(field) {
    var test = document.getElementsByName(field);
    for(var i = 0; i < test.length; i++) {
        if(test[i].checked==true) {
            return test[i].value;
        }
    }
}


function getAllSiblings(item) {
    var result = [],
    node = item.parentNode.firstChild;
    while(node) {
        if(node.nodeType === 1) result.push(node);
        node = node.nextSibling;
    }
    return result;
}

function makeActiveAmongSiblings(item) {
    var result = getAllSiblings(item);
    for (var i = 0; i < result.length; i++) {
        result[i].classList.remove("active");
    }
    item.classList.add("active");
}

function tabSelect(item) {
    makeActiveAmongSiblings(item);
    var tabview = document.getElementById(item.getAttribute('name'));
    makeActiveAmongSiblings(tabview);
}

function checkboxClicked(box) {
    var color, decoration;
    if(box.checked){
        color = 'cyan';
        decoration = 'line-through';
    }
    else{
        color = 'white';
        decoration = 'none';
    }
    box.parentNode.style.backgroundColor = color;
    var result = getAllSiblings(box);
    for (var i = 0; i < result.length; i++) {
        result[i].style.textDecoration = decoration;
    }
    filter();
}

function clearInput() {
    document.getElementById('input-title').value = "";
    document.getElementById('input-description').value = "";
}

function updateCounter() {
    var message = totalTasks > 0 ? "[ " + totalTasks + " tasks ]" : "[ No task ]";
    document.getElementById('counter').innerHTML = message;
}

function moveToList() {
    var tab = document.getElementsByName('tasklist');
    tabSelect(tab[0]);
}

function addListener() {
    var title = document.getElementById('input-title').value;
    var description = document.getElementById('input-description').value;
    addTask(title, description);
    updateCounter();
    clearInput();
    moveToList();
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
    checkbox.className = "checkbox";
    checkbox.onclick = function(){checkboxClicked(checkbox);};
    return checkbox;
}

function addTask(title, description) {
    var task = document.createElement("div");
    task.className = "task";
    task.appendChild(createCheckbox());
    task.appendChild(createTaskTitle(title));
    task.appendChild(createTaskDescription(description));
    var pattern = document.getElementById('searchbox').value;
    review(task, pattern);
    document.getElementById('list').appendChild(task);
}
