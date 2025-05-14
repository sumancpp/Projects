let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x: 13, y: 15}];
let food = {x: 6, y: 7};
let isPaused = false; 


let startX, startY, endX, endY;


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed || isPaused) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function gameEngine() {
   
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        alert("Game Over. Press any key to play again!");
        restartGame();
        return;
    }

    
    if (snakeArr[0].x >= 18) snakeArr[0].x = 0;
    else if (snakeArr[0].x <= 0) snakeArr[0].x = 18;

    if (snakeArr[0].y >= 18) snakeArr[0].y = 0;
    else if (snakeArr[0].y <= 0) snakeArr[0].y = 18;

   
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        speed += 0.5; 

        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;

        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
    }


    for (let i = snakeArr.length - 2; i >= 0; i--) { 
        snakeArr[i + 1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

  
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


function restartGame() {
    inputDir = {x: 0, y: 0};
    snakeArr = [{x: 13, y: 15}];
    score = 0;
    speed = 6;
    food = {x: Math.round(2 + 14 * Math.random()), y: Math.round(2 + 14 * Math.random())};
    musicSound.play();
}


function togglePause() {
    isPaused = !isPaused;
    if (!isPaused) {
        lastPaintTime = performance.now();
        window.requestAnimationFrame(main);
    }
}


function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
}

function handleTouchEnd() {
    let diffX = endX - startX;
    let diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        
        if (diffX > 0 && inputDir.x !== -1) {
            inputDir = {x: 1, y: 0}; 
        } else if (diffX < 0 && inputDir.x !== 1) {
            inputDir = {x: -1, y: 0}; 
        }
    } else {
        
        if (diffY > 0 && inputDir.y !== -1) {
            inputDir = {x: 0, y: 1}; 
        } else if (diffY < 0 && inputDir.y !== 1) {
            inputDir = {x: 0, y: -1}; 
        }
    }
}

musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y !== 1) { 
                inputDir = {x: 0, y: -1};
            }
            break;

        case "ArrowDown":
            if (inputDir.y !== -1) { 
                inputDir = {x: 0, y: 1};
            }
            break;

        case "ArrowLeft":
            if (inputDir.x !== 1) { 
                inputDir = {x: -1, y: 0};
            }
            break;

        case "ArrowRight":
            if (inputDir.x !== -1) { 
                inputDir = {x: 1, y: 0};
            }
            break;

        case " ":
            togglePause(); 
            break;

        default:
            break;
    }
});

window.addEventListener('touchstart', handleTouchStart, false);
window.addEventListener('touchmove', handleTouchMove, false);
window.addEventListener('touchend', handleTouchEnd, false);
