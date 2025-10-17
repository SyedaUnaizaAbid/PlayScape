const words = [
	{ word: "cat", hint: "A small pet animal" },
	{ word: "dog", hint: "Man's best friend" },
	{ word: "book", hint: "You read this" },
	{ word: "tree", hint: "Has leaves and branches" },
	{ word: "sun", hint: "Bright star in the sky" },
	{ word: "moon", hint: "Shines at night" },
	{ word: "car", hint: "Has four wheels" },
	{ word: "pen", hint: "Used for writing" },
	{ word: "apple", hint: "A fruit and a company" },
	{ word: "computer", hint: "Used for coding" },
	{ word: "music", hint: "We love to listen to it" },
	{ word: "river", hint: "Flows with water" },
	{ word: "school", hint: "A place to learn" },
	{ word: "planet", hint: "We live on one" },
	{ word: "garden", hint: "Full of flowers" },
	{ word: "chair", hint: "You sit on it" },
	{ word: "phone", hint: "Used for calling" },
	{ word: "door", hint: "You open and close it" },
	{ word: "bird", hint: "Has wings and can fly" },
	{ word: "bread", hint: "Used to make sandwiches" },
	{ word: "teacher", hint: "Helps you learn" },
	{ word: "hospital", hint: "Where doctors work" },
	{ word: "family", hint: "People you love" },
	{ word: "station", hint: "Where trains stop" },
	{ word: "window", hint: "Lets light into a room" },
];

let chosenWord = "";
let displayWord = [];
let wrongCount = 0;
const maxWrong = 6;

const wordDisplay = document.getElementById("wordDisplay");
const message = document.getElementById("message");
const wrongCountDisplay = document.getElementById("wrongCount");
const hintText = document.getElementById("hint");
const keyboard = document.getElementById("keyboard");

function newGame() {
	const random = words[Math.floor(Math.random() * words.length)];
	chosenWord = random.word.toLowerCase();
	displayWord = Array(chosenWord.length).fill("_");
	hintText.textContent = "Hint: " + random.hint;
	wrongCount = 0;
	wrongCountDisplay.textContent = wrongCount;
	message.textContent = "";
	updateWordDisplay();
	createKeyboard();
}

function updateWordDisplay() {
	wordDisplay.textContent = displayWord.join(" ");
}

function createKeyboard() {
	keyboard.innerHTML = "";
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	letters.forEach((letter) => {
		const btn = document.createElement("button");
		btn.textContent = letter;
		btn.classList.add("key");
		btn.addEventListener("click", () => handleGuess(letter.toLowerCase(), btn));
		keyboard.appendChild(btn);
	});
}

function handleGuess(letter, button) {
	button.disabled = true;

	if (chosenWord.includes(letter)) {
		chosenWord.split("").forEach((ch, i) => {
			if (ch === letter) displayWord[i] = letter;
		});
		updateWordDisplay();
		message.textContent = "✅ Correct!";
	} else {
		wrongCount++;
		wrongCountDisplay.textContent = wrongCount;
		message.textContent = "❌ Wrong!";
	}

	checkGameEnd();
}

function checkGameEnd() {
	if (!displayWord.includes("_")) {
		message.textContent = "🎉 You rescued the word!";
		disableAllKeys();
	} else if (wrongCount >= maxWrong) {
		message.textContent = `💀 Game Over! The word was "${chosenWord}".`;
		disableAllKeys();
	}
}

function disableAllKeys() {
	document.querySelectorAll(".key").forEach((btn) => (btn.disabled = true));
}

document.getElementById("restartBtn").addEventListener("click", newGame);

newGame();
