function FrontView() {
    this.totalTasks = 0;
    this.refresh = function() {
        this.updateListView();
        this.updateCounterMessage();
    }
    this.updateCounterMessage = function() {
        var message = this.totalTasks > 0 ? "[ " + this.totalTasks + " tasks ]" : "[ No task ]";
        document.getElementById('counter').innerHTML = message;
    }
    this.createTaskTitle = function(title) {
        var tasktitle = document.createElement("task-title");
        var titletext = document.createTextNode(title);
        tasktitle.appendChild(titletext);
        return tasktitle;
    }
    this.createTaskDescription = function(description) {
        var taskdescription = document.createElement("p");
        var descriptiontext = document.createTextNode(description);
        taskdescription.appendChild(descriptiontext);
        return taskdescription;
    }
    this.createCheckbox = function(isChecked) {
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.className = "checkbox";
        checkbox.checked = isChecked;
        checkbox.onclick = function(){listener.checkboxClicked(checkbox);};
        return checkbox;
    }
    this.createEditButton = function() {
        var button = document.createElement("button");
        button.className = "editbutton";
        button.innerHTML = 'Edit';
        button.onclick = function(){listener.editButtonClicked(button);};
        return button;
    }
    this.createDeleteButton = function() {
        var button = document.createElement("button");
        button.className = "deletebutton";
        button.innerHTML = 'Delete';
        button.onclick = function(){listener.deleteButtonClicked(button);};
        return button;
    }
    this.addTask = function(id, task) {
        var item = document.createElement("div");
        item.className = "task";
        item.appendChild(this.createTaskTitle(task.title));
        item.appendChild(this.createDeleteButton());
        item.appendChild(this.createEditButton());
        item.appendChild(this.createCheckbox(task.checked));
        item.appendChild(this.createTaskDescription(task.description));
        if(task.checked){
            item.classList.add('task-checked');
        }
        item.setAttribute("data-taskid", id);
        document.getElementById('list').appendChild(item);
    }
    this.updateListView = function() {
        this.totalTasks = 0;
        this.removeAllChild(document.getElementById('list'));
        var searchModel = this.getSearchModel();
        var taskList = repo.getTaskList();
        for (var id in taskList) {
            if(searchModel.matches(taskList[id])){
                this.totalTasks++;
                this.addTask(id, taskList[id]);
            }
        }
    }
    this.removeAllChild = function(item){
        while(item.firstChild) {
            item.removeChild(item.firstChild);
        }
    }
    this.getSearchModel = function(){
        var searchkey = document.getElementById('searchbox').value;
        var filterType = this.findSelection('filter');
        var filter = [];
        if(filterType == "all"){
            filter = [true, false];
        }
        else if(filterType == "checked"){
            filter = [true];
        }
        else if(filterType == "unchecked"){
            filter = [false];
        }
        var searchModel = new SearchModel(searchkey, filter);
        return searchModel;
    }
    this.findSelection = function(field) {
        var test = document.getElementsByName(field);
        for(var i = 0; i < test.length; i++) {
            if(test[i].checked==true) {
                return test[i].value;
            }
        }
    }
    this.getInputTitle = function() {
        return document.getElementById('input-title').value;
    }
    this.getInputDescription = function() {
        return document.getElementById('input-description').value;
    }
    this.getEditedTitle = function() {
        return document.getElementById('edit-title').value;
    }
    this.getEditedDescription = function() {
        return document.getElementById('edit-description').value;
    }
    this.addRadioButtonListener = function() {
        var rad = document.filterform.filter;
        var prev = null;
        for(var i = 0; i < rad.length; i++) {
            rad[i].onclick = function() {
                frontView.refresh();
            };
        }
    }
    this.getUpdatedTask = function(item) {
        var title = item.getElementsByTagName('task-title')[0].innerHTML;
        var description = item.getElementsByTagName('p')[0].innerHTML;
        var checked = item.getElementsByTagName('input')[0].checked;
        var task = new Task(title, description, checked);
        return task;
    }
    this.getCorrespondingTabContent = function(item) {
        return document.getElementById(item.getAttribute('name'));
    }
    this.makeActiveAmongSiblings = function(item) {
        var result = this.getAllSiblings(item);
        for (var i = 0; i < result.length; i++) {
            result[i].classList.remove("active");
        }
        item.classList.add("active");
    }
    this.getAllSiblings = function(item) {
        var result = [],
        node = item.parentNode.firstChild;
        while(node) {
            if(node.nodeType === 1) result.push(node);
            node = node.nextSibling;
        }
        return result;
    }
    this.viewEditOptions = function(id){
        var task = repo.getTask(id);
        document.getElementById('edit-title').value = task.title;
        document.getElementById('edit-description').value = task.description;
        var tab = document.getElementsByName('edittask');
        listener.tabSelect(tab[0]);
    }
    this.clearInput = function() {
        document.getElementById('input-title').value = "";
        document.getElementById('input-description').value = "";
    }
    this.moveToList = function() {
        var tab = document.getElementsByName('tasklist');
        listener.tabSelect(tab[0]);
    }
}
var frontView = new FrontView();
