const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const prioritySelect = document.getElementById('prioritySelect');
const dueDateInput = document.getElementById('dueDateInput'); // Due date input field
let taskToEdit = null; // To track the task being edited

// Function to add or edit a task in the list
function addTask(taskText, priority, dueDate, isEditing = false) {
    const newTask = document.createElement('li');
    newTask.classList.add('task-item');
    newTask.setAttribute('draggable', 'true'); // Make the task draggable
    
    // Assign priority class
    if (priority === 'low') {
        newTask.classList.add('low-priority');
    } else if (priority === 'medium') {
        newTask.classList.add('medium-priority');
    } else if (priority === 'high') {
        newTask.classList.add('high-priority');
    }

    // Create task text element
    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;

    // Create due date element
    const dueDateElement = document.createElement('span');
    dueDateElement.classList.add('due-date');
    dueDateElement.textContent = dueDate ? `Due: ${new Date(dueDate).toLocaleDateString()}` : '';

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            newTask.classList.add('completed');
        } else {
            newTask.classList.remove('completed');
        }
    });

    // Create edit button with pencil icon
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add('edit-btn');
    editButton.setAttribute('aria-label', 'Edit task');
    editButton.addEventListener('click', function () {
        taskInput.value = taskText;
        prioritySelect.value = priority;
        dueDateInput.value = dueDate; // Set the due date in the input field
        taskInput.focus();
        taskToEdit = newTask; // Set the task being edited
    });

    // Create delete button with trash icon
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    deleteButton.setAttribute('aria-label', 'Delete task');
    deleteButton.addEventListener('click', function () {
        newTask.classList.add('deleted'); // Trigger fade-out animation
        setTimeout(() => {
            newTask.remove(); // Remove the task after fade-out
        }, 300); // Match the duration of fade-out (300ms)
    });

    // Append checkbox, task text, due date, and buttons
    newTask.appendChild(checkbox);
    newTask.appendChild(taskTextElement);
    newTask.appendChild(dueDateElement); // Append the due date
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);

    // Add the new task to the task list and trigger fade-in effect
    taskList.appendChild(newTask);
    setTimeout(() => {
        newTask.classList.add('visible'); // Fade-in animation
    }, 10); // Small delay to trigger the transition

    // If we are editing, apply changes to the task
    if (isEditing && taskToEdit) {
        taskToEdit.classList.add('editing'); // Animate task text changes
    }

    // Enable dragging functionality
    enableDragAndDrop(newTask);
}

// Enable drag-and-drop functionality
function enableDragAndDrop(taskItem) {
    taskItem.addEventListener('dragstart', function (e) {
        taskItem.classList.add('dragging');
    });

    taskItem.addEventListener('dragend', function (e) {
        taskItem.classList.remove('dragging');
    });

    taskList.addEventListener('dragover', function (e) {
        e.preventDefault();
        const draggingTask = document.querySelector('.dragging');
        const allTasks = [...taskList.querySelectorAll('.task-item')];
        const nextTask = allTasks.filter(task => {
            return task !== draggingTask && task.getBoundingClientRect().top < e.clientY && task.getBoundingClientRect().bottom > e.clientY;
        })[0];

        if (nextTask) {
            taskList.insertBefore(draggingTask, nextTask);
        } else {
            taskList.appendChild(draggingTask);
        }
    });
}

// Event listener for the "Add Task" button
addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    const taskPriority = prioritySelect.value;
    const taskDueDate = dueDateInput.value; // Get the due date value

    if (taskText === '') {
        alert('Please enter a valid task!');
        return;
    }

    if (taskToEdit) {
        // Editing an existing task
        taskToEdit.querySelector('span').textContent = taskText;
        taskToEdit.querySelector('.due-date').textContent = taskDueDate ? `Due: ${new Date(taskDueDate).toLocaleDateString()}` : '';
        taskToEdit.classList.remove('editing');
        taskToEdit = null; // Reset editing task
    } else {
        // Adding a new task
        addTask(taskText, taskPriority, taskDueDate);
    }

    taskInput.value = ''; // Clear the input field after adding or editing task
    prioritySelect.value = 'low'; // Reset the priority select to default
    dueDateInput.value = ''; // Clear the due date input
});

// Event listener for pressing the Enter key
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const taskText = taskInput.value.trim();
        const taskPriority = prioritySelect.value;
        const taskDueDate = dueDateInput.value;

        if (taskText === '') {
            alert('Please enter a valid task!');
            return;
        }

        if (taskToEdit) {
            // Editing an existing task
            taskToEdit.querySelector('span').textContent = taskText;
            taskToEdit.querySelector('.due-date').textContent = taskDueDate ? `Due: ${new Date(taskDueDate).toLocaleDateString()}` : '';
            taskToEdit.classList.remove('editing');
            taskToEdit = null; // Reset editing task
        } else {
            // Adding a new task
            addTask(taskText, taskPriority, taskDueDate);
        }

        taskInput.value = ''; // Clear the input field after adding or editing task
        prioritySelect.value = 'low'; // Reset the priority select to default
        dueDateInput.value = ''; // Clear the due date input
    }
});

// Clear all tasks button functionality
const clearAllButton = document.getElementById('clearAllButton');
clearAllButton.addEventListener('click', function () {
    taskList.innerHTML = ''; // Clears all tasks
});
