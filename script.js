// ===================================GAMEBOARD =================================
// If you ever decide to change from 15 x 15
// but be sure to change the numbers in your style sheet as well
const width = 15;
const height = 15;
const gameboard = document.querySelector("#gameboard");

// ===================================GAME STATUS =================================
// need a way to start the game
let gameState = "ready"; // "ready" to start, "running" or currently playing, "over" is game end

// ===================================GAME SPEED =================================
// timeoutInterval set to 300 miliseconds
// later used in updateGame function to speed up the game as player eats food
let timeoutInterval = 300;


// ===================================PLAYER 1 SCORE =================================
// score-span-one updates the score on the html 
// score will track everytime the snake eats food
let scoreSpan = document.querySelector("#score-span-one");
let score = 0;

// ===================================GAME PLAY ROUND =================================
// The playCount is the round, or each turn of the player.
// playCount 1 is player, playCount 2 is player 2
let playCount = 0;

// ===================================SNAKE ARRAY =================================
// snake parts and position are contained inside of an array
// snake will appear in same position with each new game for each player
// 5th row (y: 4), occupying the 4th, 5th, 6th columns (x : 3, 4, 5)

let snake = [
    { x: 3, y: 4 }, // tail of snake
    { x: 4, y: 4 }, // body of snake
    { x: 5, y: 4 }, // head of snake 
]

// gameboard.children[ (width * y) + x].classList.add("snake")


// if you wanted snake to appear in the first cell
// gameboard.children[0].classList.add("snake")

// if you wanted snake to appear in the last cell
// gameboard.children[143].classList.add("snake")


// ===================================SNAKE COLORS =================================
// this will pick a random hue color to start when we refresh 
// when used as part of the updateGame function
const hueChange = Math.floor(Math.random() * 360);


// ===================================SNAKE DIRECTION =================================
// defining the direction of the snake, by default we are setting snake to move to the right
let direction = "right";

// Setting variable for previous direction to an empty string
//At the moment, the snake can move back on itself when changing directions
// will update this in a function later
let previousDirection = "";

// ===================================FOOD =================================
// Setting food variable, was previouly a red cell
let food;

// Want to eventually randomize the food items
// right now set to use image of apple

// let foodItemIndex = 0; // first cell

// const foodItemsArray = [
//     '🐁',
//     '🍇',
//     '🍉',
//     '🍈',
//     '🍓',
//     '🍍',
//     '🍌',
//     '🥝',
//     '🍏',
//     '🍎',
//     '🍔',
//     '🍅',
//     '🥚',
//   ];


// ===================================RESET BUTTON =================================
const resetBtn = document.querySelector("#resetBtn");

// ===================================SOUNDS =================================
const gulpSound = new Audio("gulp.mp3");

const loseSound = new Audio("lose1.wav");

const backgroundSound = new Audio("backgroundmusic.mp3");


// ===================================ON PAGE LOAD =================================
// Calling this here places the food at a random location and redraws game whenever page is loaded

relocateFood();

redrawGameBoard();

// ===================================START FUNCTION =================================
// Changes the game state from "ready" to running and starts music when any key is pressed
// The global setTimeout() method sets a timer which executes a function 
// or specified piece of code once the timer expires
// the slither function will be called after 300 milliseconds


function start() {
    gameState = "running";
    backgroundSound.play();
    setTimeout(slither, timeoutInterval);
}

// ===================================SLITHER FUNCTION =================================
function slither() {
    // updates the contents of the snake array
    updateGame()

    // the last object in the snake array is going to be the head of the snake
    redrawGameBoard()

    // schedule slither if game is still runnning
    if (gameState === "running") {
        setTimeout(slither, timeoutInterval);
    }
}

// =======================UPDATE GAME STATE FUNCTION: ===============================
// Updates everytime the snake moves, by 1 cell at a time
// by updating the contents of the snake array


// 1: Sets the "previousDirection" variable to the "direction" so we can use the pD variable later
// to NOT allow the snake to change directions 180 degrees/turn on itself

// 2. Sets the value of snake's current head to the length of the snake array minus 1

// 3. Calculates the new/next head of the snake based on where the current snake head is
// next head will then take the the x and y positions of the current head

// 4. if statements deal with the change in direction for up, down, right and left:
    // for up we decrement the y value, because if the snake is traveling up, the y yalue is heading towards zero
    // for down we incrememnt the y value, because if the snake is traveling down, the y yalue is heading away from zero
    // for left we decrement the x value, because if the snake is traveling left, the x yalue is heading towards zero
    // for right we incrememnt the x value, because if the snake is traveling right, the x yalue is heading away from zero

// 5.  Before developing this function, if the snake moved off the screen it kept going
// Now, we change the game state to over/ end the game:
    // IF the new/next head of the snake goes beyond the border wall width 
    // OR height in either direction
    // OR if the snake ran into itself. To check this, we use snake.some(cell)
    // to check if any cell of the snake matches the next head of the snake 
    // * this is very similar to how we relocate the food to not be in the same position as the snake

// 6. When the game state is over: 
    // the lose sound plays
    // the playcount increases by 1, which is what initates the game for player 2

// 7.  if none of those conditions are met, the gamestate is not over
    // .push adds the next/new head of the snake to the end of the existing array
    // regardless of whether or not the snake eats the food source, 
    // we always need to push the next head of the snake on top of the current head,

// 8. At the moment when the snake goes after the food source, nothing happens
    // we want the snake to grow by one cell everytime it encounters the position of 
    // where the food currently is

    // Then we want the position of the food source to change to somewhere else on the grid,
    // in a position the snake does not currently occupy
    
    // if the next head of the snake is the same position as the food source
    // then we know the snake is "eating" the food and we can add 1 point

// 9. To make the game challenging, we'll shorten the time interval by 10% 
// each time the snake eats food by setting the timeout to be 90%,
//  by multiplying the time interval by 0.9


// =======================================GAME RUNNING ==========================================


function updateGame() {
    let currentHeadOfSnake = snake[snake.length - 1];

    let newHeadOfSnake = {
        x: currentHeadOfSnake.x,
        y: currentHeadOfSnake.y
    };

    // snake changing directions when player presses key
    previousDirection = direction;
    if (direction === "up") {
        newHeadOfSnake.y--;
    }

    if (direction === "down") {
        newHeadOfSnake.y++;
    }

    if (direction === "left") {
        newHeadOfSnake.x--;
    }

    if (direction === "right") {
        newHeadOfSnake.x++;
    }

    // If statements to end the game if snake goes outside width or height
    // of gameboard in either direction or if the snake touches part of its
    // own body 

    if (newHeadOfSnake.x >= width || newHeadOfSnake.x < 0 ||
        newHeadOfSnake.y >= height || newHeadOfSnake.y < 0 ||
        snake.some(cell => cell.x === newHeadOfSnake.x && cell.y === newHeadOfSnake.y)
    ) {
        // then the game ends
        gameState = "over"


        // setting playcount from 0 to 1, which is basically setting up a next round for player 2
        if(gameState === "over") {
            loseSound.play();

            if(playCount === 0) {
                // console.log(gameState);
                playCount++;
                startPlayerTwo();
            }
        }

    } else {
        snake.push(newHeadOfSnake);

        // if next head of snake matches food positon, increase score by 1, play sound then move food
        if (newHeadOfSnake.x === food.x && newHeadOfSnake.y === food.y) {
            score++
            gulpSound.play();
            relocateFood();
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
function redrawGameBoard() {

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

    async function createFood() {
        foodItemIndex = Math.floor(Math.random() * numCells);
        if (currentSnake.includes(foodItemIndex)) {
          await wait(100);
          createFood();
        } else {
          cells[foodItemIndex].classList.add('food-item');
          cells[foodItemIndex].innerText = randomElementFromArray(foodItemsArray);
        }
      }

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