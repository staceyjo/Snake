// Creating a gameboard object I can manipulate
// so I don't have to create 144 divs within the gameboard

// If you ever decide to change from 12 x 12
// but be sure to change the numbers in your style sheet as well
const width = 12;
const height = 12;
const gameboard = document.querySelector("#gameboard");

// this will repeat our div cells within the gamboard
// gameboard.innerHTML = "<div></div>".repeat(width * height);


// we need a way to grab hold of the score and change its content
let scoreSpan = document.querySelector("#score-span-one");


// this will pick a random hue color to start when we refresh 
// when used as part of the updateStateOfGame function
const hueChange = Math.floor(Math.random() * 360);

// reset button variable
const resetBtn = document.querySelector("#resetBtn");

const gulpSound = new Audio("gulp.mp3");


// The playCount is set to zero- meaning we have not played the game yet
let playCount = 0;


// ===================================SNAKE ARRAY =================================
// if you wanted snake to appear in the first cell
// gameboard.children[0].classList.add("snake")

// if you wanted snake to appear in the last cell
// gameboard.children[143].classList.add("snake")

// if you wanted snake to appear in the 5th cell, 5th row
// let x = 4
// let y = 4
// gameboard.children[ (width * y) + x].classList.add("snake")


// defining our snake variable and setting the initial position of the snake
// snake parts and position are contained inside of an array

let snake = [
    { x: 3, y: 4 },
    { x: 4, y: 4 },
    { x: 5, y: 4 }, // head of snake
]


// defining the direction of the snake, by default we are setting snake to move to the right
let direction = "right";

// At the moment, the snake can move back on itself when changing directions
// ---we don't want it to be able to do this...
// So we need a way to track the previous direction
let previousDirection = "";

// New variable for food target. 
// Eventually once the snake eats the food we want the snake to grow longer 
let food;

// right now, nothing is keeping track of our score, so we need to add a variable 
// that keeps track of the score everytime the snake eats an apple
let score = 0;

// need a way to start the game
let gameState = "ready"; // ready, running, over is start, playing, end

// defining the timeoutInterval to later use in updateStateOfGame function
let timeoutInterval = 300;

// ===================================ON PAGE LOAD =================================
// Calling this here places the food at a random location and redraws user interface
// whenever page is loaded

relocateFood();

// Calling function when you first load the page to redraw the user interface
redrawUserInterface();

// ===================================START FUNCTION =================================
// Defining the start function- when invoked the game is in play
function start() {

    // Change the game state from ready to running
    gameState = "running";

    // The global setTimeout() method sets a timer which executes 
    // a function or specified piece of code once the timer expires
    // the slither function will be called after 300 milliseconds
    setTimeout(slither, timeoutInterval);
}

// ===================================SLITHER FUNCTION =================================
function slither() {
    // update the state of the game by updating the contents of the snake array
    updateStateOfGame()

    // redraw user interface
    // the last object in the snake array is going to be the head of the snake
    redrawUserInterface()

    // schedule slither if game is still runnning
    if (gameState === "running") {
        setTimeout(slither, timeoutInterval);
    }
}

// =======================GAME RUNNING- CHECKS CURRENT SNAKE HEAD POSITION ===============================
// =======================GAME RUNNING- CHECKS NEXT SNAKE HEAD POSITION ==================================
// =======================GAME RUNNING- IF SNAKE IS EATING: ADDS POINTS ==================================
// =======================GAME RUNNING- IF SNAKE IS EATING: ADDS LENGTH TO SNAKE ARRAY====================
// =======================GAME RUNNING- IF SNAKE IS EATING: RELOCATES FOOD ===============================
// =======================GAME RUNNING- ENDS GAME IF SNAKE TOUCHES WALL OR ITSELF=========================

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


// function updates everytime the snake moves by 1 cell at a time
// by updating the contents of the snake array
// calculates the next head of the snake based on the current head of the snake
function updateStateOfGame() {

    // setting the previous direction to the direction 
    // so we can use the variable later in the slither function to not
    // allow the snake to perform a 180 and change/turn on itself
    previousDirection = direction;

    // current head is the last element in the snake array
    // we get that by getting the index of snake.length and subtracting 1
    let currentHeadOfSnake = snake[snake.length - 1];

    // update the update state function to reflect new head of the snake
    let nextHeadOfSnake = {
        x: currentHeadOfSnake.x,
        y: currentHeadOfSnake.y
    };

    // these if statements deal with the change in direction for up, down, right and left:
    // for up we decrement the y value
    // because if the snake is traveling up, the y yalue is heading towards zero
    if (direction === "up") {
        nextHeadOfSnake.y--;
    }

    // for down we incrememnt the y value
    // because if the snake is traveling down, the y yalue is heading away from zero
    if (direction === "down") {
        nextHeadOfSnake.y++;
    }

    // for left we decrement the y value
    // because if the snake is traveling left, the x yalue is heading towards zero
    if (direction === "left") {
        nextHeadOfSnake.x--;
    }

    // for right we incrememnt the y value
    // because if the snake is traveling right, the x yalue is heading away from zero
    if (direction === "right") {
        nextHeadOfSnake.x++;
    }

    // Conditions to end the game if the snake tries to manuever off the board
    // currently if the snake moves off the screen it keeps going
    // so we need a way to prevent that and end the game if the snake
    // touches the border wall of the game

    // the first part of the if statement checks if the next head of the snake 
    // if less than the entire width of the game board

    // similarly, the next thing we want to account for is if the next head
    // of the snake is the width of the borad OR less than 0 to account for if the
    // snake tries to run into the wall going left x < 0 OR if the snake
    // tries to go outside the full height of the board OR less than 0 y axis

    // the last part of the if statement needs to account for the 
    // snake running into itself- if this happend we want the game to end
    // this is going to be very similar to how we relocated the food to not 
    // be in the same position as the snake so we're going to check to see if any cell
    // of the snake matches the next head of the snake using snake.some(cell)

    if (nextHeadOfSnake.x >= width || nextHeadOfSnake.x < 0 ||
        nextHeadOfSnake.y >= height || nextHeadOfSnake.y < 0 ||
        snake.some(cell => cell.x === nextHeadOfSnake.x && cell.y === nextHeadOfSnake.y)
    ) {
        console.log("Game Over")
        // then the game ends

        gameState = "over"

        // ??? wondering if here is where I add a condition to start the game for player 2
        // like changing game state to lost for player one

        // setting playcount from 0 to 1, which is basically setting up a next round for player 2
        if(gameState === "over") {
            if(playCount === 0) {
                console.log(gameState);
                playCount++;
                startPlayerTwo();
            }
        }

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

        if (nextHeadOfSnake.x === food.x && nextHeadOfSnake.y === food.y) {
            // eating the food increases the score by one
            score++

            // adding gulp sound when snake head is same as food 
            gulpSound.play();

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

// =======================GAME RUNNING- REPEATS DIVS FOR CELLS FOR 12x12 GAMEBOARD ======================
// =======================GAME RUNNING- LOOPS THROUGH SNAKE ARRAY TO DRAW SNAKE ON GAMEBOARD ============
// =======================GAME RUNNING- CREATES INNER DIVS THAT CHANGES COLORS OF THE SNAKE =============
// =======================GAME RUNNING- DRAWS FOOD ON THE BOARD =========================================
// =======================GAME RUNNING- HOUSES SCORE TEXT CONTENT =======================================


// function to redraw user interface
function redrawUserInterface() {

    // This repeats the single div on the gameboard
    // that was initially set up in the html
    // one div multiplied by width & height (12 x 12- 144 gameboard cells
    // the snake and apple can occupy
    gameboard.innerHTML = "<div></div>".repeat(width * height);

    // Draw the snake    
    // to draw the snake on grid, we need to loop through the snake array and draw each cell individually
    // to do that we use a for each loop
    snake.forEach(function (cell, index) {
        let x = cell.x;
        let y = cell.y;


        // The children of the gameboard is the snake array
            // creating new inner div for snake class to then alter the appearance
        let innerDiv = document.createElement("div");
        innerDiv.className = "snake";

            // changing the color values of the snake - works with the hueChange variable
            // at the top to randomize the colors
        let hue = hueChange + (index * 27)

                // https://convertingcolors.com/rgb-color-60_65_70.html
        
        innerDiv.style.backgroundColor = `hsl(${hue}, 100%, 71%)`;

        // this gradually makes the snake smaller at the end
        let margin = Math.min((snake.length - index) * 2, 32);
        innerDiv.style.margin = `${margin}%`    

        // gameboard.children will give me all of the divs on the board
        //.classList.add() will add a new class to the gameboard
        //.appendChild will add the new innerdiv as the snake grows
        gameboard.children[(width * y) + x].appendChild(innerDiv)
    })


        // Drawing the food
        // Adding a new section to the redraw user interface to show our food. 

      // draw image of food
    let foodImg = document.createElement("img");
    foodImg.className = "food";
    foodImg.src = "apple.png";

        // Want the snake to eat the food and grow in length by one cell each time
        // so instead of using the x and y coordinates from the snake
        // we use food.x and food.y

    gameboard.children[ (width * food.y) + food.x].appendChild(foodImg);


    // Update the score for player one
    scoreSpan.textContent = score;

}

// ================================MOVES FOOD TO POSITION WHERE SNAKE ARRAY IS NOT ============================
// Function to move the food after the snake eats it

// Need to generate a new location for the food variable
// and check whether or not the snake shares the same position of where it was
// to find the new position, we can use Math.random to find a
// random number between and 11
// and set a condition as an if statement to avoid the snake's position
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

    if (snake.some(cell => cell.x === food.x && cell.y === food.y)) {

        // if this is true, relocate the food
        // calling the function on itself now makes this a recursive function
        // it will keep running the function until it finds a location where the snake is
        // not located
        relocateFood();
    }

}

// ================================ON KEY DOWN: TRIGGERS GAME START ==========================================
// ================================ON KEY DOWN: ALLOWS SNAKE TO MOVE USING ARROWS ============================
// ================================ON KEY DOWN: DOES NOT ALLOW SNAKE TO TURN 180 =============================

// Initial game kick off happens in the onkeydown function
// onkeydown function is used when you press on a key, i.e the spacebar
// keyboardEvent is the object

// when you open the console, you can see everytime you press the any key
// each key has a code, "Space", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Enter", "Escape"

// right now, pressing any key changes the change state from ready
// to start

onkeydown = (function (keyboardEvent) {
    // console.log(keyboardEvent);

    let code = keyboardEvent.code;

    // This just prints the keyboard code strings for each press
    console.log(code)

    // When the gamestate === ready, the game is ready to start
    // This triggers game to start if any key is pressed
    if (gameState === "ready") {
        start();

        // Player 1 clicks the start button, which changes the game to 
        // "running"- which means player 1 is currently playing the game.
        // if(gameState = "ready")

        // Add onclick when the player 1 clicks the start button, 
        // then invoke the start function

        // then hide player 1 start button while player 1 is playing
        
        // When player 1 gamestate changes to "end":
        // Player 2 start button should appear

        // Add onclick when player 2 clicks the start button
        // hide player 1 start button

        // when player 2 gamestate changes to "end"
        // reset/New Game button should appear

    }


    // This allows the snake to move directions
    // adding the previousdirection in the opposite so the snake cannot
    // fold back on itself by only moving in a direction that is not the
    // complete opposite of the previous direction
    if (code === "ArrowUp" && previousDirection !== "down") {
        direction = "up";
    }

    if (code === "ArrowDown" && previousDirection !== "up") {
        direction = "down";
    }

    if (code === "ArrowLeft" && previousDirection !== "right") {
        direction = "left";
    }

    if (code === "ArrowRight" && previousDirection !== "left") {
        direction = "right";
    }

})

// add reset / New Game button
resetBtn.addEventListener("click", () => {
    window.location.reload()
})

// this reset the game for player 2 when the playcount is incremented 
function startPlayerTwo() {
    score = 0;
    scoreSpan = document.querySelector("#score-span-two");

    snake = [
        { x: 3, y: 4 },
        { x: 4, y: 4 },
        { x: 5, y: 4 }, // head of snake
    ]

    direction = "right";
    previousDirection = "";
    timeoutInterval = 300
    food = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    };

    gameState = "ready";
}