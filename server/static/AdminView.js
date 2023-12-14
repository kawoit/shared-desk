var bodyElement = document.getElementsByTagName("body")[0];
var menuVisible = false;
var SeatGraphicOpacity = 0.5;

var Rooms = [];
Rooms[0] = { python_desks };

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
  headerText.innerHTML = "Smart Desks - Admin";
  headerText.style.textAlign = "center";
  headerDiv.appendChild(headerText);

  bodyElement.appendChild(headerDiv);
}

function Footer() {
  let footerDiv = document.createElement("div");
  footerDiv.id = "footer";
  footerDiv.innerHTML = "Made with <span id='heart'> &hearts;</span> by Shared Desk &copy;";

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
}

Header();
Main();
Footer();

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

// desks = python_desks_to_js();
// Debug for Willy
// desks = [
//   ["1", "Desk 1", "1"],
//   ["2", "Desk 2", "1"],
//   ["3", "Desk 3", "0"],
//   ["4", "Desk 4", "1"],
//   ["5", "Desk 5", "0"],
//   ["6", "Desk 6", "1"],
//   ["7", "Desk 7", "0"],
//   ["8", "Desk 8", "1"],
//   ["9", "Desk 9", "1"],
//   ["10", "Desk 10", "1"],
// ];
// populateRoom(desks);

populateRoom(python_desks)

// Alle 1 Sekunde aktualisieren
setInterval(populateRoom_update, 1000);