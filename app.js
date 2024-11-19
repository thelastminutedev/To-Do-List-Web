const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
    });
}

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
        newTask.classList.add('fade-out');
        setTimeout(function() {
            newTask.remove();
            saveTasks(); // Save tasks after deletion
        }, 500);
    });

    // Append delete button to the task
    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);

    saveTasks(); // Save tasks after adding a new one
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push({ text: task.textContent.replace('×', '').trim() }); // Remove the delete icon's '×' from task text
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
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

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Clear all tasks button
const clearAllButton = document.getElementById('clearAllButton');
clearAllButton.addEventListener('click', function() {
    taskList.innerHTML = '';
    saveTasks(); // Save empty task list to localStorage
});
