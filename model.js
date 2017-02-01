function Task(title, description, checked) {
    this.title = title;
    this.description = description;
    this.checked = checked;
}
function Repository() {
    this.taskList = {};
    this.addTask = function(title, description, checked){
        var task = new Task(title, description, checked);
        var maxId = 0;
        for (var key in this.taskList) {
            if(key > maxId) maxId = key;
        }
        this.taskList[++maxId] = task;
        this.updateLocalStorage();
    }
    this.removeTask = function(id){
        delete this.taskList[id];
        this.updateLocalStorage();
    }
    this.updateTask = function(id, task){
        this.taskList[id] = task;
        this.updateLocalStorage();
    }
    this.updateCheckedStatus = function(id) {
        this.taskList[id].checked = !this.taskList[id].checked;
        this.updateLocalStorage();
    }
    this.updateLocalStorage = function() {
        localStorage.setItem('to-do-list', JSON.stringify(this.taskList));
    }
    this.cloneLocalStorage = function() {
        if(localStorage.getItem("to-do-list") == null) return;
        this.taskList = JSON.parse(localStorage.getItem("to-do-list"));
    }
    this.getTask = function(id) {
        return this.taskList[id];
    }
    this.getTaskList = function() {
        return this.taskList;
    }
    this.getTaskCount = function() {
        return this.taskList.length;
    }
}
var repo = new Repository();
