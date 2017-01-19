function Task(title, description, checked) {
    this.title = title;
    this.description = description;
    this.checked = checked;
    this.equals = function(task){
        return (this.title == task.title && this.description == task.description && this.checked == task.checked) ? true : false;
    }
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
function Model() {
    this.taskList = new Array();
    this.addTask = function(title, description, checked){
        var task = new Task(title, description, checked);
        this.taskList.push(task);
    }
    this.removeTask = function(title, description, checked){
        var task = new Task(title, description, checked);
        var len = this.getTaskCount();
        for (var i = 0; i < len; i++) {
            if(task.equals(this.taskList[i])){
                this.taskList.splice(i, 1);
                return;
            }
        }
    }
    this.changeCheckedStatus = function(title, description, checked){
        var task = new Task(title, description, checked);
        var len = this.getTaskCount();
        for (var i = 0; i < len; i++) {
            if(task.equals(this.taskList[i])){
                this.taskList[i].checked = !checked;
                return;
            }
        }
    }
    this.getTaskList = function() {
        return this.taskList;
    }
    this.getTaskCount = function() {
        return this.taskList.length;
    }
}
var model = new Model();
