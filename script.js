// ===================================GAMEBOARD =================================
// If you ever decide to change from 15 x 15
// but be sure to change the numbers in your style sheet as well
const width = 15;
const height = 15;
const gameboard = document.querySelector("#gameboard");

// ===================================GAME STATUS =================================
// "ready" to start, "running" or currently playing, "over" is game end
let gameState = "ready"; 

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
    { x: 3, y: 4 },
    { x: 4, y: 4 }, 
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

// ===================================RESET BUTTON =================================
const resetBtn = document.querySelector("#resetBtn");

// ===================================SOUNDS =================================
const gulpSound = new Audio("gulp.mp3");

const loseSound = new Audio("lose1.wav");

const backgroundSound = new Audio("backgroundmusic.mp3");

const gameOverSound = new Audio("gameover.wav")


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

    // setTimeout() method calls a function after a number of milliseconds.
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


// =======================================GAME RUNNING updateGame ==========================================


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


// =======================================GAME RUNNING redrawGameBoard ==========================================
// 1. The innerHTML property sets or returns the HTML content (inner HTML) of an element.
    // Using this to repeat the single <div></div> created in HTML 225 times, for 15 x 15 gameboard cells

// 2. To draw the snake on grid, we need to loop through the snake array and draw each cell individually
    // to loop through the snake array, we use a for each loop

// 3. We can alter the appearance of the snake by creating an innerDiv variable 
    // and add it to the snake class so we can manipulate the colors and margin

// 4. To change the color values of the snake - we use the the hueChange variable 
    // const hueChange = Math.floor(Math.random() * 360)
    // innerDiv.style.backgroundColor = `hsl(${hue}, 100%, 71%)`;

// 5. To gradually make smaller towards the tail:
    // let margin = Math.min((snake.length - index) * 2, 32);
    // innerDiv.style.margin = `${margin}%` 
    
// 6. gameboard.children will give me all of the divs on the board
        //.classList.add() will add a new class to the gameboard
        //.appendChild will add the new innerdiv as the snake grows

// 7. Using the dom to draw the food by creating an element, giving it a class name of food
// then using .scr to select the picture saved in the file.
// eventually I want to randomly select a food item from an array of emojis 

// 8. gameboard.children[ (width * food.y) + food.x].appendChild(foodImg) adds the 
// food image to the gameboad


function redrawGameBoard() {
    gameboard.innerHTML = "<div></div>".repeat(width * height);

    // Draw the snake    
    snake.forEach(function (cell, index) {
        let x = cell.x;
        let y = cell.y;

        // adds inner div to snake class we can further manipulate the colors
        let innerDiv = document.createElement("div");
        innerDiv.className = "snake";

        // changes snake color
            // The hsla() functional notation expresses a given color according to its hue,
            // saturation, and lightness components.
        let hue = hueChange + (index * 20)
        innerDiv.style.backgroundColor = `hsl(${hue}, 100%, 25%)`;

        // this gradually makes the snake smaller at the end
        let margin = Math.min((snake.length - index) * 2, 70);
        innerDiv.style.margin = `${margin}%`    

        // adds new color with smaller margin everytime snake grows
        gameboard.children[(width * y) + x].appendChild(innerDiv)
    })

    // Drawing the food on the gameboard
    let foodImg = document.createElement("img");
    foodImg.className = "food";
    foodImg.src = "apple.png";
    
    // Adding food to the gameboad
    gameboard.children[ (width * food.y) + food.x].appendChild(foodImg);

    // Updates the score on html when point is added
    scoreSpan.textContent = score;
}

// ================================RELOCATING THE FOOD ============================
// 1. Generate a new location for the food variable after the snake eats it 
// Use Math.floor(Math.random() * width) to generate a random number between 0 and 14 (width is 15)

// 2. Set a condition as an if statement to avoid the snake's position
// so the position the food is never on top of where the snake is.

// 3. Using .some() method checks if the snake location and the food intercept
// if they do- we call the function on itself 

// Calling the function on itself now makes this a recursive function
// it will keep running the function until it finds a location to position 
// the food where the snake is not located 


function relocateFood() {
    food = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
      };
    
    if (snake.some(cell => cell.x === food.x && cell.y === food.y)) {
        relocateFood();
    }

}

// ================================STARTING GAME ============================
// 1. Game start happens in the onkeydown function
    // onkeydown function is used when you press on a key, i.e the spacebar

// 2. keyboardEvent is an object, each key has a code
    // console.log(keyboardEvent), you can see everytime you press the any key
    // and the code name: "Space", "ArrowRight", "ArrowLeft", 
    // "ArrowUp", "ArrowDown", "Enter", "Escape"

// 3. When the page is loaded, the game state is set to ready
    // Pressing any key changes the change state from ready to running
    // since the start function is invoked when a key is pressed

// 4. Added if statements to prevent snake from folding back on itself
    // so it cannot move in the exact opposite of the previous direction

onkeydown = (function (keyboardEvent) {
    let code = keyboardEvent.code;
    console.log(code)

    // This triggers game to start if any key is pressed
    if (gameState === "ready") {
        start();
    }

    // preventing complete opposite of the previous direction
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

// ================================RESET BUTTON ============================
resetBtn.addEventListener("click", () => {
    window.location.reload()
})

// ================================TWO-PLAYER FUNCTION ============================
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

// Other things I would do: 
// Add an end screen
// Randomize the food items
// Add emoji eyes to my snake head

// function gameOver() {
//     gameOverSound.play()
//     document.getElementById("game-over").style.display="block";
// }


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

 // async function createFood() {
    //     foodItemIndex = Math.floor(Math.random() * numCells);
    //     if (currentSnake.includes(foodItemIndex)) {
    //       await wait(100);
    //       createFood();
    //     } else {
    //       cells[foodItemIndex].classList.add('food-item');
    //       cells[foodItemIndex].innerText = randomElementFromArray(foodItemsArray);
    //     }
    //   }

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
