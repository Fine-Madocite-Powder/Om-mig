const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;

const snake = [{ x: 10, y: 10}];
let apples = [{x: 16, y: 16}];
let direction = 'right';
let moving = 'right';

let wall = [{ x: -1, y: 10}, { x: -1, y: -1}, { x: -1, y: -1}, { x: -1, y: -1} ];
let wallMD = "right";
let wallMCounter = 5;
let wallCollider = false;

let points = 0;

function drawWall() {
    ctx.fillStyle = "#0F0";
    wall.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

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

    if (wallMCounter === 0) {
        wallMCounter = 2;
        return;
    }
    wallMCounter--;

    const start = { ...wall[0]};
    wall.unshift(start);

    switch (wallMD) {
        case 'up':
            start.y--;
            break;
        case 'down':
            start.y++
            break;
        case 'right':
            start.x++;
            break;
        case 'left':
            start.x--;
            break;
    }


    

    if (start.x === 20 || start.y === 20 || start.x === -1 || start.y === -1) {
        spawnWall();
    }

    for (let i = 0; i < apples.length; i++) {
        const apple = apples[i];

        if (start.x === apple.x && start.y === apple.y) {
            wall.push({});

            apples.splice(i,1);

            spawnApple();
        }
    }
    if (wallCollider) {
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];

        if (start.x === segment.x && start.y === segment.y) {
            wall.pop();
            wallCollider = false
        }
    }}

    wall.pop();
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

            points++;

            apples.splice(i,1);

            spawnApple();
        }
    }

    if (head.x === -1 || head.x === 20 || head.y === -1 || head.y === 20) {
        //location.reload();
        snake.shift()
        snake.shift()
        snake.shift()
    }
    
    for (let i = 1; i < snake.length; i++) {
        const body = snake[i];
        
        if (head.x === body.x && head.y === body.y) {
            //location.reload();
            snake.shift()
            snake.shift()
            snake.shift()
        }
        
    }

    for (let i = 0; i < wall.length; i++) {
        const segment = wall[i];
        
        if (head.x === segment.x && head.y === segment.y) {
            //location.reload();
            snake.shift()
            snake.shift()
            snake.shift()
        }
    }


    snake.pop();
}

function spawnApple() {
    apples.push({  x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)  });
}

function spawnWall() {
    const directionIndex = Math.floor(Math.random() * 4);
    const start = wall[0];
    wallCollider = true;

    switch (directionIndex) {
        case 0:
            wallMD = 'up';
            start.y = 20;
            start.x = apples[Math.floor(Math.random() * apples.length)].x;
            break;
        case 1:
            wallMD = 'down';
            start.y = -1;
            start.x = apples[Math.floor(Math.random() * apples.length)].x;
            break;
        case 2:
            wallMD = 'left';
            start.x = 20;
            start.y = apples[Math.floor(Math.random() * apples.length)].y;
            break;
        case 3:
            wallMD = 'right';
            start.x = -1;
            start.y = apples[Math.floor(Math.random() * apples.length)].y;
            break;
    }
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
    moveWall();
    moveSnake();
    //ADD MORE OBJECTS AFTER SNAKE
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake(); 
    drawApple();
    drawWall();

    if (snake.length < 1) {
        //alert(`You have earned ${points} points. Unfortunately, you also died :P\nGotta find a better way to sent this massage...`);
        window.open("file:///C:/Users/Elev/OneDrive/Desktop/Stuff to learn/Things in the thinking/Om Mig/Om-mig/GAMES.html","_self");
        console.log("Does this code execute?");
    }
}

spawnApple();
spawnApple();
document.addEventListener("keydown", handleKeyPress);
setInterval(gameLoop, 190);