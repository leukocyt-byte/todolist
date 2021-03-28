const formColor = document.querySelector("form");
const radios = formColor.elements.radioCol;

const avColors = ["redBg", "yellowBg", "blueBg", "pinkBg", "blank"];
const defaultColor = avColors[0];
const cardTemplate = document.querySelector("#card_form");

radios.forEach((radio) => {
  radio.addEventListener("click", (event) => {
    const cont = event.target.closest(".container");
    cont.setAttribute("input-color", radios.value);
  });
});

const form = document.querySelector("#upper-card form");
const taskInput = document.querySelector(".new-task-input");
const collection = document.getElementById("collection");

form.addEventListener("submit", addCard);

function addCard(e) {
  const cont = e.target.querySelector(".container");
  const colorSelected = cont.getAttribute("input-color");
  const cardValue = cont.querySelector("#task").value;
  // if (cardValue == "") {
  //   alert("Please enter your task");
  //   return false;
  //   }

  const card = cardTemplate.cloneNode(true).content;

  card.querySelector(".container").setAttribute("input-color", colorSelected);
  card.querySelector(".new-task-input").value = cardValue;

  let li = document.createElement("li");
  li.classList.add("card-item");
  li.appendChild(card);

  const mainCol = document.getElementById("main-color");
  mainCol.classList.add("blank");
  taskInput.value = "";
  collection.appendChild(li);
  e.preventDefault();
}

collection.addEventListener("click", removeCard);
function removeCard(e) {
  if (e.target.classList.contains("remove-item")) {
    e.target.closest(".card-item").remove();
  }
}

collection.addEventListener("click", editable);
function editable(e) {
  if (!e.target.classList.contains("edit-item")) {
    return;
  } else {
    e.target.classList.add("hidden");
    e.target
      .closest(".container")
      .querySelector(".colors")
      .classList.remove("hidden");
    e.target
      .closest(".container")
      .querySelector(".save-item")
      .classList.remove("hidden");
    e.target
      .closest(".container")
      .querySelector(".new-task-input").disabled = false;
  }
  e.target
    .closest(".container")
    .querySelector(".colors")
    .classList.remove("hidden");

  e.target.closest(".container").classList.remove("small");

  const formColor = e.target.closest("form");
  const radios = formColor.elements.radioCol;
  radios.forEach((radio) => {
    radio.addEventListener("click", (event) => {
      const cont = event.target.closest(".container");
      cont.setAttribute("input-color", radios.value);
    });
  });
}

collection.addEventListener("click", saved);
function saved(e) {
  if (e.target.classList.contains("save-item")) {
    e.target.classList.add("hidden");
    e.target
      .closest(".container")
      .querySelector(".colors")
      .classList.add("hidden");
    e.target
      .closest(".container")
      .querySelector(".save-item")
      .classList.add("hidden");
    e.target
      .closest(".container")
      .querySelector(".edit-item")
      .classList.remove("hidden");
    e.target
      .closest(".container")
      .querySelector(".new-task-input").disabled = true;
    e.target.closest(".container").classList.add("small");
  }
}

collection.addEventListener("change", function (e) {
  if (!e.target.classList.contains("checkbox-container")) {
    return;
  } else {
    e.target
      .closest(".flex-row")
      .querySelector(".new-task-input")
      .classList.toggle("done");
    e.target.closest(".container").classList.toggle("done");
  }
});
