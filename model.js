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
    }
    this.removeTask = function(id){
        delete this.taskList[id];
    }
    this.changeCheckedStatus = function(id){
        this.taskList[id].checked = !this.taskList[id].checked;
    }
    this.getTaskList = function() {
        return this.taskList;
    }
    this.getTaskCount = function() {
        return this.taskList.length;
    }
}
var repo = new Repository();
