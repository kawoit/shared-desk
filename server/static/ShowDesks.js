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

  // get number of desks from desks variable
  // value: 1,Desk 1,1,2,Desk 2,1,3,Desk 3,0,4,Desk 1,0,5,Desk 2,0,6,Desk 3,0
  // split by comma
  // get length of array

  let desks = python_desks_to_js();
  let room = populateRoom(desks);
  room.id = "room";

  mainDiv.appendChild(room);

  bodyElement.appendChild(mainDiv);
}

Header();
Main();
Footer();

function python_desks_to_js() {
  let str_desks = String(python_desks);
  const desksArray = str_desks.split(",");
  let seats = desksArray.length / 4;
  // merge every 3 elements into one array
  let merged = [];
  for (let i = 0; i < desksArray.length; i += 4) {
    merged.push(desksArray.slice(i, i + 4));
  }
  console.log(merged);
  return merged;
}

function raw_array_to_dict_array(raw_array) {
  let dict_array = [];
  for (let i = 0; i < raw_array.length; i++) {
    let desk = {};
    desk["id"] = raw_array[i][0];
    desk["name"] = raw_array[i][1];
    desk["is_used"] = raw_array[i][2];
    dict_array.push(desk);
  }
  return dict_array;
}

function populateRoom(desks_raw) {
  let desks = raw_array_to_dict_array(desks_raw);
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
  seatDiv.className = "seat " + desk["id"];
  seatDiv.innerText = desk["name"];
  if (desk["is_used"] == 1) {
    seatDiv.style.backgroundColor = "#ff9b7d";
    // set link for seatdiv to /set_free/<desk_id>
    seatDiv.addEventListener("click", () => {
      window.location.href = "/set_free/" + desk["id"];
    });
  } else {
    seatDiv.style.backgroundColor = "#26ce00";
    // set link for seatdiv to /set_in_use/<desk_id>
    seatDiv.addEventListener("click", () => {
      window.location.href = "/set_in_use/" + desk["id"];
    });
  }

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
