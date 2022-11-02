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

// let popup = document.querySelector(".popup"); 
// let playAgain = document.querySelector(".playAgain");
// let left = document.querySelector(".left") 
// let bottom = document.querySelector(".bottom") 
// let right = document.querySelector(".right") 
// let up = document.querySelector(".top") 

// playAgain.addEventListener("click", replay);



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
// let x = 4
// let y = 4

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

// At the moment, the snake con move back on itself when changing directions from left to right
// or up to down---we don't want it to be able to do this...
// So we need a way to track the previous direction
let previousDirection = "";

// New variable to have the snake eat food target and grow longer with each food item
// we'll need to add this to the redraw 
let food = {
    x: 2,
    y: 2
};
// let score = 0;
// let gameState = "ready"; // ready, running, over
// let timeoutInterval = 180;

// relocateApple();

// Calling function when you first load the page to redraw the user interface
redrawUserInterface()

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
// of the game and redraw the snake for the user interface

function slither() {
        // update the state of the game by updating the contents of the snake array
    updateStateOfGame()

        // redraw user interface
        // the last object in the snake array is going to be the head of the snake
    redrawUserInterface()

        // schedule step if game is still runnning
//     if(gameState === "running") {
//         setTimeout(step, timeoutInterval);
//   }
    
}

// function to update the state of the game everytime the snake moves by 1 cell at a time
// by updating the contents of the snake array
function updateStateOfGame() {

        // setting the previous direction to the direction that was set 
        // so we can use the variable later in the slither function to not
        // allow the snake to perform a 180 and change/turn on itself
    previousDirection = direction;

        // current head is the last element in the snake array
        // we get that by getting the index of snake.length
        // and subtracting 1
    let currentHeadOfSnake = snake[snake.length - 1];

        // let nextHeadOfSnake =  {
        //     x: currentHeadOfSnake.x +1,
        //     y: currentHeadOfSnake.y
        // }

        // update the update state function to reflect new head of the snake
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
        // placing this here because regardless of whether or not the
        // snake eats the food source, we always need to push the next head
        // of the snake on top of the current head
    snake.push(nextHeadOfSnake)

        // At the moment when the snake goes after the food source, nothing happens
        // we want the snake to grow by one cell everytime it encounters the position
        // where the food currently is

        // then we want the position of the food source to change to somewhere else on the grid
        // if the next head of the snake is the same position as the food source
        // then we know the snake is eating the food

        // but we only want to remove the first element  of the snake array if we are eating the food source
        // so we'll add an else statement

    if(nextHeadOfSnake.x === food.x && nextHeadOfSnake.y === food.y) {
        // eating the apple

    } else {
            //.shift removes the first element of the existing snake array
        snake.shift()
    }
   
}
// function to redraw based on user input
function redrawUserInterface(){

    // This resets all of the divs on the gameboard
    gameboard.innerHTML = "<div></div>".repeat(width * height);

        // to draw the snake on grid, we need to loop through the snake array and draw each cell individually
        // to do that we use a for each loop
    snake.forEach(function(cell) {
        let x = cell.x;
        let y = cell.y;
        gameboard.children[(width * y) + x].classList.add("snake");
    })

    // Drawing the food
    // Adding a new section to the redraw user interface to show our food. 
    // Want the snake to eat the food and grow in length by one cell each time
    // so instead of using the x and y coordinates from the snake
    // we use food.x and food.y

    gameboard.children[(width * food.y) + food.x].classList.add("food");

}


// onkeydown function is used when you press on a key, i.e the spacebar
// keyboardEvent is the object
// when you open the console, you can see everytime you press the any key
// each key has a code, "Space", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Enter", "Escape"
onkeydown = (function(keyboardEvent) {
    // console.log(keyboardEvent);

    // Moving the snake when "Space" keyboard event takes place
    let code = keyboardEvent.code;

    // This just prints the keyboard code strings for each press
    console.log(code)
    if(code === "Space")  {
        
        // move the snake when "Space" === code by 
        // invoking the function slither
    slither()
    }

    // This allows the snake to move directions
    // adding the previousdirection in the opposite so the snake cannot
    // fold back on itself by only moving in a direction that is not the
    // complete opposite of the previous direction
    if(code === "ArrowUp" && previousDirection !== "down") {
        direction = "up";
    }

    if(code === "ArrowDown" && previousDirection !== "up") {
        direction = "down";
    }

    if(code === "ArrowLeft" && previousDirection !== "right") {
        direction = "left";
    }

    if(code === "ArrowRight" && previousDirection !== "left") {
        direction = "right";
    }

})

