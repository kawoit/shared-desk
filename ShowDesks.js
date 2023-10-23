var bodyElement = document.getElementsByTagName("body")[0];
var title = "Shared Desk";
document.title = title;

function Header() {
  let headerDiv = document.createElement("div");
  headerDiv.id = "header";

  let burgerMenu = document.createElement("div");
  burgerMenu.className = "burgerMenu";
  headerDiv.appendChild(burgerMenu);
  let burgerBorder = document.createElement("div");
  burgerBorder.className = "burgerBorder";
  burgerBorder.addEventListener("click", () => {
    alert("TODO implement BurgerMenu");
  });
  burgerMenu.appendChild(burgerBorder);
  let burgerImage = document.createElement("img");
  burgerImage.src = "Icons/BurgerMenuIcon.png";
  burgerImage.className = "burgerMenuIcon";
  burgerBorder.appendChild(burgerImage);

  let headerText = document.createElement("div");
  headerText.innerHTML = title;
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

  let room = populateRoom(5, 2);
  room.id = "room";

  mainDiv.appendChild(room);

  bodyElement.appendChild(mainDiv);
}

Header();
Main();
Footer();

function populateRoom(rows, columns) {
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
