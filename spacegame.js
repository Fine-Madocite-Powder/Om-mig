const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");



function gameLoop() {
    // Update game state

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render game elements

    // Repeat the loop
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();