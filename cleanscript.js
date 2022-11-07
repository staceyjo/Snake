const width = 15;
const height = 15;
const gameboard = document.querySelector("#gameboard");
const resetBtn = document.querySelector("#resetBtn");
const gulpSound = new Audio("gulp.mp3");
const loseSound = new Audio("lose1.wav");
const backgroundSound = new Audio("backgroundmusic.mp3");
const hueChange = Math.floor(Math.random() * 360);



let gameState = "ready"; // "ready" to start, "running" or currently playing, "over" is game end
let timeoutInterval = 300;
let scoreSpan = document.querySelector("#score-span-one");
let score = 0;
let playCount = 0;
let direction = "right";
let previousDirection = "";
let snake = [
    { x: 3, y: 4 }, // tail of snake
    { x: 4, y: 4 }, // body of snake
    { x: 5, y: 4 }, // head of snake 
]
let food;

// On page load:
relocateFood();
redrawGameBoard();

function start() {
    gameState = "running";
    backgroundSound.play();
    setTimeout(slither, timeoutInterval);
}

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

function redrawGameBoard() {
    gameboard.innerHTML = "<div></div>".repeat(width * height);

    // Draw the snake    
    snake.forEach(function (cell, index) {
        let x = cell.x;
        let y = cell.y;

        // adds inner div to snake class we can further manipulate
        let innerDiv = document.createElement("div");
        innerDiv.className = "snake";

        // changes snake color
        let hue = hueChange + (index * 20)
        innerDiv.style.backgroundColor = `hsl(${hue}, 100%, 71%)`;

        // this gradually makes the snake smaller at the end
        let margin = Math.min((snake.length - index) * 2, 32);
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

function relocateFood() {
    food = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
      };
    
    if (snake.some(cell => cell.x === food.x && cell.y === food.y)) {
        relocateFood();
    }

}

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




