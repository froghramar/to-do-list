function Controller() {
    this.updateCheckedStatus = function(item){
        var id = item.getAttribute("data-taskid");
        var title = item.getElementsByTagName('task-title')[0].innerHTML;
        var description = item.getElementsByTagName('p')[0].innerHTML;
        var checked = item.getElementsByTagName('input')[0].checked;
        var task = new Task(title, description, checked);
        repo.updateTask(id, task);
        frontView.refresh();
    }
}

var controller = new Controller();

function Listener() {
    this.tabSelect = function(item) {
        frontView.makeActiveAmongSiblings(item);
        var tabview = frontView.getCorrespondingTabContent(item);
        frontView.makeActiveAmongSiblings(tabview);
    }
    this.addTaskEvent = function() {
        var title = frontView.getInputTitle();
        var description = frontView.getInputDescription();
        repo.addTask(title, description, false);
        frontView.refresh();
        frontView.moveToList();
        frontView.clearInput();
    }
    this.checkboxClicked = function(box) {
        controller.updateCheckedStatus(box.parentNode);
    }
}

var listener = new Listener();

window.onload = function() {
    frontView.addRadioButtonListener();
    repo.cloneLocalStorage();
    frontView.refresh();
}
