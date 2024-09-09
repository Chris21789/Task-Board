// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    // the new id should be stored in localstorage
    // how do we that?
    // how do also increment the value 
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // create the delete button here and create the addeventlistener here
    // reference handleDeleteTask() here
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // this is where they implement in the solution the drag & drop. use jqueryui.com
    // call the createTaskCard() here 
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    // this is where you will retrieve user's input
    // how do you grab value from a form?
    // put all your tasks in an array
    // store it to local storage
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    // this is the last one you'll work on
    // filter() function
    // for loop, if that value exists in the array, thats the one i should delete, and keep the rest
    // how do i remove a value from an array?
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // updating the status of your task
    // you have an array of task object
    // in that task object, you should have a key for the status
    // afterwards, renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // render task list first
    // add event listener on the add task form
    // implement droppable
    // add the datepicker

});
    $(function(){
        $('#datepicker').datepicker({
            changeMonth: true,
            changeYear: true,
        });
    });