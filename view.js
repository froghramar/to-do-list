function FrontView() {
    var totalTasks = 0;
    this.refresh = function() {
        this.updateListView();
        this.updateCounterMessage();
    }
    this.updateCounterMessage = function() {
        var message = totalTasks > 0 ? "[ " + totalTasks + " tasks ]" : "[ No task ]";
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
    this.addTask = function(task) {
        var item = document.createElement("div");
        item.className = "task";
        item.appendChild(this.createCheckbox(task.checked));
        item.appendChild(this.createTaskTitle(task.title));
        item.appendChild(this.createTaskDescription(task.description));
        if(task.checked){
            item.classList.add('task-checked');
        }
        document.getElementById('list').appendChild(item);
    }
    this.updateListView = function() {
        totalTasks = 0;
        this.removeAllChild(document.getElementById('list'));
        var searchModel = this.getSearchModel();
        var taskList = model.getTaskList();
        for (var i = 0; i < taskList.length; i++) {
            if(searchModel.matches(taskList[i])){
                totalTasks++;
                this.addTask(taskList[i]);
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
    this.addRadioButtonListener = function() {
        var rad = document.filterform.filter;
        var prev = null;
        for(var i = 0; i < rad.length; i++) {
            rad[i].onclick = function() {
                frontView.refresh();
            };
        }
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