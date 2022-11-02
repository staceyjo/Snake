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
    // this will repeat our div cells within the gamboard
    // gameboard.innerHTML = "<div></div>".repeat(width * height);


    // we need a way to grab hold of the score and change its content
const scoreSpan = document.querySelector("#score-span");

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

    // defining our snake variable and setting the initial position of the snake
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

    // At the moment, the snake can move back on itself when changing directions
    // ---we don't want it to be able to do this...
    // So we need a way to track the previous direction
let previousDirection = "";

    // New variable for food target. 
    // Eventually once the snake eats the food we want the snake to grow longer 
    // each time it eats food
let food;
    // right now, nothing is keeping track of our score, so we need to add a variable 
    // that keeps track of the score everytime the snake eats an apple
let score = 0;

    // need a way to end the game
let gameState = "ready"; // ready, running, over is start, playing, end

    // defining the timeoutInterval to later use in updateStateOfGame function

    // ?? why is snake moving so fast?
    // this is supposed to gradually decrease by 10% each time the snake eats
let timeoutInterval = 300;


    // Calling this here places the food at a random location  whenever page is loaded
relocateFood();

    // Calling function when you first load the page to redraw the user interface
redrawUserInterface();

// Defining the start function
function start() {

    // at start, change the game state from ready to running to start the game
    gameState = "running";

        // The global setTimeout() method sets a timer which executes 
        // a function or specified piece of code once the timer expires
        // the slither function will be called after 300 milliseconds
    setTimeout(slither, timeoutInterval)
}

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

        // schedule slither if game is still runnning
    if(gameState === "running") {
        setTimeout(slither, timeoutInterval);
    }
    
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

        // Conditions to end the game if the snake tries to manuever off the board
        // currently if the snake moves off the screen it keeps going
        // so we need a way to prevent that and end the game if the snake
        // touches the border wall of the game

        // the first part of the if statement checks if the next head of the snake 
        // if less than the entire width of the game board

        // similarly, the next thing we want to account for is if the next head
        // of the next is the width of the borad OR less than 0 to account for if the
        // snake tries to run into the wall going left x < 0 OR if the snake
        // tries to go outside the full height of the board OR less than 0 y axis

        // the last part of the if statement needs to account for the 
        // snake running into itself- if this happend we want the game to end
        // this is going to be very similar to how we relocated the food to not 
        // be in the same position as the snake so we're going to check to see if any cell
        // of the snake matches the next head of the snake using snake.some(cell)

    if (nextHeadOfSnake.x >= width || nextHeadOfSnake.x < 0 ||
        nextHeadOfSnake.y >= height || nextHeadOfSnake.y < 0 ||
        snake.some(cell => cell.x === nextHeadOfSnake.x && cell.y === nextHeadOfSnake.y)) {
        
            // then the game should end
        gameState = "over"

    } else {

            // .push adds the next head to the end of the existing array
            // placing this here because regardless of whether or not the
            // snake eats the food source, we always need to push the next head
            // of the snake on top of the current head
        
        snake.push(nextHeadOfSnake);

            // At the moment when the snake goes after the food source, nothing happens
            // we want the snake to grow by one cell everytime it encounters the position
            // where the food currently is

            // then we want the position of the food source to change to somewhere else on the grid
            // if the next head of the snake is the same position as the food source
            // then we know the snake is eating the food

            // but we only want to remove the first element  of the snake array if we are eating the food source
            // so we'll add an else statement

        if(nextHeadOfSnake.x === food.x && nextHeadOfSnake.y === food.y) {
            
                // eating the food increases the score by one
            score++

                // move the food after the snake eats it
            relocateFood();
            
                // to make the game challenging, we'll shorten 
                // the time interval by 10% each time the snake eats food
                // by setting the timeout to be 90% by multiplying the 
                // timeout interval by 0.9
            timeoutInterval = timeoutInterval * 0.9
        
        } else {
                //.shift removes the first element of the existing snake array
            snake.shift();
        }
    }

}
    // function to redraw based on user input
function redrawUserInterface(){

        // This resets all of the divs on the gameboard
    gameboard.innerHTML = "<div></div>".repeat(width * height);

        // Draw the snake
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

        // Update the score
    scoreSpan.textContent = score;
}

// Function to move the food after the snake eats it
// Need to generate a new location for the food variable
// after the snake shares the same position of where it was
// to find the new position, we can use Math.random to find a
// random number between and 11
function relocateFood() {
        //generate random number bewtween 0 and 1
        // Math.random()

        //remove decimal places
        // Math.floor()

        // generates random number between 0 and 11 (width is 12)
        // Math.floor(Math.random() * width)

    food = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    };

        // Issue I'm running into is the food lands on top of 
        // the snake during a game start or after the snake eats the food
        // the new food's location is on top of the snake
        // that shouldn't happen. So to prevent that we need
        // to check if the snake location and the relocated food share the
        // intercept. using .some() method
    if(snake.some(cell => cell.x === food.x && cell.y === food.y)) {
            // if this is true, relocate the food
            // calling the function on itself now makes this a recursive function
            // it will keep running the function until it finds a location where the snake is
            // not located
        relocateFood()
    }

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

        // // This triggers the game to start when the spacebar is pressed
    // if(code === "Space" && gameState === "running")  {
        

        // This triggers game to start if any key is pressed

        // ******PROBLEM:is if game ends by snake running into a wall- a new game should start
        // now it continues the previous game and keeps adding the points
    if(gameState === "ready") {

        // invoking start function to start the game if gameState if ready
        start();
        
        // move the snake when "Space" === code by 
        // invoking the function slither
    // slither()
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

