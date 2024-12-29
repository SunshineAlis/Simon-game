const main = document.createElement("div");
main.className = "main";

const homePageImg = document.createElement("img");
homePageImg.src = "homePage.png";
homePageImg.style.width = ("80%");


const welcomeText = document.createElement("div");
welcomeText.innerHTML = "Welcome to Simon Says!";
welcomeText.id = "welcomeText";

const playButtonForKids = document.createElement("a");
playButtonForKids.innerHTML = "Play for Kids!";
playButtonForKids.id = "playButtonForKids";
playButtonForKids.href = "./index1.html";

const playButtonStandart = document.createElement("a");
playButtonStandart.innerHTML = "Play Standart";
playButtonStandart.id = "playButtonStandart";
playButtonStandart.href = "./index2.html";


main.appendChild(playButtonStandart);
main.appendChild(playButtonForKids);
main.appendChild(welcomeText);
main.appendChild(homePageImg);
document.getElementById("landingPage").appendChild(main);
landingPage.classList.add("landingPage")

// Background sound 
const backgroundSound = new Audio("simonsays.mp3");
backgroundSound.loop = true; // Sound-г давтаж тоглуулах
backgroundSound.volume = 0.5; // Дууны чангыг тохируулах

// Background sound control 
const soundControlButton = document.createElement("button");
soundControlButton.id = "soundControlButton";
soundControlButton.textContent = "🔊 Sound On"; // Анх дуу тоглож байх
soundControlButton.classList.add("soundControlButton");

//  Sound toggle
let isPlaying = false;
soundControlButton.addEventListener("click", () => {
  if (isPlaying) {
    backgroundSound.pause();
    soundControlButton.textContent = "🔇 Sound Off";
  } else {
    backgroundSound.play();
    soundControlButton.textContent = "🔊 Sound On";
  }
  isPlaying = !isPlaying;
});

// main-д нэмэх
main.appendChild(soundControlButton);

// Background sound-г тоглуулах
backgroundSound.play();
isPlaying = true;

