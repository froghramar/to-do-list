function Controller() {
    this.init = function() {
        repo.cloneLocalStorage();
        var app = angular.module("app-tasklist", []);
        app.controller('app-tasklist-ctrl', function($scope) {
            $scope.selectedTabName = "tasklist";
            $scope.todoFilter = "all";
            $scope.searchKey = "";
            $scope.tasklist = repo.getTaskList();
            $scope.addTask = function () {
                repo.addTask(addtaskform.addtasktitle.value, addtaskform.addtasktitle.value, false);
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
                repo.updateTask($scope.editid, task);
                $scope.selectedTabName='tasklist';
            }
            $scope.deleteTask = function(id) {
                repo.removeTask(id);
            }
            $scope.updateCheckedStatus = function(id) {
                repo.updateCheckedStatus(id);
            }
        });
    }
}

var controller = new Controller();
controller.init();
