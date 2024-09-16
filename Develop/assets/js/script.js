const taskTitleInputEl = $('#task-title');
const taskDueDateInputEl = $('#task-due-date');
const taskDescriptionInputEl = $('#task-description');

// Retrieve tasks and nextId from localStorage
function readTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        tasks = [];
    }

    return tasks;
}//dont

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}//done


let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id 
// the new id should be stored in localstorage
// how do we that?
// how do also increment the value 
function generateTaskId(nextId) {
    if (nextId === 'null') {
        nextId = 1;
    } else {
        nextId++;
    }

    localStorage.setItem('nextId', nextId);
    return nextId;
}

// Todo: create a function to create a task card
// create the delete button here and create the addeventlistener here
// reference handleDeleteTask() here
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<div>').addClass('card-text').text(task.description);
    const cardDueDate = $('<div>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id'.task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}//done

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // this is where they implement in the solution the drag & drop. use jqueryui.com
    // call the createTaskCard() here 
    const tasks = readTasksFromStorage();

    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    for (let task of tasks) {
        if (task.status === 'to-do') {
            todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    }

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,

        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');

                return original.clone().css({
                    width: origin.outerWidth(),
                });
        },
    });
}//done

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    // this is where you will retrieve user's input
    // how do you grab value from a form?
    // put all your tasks in an array
    // store it to local storage
    event.preventDefault();

    const taskTitle = taskTitleInputEl.val().trim();
    const taskDescription = taskDescriptionInputEl.val().trim();
    const taskDueDate = taskDueDateInputEl.val();

    const newTask = {
        name: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        status: 'to-do',
    };

    const tasks = readTasksFromStorage();
    tasks.push(newTask);

    saveTasksToStorage(tasks);

    renderTaskList();

    taskTitleInputEl.val('');
    taskDescriptionInputEl.val('');
    taskDueDateInputEl.val('');
}//done

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    // this is the last one you'll work on
    // filter() function
    // for loop, if that value exists in the array, thats the one i should delete, and keep the rest
    // how do i remove a value from an array?
    const taskId = $(this).attr('data-task-id');
    const tasks = readTasksFromStorage();

    tasks.forEach((task) => {
        if (task.id === taskId) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });

    saveTasksToStorage(tasks);

    renderTaskList();
}//done

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // updating the status of your task
    // you have an array of task object
    // in that task object, you should have a key for the status
    // afterwards, renderTaskList();
    const tasks = readTasksFromStorage();

    const taskId = ui.draggable[0].dataset.taskId;

    const newStatus = event.target.id;

    for (let task of tasks) {
        if (task.id === taskId) {
            task.status = newStatus;
        }
    }

    saveTasksToStorage(tasks);
    renderTaskList();
}//done

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // render task list first
    // add event listener on the add task form


    // implement droppable
    $('lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

    // add the datepicker
    $('#datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
    });
});