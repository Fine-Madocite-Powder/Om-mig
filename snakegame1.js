const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 30;
const gridBH = 9;

const snake = [{ x: Math.floor(gridBH / 2), y: Math.floor(gridBH / 2)}];
let apples = [{x: 5, y: 10}];
let direction = 'right';
let moving = 'right';

function drawSnake() {
    ctx.fillStyle = "#00F";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawApple() {
    ctx.fillStyle = "#F00";
    apples.forEach(apple => {
        ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
    });
}

function moveWall() {

}

function moveSnake() {
    const head = { ...snake[0] };
    snake.unshift(head);

    switch (direction) {
        case 'up': 
            head.y -= 1;
            moving = 'up';
            break;
        case 'down':
            head.y += 1;
            moving = 'down';
            break;
        case 'right':
            head.x += 1;
            moving = 'right';
            break;
        case 'left':
            head.x -= 1;
            moving = 'left';
            break;
    }

    for (let i = 0; i < apples.length; i++) {
        const apple = apples[i];

        if (head.x === apple.x && head.y === apple.y) {
            snake.push({});

            apples.splice(i,1);

            spawnApple();
        }
    }

    // head.x === {...head.x++} does not work.
    if (head.x === -1 || head.x === gridBH + 1 || head.y === -1 || head.y === gridBH + 1 ) {
        alert(`You have earned ${snake.length - 1} points. Unfortunately, you also died :P\nGotta find a better way to sent this massage...`);
        location.reload();
    }
    
    for (let i = 1; i < snake.length; i++) {
        const body = snake[i];
        
        if (head.x === body.x && head.y === body.y) {
            alert(`You have earned ${snake.length - 1} points. Unfortunately, you also died :P\nGotta find a better way to sent this massage...`);
            location.reload();
        }
        
    }



    snake.pop();
}

function spawnApple() {
    apples.push({  x: Math.floor(Math.random() * 9), y: Math.floor(Math.random() * 9)  });
}

function handleKeyPress (event) {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            if (moving !== "down") {
            direction = "up"; }
            break;
        case "ArrowDown":
        case "s":
            if (moving !== "up") {
            direction = "down"; }
            break;
        case "ArrowLeft":
        case "a":
            if (moving !== "right") {
            direction = "left"; }
            break;
        case "ArrowRight":
        case "d":
            if (moving !== "left") {
            direction = "right"; }
            break;
} }

function gameLoop() {
    moveSnake();
    //ADD MORE OBJECTS AFTER SNAKE
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake(); 
    drawApple();
}
apples.shift();
spawnApple();
document.addEventListener("keydown", handleKeyPress);
setInterval(gameLoop, 200);