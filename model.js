function Task(title, description, checked) {
    this.title = title;
    this.description = description;
    this.checked = checked;
}
function SearchModel(searchkey, filter) {
    this.searchkey = searchkey;
    this.filter = filter;
    this.matches = function(task) {
        if(filter.indexOf(task.checked) == -1) return false;
        if(task.title.includes(searchkey)) return true;
        return task.description.includes(searchkey);
    }
}
function Repository() {
    this.taskList = {};
    this.maxId = 0;
    this.addTask = function(title, description, checked){
        var task = new Task(title, description, checked);
        this.taskList[++this.maxId] = task;
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
    this.updateLocalStorage = function() {
        localStorage.setItem('to-do-list', JSON.stringify(this.taskList));
    }
    this.cloneLocalStorage = function() {
        if(localStorage.getItem("to-do-list") == null) return;
        this.taskList = JSON.parse(localStorage.getItem("to-do-list"));
        for (var key in this.taskList) {
            if(key > this.maxId) this.maxId = key;
        }
    }
    this.getTaskList = function() {
        return this.taskList;
    }
    this.getTaskCount = function() {
        return this.taskList.length;
    }
}
var repo = new Repository();
