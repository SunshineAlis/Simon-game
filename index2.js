// Simon Game Implementation in JavaScript
// Initialize variables
let sequence = [];
let playerSequence = [];
let level = 0;

const colors = ["leftTop", "rightTop", "leftBottom", "rightBottom"];

const sounds = {
  leftTop: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  rightTop: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  leftBottom: new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
  ),
  rightBottom: new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  ),
};

// Start the game
function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  nextLevel();
}
function shuffle(value) {
  for (let i = value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [value[i], value[j]] = [value[j], value[i]];
  }
  console.log(value);
  return value;
}

// Generate the next sequence
function nextLevel() {
  level++;
  level1.innerHTML = level;
  playerSequence = [];
  sequence.push(colors[Math.floor(Math.random() * colors.length)]);
  shuffle(sequence);
  playSequence();
}

function playSound(color) {
  if (sounds[color]) {
    sounds[color].currentTime = 0; // Reset playback for consecutive presses
    sounds[color].play();
  }
}

// Play the current sequence
function playSequence() {
  sequence.forEach((color, index) => {
    setTimeout(() => {
      flashColor(color);
    }, (index + 1) * 1000);
  });
}

// Flash the color on the screen
function flashColor(color) {
  const button = document.getElementById(color);
  playSound(color);
  button.style.animation = `ajillah${colors.indexOf(color) + 1} 0.5s linear`;
  setTimeout(() => {
    button.style.animation = "none";
  }, 500);
}

//Handle player input
function handlePlayerInput(color) {
  playerSequence.push(color);
  flashColor(color);
  checkPlayerInput();
}

// Check if the player's input is correct
function checkPlayerInput() {
  const currentIndex = playerSequence.length - 1;

  if (playerSequence[currentIndex] !== sequence[currentIndex]) {
    gameOver.style.display = "block";
    gameOverCancel.style.display = "block";
    startGame();
    return;
  }

  if (playerSequence.length === sequence.length) {
    setTimeout(nextLevel, 500);
  }
}

// UI Creation Code
let rightTop = document.createElement("button");
rightTop.id = "rightTop";
let leftTop = document.createElement("button");
leftTop.id = "leftTop";
let rightBottom = document.createElement("button");
rightBottom.id = "rightBottom";
let leftBottom = document.createElement("button");
leftBottom.id = "leftBottom";

const gameOver = document.createElement("div");
gameOver.className = "gameOver";
gameOver.textContent = "Game Over!";
document.getElementById("mainContain").appendChild(gameOver);

const gameOverCancel = document.createElement("img");
gameOverCancel.src = "closeicon.png";
gameOverCancel.className = "close";
document.getElementById("mainContain").appendChild(gameOverCancel);

[rightTop, leftTop, rightBottom, leftBottom].forEach((button) => {
  button.className = "color-button";
  document.getElementById("mainContain").appendChild(button);
});

let midCircle = document.createElement("div");
midCircle.id = "midCircle";

let midCircleTitle = document.createElement("h2");
midCircleTitle.id = "midCircle_garchig";
midCircleTitle.innerHTML = "Simon";

let level1 = document.createElement("div");
level1.className = "level";
level1.innerHTML = "0";

let startButton = document.createElement("button");
startButton.id = "midCircle_dund";
startButton.innerHTML = "Start";
midCircle.append(midCircleTitle, level1, startButton);
document.getElementById("mainContain").appendChild(midCircle);

gameOverCancel.addEventListener("click", () => {
  gameOver.style.display = "none";
  gameOverCancel.style.display = "none";
});

// Set up event listeners
startButton.addEventListener("click", startGame);
document.querySelectorAll(".color-button").forEach((button) => {
  button.addEventListener("click", () => {
    handlePlayerInput(button.id);
  });
});
