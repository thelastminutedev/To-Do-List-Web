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
    deleteButton.addEventListener('click', function() {
        newTask.remove();
    });

    // Append delete button to the task
    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
}

// Event listener for the "Add Task" button
addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

// Event listener for pressing the Enter key
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    }
});
