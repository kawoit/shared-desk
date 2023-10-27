var bodyElement = document.getElementsByTagName("body")[0];
var title = "Shared Desk";
var desks = [];
var NavmenuOpen = false;
document.title = title;

function Header() {
  let headerDiv = document.createElement("div");
  headerDiv.id = "header";
  let headerContainer = document.createElement("div");
  headerContainer.id = "headerContainer";
  headerDiv.appendChild(headerContainer);

  let headerText = document.createElement("div");
  headerText.innerHTML = title;
  headerText.style.textAlign = "center";
  headerContainer.appendChild(headerText);

  let burgerMenu = document.createElement("div");
  burgerMenu.className = "burgerMenu";
  headerContainer.appendChild(burgerMenu);
  let burgerBorder = document.createElement("div");
  burgerBorder.className = "burgerBorder";
  burgerBorder.addEventListener("click", NavigationMenu);
  burgerMenu.appendChild(burgerBorder);
  let burgerImage = document.createElement("img");
  burgerImage.src = "Icons/BurgerMenuIcon.png";
  burgerImage.className = "burgerMenuIcon";
  burgerBorder.appendChild(burgerImage);

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

  let room = populateRoom(5, 2);
  room.id = "room";

  mainDiv.appendChild(room);

  bodyElement.appendChild(mainDiv);
}

function Nav(HTMLelement) {
  let NavTitle = document.createElement("div");
  NavTitle.innerHTML = "Navigation";
  let Navigation = document.createElement("NavMenu");
  Navigation.id = "NavMenu";
  Navigation.appendChild(NavTitle);
  room = ["Raum1", "Raum2"];
  for (let i of room) {
    let NavElement = document.createElement("div");
    NavElement.innerHTML = i;
    Navigation.appendChild(NavElement);
  }

  HTMLelement.appendChild(Navigation);
}

Header();
Main();
Footer();

function populateRoom(rows, columns) {
  desk = [];
  let result = document.createElement("div");
  result.id = "room";
  let amountDesks = rows * columns;

  for (let currRow = 1; currRow <= rows; currRow++) {
    for (let currCol = 1; currCol <= columns; currCol++) {
      let deskDiv = document.createElement("div");
      deskDiv.className = "deskDiv";
      deskDiv.dataset.x = currRow;
      deskDiv.dataset.y = currCol;
      deskDiv.dataset.reserved = false;
      deskDiv.style.gridColumn = currCol;
      deskDiv.addEventListener("click", function () {
        if (deskDiv.dataset.reserved === "false") {
          deskDiv.dataset.reserved = true;
          deskDiv.style.backgroundColor = "red";
        } else {
          deskDiv.dataset.reserved = false;
          deskDiv.style.backgroundColor = "green";
        }
      });

      let desk = createDeskGraphic();

      deskDiv.appendChild(desk);
      result.appendChild(deskDiv);
      desks.push({ currRow, currCol, reserved: 0 });
    }
  }
  return result;
}

function createDeskGraphic() {
  let desk = document.createElement("div");
  desk.className = "desk";
  let table = document.createElement("div");
  table.className = "table";
  let chair = document.createElement("div");
  chair.className = "chair";
  desk.appendChild(table);
  desk.appendChild(chair);

  return desk;
}

async function NavigationMenu() {
  let duration = 40;
  var NavMenu = document.getElementById("NavMenu");
  NavMenu.style.width = "fit-content";
  let NavMenuWidth = NavMenu.offsetWidth;
  NavMenu.style.width = 0;

  if (NavmenuOpen == false) {
    NavmenuOpen = true;
    for (let index = 0; index <= duration; index++) {
      NavMenu.style.width = NavMenuWidth * (index / duration) + "px";
      await Sleep(1);
    }
  } else {
    NavmenuOpen = false;
    for (let index = duration; index >= 0; index--) {
      NavMenu.style.width = NavMenuWidth * (index / duration) + "px";
      await Sleep(1);
    }
  }
}

async function Sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
