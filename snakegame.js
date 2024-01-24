const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;

const snake = [{ x: 10, y: 10}];
let apples = { x: 15, y: 10};
let direction = 'right';

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

function moveSnake() {
    const head = { ...snake[0] };
    snake.unshift(head);

    switch (direction) {
        case 'up': 
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'right':
            head.x += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
    }

    for (let i = 0; i < apples.length; i++) {
        const apple = apples[i];
        if (head.x === apple.x && head.y === apple.y) {
            snake.push({});
            spawnApple();
        }
    }
    snake.pop();
}

function handleKeyPress (event) {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            direction = "up";
            break;
        case "ArrowDown":
        case "s":
            direction = "down";
            break;
        case "ArrowLeft":
        case "a":
            direction = "left";
            break;
        case "ArrowRight":
        case "d":
            direction = "right";
            break;
} }

function gameLoop() {
    moveSnake();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake(); }

document.addEventListener("keydown", handleKeyPress);
setInterval(gameLoop, 100)