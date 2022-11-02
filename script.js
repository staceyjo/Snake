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
const scoreSpan = document.querySelector("#score-span");
// gameboard.innerHTML = "<div></div>".repeat(width * height);



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

// defining our snake variable
let snake = [
    // we need to have multiple objects each with x and y properties
    // if we change all the y values to 4, it will move the snake to the 5th row
    // if we change the x values to 3, 4, 5 it will occupy the 4th,5th and 6th column
    {x:3, y:4},
    {x:4, y:4},
    {x:5, y:4}, // head of snake
]

// defining the direction of the snake, by default we are setting snake to move to the right
let direction = "right";
// let previousDirection = "";
// let apple;
// let score = 0;
// let gameState = "ready"; // ready, running, over
// let timeoutInterval = 180;

// relocateApple();

// Calling function when you first load the page to redraw (based on user input)
redrawUserInput()

// function start() {
//     gameState = "running";
//     setTimeout(step, timeoutInterval);
// }

// to draw the snake, we need to loop through the snake array and draw each cell individually
// to do that we use a for each loop
// snake.forEach(function(cell) {
//     let x = cell.x;
//     let y = cell.y;
//     gameboard.children[(width * y) + x].classList.add("snake");
// })

// to get the snake to move by pressing the spacebar:

// first we need a function that will update the state
// of the game and redraw the snake based on the user input

function slither() {
        // update the state of the game by updating the contents of the snake array
    updateStateOfGame()

        // redraw based on user input
        // the last object in the snake array is going to be the head of the snake
    redrawUserInput()

        // schedule step if game is still runnning
//     if(gameState === "running") {
//         setTimeout(step, timeoutInterval);
//   }
    
}

// function to update the state of the game everytime the snake moves by 1 cell at a time
// by updating the contents of the snake array
function updateStateOfGame() {
    // previousDirection = direction;

        // current head is the last element in the snake array
        // we get that by getting the index of snake.length
        // and subtracting 1
    let currentHeadOfSnake = snake[snake.length - 1];

        // let nextHeadOfSnake =  {
        //     x: currentHeadOfSnake.x +1,
        //     y: currentHeadOfSnake.y
        // }

        // update the update state function to reflect new change in directions
    let nextHeadOfSnake =  {
        
        x: currentHeadOfSnake.x,
        y: currentHeadOfSnake.y
    };

        // these if statements deal with the change in direction for up, down, right and left:
        
        // for up we decrement the y value
        // because if the snake is traveling up, the y yalue is heading towards zero
    if(direction === "up") {
        nextHeadOfSnake.y--;
    }

        // for down we incrememnt the y value
        // because if the snake is traveling down, the y yalue is heading away from zero
    if(direction === "down") {
        nextHeadOfSnake.y++;
    }

        // for left we decrement the y value
        // because if the snake is traveling left, the x yalue is heading towards zero
    if(direction === "left") {
        nextHeadOfSnake.x--;
    }

        // for right we incrememnt the y value
        // because if the snake is traveling right, the x yalue is heading away from zero
    if(direction === "right") {
        nextHeadOfSnake.x++;
    }


    // .push adds the next head to the end of the existing array
    snake.push(nextHeadOfSnake)
   
    //.push removes the first element of the existing snake array
    snake.shift()
}
// function to redraw based on user input
function redrawUserInput(){
    // This resets all of the divs on the gameboard
    gameboard.innerHTML = "<div></div>".repeat(width * height);

        // to draw the snake on grid, we need to loop through the snake array and draw each cell individually
        // to do that we use a for each loop
    snake.forEach(function(cell) {
        let x = cell.x;
        let y = cell.y;
        gameboard.children[(width * y) + x].classList.add("snake");
    })

}


// onkeydown function is used when you press on a key, i.e the spacebar
// keyboardEvent is the object
// when you open the console, you can see everytime you press the any key
// each key has a code, "Space", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Enter", "Escape"
onkeydown = (function(keyboardEvent) {
    // console.log(keyboardEvent);

    // Moving the snake when "Space" keyboard event takes place
    let code = keyboardEvent.code;
    // This just prints tye keyboard code
    console.log(code)
    if(code === "Space")  {
        
        // move the snake when "Space" === code by 
        // invoking the function slither
    slither()
    }

    if(code === "ArrowUp") {
        direction = "up";
    }

    if(code === "ArrowDown") {
        direction = "down";
    }

    if(code === "ArrowLeft") {
        direction = "left";
    }

    if(code === "ArrowRight") {
        direction = "right";
    }

    // update the update state function to reflect new change in directions

})

