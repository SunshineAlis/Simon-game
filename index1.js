// ****************** togloomiin css n enees ehlene **************
// Тоглоомын үндсэн container
const gameContainer = document.getElementById("gameContainer");
// Дүрснүүдийн мэдээлэл
const instruments = [
  {
    id: "violin",
    image: "violin.png",
    x: 15,
    y: 25,
  },
  {
    id: "piano",
    image: "piano.png",
    x: 28,
    y: 50,
  },
  {
    id: "guitar",
    image: "guitar.png",
    x: 46,
    y: 28,
  },
  {
    id: "flute",
    image: "flute.png",
    x: 60,
    y: 55,
  },
];

const sounds = {
  violin: new Audio("violin.mp3"),
  piano: new Audio("piano.mp3"),
  guitar: new Audio("guitar.mp3"),
  flute: new Audio("flute.mp3"),
};
// Дүрснүүдийг үүсгэж, байрлуулах функц
instruments.forEach((instrument) => {
  // instrument wrapper
  const instrumentDiv = document.createElement("button");
  instrumentDiv.classList.add("instrument");
  instrumentDiv.style.left = `${instrument.x}%`;
  instrumentDiv.style.top = `${instrument.y}%`;
  // Зураг нэмэх
  const img = document.createElement("img");
  img.src = instrument.image;
  img.alt = instrument.name;
  instrumentDiv.id = instrument.id;
  instrumentDiv.appendChild(img);
  gameContainer.appendChild(instrumentDiv);
});
// start button iin id bolon neej ogow
const startButton = document.createElement("button");
startButton.className = "startButton";
startButton.textContent = "START";
gameContainer.appendChild(startButton);

const numberSpan = document.createElement("span");
numberSpan.className = "number";
numberSpan.textContent = "0";
const topControls = document.createElement("div");
topControls.className = "top-controls";

const scoreDiv = document.createElement("div");
scoreDiv.className = "score";

// const soundButton = document.createElement("div");
// soundButton.className = "circle-button sound-button";

// const soundIcon = document.createElement("img");
// soundIcon.src = "soundicon.png";
// soundIcon.alt = "sound"; //sound hiih ystoi

// soundButton.appendChild(soundIcon);

// const closeButton = document.createElement("div");
// closeButton.className = "circle-button close-button";

// const closeIcon = document.createElement("img");
// closeIcon.src = "closeicon.png";
// closeIcon.alt = "Close";

// closeButton.appendChild(closeIcon);

// const soundClose = document.createElement("div");
// soundClose.className = "soundClose";
// soundClose.appendChild(soundButton);
// soundClose.appendChild(closeButton);

const noteSpan = document.createElement("span");
noteSpan.className = "note";
noteSpan.innerHTML = "&#9835;"; // Нот дүрс

//audio
const scoreAudio = new Audio("./scoresound.wav");
const gameOverSound = new Audio("./gameoversound.wav");
const backgroundSound = new Audio ("./background.mp3")


//game over

const gameOver = document.createElement("div");
gameOver.className = "gameOver";
gameOver.textContent = "Game Over!";
gameContainer.appendChild(gameOver);

const gameOverCancel = document.createElement("img");
gameOverCancel.src = "closeicon.png";
gameOverCancel.className = "close";

gameContainer.appendChild(gameOverCancel);
scoreDiv.appendChild(noteSpan);
scoreDiv.appendChild(numberSpan);
// topControls.appendChild(soundClose);
topControls.appendChild(startButton);
topControls.appendChild(scoreDiv);
gameContainer.appendChild(topControls);

//*****************togloomiin css n duussan  */

// togloomiin ajillah functionii bichiglel uunees ehelsen

// Initialize variables
let sequence = [];
let playerSequence = [];
let level = 0;

const music = ["violin", "piano", "guitar", "flute"];

// Start the game
function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  nextLevel();
}

function playSound(instrument) {
  // Бүх дуунуудыг зогсоох
  Object.values(sounds).forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });

  // Сонгосон дууг тоглуулах
  if (sounds[instrument]) {
    sounds[instrument].play();
  }
}

// Generate the next sequence
function nextLevel() {
  level++;
  numberSpan.innerHTML = level;
  playerSequence = [];
  const nextinstrument = music[Math.floor(Math.random() * music.length)];
  sequence.push(nextinstrument);
  playSequence();
}

// Play the current sequence
function playSequence() {
  sequence.forEach((instrument, index) => {
    setTimeout(() => {
      flashinstrument(instrument);
    }, (index + 1) * 1000);
  });
}

// Flash the instrument on the screen
function flashinstrument(instrument) {
  const button = document.getElementById(instrument);
  playSound(instrument);
  button.style.animation = "ajillah 0.5s linear";
  setTimeout(() => {
    button.style.animation = "none";
  }, 700);
}

// Handle player input
function handlePlayerInput(instrument) {
  playerSequence.push(instrument);
  flashinstrument(instrument);
  checkPlayerInput();
}

// Check if the player's input is correct
function checkPlayerInput() {
  const currentIndex = playerSequence.length - 1;

  if (playerSequence[currentIndex] !== sequence[currentIndex]) {
    gameOver.style.display = "block";
    gameOverCancel.style.display = "block";
    gameOverSound.play();
    sounds.pause();
    startGame();
    return;
  }

  if (playerSequence.length === sequence.length) {
    setTimeout(nextLevel, 700);
  }
}

gameOverCancel.addEventListener("click", () => {
  gameOver.style.display = "none";
  gameOverCancel.style.display = "none";
});

startButton.addEventListener("click", startGame);
document.querySelectorAll(".instrument").forEach((button) => {
  button.addEventListener("click", () => {
    handlePlayerInput(button.id);
  });
});
