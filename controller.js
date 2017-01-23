function Controller() {
    this.editId = 0;
    this.updateTask = function(item){
        var id = item.getAttribute("data-taskid");
        var task = frontView.getUpdatedTask(item);
        repo.updateTask(id, task);
        frontView.refresh();
    }
    this.removeTask = function(id) {
        repo.removeTask(id);
        frontView.refresh();
    }
    this.updateAfterEdit = function() {
        var title = frontView.getEditedTitle();
        var description = frontView.getEditedDescription();
        var checked = repo.getTask(this.editId).checked;
        var task = new Task(title, description, checked);
        repo.updateTask(this.editId, task);
        frontView.refresh();
        frontView.moveToList();
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
    this.updateButtonEvent = function() {
        controller.updateAfterEdit();
    }
    this.checkboxClicked = function(box) {
        controller.updateTask(box.parentNode);
    }
    this.deleteButtonClicked = function(button) {
        var id = button.parentNode.getAttribute('data-taskid');
        controller.removeTask(id);
    }
    this.editButtonClicked = function(button) {
        var id = button.parentNode.getAttribute('data-taskid');
        controller.editId = id;
        frontView.viewEditOptions(id);
    }
}

var listener = new Listener();

window.onload = function() {
    frontView.addRadioButtonListener();
    repo.cloneLocalStorage();
    frontView.refresh();
}
