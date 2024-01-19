var room = { Name: "", desks: [] };
var TablePreview = document.getElementById("TablePreview");
var submitButton = document.getElementById("AddNewRoomButton");
var roomName = document.getElementById("room");
var x = document.getElementById("x_Dimensions");
var y = document.getElementById("y_Dimensions");

roomName.addEventListener("change", (event) => {
  DrawPreview();
});

x.addEventListener("change", (event) => {
  DrawPreview();
});

y.addEventListener("change", (event) => {
  DrawPreview();
});

function DrawPreview() {
  TablePreview.innerHTML = "";
  //used to enable submit button
  let dimensionsAreNumericalValues = true;

  if (roomName.length == 0) {
    dimensionsAreNumericalValues = false;
  }

  if (x.value.length == 0 || y.value.length == 0) {
    dimensionsAreNumericalValues = false;
  }

  for (let index = 0; index < x.value.length; index++) {
    const x_character = x.value[index];
    if (x_character <= "9" && x_character >= "0") {
      continue;
    } else {
      dimensionsAreNumericalValues = false;
    }
  }

  for (let index = 0; index < x.value.length; index++) {
    const y_character = x.value[index];
    if (y_character <= "9" && y_character >= "0") {
      continue;
    } else {
      dimensionsAreNumericalValues = false;
    }
  }

  if (dimensionsAreNumericalValues) {
    submitButton.disabled = false;

    let newRoom = document.createElement("div");
    newRoom.id = "newRoom";
    let id = 0;
    for (let y_index = 0; y_index < y.value; y_index++) {
      for (let x_index = 0; x_index < x.value; x_index++) {
        let desk = document.createElement("div");
        desk.dataset.active = true;
        desk.dataset.x = x_index + 1;
        desk.dataset.y = y_index + 1;
        desk.style.gridColumn = x_index + 1;
        desk.style.gridRow = y_index + 1;
        let setDeskName = document.createElement("input");
        desk.className = "desk " + id;
        setDeskName.value = "desk" + id;
        desk.appendChild(setDeskName);
        newRoom.appendChild(desk);
        let toggleDeskActive = document.createElement("button");
        toggleDeskActive.innerHTML = "deactivate";
        desk.appendChild(toggleDeskActive);
        desk.style.backgroundColor = "green";
        toggleDeskActive.addEventListener("click", (event) => {
          if (desk.dataset.active == "true") {
            setDeskName.disabled = true;
            desk.dataset.active = false;
            desk.style.backgroundColor = "red";
            toggleDeskActive.innerHTML = "activate";
          } else {
            setDeskName.disabled = false;
            desk.dataset.active = true;
            desk.style.backgroundColor = "green";
            toggleDeskActive.innerHTML = "deactivate";
          }
        });
        id++;
      }
    }

    TablePreview.appendChild(newRoom);
  } else {
    submitButton.disabled = true;
  }
}

var submitNewRoom = document.getElementById("submitNewRoom");
submitNewRoom.addEventListener("submit", (event) => {
  room = { Name: "", desks: [] };
  event.preventDefault();
  let newRoom = document.getElementById("newRoom");
  room.Name = roomName.value;
  for (const iterator of newRoom.children) {
    if (iterator.dataset.active == "true") {
      let name = "";
      for (const getName of iterator.children) {
        if (getName.tagName == "INPUT") {
          name = getName.value;
        }
      }

      let desk = {
        name: name,
        x_pos: iterator.dataset.x,
        y_pos: iterator.dataset.y,
      };
      room.desks.push(desk);
    }
  }

  const url = "/admin";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(room), // Sending the room object as JSON
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      console.log("Success Room Added");
    }
  });
});

var user = { name: "", card_id: undefined };
var submitUserButton = document.getElementById("AddNewUserButton");
var username = document.getElementById("username");
var card_id = document.getElementById("card_id");

username.addEventListener("change", (event) => {
  updateUser();
});

card_id.addEventListener("change", (event) => {
  updateUser();
});

function updateUser() {
  let validUser = true;
  if (username.value.length == 0 || card_id.value.length == 0) {
    validUser = false;
  }

  if (validUser) {
    submitUserButton.disabled = false;
  }
}

document.getElementById("addUser").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("username").value;
  const cardId = document.getElementById("card_id").value;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("card_id", cardId);

  // Send a POST request to the Flask route
  fetch("/add_user", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log(`User ${name}/${cardId} added successfully`);
        // Perform any additional actions upon successful addition
      } else {
        console.error("Failed to add user");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
