var bodyElement = document.getElementsByTagName("body")[0];
var menuVisible = false;
var SeatGraphicOpacity = 0.5;
// Avaiable Rooms
// TODO implement
// var Rooms = [
//   {
//     name: "Room1",
//     desks: [
//       ["4", "Desk 1 of Room 1", "1", "Willy"],
//       ["5", "Desk 2 of Room 1", "1", "Willy"],
//       ["6", "Desk 3 of Room 1", "0", "Willy"],
//       // ["4", "Desk 4 of Room 1", "1", "Willy"],
//       // ["5", "Desk 5 of Room 1", "0", "Willy"],
//       // ["6", "Desk 6 of Room 1", "1", "Willy"],
//       // ["7", "Desk 7 of Room 1", "0", "Willy"],
//       // ["8", "Desk 8 of Room 1", "1", "Willy"],
//       // ["9", "Desk 9 of Room 1", "1", "Willy"],
//       // ["10", "Desk 10 of Room 1", "1", "Willy"],
//     ],
//   },
//   {
//     name: "Room2",
//     desks: [
//       ["1", "Desk 1 of Room 2", "1"],
//       ["2", "Desk 2 of Room 2", "1"],
//       ["3", "Desk 3 of Room 2", "0"],
//       // ["4", "Desk 4 of Room 2", "1"],
//       // ["5", "Desk 5 of Room 2", "0"],
//       // ["6", "Desk 6 of Room 2", "1"],
//       // ["7", "Desk 7 of Room 2", "0"],
//       // ["8", "Desk 8 of Room 2", "1"],
//       // ["9", "Desk 9 of Room 2", "1"],
//       // ["10", "Desk 10 of Room 2", "1"],
//     ],
//   },
// ];
var Rooms = [];
// Rooms[0] = { python_desks };
// var python_desks;

var desks = [];

// function Header() {
//   let headerDiv = document.createElement("div");
//   headerDiv.id = "header";

//   let burgerMenu = document.createElement("div");
//   burgerMenu.className = "burgerMenu";
//   headerDiv.appendChild(burgerMenu);
//   let burgerBorder = document.createElement("div");
//   burgerBorder.className = "burgerBorder";
//   burgerBorder.addEventListener("click", () => {
//     toggleNavMenu();
//   });
//   burgerMenu.appendChild(burgerBorder);
//   let burgerImage = document.createElement("img");
//   burgerImage.src = "static/icons/BurgerMenuIcon.png";
//   burgerImage.className = "burgerMenuIcon";
//   burgerBorder.appendChild(burgerImage);

//   let headerText = document.createElement("div");
//   headerText.innerHTML = "Smart Desks";
//   headerText.style.textAlign = "center";
//   headerDiv.appendChild(headerText);

//   bodyElement.appendChild(headerDiv);
// }

// function Footer() {
//   let footerDiv = document.createElement("div");
//   footerDiv.id = "footer";
//   footerDiv.innerHTML = "Made with <span id='heart'> &hearts;</span> by Shared Desk &copy; {% block footer %} {% endblock %}";


//   bodyElement.appendChild(footerDiv);
// }

function Main() {
  let mainDiv = document.createElement("div");
  mainDiv.id = "main";
  Nav(mainDiv);
  let mainContainer = document.createElement("div");
  mainContainer.id = "MainContainer";
  mainDiv.appendChild(mainContainer);

  bodyElement.appendChild(mainDiv);
}

// Header();
Main();
// Footer();

// async function populateRoom_update() {
//   var desks;
//   await fetch('/get_desks_data')
//     .then(response => response.json())
//     .then(data => {
//       desks = data.desks;
//       console.log(desks);
//       desks.forEach((desk) => {
//         console.log(desk);
//         let className = "seat " + desk["id"];
//         const element = document.getElementsByClassName(className)[0];
//         console.log(element);
//         element.innerHTML = "";
//         if (desk["is_used"] == 1) {
//           element.style.backgroundColor = "#ff9b7d";
//           let name = desk["name"];
//           let user = desk["user"];
//           element.innerHTML = name + "<br>" + user;
//         }
//         else {
//           element.style.backgroundColor = "#26ce00";
//           let name = desk["name"];
//           element.innerHTML = name + "<br>";
//         }
//         element.appendChild(createSeatGraphic());

//       });

//     })
//     .catch(error => {
//       console.log("Keine Verbindung zum Server möglich!\n\n" + error);
//     });
// }

// function populateRoom() {
//   let mainContainer = document.getElementById("MainContainer");
//   let desks = python_desks;
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

  seatDiv.appendChild(createSeatGraphic());
  return seatDiv;
}

function createSeatGraphic() {
  let seatGraphic = document.createElement("div");
  seatGraphic.className = "SeatGraphic";
  seatGraphic.style.opacity = SeatGraphicOpacity;
  let tableGraphic = document.createElement("div");
  tableGraphic.className = "Table";
  seatGraphic.appendChild(tableGraphic);
  let chairGraphic = document.createElement("div");
  chairGraphic.className = "Chair";
  seatGraphic.appendChild(chairGraphic);
  return seatGraphic;
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
  adminViewMenuItem.addEventListener("click", changetoAdminView);

  menuContainer.appendChild(adminViewMenuItem);

  let roomLabel = document.createElement("div");
  roomLabel.className = "label";
  roomLabel.innerHTML = "Rooms";
  menuContainer.appendChild(roomLabel);

  function updateRoomData() {
    fetch('/get_rooms')
      .then(response => response.json())
      .then(data => {
        Rooms = data;
      })
      .catch(error => {
        console.log("Keine Verbindung zum Server möglich!\n\n" + error);
      });
  }
  updateRoomData();
  console.log("Rooms: " + Rooms)
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

  // for (let i = 0; i < 1000; i++) {
  //   let filler = document.createElement("div");
  //   filler.className = "menuItem";
  //   filler.innerHTML = "Placeholder";
  //   menu.appendChild(filler);
  // }
}

function changetoAdminView() {
  // redirect to /admin
  window.location.href = "/admin";
  // toggleNavMenu();
  // let mainContainer = document.getElementById("MainContainer");
  // mainContainer.innerHTML = "";

  // let adminView = document.createElement("div");
  // adminView.id = "AdminView";
  // let adminControls = document.createElement("div");
  // adminControls.id = "AdminControls";
  // let rowInput = document.createElement("input");
  // rowInput.placeholder = "Enter Rows";
  // let columnInput = document.createElement("input");
  // columnInput.placeholder = "Enter Columns";
  // let generateRoomButton = document.createElement("button");
  // generateRoomButton.textContent = "Create Room";
  // generateRoomButton.addEventListener("click", () => {
  //   let rowNonNumeric = false;
  //   let columnNonNumeric = false;

  //   if (rowInput.value == "" || columnInput.value == "") {
  //     alert("At least one Value is empty.");
  //     return;
  //   }

  //   for (const currChar of rowInput.value) {
  //     if (currChar < "0" || currChar > "9") {
  //       rowNonNumeric = true;
  //     }
  //   }
  //   for (const currChar of columnInput.value) {
  //     if (currChar < "0" || currChar > "9") {
  //       columnNonNumeric = true;
  //     }
  //   }
  //   if (columnNonNumeric || rowNonNumeric) {
  //     alert("Non Numeric Values detected.");
  //   } else {
  //     console.log("Good to go");
  //   }
  // });

  // adminControls.appendChild(rowInput);
  // adminControls.appendChild(columnInput);
  // adminControls.appendChild(generateRoomButton);

  // adminView.appendChild(adminControls);
  // mainContainer.appendChild(adminView);
}

function toggleSeatGraphicVisibility() {
  for (const child of this.children) {
    if (child.style.opacity != 0 || child.style.opacity == "") {
      child.style.opacity = 0;
    } else {
      child.style.opacity = SeatGraphicOpacity;
    }
  }
}

class GridItem {
  constructor(x_pos, y_pos, name = "", is_used = 0) {
    if (name == "") {
      name = "POS:" + x_pos + "/" + y_pos;
    }
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.name = name;
    this.is_used = is_used;
  }
}

function placeElementsInGrid(elements) {
  const maincontainer = document.getElementById('MainContainer');
  maincontainer.innerHTML = "";
  const gridContainer = document.createElement('div');
  gridContainer.id = 'grid-container';
  gridContainer.classList.add('room-bg');

  elements.forEach(element => {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.innerHTML = element.text;
    gridItem.appendChild(createSeatGraphic());
    gridItem.style.gridRow = element.y_pos;
    gridItem.style.gridColumn = element.x_pos;
    gridContainer.appendChild(gridItem);
  });
  maincontainer.appendChild(gridContainer);
}

var elements = [];
createGridElements();
function createGridElements() {
  // for each desk in python_desks create a gridItem
  // and append it to elements
  // elements = [];
  python_desks.forEach(desk => {
    const gridItem = new GridItem(desk.x_pos, desk.y_pos, desk.name, desk.is_used);
    elements.push(gridItem);
  });
};

function updateGridElements() {
  elements = [];
  python_desks.forEach(desk => {
    const gridItem = new GridItem(desk.x_pos, desk.y_pos, desk.name, desk.is_used);
    // console.log(gridItem);
    if (gridItem.is_used == 1) {
      gridItem.text = desk.user;
    }
    else {
      gridItem.text = desk.name;
    }
    elements.push(gridItem);
  });
  console.log(elements);
  placeElementsInGrid(elements);
}

async function updateData() {
  fetch('/get_desks_data')
    .then(response => response.json())
    .then(data => {
      python_desks = data.desks;
    })
    .catch(error => {
      console.log("Keine Verbindung zum Server möglich!\n\n" + error);
    });
  updateGridElements();
  set_background();
}

placeElementsInGrid(elements);
setInterval(updateData, 1000);



const img = new Image();
addEventListener('load', set_background);
addEventListener('resize', set_background);
  
function set_background() {
  var grid = document.getElementById('grid-container');
  const viewwidth = grid.clientWidth;
  const viewheight = grid.clientHeight;
  
  const room_sketch = `<svg xmlns="http://www.w3.org/2000/svg" width="` + viewwidth + `" height="` + viewheight + `">
    <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="black" stroke-width="5"/>
    <rect x="0" y="140" width="50" height="100" fill="none" stroke="black" stroke-width="5"/>
    <rect x="-1" y="140" width="50" height="100" fill="#f8d5a1" stroke="none" stroke-width="5"/>
  </svg>`;

  img.src = `data:image/svg+xml,${encodeURIComponent(room_sketch)}`;
  const backgroundImage = document.getElementsByClassName('room-bg')[0];
  backgroundImage.style.backgroundImage = `url(${img.src})`;
  }