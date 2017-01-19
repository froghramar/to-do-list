function Controller() {
    this.updateCheckedStatus = function(item){
        var text = frontView.getAllSiblings(item);
        var title = text[1].innerHTML;
        var description = text[2].innerHTML;
        var checked = item.checked;
        model.changeCheckedStatus(title, description, !checked);
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
        model.addTask(title, description, false);
        frontView.refresh();
        frontView.moveToList();
        frontView.clearInput();
    }
    this.checkboxClicked = function(box) {
        controller.updateCheckedStatus(box);
    }
}

var listener = new Listener();

window.onload = function() {
    frontView.addRadioButtonListener();
    frontView.refresh();
}
