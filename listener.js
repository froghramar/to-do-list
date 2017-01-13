var totalTasks = 0;

$(document).ready(function(){
    $("inputdiv").hide();
    $("button").click(function () {
        $("inputdiv").slideToggle();
    });
    $("input[type='checkbox']").change(function() {
        if(this.checked) {
            this.parentNode.style.backgroundColor = 'cyan';
        }
        else{
            this.parentNode.style.backgroundColor = 'white';
        }
    });
});

function newListener() {
    document.getElementById('new').disabled = true;
}

function addListener() {
    document.getElementById('new').disabled = false;
    document.getElementById('counter').innerHTML = "[ " + (++totalTasks) + " tasks ]";
    var title = document.getElementById('input-title');
}

function canceListener() {
    document.getElementById('new').disabled = false;
}
