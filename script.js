// Splash Screen Container
const element = document.querySelector(".one");
function startApp() {
  // Remove Spash Screen to show Main App
  element.parentNode.removeChild(element);
}

// Hide Right Screens when Clicking Create New Note Button
document.querySelector("#newNote").addEventListener("click", () => {
  // Hide Default Right Panel
  document.getElementById("removeDiv").style.display = "none";
  // Hide Screen to Create New Task
  document.getElementById("popupTask").style.display = "none";
  // Show Screen to Create New Note
  document.getElementById("popupCreate").style.display = "block";
});

// List of Notes Container
let notesListRootElement = document.querySelector(".notelist");
// Saved Notes
let notes = [];

// Define variable to store currently active/open Note 
let currentNote = '';

// Render Notes and Tasks based on localStorage Data 
function renderElementToScreen() {
  // Reset Elements
  document.getElementById('tasklist').innerHTML = '';
  notesListRootElement.innerHTML = '';
  //document.getElementByClass('notelist').innerHTML = '';
  // Render Notes List
  if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
    notes.forEach((note) => {
      console.log(currentNote);
      renderNoteToList(note, note.uniqueID);
      // If this is Current Note Show its Tasks
      if (note.uniqueID === currentNote) {
        note.tasks.forEach((task) => {
          //console.log(task);
          renderTaskToList(task, task.uniqueID);
        });
      }
    });
  }
}

// Save Note on Button Click
document.querySelector("#createNoteButton").addEventListener("click", () => {
  // Check if Note Title is Empty
  if (document.querySelector("#createNoteTitle").value === "") {
    alert("NOTE CAN NOT BE EMPTY");
  } else {
    // Set Unique ID for New Note
    let uniqueID = "note" + Math.floor(Math.random() * 100);
    // Set New Note's Data
    let note = {
      title: document.querySelector("#createNoteTitle").value,
      content: document.querySelector("#createNoteContent").value,
      tasks: [],
    };
    // Sae Note to localStorage
    addNoteToLocalStorage(note, uniqueID);
    // Render New Note to Note's List
    renderNoteToList(note, uniqueID);
    // Hide Screen to Create New Note
    document.getElementById("popupCreate").style.display = "none";
    // Hide Screen to Create New Task
    document.getElementById("popupTask").style.display = "none";
    // Show Default Right Panel
    document.getElementById("removeDiv").style.display = "block";
  }
});

// Render Note Item to Show in Notes List
function renderNoteToList(note, uniqueID) {
  // Create Necessary DOM Elements
  let noteDiv = document.createElement("div");
  noteDiv.classList.add("note", uniqueID);
  let noteTitle = document.createElement("h1");
  let noteContent = document.createElement("p");
  let noteDeleteButton = document.createElement("Button");
  let div = document.createElement("div");
  div.setAttribute("id", "taskNoteList");
  // Set Note Values
  noteTitle.innerText = note.title;
  noteContent.innerText = note.content;
  noteDeleteButton.innerHTML = "Delete Note";

  // Delete Note On Click - currently deleting All Notes from localStorage
  noteDeleteButton.addEventListener("click", () => {
    removeElementFromNoteList(uniqueID);
    localStorage.clear();
  });

  // Behavior when Note is Clicked
  noteDiv.addEventListener("click", (element) => {
    // Delete Note On Delete Button Click   - currently deleting All Notes from localStorage
    if (element.target === noteDeleteButton) {
      removeElementFromNoteList(uniqueID);
      localStorage.clear();
    } else {
      // Hide Screen to Create New Note
      document.getElementById("popupCreate").style.display = "none";
      // Hide Screen to Create New Task
      document.getElementById("popupTask").style.display = "none";
      // Show Screen to Edit Selected Note
      document.getElementById("popupNote").style.display = "block";
      // Assign UniqueID to global variable currentNote
      currentNote = uniqueID;
      // Refresh Visible Elements
      renderElementToScreen();
    }

    // Update Header Text of the Section
    let headrright = document.querySelector(".headrright");
    headrright.innerText = '#' + uniqueID + ': ' + note.title;

    // Update Note's Content
    let notecontent = document.querySelector(".notecontent");
    notecontent.innerHTML = note.content;
  });

  // Append Elements to DOM
  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(div);
  noteDiv.appendChild(noteDeleteButton);
  notesListRootElement.appendChild(noteDiv);

  // Reset Add Note Form Inputs Values
  document.querySelector("#createNoteTitle").value = "";
  document.querySelector("#createNoteContent").value = "";
}

// Behavior when Create Task Button is Clicked
document.querySelector("#CreateTask").addEventListener("click", () => {
  console.log('current note: ', currentNote);
  if (document.querySelector("#taskname").value === "") {
    alert("TASK NAME CAN NOT BE EMPTY");
  } else {
    // Create Unique ID for New Task
    let uniqueID = "task" + Math.floor(Math.random() * 100);
    // Create Task Object
    let task = {
      name: document.querySelector("#taskname").value,
    };
    // Add New Task to Currently Selcted Note
    notes.forEach((note) => {
      if (note.uniqueID === currentNote) {
        note.tasks.push(task);
      }
    });
    // Save Data with New Task to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
    // Render New Task on Screen
    renderTaskToList(task, uniqueID);
    // Hide Screen to Create New Task
    document.getElementById("popupTask").style.display = "none";
    // Show Screen to Edit Selected Note
    document.getElementById("popupNote").style.display = "block";
  }
});



// Element with List of Tasks
tasklist = document.getElementById("#tasklist");
// Tasks Array
tasks = [];

// Render Task to List
function renderTaskToList(task, uniqueID) {
  tasklist = document.querySelector("#tasklist");
  // Create DOM Elements
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task", uniqueID);
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.id = "checkbox";
  let taskname = document.createElement("p");
  // Set Values
  taskname.innerText = task.name;
  // Append Elements
  tasklist.appendChild(taskDiv);
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(taskname);

  document.querySelector("#taskname").value = "";
  // Set Checkbox Behavior
  checkbox.addEventListener("click", () => {
    console.log(true);
    alert("TASK COMPLETED! YOU WANT TO REMOVE IT");
    removeElementFromTaskList(uniqueID);
  });
}

// Set Screen when New Task Button is Clicked
document.querySelector("#newtask").addEventListener("click", () => {
  document.getElementById("popupNote").style.display = "none";
  document.getElementById("removeDiv").style.display = "none";
  document.getElementById("popupTask").style.display = "block";
});

// Save Note and its Tasks to localStorage
function addNoteToLocalStorage(note, uniqueID) {
  note = { ...note, uniqueID, tasks };
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addTaskToLocalStorage(task, uniqueID, noteID) {
  task = { ...task, uniqueID };
  tasks.push(task);
  notes = JSON.parse(localStorage.getItem("notes"));
  notes.forEach((note) => {
    if (note.uniqueID === noteID) {
      note.tasks = tasks;
    }
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}






/* DID NOT EDIT ENYTHING BELOW THIS LINE */

document.querySelector("#deletAllenotes").addEventListener("click", () => {
  document.querySelectorAll(".note").forEach((note) => {
    note.remove();
  });
  localStorage.clear();
  window.location.reload();
});

function removeElementFromNoteList(id) {
  console.log(id);
  document.querySelector("." + id).remove();
  notes = JSON.parse(localStorage.getItem("notes"));
  let index = notes.findIndex((note) => note.uniqueID == id);
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function removeElementFromTaskList(id) {
  console.log(id);
  document.querySelector("." + id).remove();
  tasks = JSON.parse(localStorage.getItem("tasks"));
  let index = tasks.findIndex((task) => task.uniqueID == id);
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// NoteToscreen()
renderElementToScreen();

let numberOfNotes = notes.length;
let notesFounded = document.querySelector(".notesFounded");
notesFounded.innerHTML = numberOfNotes;

var el = document.querySelector(".button");

el.addEventListener("click", function () {
  var popupCreate = document.querySelector("#popupCreate");
  popupCreate.style.display = "none";
  document.getElementById("removeDiv").style.display = "block";
});

var removedpopup = document.querySelector("#button");

removedpopup.addEventListener("click", function () {
  var popupNote = document.querySelector("#popupNote");
  popupNote.style.display = "none";
  document.getElementById("removeDiv").style.display = "block";
});
