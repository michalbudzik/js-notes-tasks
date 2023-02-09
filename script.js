const element = document.querySelector(".one");
function startApp() {
  element.parentNode.removeChild(element);
}

document.querySelector("#newNote").addEventListener("click", () => {
  document.getElementById("removeDiv").style.display = "none";
  document.getElementById("popupCreate").style.display = "block";
});

let notesListRootElement = document.querySelector(".notelist");
let notes = [];

function renderElementToScreen() {
  if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
    notes.forEach((note) => {
      renderNoteToList(note, note.uniqueID);
    });
  }
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => {
      renderTaskToList(task, task.uniqueID);
    });
  }
}

document.querySelector("#createNoteButton").addEventListener("click", () => {
  if (
    document.querySelector("#createNoteTitle").value == "" &&
    document.querySelector("#createNoteContent").value == ""
  ) {
    alert("NOTE CAN NOT BE EMPTY");
  } else {
    let uniqueID = "note" + Math.floor(Math.random() * 100);
    let note = {
      title: document.querySelector("#createNoteTitle").value,
      content: document.querySelector("#createNoteContent").value,
      tasks: [],
    };
    addNoteToLocalStorage(note, uniqueID);
    renderNoteToList(note, uniqueID);
    document.getElementById("popupCreate").style.display = "none";
    document.getElementById("removeDiv").style.display = "block";
  }
  // --------------------------
});

function renderNoteToList(note, uniqueID) {
  let noteDiv = document.createElement("div");
  noteDiv.classList.add("note", uniqueID);
  let noteTitle = document.createElement("h1");
  let noteContent = document.createElement("p");
  let noteDeleteButton = document.createElement("Button");

  let div = document.createElement("div");
  div.setAttribute("id", "taskNoteList");

  noteTitle.innerText = note.title;
  noteContent.innerText = note.content;
  noteDeleteButton.innerHTML = "Delete Note";

  noteDeleteButton.addEventListener("click", () => {
    removeElementFromNoteList(uniqueID);
    localStorage.clear();
  });

  noteDiv.addEventListener("click", (element) => {
    if (element.target === noteDeleteButton) {
      removeElementFromNoteList(uniqueID);
      localStorage.clear();
    } else {
      document.getElementById("popupCreate").style.display = "none";
      document.getElementById("popupNote").style.display = "block";
    }

    let headrright = document.querySelector(".headrright");
    headrright.innerText = note.title;

    let notecontent = document.querySelector(".notecontent");
    notecontent.innerHTML = note.content;
  });

  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(div);
  noteDiv.appendChild(noteDeleteButton);

  notesListRootElement.appendChild(noteDiv);
  (document.querySelector("#createNoteTitle").value = ""),
    (document.querySelector("#createNoteContent").value = "");

  console.log(noteDiv);
  document.querySelector("#CreateTask").addEventListener("click", () => {
    if (document.querySelector("#taskname").value == "") {
      alert("TASK NAME CAN NOT BE EMPTY");
    } else {
      let uniqueID = "task" + Math.floor(Math.random() * 100);
      let task = {
        name: document.querySelector("#taskname").value,
      };
      note.tasks.push(task);
      localStorage.setItem("notes", JSON.stringify(notes));
      addTaskToLocalStorage(task, uniqueID);
      renderTaskToList(task, uniqueID);
      document.getElementById("popupTask").style.display = "none";
      document.getElementById("popupNote").style.display = "block";
    }
  });
  // Disable the click event listener
  document.querySelector("#CreateTask").removeEventListener("click", () => {});
}

tasklist = document.getElementById("#tasklist");
tasks = [];

function renderTaskToList(task, uniqueID) {
  tasklist = document.querySelector("#tasklist");

  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task", uniqueID);
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.id = "checkbox";
  let taskname = document.createElement("p");

  taskname.innerText = task.name;

  tasklist.appendChild(taskDiv);
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(taskname);

  document.querySelector("#taskname").value = "";
  checkbox.addEventListener("click", () => {
    console.log(true);
    alert("TASK COMPLEATED! YOU WANT TO REMOVE IT");
    removeElementFromTaskList(uniqueID);
  });
}

document.querySelector("#newtask").addEventListener("click", () => {
  document.getElementById("popupNote").style.display = "none";
  document.getElementById("removeDiv").style.display = "none";
  document.getElementById("popupTask").style.display = "block";
});

function addNoteToLocalStorage(note, uniqueID) {
  note = { ...note, uniqueID, tasks };
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addTaskToLocalStorage(task, uniqueID) {
  task = { ...task, uniqueID };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

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
