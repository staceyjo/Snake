// Creating a gameboard object I can manipulate
// so I don't have to create 144 divs within the gameboard


// This wasn't working at first. 
// Make sure you add width and height if you do this again
// Altering the repeat to width * height will automatically change
// the number of times it repeats if you ever decide to change from 12 x 12
// but be sure to change the numbers in  your style sheet as well
const width = 12;
const height = 12;
const gameboard = document.querySelector("#gameboard");
gameboard.innerHTML = "<div></div>".repeat(width * height);

// Making certain squares change color to represent the snake and the food
// gameboard.children will give me all of the divs on the board
//.classList.add() will add a new class to the gameboard

// if you wanted snake to appear in the first cell
// gameboard.children[0].classList.add("snake")

// if you wanted snake to appear in the last cell
// gameboard.children[143].classList.add("snake")

// if you wanted snake to appear in the 5th cell, 5th row
// let x = 4
// let y = 4
// gameboard.children[ (width * y) + x].classList.add("snake")

// Now we want to represent a snake on the grid at any point in time
// we need an x value and a y value for each cell that the snake is on
let x = 4
let y = 4

let snake = [
    // we need to have multiple objects each with x and y properties
    // if we change all the y values to 4, it will move the snake to the 5th row
    // if we change the x values to 3, 4, 5 it will occupy the 4th,5th and 6th column
    {x:0, y:4},
    {x:1, y:4},
    {x:2, y:4},
]

// to draw the snake, we need to loop through the snake array and draw each cell individually
// to do that we use a for each loop
snake.forEach(function(cell) {
    let x = cell.x;
    let y = cell.y;
    gameboard.children[(width * y) + x].classList.add("snake");
})

// to get the snake to move by pressing the spacebar:
// onkeydown function is used when you press on a key, i.e the spacebar
// keyboardEvent is the object
// when you open the console, you can see everytime you press the any key
// each key has a code, "Space", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Enter", "Escape"
onkeydown = (function(keyboardEvent) {
    console.log(keyboardEvent);
})