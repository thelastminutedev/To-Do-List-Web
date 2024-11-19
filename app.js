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
        newTask.classList.add('fade-out');
        setTimeout(function() {
            newTask.remove();
            saveTasks();  // Save tasks after deleting
        }, 500);
    });

    // Append delete button to the task
    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);

    saveTasks();  // Save tasks after adding
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#taskList li');

    taskItems.forEach(function(task) {
        tasks.push(task.textContent.replace('Delete', '').trim());  // Extract task text
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));  // Store tasks in localStorage
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (savedTasks && savedTasks.length > 0) {
        savedTasks.forEach(function(taskText) {
            addTask(taskText);  // Add each saved task to the list
        });
    }
}

// Event listener for the "Add Task" button
addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a valid task!');
        return;
    }
    addTask(taskText);
    taskInput.value = ''; // Clear input after adding
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
        taskInput.value = ''; // Clear input after adding
    }
});

const clearAllButton = document.getElementById('clearAllButton');

clearAllButton.addEventListener('click', function() {
    taskList.innerHTML = ''; // Clears all tasks
    localStorage.removeItem('tasks');  // Remove tasks from localStorage
});

// Load tasks on page load
window.onload = loadTasks;
