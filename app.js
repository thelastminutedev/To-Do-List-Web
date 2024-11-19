const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add a task to the list
function addTask(taskText) {
    const newTask = document.createElement('li');
    newTask.textContent = taskText;

    // Create delete button with trash icon
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';  // Font Awesome trash icon
    deleteButton.classList.add('delete-btn');
    deleteButton.setAttribute('aria-label', 'Delete task');
    deleteButton.addEventListener('click', function() {
        newTask.remove();
    });

    // Create edit button with pencil icon
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';  // Font Awesome edit icon
    editButton.classList.add('edit-btn');
    editButton.setAttribute('aria-label', 'Edit task');
    editButton.addEventListener('click', function() {
        // When the edit button is clicked, set the input box value to the task text
        taskInput.value = taskText;
        newTask.remove();
    });

    // Append edit and delete buttons to the task
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
}

// Event listener for the "Add Task" button
addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a valid task!');
        return;
    }
    addTask(taskText);
    taskInput.value = ''; // Clear the input field after adding task
});

// Event listener for pressing the Enter key
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a valid task!');
            return;
        }
        addTask(taskText);
        taskInput.value = ''; // Clear the input field after adding task
    }
});

// Clear all tasks button functionality
const clearAllButton = document.getElementById('clearAllButton');
clearAllButton.addEventListener('click', function() {
    taskList.innerHTML = ''; // Clears all tasks
});
