const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const finalHighScore = document.getElementById("finalHighScore");
const restartBtn = document.getElementById("restartBtn");
const pauseBtn = document.getElementById("pauseBtn");
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

let playerX = 180;
let score = 0;
let missed = 0;
let boxes = [];
let gameRunning = false;
let paused = false;
let highScore = localStorage.getItem("catchHighScore") || 0;

highScoreDisplay.textContent = "High Score: " + highScore;
player.style.left = playerX + "px";

// ---------------- Player Movement -----------------
// Keyboard
document.addEventListener("keydown", function (e) {
	if (!gameRunning || paused) return;
	if (e.key === "ArrowLeft" && playerX > 0) playerX -= 20;
	if (e.key === "ArrowRight" && playerX < 350) playerX += 20;
	player.style.left = playerX + "px";
});

// Mouse movement inside game area
gameArea.addEventListener("mousemove", function (e) {
	if (!gameRunning || paused) return;
	let rect = gameArea.getBoundingClientRect();
	let mouseX = e.clientX - rect.left;
	playerX = Math.max(0, Math.min(mouseX - 25, 350));
	player.style.left = playerX + "px";
});

// ---------------- Game Logic -----------------
// Create a falling box
function createBox() {
	if (!gameRunning || paused) return;
	let box = document.createElement("div");
	box.classList.add("box");
	box.style.left = Math.floor(Math.random() * 380) + "px";
	box.style.top = "0px";
	gameArea.appendChild(box);
	boxes.push(box);
}

// Update game (move boxes, check catch/miss)
function updateGame() {
	if (!gameRunning || paused) return;
	for (let i = 0; i < boxes.length; i++) {
		let box = boxes[i];
		let boxY = parseInt(box.style.top);
		boxY += 5;
		box.style.top = boxY + "px";
		let boxX = parseInt(box.style.left);

		// Catch
		if (boxY >= 470 && boxX >= playerX && boxX <= playerX + 50) {
			score++;
			scoreDisplay.textContent = "Score: " + score;
			gameArea.removeChild(box);
			boxes.splice(i, 1);
			i--;
		}
		// Miss → immediate Game Over
		else if (boxY > 500) {
			missed++;
			endGame();
			return;
		}
	}
}

// ---------------- Game Control -----------------
function endGame() {
	gameRunning = false;
	if (score > highScore) {
		highScore = score;
		localStorage.setItem("catchHighScore", highScore);
	}
	finalScore.textContent = "Your Score: " + score;
	finalHighScore.textContent = "High Score: " + highScore;
	highScoreDisplay.textContent = "High Score: " + highScore;
	gameOverScreen.style.display = "block";
}

// Reset/start game
function startGame() {
	score = 0;
	missed = 0;
	boxes.forEach((b) => gameArea.removeChild(b));
	boxes = [];
	playerX = 180;
	player.style.left = playerX + "px";
	scoreDisplay.textContent = "Score: 0";
	gameOverScreen.style.display = "none";
	gameRunning = true;
	paused = false;
	pauseBtn.textContent = "Pause";
}

// ---------------- Buttons -----------------
startBtn.addEventListener("click", function () {
	startScreen.style.display = "none";
	startGame();
});

restartBtn.addEventListener("click", function () {
	startGame();
});

pauseBtn.addEventListener("click", function () {
	if (!gameRunning) return;
	paused = !paused;
	pauseBtn.textContent = paused ? "Resume" : "Pause";
});

// ---------------- Game Loop -----------------
setInterval(createBox, 1500);
setInterval(updateGame, 50);
