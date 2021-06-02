//show notes from local storage(if any) as soons as the user enters here
showNotes();

// If user clicks on add note btn, add it to local storage
let addBtn = document.getElementById("addBtn");

//fucntion to show notes from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";

  notesObj.forEach((ele, idx) => {
    html += `
        <div class="card noteCard my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${idx + 1}</h5>
              <p class="card-text">${ele}</p>
              <button id = "${idx}" onclick = "deleteNote(this.id)" class="btn btn-primary" id="delBtn">Delete Note</button>
            </div>
          </div>
                `;
  });

  let notesELm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesELm.innerHTML = html;
  } else {
    notesELm.innerHTML = `Nothing to show here ! Use the above "Add Note" section to add notes.`;
  }
}

//added event listener to the "Add" button
addBtn.addEventListener("click", (e) => {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  //   console.log(notesObj);
  showNotes();
});

//fucntion to delete a note

function deleteNote(idx) {
  //   console.log("Deleting in progress...");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(idx, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
  //   console.log("Completed Succesfully !");
}

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", () => {
  let txt = searchTxt.value.toLowerCase();
  let noteCard = document.getElementsByClassName("noteCard");
  Array.from(noteCard).forEach((ele) => {
    let cardTxt = ele.getElementsByTagName("p")[0].innerHTML.toLowerCase();

    if (cardTxt.includes(txt)) {
      ele.style.display = "block";
    } else {
      ele.style.display = "none";
    }

    if (txt.length == 0) showNotes();
  });
});
