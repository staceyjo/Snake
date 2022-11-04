
const width = 12;
const height = 12;
const gameboard = document.querySelector("#gameboard");



// we need a way to grab hold of the score and change its content
let scoreSpan = document.querySelector("#score-span-one");

// when used as part of the updateStateOfGame function
const hueChange = Math.floor(Math.random() * 360);

const resetBtn = document.querySelector("#resetBtn");
// right now this does nothing
// window.addEventListener("click", resetBtn);

const playerOneStartBtn = document.querySelector("#playerOneStartBtn");
// right now this does nothing
// playerOneStartBtn.addEventListener("click", playerOneStartBtn);

const playerTwoStartBtn = document.querySelector("#playerTwoStartBtn");
// right now this does nothing
// window.addEventListener("click", playerTwoStartBtn);




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


let food;

// that keeps track of the score everytime the snake eats an apple
let score = 0;

// need a way to end the game
let gameState = "ready"; // ready, running, over is start, playing, end

// defining the timeoutInterval to later use in updateStateOfGame function

// ?? why is snake moving so fast?
// this is supposed to gradually decrease by 10% each time the snake eats
let timeoutInterval = 300;



relocateFood();

redrawUserInterface();

// ===================================START FUNCTION =================================


// Defining the start function- when invoked the game is in play
function start() {

    // at start, change the game state from ready to running to start the game
    gameState = "running";

   
    setTimeout(slither, timeoutInterval);
}

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
if (nextHeadOfSnake.x >= width || nextHeadOfSnake.x < 0 ||
    nextHeadOfSnake.y >= height || nextHeadOfSnake.y < 0 ||
    snake.some(cell => cell.x === nextHeadOfSnake.x && cell.y === nextHeadOfSnake.y)
) {

    // then the game ends
    snake = [

        { x: 3, y: 4 },
        { x: 4, y: 4 },
        { x: 5, y: 4 }, // head of snake
    
    ]
    gameState = "over"

    if(gameState === "over") {

        startPlayerTwo();
    }

}

function updateStateOfGame() {

    previousDirection = direction;

 
    let currentHeadOfSnake = snake[snake.length - 1];

   

    // update the update state function to reflect new head of the snake
    let nextHeadOfSnake = {
        x: currentHeadOfSnake.x,
        y: currentHeadOfSnake.y
    };

   
    if (direction === "up") {
        nextHeadOfSnake.y--;
    }

  
    if (direction === "down") {
        nextHeadOfSnake.y++;
    }

   
    if (direction === "left") {
        nextHeadOfSnake.x--;
    }


    if (direction === "right") {
        nextHeadOfSnake.x++;
    }


    

}



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
    

    

    if (snake.some(cell => cell.x === food.x && cell.y === food.y)) {

        relocateFood();
    }

}



onkeydown = (function (keyboardEvent) {
    // console.log(keyboardEvent);

    let code = keyboardEvent.code;

    // This just prints the keyboard code strings for each press
    console.log(code)

    // When the gamestate === ready, the game is ready to start
    // This triggers game to start if any key is pressed
    if (gameState === "ready") {
        start();


    }




 
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

// 
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

}