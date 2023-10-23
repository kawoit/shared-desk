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
    alert("Hello");
  });
  burgerMenu.appendChild(burgerBorder);
  let burgerImage = document.createElement("img");
  burgerImage.src = "Icons/BurgerMenuIcon.png";
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

  let room = populateRoom(9);
  room.id = "room";

  mainDiv.appendChild(room);

  bodyElement.appendChild(mainDiv);
}

Header();
Main();
Footer();

function populateRoom(seats) {
  let result = document.createElement("div");
  result.id = "room";
  // let columns = Math.sqrt(seats);
  // result.style.columnCount = columns;
  for (let i = 0; i < seats; i++) {
    let seatDiv = document.createElement("div");
    seatDiv.className = "seat " + i;
    let column = (i % 3) + 1;
    seatDiv.style.gridColumn = column;
    result.appendChild(seatDiv);
  }
  return result;
}
