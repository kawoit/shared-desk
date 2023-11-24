var bodyElement = document.getElementsByTagName("body")[0];

function Header() {
  let headerDiv = document.createElement("div");
  headerDiv.id = "header";

  let burgerMenu = document.createElement("div");
  burgerMenu.className = "burgerMenu";
  headerDiv.appendChild(burgerMenu);
  let burgerBorder = document.createElement("div");
  burgerBorder.className = "burgerBorder";
  burgerBorder.addEventListener("click", () => {
    add_desk_popup();
  });
  burgerMenu.appendChild(burgerBorder);
  let burgerImage = document.createElement("img");
  burgerImage.src = "static/icons/BurgerMenuIcon.png";
  burgerImage.className = "burgerMenuIcon";
  burgerBorder.appendChild(burgerImage);

  let headerText = document.createElement("div");
  headerText.innerHTML = "Smart Desks";
  headerText.style.textAlign = "center";
  headerDiv.appendChild(headerText);

  bodyElement.appendChild(headerDiv);
}

function Footer() {
  let footerDiv = document.createElement("div");
  footerDiv.id = "footer";
  footerDiv.innerHTML = "Made by SmartDesk Inc &copy;";

  bodyElement.appendChild(footerDiv);
}

function Main() {
  let mainDiv = document.createElement("div");
  let desks = python_desks;
  let room = populateRoom(desks);
  room.id = "room";

  mainDiv.appendChild(room);

  bodyElement.appendChild(mainDiv);
}

Header();
Main();
Footer();

async function populateRoom_update() {
  var desks;
  await fetch('/get_desks_data')
    .then(response => response.json())
    .then(data => {
      desks = data.desks;
      let result = document.createElement("div");
      result.id = "room";
      desks.forEach((desk) => {
        let className = "#seat" + desk["id"];
        const element = document.querySelector(className);
        if (desk["is_used"] == 1) {
          element.style.backgroundColor = "#ff9b7d";
          element.querySelector("#user").innerText = desk["user"];
        }
        else {
          element.style.backgroundColor = "#26ce00";
          element.querySelector("#user").innerText = " ";
        }
      });
      return result;

    })
    .catch(error => {
      alert("Keine Verbindung zum Server möglich!\n\n" + error);
    });

}

function populateRoom(desks) {
  let result = document.createElement("div");
  result.id = "room";
  desks.forEach((desk) => {
    let child = generate_desk_view(desk, desks.indexOf(desk));
    result.appendChild(child);
  });
  return result;
}

function generate_desk_view(desk, i) {
  console.log(desk);
  let seatDiv = document.createElement("div");
  seatDiv.id = "seat" + desk["id"];
  seatDiv.innerText = desk["name"];
  if (desk["is_used"] == 1) {
    seatDiv.style.backgroundColor = "#ff9b7d";
  } else {
    seatDiv.style.backgroundColor = "#26ce00";
  }

  user = document.createElement("div");
  user.id = "user";
  user.style.height = "1em";
  user.innerText = "";
  seatDiv.appendChild(user);

  seatDiv.style.borderBlockWidth = "5px";
  seatDiv.style.borderBlockStyle = "solid";
  seatDiv.style.borderRadius = "5px";
  seatDiv.style.padding = "10px";
  seatDiv.style.margin = "10px";
  seatDiv.style.textAlign = "center";
  seatDiv.style.fontWeight = "bold";
  seatDiv.style.width = "80%";
  let column = (i % 3) + 1;
  seatDiv.style.gridColumn = column;
  return seatDiv;
}

// popup to add new desk
function add_desk_popup() {
  let popup = document.createElement("div");
  popup.className = "popup";
  popup.id = "popup";
  let popupContent = document.createElement("div");
  popupContent.className = "popupContent";
  popup.appendChild(popupContent);
  let popupHeader = document.createElement("div");
  popupHeader.className = "popupHeader";
  popupHeader.innerHTML = "Add new desk";
  popupContent.appendChild(popupHeader);
  let popupBody = document.createElement("div");
  popupBody.className = "popupBody";
  popupBody.innerHTML = "Enter desk name:";
  popupContent.appendChild(popupBody);
  let popupInput = document.createElement("input");
  popupInput.className = "popupInput";
  popupInput.id = "popupInput";
  popupContent.appendChild(popupInput);
  let popupFooter = document.createElement("div");
  popupFooter.className = "popupFooter";
  popupContent.appendChild(popupFooter);
  let popupButton = document.createElement("button");
  popupButton.className = "popupButton";
  popupButton.innerHTML = "Add";
  popupButton.addEventListener("click", () => {
    let deskName = document.getElementById("popupInput").value;
    console.log(deskName);
    window.location.href = "/add_desk/" + deskName;
  });
  popupFooter.appendChild(popupButton);
  let popupButton2 = document.createElement("button");
  popupButton2.className = "popupButton";
  popupButton2.innerHTML = "Cancel";
  popupButton2.addEventListener("click", () => {
    document.getElementById("popup").remove();
  });
  popupFooter.appendChild(popupButton2);
  bodyElement.appendChild(popup);
}

// Alle 1 Sekunde aktualisieren
setInterval(populateRoom_update, 1000);
