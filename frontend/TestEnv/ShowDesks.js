var bodyElement = document.getElementsByTagName("body")[0];
var menuVisible = false;
var SeatGraphicOpacity = 0.5;
// Avaiable Rooms
// TODO implement
var Rooms = [
  {
    name: "Room1",
    desks: [
      ["1", "Desk 1 of Room 1", "1"],
      ["2", "Desk 2 of Room 1", "1"],
      ["3", "Desk 3 of Room 1", "0"],
      ["4", "Desk 4 of Room 1", "1"],
      ["5", "Desk 5 of Room 1", "0"],
      ["6", "Desk 6 of Room 1", "1"],
      ["7", "Desk 7 of Room 1", "0"],
      ["8", "Desk 8 of Room 1", "1"],
      ["9", "Desk 9 of Room 1", "1"],
      ["10", "Desk 10 of Room 1", "1"],
    ],
  },
  {
    name: "Room2",
    desks: [
      ["1", "Desk 1 of Room 2", "1"],
      ["2", "Desk 2 of Room 2", "1"],
      ["3", "Desk 3 of Room 2", "0"],
      ["4", "Desk 4 of Room 2", "1"],
      ["5", "Desk 5 of Room 2", "0"],
      ["6", "Desk 6 of Room 2", "1"],
      ["7", "Desk 7 of Room 2", "0"],
      ["8", "Desk 8 of Room 2", "1"],
      ["9", "Desk 9 of Room 2", "1"],
      ["10", "Desk 10 of Room 2", "1"],
    ],
  },
];
var desks = [];

function Header() {
  let headerDiv = document.createElement("div");
  headerDiv.id = "header";

  let burgerMenu = document.createElement("div");
  burgerMenu.className = "burgerMenu";
  headerDiv.appendChild(burgerMenu);
  let burgerBorder = document.createElement("div");
  burgerBorder.className = "burgerBorder";
  burgerBorder.addEventListener("click", () => {
    toggleNavMenu();
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
  let mainContainer = document.createElement("div");
  mainContainer.id = "MainContainer";
  mainDiv.appendChild(mainContainer);

  bodyElement.appendChild(mainDiv);
  // get number of desks from desks variable
  // value: 1,Desk 1,1,2,Desk 2,1,3,Desk 3,0,4,Desk 1,0,5,Desk 2,0,6,Desk 3,0
  // split by comma
  // get length of array
}

Header();
Main();
Footer();

// function populateRoom(desks_raw) {
//   let mainContainer = document.getElementById("MainContainer");
//   let desks = raw_array_to_dict_array(desks_raw);
//   let result = document.createElement("div");
//   result.id = "room";

//   let row = 1;
//   let column = 1;
//   let amountColumns = 2;
//   desks.forEach((desk) => {
//     let child = generate_desk_view(desk, desks.indexOf(desk));
//     child.style.gridRow = row;
//     child.style.gridColumn = column;
//     if (column % amountColumns == 0) {
//       column = 1;
//       row++;
//     } else {
//       column++;
//     }
//     result.appendChild(child);
//   });

//   mainContainer.appendChild(result);
// }

function generate_desk_view(desk, i) {
  let seatDiv = document.createElement("div");
  seatDiv.className = "seat " + desk["id"];
  seatDiv.innerText = desk["name"];
  seatDiv.addEventListener("click", toggleSeatGraphicVisibility);
  if (desk["is_used"] == 1) {
    seatDiv.style.backgroundColor = "#ff9b7d";
    // set link for seatdiv to /set_free/<desk_id>
    // seatDiv.addEventListener("click", () => {
    //   window.location.href = "/set_free/" + desk["id"];
    // });
  } else {
    seatDiv.style.backgroundColor = "#26ce00";
    // set link for seatdiv to /set_in_use/<desk_id>
    // seatDiv.addEventListener("click", () => {
    //   window.location.href = "/set_in_use/" + desk["id"];
    // });
  }
  let seatGraphic = document.createElement("div");
  seatGraphic.className = "SeatGraphic";
  seatGraphic.style.opacity = SeatGraphicOpacity;
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

async function toggleNavMenu() {
  let duration = 30;
  let maxOpacity = 1;
  let menu = document.getElementById("NavMenu");

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
      menu.style.opacity = (maxOpacity / duration) * i;
      await Sleep(1);
    }
    menu.style.opacity = maxOpacity;
    menuVisible = !menuVisible;
  }
}

function Nav(main) {
  let menu = document.getElementById("NavMenu");
  if (menu != null) {
    menu.innerHTML = "";
  } else {
    menu = document.createElement("div");
    menu.id = "NavMenu";
    main.appendChild(menu);
  }

  let menuContainer = document.createElement("div");
  menuContainer.id = "MenuContainer";
  menu.appendChild(menuContainer);

  let navLabel = document.createElement("div");
  navLabel.className = "label";
  navLabel.innerHTML = "Navigation";
  menuContainer.appendChild(navLabel);
  let adminViewMenuItem = document.createElement("div");
  adminViewMenuItem.className = "menuItem";
  adminViewMenuItem.innerHTML = "Admin View";
  // adminViewMenuItem.addEventListener("click", changetoAdminView);

  // menuContainer.appendChild(adminViewMenuItem);

  let roomLabel = document.createElement("div");
  roomLabel.className = "label";
  roomLabel.innerHTML = "Rooms";
  menuContainer.appendChild(roomLabel);

  for (const room of Rooms) {
    let roomMenu = document.createElement("div");
    roomMenu.className = "menuItem";
    roomMenu.addEventListener("click", () => {
      toggleNavMenu();
      let mainContainer = document.getElementById("MainContainer");
      mainContainer.innerHTML = "";
      populateRoom(room.desks);
    });
    roomMenu.innerHTML = room.name; // TODO Actually implement logic here
    menuContainer.appendChild(roomMenu);
  }
}


// populateRoom(desks);


class GridItem {
  constructor(x_pos, y_pos, name="") {
  if (name == "") {
    name = "POS:"+x_pos + "/" + y_pos;
  }
  this.x_pos = x_pos;
  this.y_pos = y_pos;
  this.name = name;
  this.is_used = 0;
}
}

function placeElementsInGrid(elements) {
  const maincontainer = document.getElementById('MainContainer');
  const gridContainer = document.createElement('div');
  gridContainer.id='grid-container';

  elements.forEach(element => {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.textContent = element.name;
    gridItem.style.gridRow = element.y_pos;
    gridItem.style.gridColumn = element.x_pos;
    gridContainer.appendChild(gridItem);
  });
  maincontainer.appendChild(gridContainer);
}

const elements = [
  new GridItem(2, 5),
  new GridItem(2, 2),
  new GridItem(3, 3),
  new GridItem(4, 4),
  new GridItem(5, 5),
  new GridItem(2, 3),
  new GridItem(1, 2),
  new GridItem(3, 4),
  new GridItem(4, 2),
  new GridItem(1, 5),
];

placeElementsInGrid(elements);
