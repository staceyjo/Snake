// Creating a gameboard object I can manipulate
// so I don't have to create 144 divs within the gameboard


// This wasn't working at first. 
//Make sure you add width and height if you do this again
const width = 12;
const height = 12;
const board = document.querySelector("#gameboard");
board.innerHTML = "<div></div>".repeat(144);