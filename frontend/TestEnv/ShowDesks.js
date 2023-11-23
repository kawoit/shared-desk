var bodyElement = document.getElementsByTagName("body")[0];
var menuVisible = false;

function Header() {
  let headerDiv = document.createElement("div");
  headerDiv.id = "header";

  let burgerMenu = document.createElement("div");
  burgerMenu.className = "burgerMenu";
  headerDiv.appendChild(burgerMenu);
  let burgerBorder = document.createElement("div");
  burgerBorder.className = "burgerBorder";
  burgerBorder.addEventListener("click", () => {
    burgerMenu_click();
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
  mainDiv.id = "main";
  Nav(mainDiv);

  // get number of desks from desks variable
  // value: 1,Desk 1,1,2,Desk 2,1,3,Desk 3,0,4,Desk 1,0,5,Desk 2,0,6,Desk 3,0
  // split by comma
  // get length of array

  // let desks = python_desks_to_js();

  // Debug for Willy
  let desks = [
    ["1", "Desk 1", "1"],
    ["2", "Desk 2", "1"],
    ["3", "Desk 3", "0"],
    ["4", "Desk 4", "1"],
    ["5", "Desk 5", "0"],
    ["6", "Desk 6", "1"],
    ["7", "Desk 7", "0"],
    ["8", "Desk 8", "1"],
    ["9", "Desk 9", "1"],
    ["10", "Desk 10", "1"],
  ];
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
  let seats = desksArray.length / 3;
  // merge every 3 elements into one array
  let merged = [];
  for (let i = 0; i < desksArray.length; i += 3) {
    merged.push(desksArray.slice(i, i + 3));
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

  let row = 1;
  let column = 1;
  let amountColumns = 2;
  desks.forEach((desk) => {
    let child = generate_desk_view(desk, desks.indexOf(desk));
    child.style.gridRow = row;
    child.style.gridColumn = column;
    if (column % amountColumns == 0) {
      column = 1;
      row++;
    } else {
      column++;
    }
    result.appendChild(child);
  });

  return result;
}

function generate_desk_view(desk, i) {
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
  let seatGraphic = document.createElement("div");
  seatGraphic.className = "SeatGraphic";
  let tableGraphic = document.createElement("div");
  tableGraphic.className = "Table";
  seatGraphic.appendChild(tableGraphic);
  let chairGraphic = document.createElement("div");
  chairGraphic.className = "Chair";
  seatGraphic.appendChild(chairGraphic);
  seatDiv.appendChild(seatGraphic);
  return seatDiv;
}

function Sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// popup to add new desk
async function burgerMenu_click() {
  let duration = 30;
  let maxOpacity = 0.8;
  let menu = document.getElementById("menu");

  if (menuVisible) {
    for (let i = duration; i > 0; i--) {
      menu.style.opacity = (maxOpacity / duration) * i;
      await Sleep(1);
    }
    menu.style.opacity = 0;
    menu.style.visibility = "hidden";
    menuVisible = !menuVisible;
  } else {
    menu.style.visibility = "visible";
    for (let i = 0; i < duration; i++) {
      let menu = document.getElementById("menu");
      menu.style.opacity = (maxOpacity / duration) * i;
      await Sleep(1);
    }
    menu.style.opacity = maxOpacity;
    menuVisible = !menuVisible;
  }
}

function Nav(main) {
  let menu = document.createElement("div");
  menu.id = "menu";

  let addDeskDiv = document.createElement("div");
  addDeskDiv.className = "menuItem";
  let addDeskDivLabel = document.createElement("div");
  addDeskDivLabel.className = "label";
  addDeskDivLabel.innerHTML = "Add new desk";

  addDeskDiv.appendChild(addDeskDivLabel);
  menu.appendChild(addDeskDiv);
  // popupContent.appendChild(addDeskDivLabel);
  // let popupBody = document.createElement("div");
  // popupBody.className = "popupBody";
  // popupBody.innerHTML = "Enter desk name:";
  // popupContent.appendChild(popupBody);
  // let popupInput = document.createElement("input");
  // popupInput.className = "popupInput";
  // popupInput.id = "popupInput";
  // popupContent.appendChild(popupInput);
  // let popupFooter = document.createElement("div");
  // popupFooter.className = "popupFooter";
  // popupContent.appendChild(popupFooter);
  // let popupButton = document.createElement("button");
  // popupButton.className = "popupButton";
  // popupButton.innerHTML = "Add";
  // popupButton.addEventListener("click", () => {
  //   let deskName = document.getElementById("popupInput").value;
  //   console.log(deskName);
  //   window.location.href = "/add_desk/" + deskName;
  // });
  // popupFooter.appendChild(popupButton);
  // let popupButton2 = document.createElement("button");
  // popupButton2.className = "popupButton";
  // popupButton2.innerHTML = "Cancel";
  // popupButton2.addEventListener("click", () => {
  //   document.getElementById("popup").remove();
  // });
  // popupFooter.appendChild(popupButton2);
  // bodyElement.appendChild(popup);

  main.appendChild(menu);
}
