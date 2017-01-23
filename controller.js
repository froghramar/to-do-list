function Controller() {
    this.updateCheckedStatus = function(item){
        var id = item.getAttribute("data-taskid");
        repo.changeCheckedStatus(id);
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
    repo.addTask('title', 'description', false);
    frontView.refresh();
}
