function Controller() {
    this.init = function() {
        var app = angular.module("app-tasklist", []);
        app.service('repository', function () {
            this.taskList = {};
            this.addTask = function (title, description, checked) {
                var task = new Task(title, description, checked);
                var maxId = 0;
                for (var key in this.taskList) {
                    if (key > maxId) maxId = key;
                }
                this.taskList[++maxId] = task;
                this.updateLocalStorage();
            }
            this.removeTask = function (id) {
                delete this.taskList[id];
                this.updateLocalStorage();
            }
            this.updateTask = function (id, task) {
                this.taskList[id] = task;
                this.updateLocalStorage();
            }
            this.updateCheckedStatus = function (id) {
                this.taskList[id].checked = !this.taskList[id].checked;
                this.updateLocalStorage();
            }
            this.updateLocalStorage = function () {
                localStorage.setItem('to-do-list', JSON.stringify(this.taskList));
            }
            this.cloneLocalStorage = function () {
                if (localStorage.getItem("to-do-list") == null) return;
                this.taskList = JSON.parse(localStorage.getItem("to-do-list"));
            }
            this.getTask = function (id) {
                return this.taskList[id];
            }
            this.getTaskList = function () {
                return this.taskList;
            }
            this.getTaskCount = function () {
                return this.taskList.length;
            }
        });
        app.controller('app-tasklist-ctrl', function($scope, repository) {
            $scope.selectedTabName = "tasklist";
            $scope.todoFilter = "all";
            $scope.searchKey = "";
            repository.cloneLocalStorage();
            $scope.tasklist = repository.getTaskList();
            $scope.addTask = function () {
                repository.addTask(addtaskform.addtasktitle.value, addtaskform.addtasktitle.value, false);
                $scope.selectedTabName='tasklist';
            }
            $scope.editTask = function(id) {
                $scope.editid = id;
                $scope.edittasktitle = $scope.tasklist[id].title;
                $scope.edittaskdescription = $scope.tasklist[id].description;
                $scope.selectedTabName='edittask';
            }
            $scope.updateTask = function() {
                var task = new Task(edittaskform.edittasktitle.value, edittaskform.edittaskdescription.value, $scope.tasklist[$scope.editid].checked);
                repository.updateTask($scope.editid, task);
                $scope.selectedTabName='tasklist';
            }
            $scope.deleteTask = function(id) {
                repository.removeTask(id);
            }
            $scope.updateCheckedStatus = function(id) {
                repository.updateCheckedStatus(id);
            }
        });
    }
}
var controller = new Controller();
controller.init();
