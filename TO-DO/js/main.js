addEventsToInputs();
changeTitelToInput();

// Create function to add event listeners to task input fields
function addEventsToInputs() {
    // Get all input fields with class "toDo-input"
    var taskInput = document.getElementsByClassName("toDo-input");
    // Loop through each input field
    for (var i = 0; i < taskInput.length; i++) {
        //When you release the key / add an event listener for keyup event
        taskInput[i].onkeyup = function (event) {
            // Call newTask function passing event object
            newTask(event); //find this function at the bottom / This function handles adding a new task
        }
    }
}

// Create function to change title to input fields
function changeTitelToInput() {
    // Get all elements with class "toDo-header"
    var headers = document.getElementsByClassName("toDo-header");
    // Loop through each header element
    for (var i = 0; i < headers.length; i++) {
        // Add an onclick event listener
        headers[i].onclick = function (event) {
            // Store the current title
            var oldTitle = this.children[0].innerText;
            // Remove the title element / the h2
            this.children[0].remove();
            // Create a new input element with id input
            var newInput = document.createElement("input");
            // Pass a class to the new input
            newInput.classList = "toDo-headerInput";
            // Keep the old titel / the current h2 as a value inside the input field
            newInput.value = oldTitle;
            // Store the old title in memort of the website
            this.appendChild(newInput);
            // Focus on the input field / make a blue line arount the field
            newInput.focus();

            // Add an event listener for keyup event on the new input element
            newInput.onkeyup = function (event) {
                // Check if the Enter key is pressed
                if (event.key === "Enter") {
                    // Get the new title value
                    var newTitle = event.target.value;
                    // Create a new heading element
                    var newHeading = document.createElement("h2");
                    // Append the new heading with the new title
                    event.target.parentElement.appendChild(newHeading);
                    // Show the new heading as a new title
                    newHeading.innerText = newTitle;
                    // Pass a class to the new heading
                    newHeading.classList = "toDo-heading";
                    // Remove the input element
                    this.remove();
                }
            }
        }
    }
}

// Create function to handle adding a new task
function newTask(event) {
    // Check if the Enter key is pressed
    if (event.key === "Enter") {
        // Get the list of tasks / The ul with id toDo-tasks
        var tasks = event.target.parentElement.parentElement.children[1].children[0]
        // Create a new task item / new li
        var newTask = document.createElement("li");
        newTask.innerText = event.target.value;
        // Pass the class to the new task / the same class as the previous tasks 
        newTask.classList = "toDo-task";
        // Set a custom data attribute running on the newTask element and assign the string value false
        newTask.dataset.running = "false";
        // Append the new task to the list
        tasks.appendChild(newTask);
        // Clear the input field
        event.target.value = "";
        // Add click event listener to the new task
        newTask.onclick = function (event) {
            // Call setOrClearTimer function to start/stop timer
            setOrClearTimer(event); //find this function at the bottom / This function manages the timer associated with a task
        }
    }
}

// Get all elements with the class "toDo-task" / li
var tasks = document.getElementsByClassName("toDo-task");
// Initialize a variable to hold the timer reference
var timer = null;
// Loop through each "toDo-task" element
for (var i = 0; i < tasks.length; i++) {
    // Add an onclick event listener to each "toDo-task" element
    tasks[i].onclick = function (event) {
        // Call the setOrClearTimer function to start/stop the timer
        setOrClearTimer(event);
    }
}

// Create function to move task to Done list 
function toDone(event) {
    // Set a timer to execute the following function 
    timer = setTimeout(function () {
        // Create a new list item for the completed task
        var doneTask = document.createElement("li");
        // Add classes to the new list item to style it as a completed task
        doneTask.classList = "toDo-task toDo-task-done";
        // Set the text content of the completed task to match the original task's text
        doneTask.innerText = event.target.innerText;
        // Append the completed task to the Done list
        document.getElementById("done").appendChild(doneTask);
        // Remove the original task from its parent element
        event.target.remove();
    }, 3000) // Delay of 3000 milliseconds (3 seconds)
}

// Create function to set or clear timer for moving task to Done list
function setOrClearTimer(event) {
    // Check if the task is not currently running
    if (event.target.dataset.running === "false") {
        // Toggle the CSS class to indicate task completion
        event.target.classList.toggle("toDo-task-done");
        // Update the dataset attribute to indicate the task is now running
        event.target.dataset.running = "true";
        // Call toDone function after 3 seconds
        toDone(event);
    }
    // Check if the task is currently running
    else if (event.target.dataset.running === "true") {
        event.target.classList.toggle("toDo-task-done");
        // Call clearTimeout function / This function clears the timer if the task is clicked again before it completes
        clearTimeout(timer);
        // Update the dataset attribute to indicate the task is no longer running
        event.target.dataset.running = "false";
    }

}

// Get the floating action button element by its id
var fab = document.getElementById("fab");
// When you click on the fab
fab.onclick = function () {
    // Call the makeNewCard function to create a new TO-DO card
    makeNewCard();
    // Set the position style of the fab to "fixed"
    fab.style.position = "fixed";
}


// Function to create a new TO-DO card
function makeNewCard() {
    /*Make the Card */
    var newTodo = document.createElement("article");
    newTodo.classList = "toDo";

    /*Make the Header */
    var newHeader = document.createElement("header");
    newHeader.classList = "toDo-header";

    /*Make the Heading */
    var newHeading = document.createElement("h2");
    newHeading.classList = "toDo-heading";
    newHeading.innerText = "New";

    /*Make the Section */
    var newSection = document.createElement("section");
    newSection.classList = "toDo-body";

    /*Make the UL */
    var newList = document.createElement("ul");
    newList.classList = "toDo-tasks";

    /*Make the Footer */
    var newFooter = document.createElement("footer");
    newFooter.classList = "toDo-footer";

    /*Make the Input */
    var newInput = document.createElement("input");
    newInput.classList = "toDo-input";
    newInput.type = "text";
    newInput.placeholder = "Enter a task...";



    newFooter.appendChild(newInput);
    newSection.appendChild(newList);
    newHeader.appendChild(newHeading);
    newTodo.appendChild(newHeader);
    newTodo.appendChild(newSection);
    newTodo.appendChild(newFooter);

    document.getElementsByTagName("body")[0].appendChild(newTodo);
    addEventsToInputs();
    changeTitelToInput();

}


