const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearAllButton = document.getElementById('clearAllButton');

// Load tasks from localStorage when the page is loaded
window.addEventListener('load', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text));
});

// Function to add a task to the list
function addTask(taskText) {
    const newTask = document.createElement('li');
    newTask.textContent = taskText;

    // Create edit button
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';  // Font Awesome edit icon
    editButton.classList.add('edit-btn');
    editButton.setAttribute('aria-label', 'Edit task');

    // Create delete button with trash icon
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';  // Font Awesome trash icon
    deleteButton.classList.add('delete-btn');
    deleteButton.setAttribute('aria-label', 'Delete task');
    
    deleteButton.addEventListener('click', function() {
        newTask.remove();
        saveTasks();  // Save tasks to localStorage after deletion
    });

    // Append buttons to the task
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);

    // Add edit button functionality
    editButton.addEventListener('click', function() {
        const newText = prompt("Edit your task:", taskText);
        if (newText !== null && newText.trim() !== "") {
            newTask.firstChild.textContent = newText.trim(); // Update task text
            saveTasks(); // Save updated tasks to localStorage
        }
    });

    saveTasks(); // Save tasks to localStorage after adding
}

// Event listener for the "Add Task" button
addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a valid task!');
        return;
    }
    addTask(taskText);
    taskInput.value = '';
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
        taskInput.value = '';
    }
});

// Event listener for the "Clear All Tasks" button
clearAllButton.addEventListener('click', function() {
    taskList.innerHTML = ''; // Clears all tasks
    saveTasks(); // Save empty task list to localStorage
});

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskElements = taskList.querySelectorAll('li');
    
    taskElements.forEach(taskElement => {
        tasks.push({ text: taskElement.firstChild.textContent });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
