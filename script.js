// Creating a gameboard object I can manipulate
// so I don't have to create 144 divs within the gameboard

// Why is this not working?!
const board = document.querySelector("gameboard");
board.innerHTML = "div></div>".repeat(144);