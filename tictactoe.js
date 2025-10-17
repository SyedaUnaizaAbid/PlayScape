// --- Elements ---
const selectBox = document.querySelector(".select-box"),
	selectBtnX = selectBox.querySelector(".playerX"),
	selectBtnO = selectBox.querySelector(".playerO"),
	playBoard = document.querySelector(".play-board"),
	players = document.querySelector(".players"),
	allBoxes = document.querySelectorAll(".play-area span"),
	resultBox = document.querySelector(".result-box"),
	wonText = resultBox.querySelector(".won-text"),
	replayBtn = resultBox.querySelector("button");

let playerSign = "X";
let runBot = true;

// --- Initialize ---
window.onload = () =>
	allBoxes.forEach((box) =>
		box.addEventListener("click", () => playerMove(box))
	);

selectBtnX.onclick = startGame;
selectBtnO.onclick = () => {
	players.classList.add("active", "player");
	startGame();
};

// --- Start game ---
function startGame() {
	selectBox.classList.add("hide");
	playBoard.classList.add("show");
}

// --- Handle player move ---
function playerMove(box) {
	const icon = players.classList.contains("player") ? "O" : "X";
	playerSign = icon;
	box.textContent = icon;
	box.id = icon;
	box.style.pointerEvents = "none";
	players.classList.toggle("active");
	checkWinner();
	playBoard.style.pointerEvents = "none";

	setTimeout(botMove, Math.random() * 1000 + 200);
}

// --- Bot move ---
function botMove() {
	if (!runBot) return;
	const emptyBoxes = [...allBoxes].filter((box) => !box.id);
	const box = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
	if (!box) return;

	const icon = players.classList.contains("player") ? "X" : "O";
	playerSign = icon;
	box.textContent = icon;
	box.id = icon;
	box.style.pointerEvents = "none";
	players.classList.toggle("active");

	checkWinner();
	playBoard.style.pointerEvents = "auto";
}

// --- Check winner or draw ---
function checkWinner() {
	const b = (n) => document.querySelector(`.box${n}`).id;
	const wins = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7],
	];

	if (wins.some(([a, b1, c]) => b(a) && b(a) === b(b1) && b(a) === b(c))) {
		runBot = false;
		setTimeout(
			() => showResult(`Player <p>${playerSign}</p> won the game!`),
			700
		);
	} else if ([...allBoxes].every((box) => box.id)) {
		runBot = false;
		setTimeout(() => showResult("Match has been drawn!"), 700);
	}
}

// --- Show result ---
function showResult(message) {
	wonText.innerHTML = message;
	resultBox.classList.add("show");
	playBoard.classList.remove("show");
}

// --- Replay ---
replayBtn.onclick = () => window.location.reload();
