const width = 10;
const numberOfBoxes = width * width;
boxes = [];
let invadersId;
const gridwrapper = document.querySelector(".grid_wrapper ");
let shooterStartPosition = 94;
let score = 0;
let bombsFallInterval;

//Grab elements//

const startButton = document.querySelector(".start_button");
const resultsDisplay = document.querySelector(".resultsDisplay");
const introMusic = document.getElementById("Buffy_Theme_Music");
const playPauseBtn = document.getElementById("Play_pause_music");
const gameOverSound = document.getElementById("game_over");
const coinImage = document.querySelector(".coin");
const resetButton = document.querySelector(".reset_button");
const vampireExplodeSound = document.getElementById("vampire_explode");
const insertCoinText = document.querySelector(".insert_coin_text");

//Functions//
//Game Won//
function gameWon() {
  document.querySelector(".gameWon").classList.remove("hiddenWon");
}
//Game Lost//
function gameLost() {
  document.querySelector(".gameLost").classList.remove("hiddenLost");
}

//Restart Game//
function restartGame() {
  location.reload();
}

//Buttons//
//Listen for button click and run moveInvaders function//
let invadersClear;

startButton.addEventListener("click", function () {
  //wanted to update my text if a user accidentally clicks on the start button before inserting a coin but it doesn't work//
  if (!coinClicked) {
    insertCoinText.innerHTML = "You need to insert a coin first!";
  } else {
    invadersClear = setInterval(moveInvaders, 500);
  }
});

// Listen for button click and run invaderBombs function//
startButton.addEventListener("click", function () {
  bombsFallInterval = setInterval(invaderBombs, 5000);
});

//Intro music play/pause//
const originalPlayButtonText = playPauseBtn.innerHTML;
playPauseBtn.addEventListener("click", function () {
  if (introMusic.paused) {
    introMusic.play();
    playPauseBtn.innerHTML = "Play Buffy Intro Music &#9658;";
  } else {
    introMusic.pause();
    playPauseBtn.innerHTML = "Paused &#9208;";
  }
});

//Click coin before clicking play button // + coin sound plays when you click it//
let coinClicked = false;
coinImage.addEventListener("click", () => {
  if (!coinClicked) {
    coinClicked = true;
    startButton.disabled = false;
    const coinAudio = document.querySelector("#arcade_coin_sound").play();
  }
});

// coinImage.addEventListener("click", () => {
//   const coinAudio = document.querySelector("#arcade_coin_sound").play();
// });

//Listen for the reset button to be clicked and run the restartGame function//
resetButton.addEventListener("click", function () {
  restartGame();
});

//Create Grid//

function createGrid() {
  for (let index = 0; index < numberOfBoxes; index++) {
    const box = document.createElement("div");
    box.classList.add("box");
    //box.innerText = index;
    document.querySelector(".grid").appendChild(box);
    boxes.push(box);
  }

  boxes[shooterStartPosition].classList.add("shooter");
}
createGrid();

/////////////////////// SHOOTER MOVEMENT /////////////////////////

function shooterMove(event) {
  // create x coordinate to show where the shooter is and make sure they don't move further
  const x = shooterStartPosition % width;
  //console.log(`We are in box number ${x + 1} of the current row`);

  if (event.code === "ArrowRight" && x < width - 1) {
    boxes[shooterStartPosition].classList.remove("shooter");
    shooterStartPosition++;
    boxes[shooterStartPosition].classList.add("shooter");
  } else if (event.code === "ArrowLeft") {
    if (x > 0) {
      boxes[shooterStartPosition].classList.remove("shooter");
      shooterStartPosition--;
      boxes[shooterStartPosition].classList.add("shooter");
    }
  }
}
document.addEventListener("keyup", shooterMove);

/////////////////////// ADD INVADERS /////////////////////////////

boxes = Array.from(document.querySelectorAll(".grid div"));
let invaders = [
  1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25,
  26, 27, 28,
];

let invadersPosition;

function addInvaders() {
  for (let i = 0; i < invaders.length; i++) {
    boxes[invaders[i]].classList.add("invader");

    boxes[invaders[i]].style.backgroundImage = `url(./assets/invader_${
      i + 1
    }.png)`;
    // boxes[invaders[i]].style.background =
    //   "linear-gradient(to right, rgba(255,0,0,0.5), rgba(128, 0, 0,0.5))";
    //   boxes[invaders[i]].style.opacity=1!important;
    // boxes[invaders[i]].style.backgroundColor;
    // ("rgba(255, 255, 255, 0.5)");
    boxes[invaders[i]].dataset.imageId = i + 1;
  }
}
addInvaders();
function removeInvaders() {
  for (let i = 0; i < invaders.length; i++) {
    boxes[invaders[i]].classList.remove("invader");
    boxes[invaders[i]].style.backgroundImage = "";
  }
}

boxes[shooterStartPosition].classList.add("shooter");

/////////////////////// INVADER MOVEMENT ///////////////////////////

function invadersRight() {
  //removeInvaders();

  for (let i = 0; i < invaders.length; i++) {
    invaders[i]++;
  }
  addInvaders();
}

function invadersLeft() {
  //removeInvaders();

  for (let i = 0; i < invaders.length; i++) {
    invaders[i]--;
  }
  addInvaders();
}

let invaderMovement = "right";
let noVertical = false;

function anyInvadersAtEdge() {
  return invaders.some((invader) => {
    return invader % width === 0 || invader % width === 9;
  });
}

function moveInvaders() {
  //console.log(invaders.length);
  removeInvaders();
  if (anyInvadersAtEdge() && !noVertical) {
    invaderMovement = invaderMovement === "left" ? "right" : "left";
    invaders = moveInvadersDown();
    noVertical = true;
  } else {
    if (invaderMovement === "right") {
      invadersRight();
    } else {
      invadersLeft();
    }
    noVertical = false;
  }
  addInvaders();
  if (boxes[shooterStartPosition].classList.contains("invader", "shooter")) {
    boxes[shooterStartPosition].classList.remove("shooter");
    resultsDisplay.innerText = `GAME OVER! The Vampires got you! Score:${score}`;
    clearInterval(invadersClear);
    resultsDisplay.setAttribute(
      "style",
      "color: white; font-size: 10px; height: 60px; padding: 20px;"
    );

    gridwrapper.setAttribute("style", "height: 90vh;");

    gameLost();
    gameOverSound.play();
    if (introMusic.play()) {
      introMusic.pause();
      playPauseBtn.innerHTML = "Paused &#9208;";
    }
    if (vampireExplodeSound.play()) {
      vampireExplodeSound.pause();
    }
  }
  if (invaders.some((invader) => invader >= 90)) {
    gameLost();
    resultsDisplay.innerText = `GAME OVER! You didn't kill them all! Score: ${score}`;
    resultsDisplay.setAttribute(
      "style",
      "color: white; font-size: 10px; height: 60px; padding: 20px;"
    );

    gridwrapper.setAttribute("style", "height: 90vh;");

    gameOverSound.play();
    if (introMusic.play()) {
      introMusic.pause();
      playPauseBtn.innerHTML = "Paused &#9208;";
    }
    if (vampireExplodeSound.play()) {
      vampireExplodeSound.pause();
    }
  }
}

function moveInvadersDown() {
  return invaders.map((invader) => invader + 10);
}

/////////////////////// LASER SHOOTING /////////////////////////

function laserShoot(event) {
  let laserPosition = shooterStartPosition;
  let laserId;

  function moveLaser() {
    boxes[laserPosition].classList.remove("laser");
    laserPosition -= width;
    boxes[laserPosition].classList.add("laser");

    if (boxes[laserPosition].classList.contains("invader")) {
      invaders = invaders.filter((invader) => {
        return !boxes[invader].classList.contains("laser");
      });
      resultsDisplay.innerHTML = score += 100;
      if (invaders.length === 0) {
        resultsDisplay.innerHTML = `YOU WIN! Final score: ${score + 1000}`;
        clearInterval(laserId);
        gameWon();
        resultsDisplay.setAttribute(
          "style",
          "color: green; font-size: 15px; height: 60px; padding: 20px;"
        );
        gridwrapper.setAttribute("style", "height: 90vh;");
        if (introMusic.pause()) {
          introMusic.play();
          playPauseBtn.innerHTML = "Paused &#9208;";
        } else {
          introMusic.play();
        }
      }

      boxes[laserPosition].classList.remove("laser");
      boxes[laserPosition].classList.remove("invader");
      boxes[laserPosition].style.backgroundImage = "";
      boxes[laserPosition].classList.add("explosion");

      if (boxes[laserPosition].classList.contains("explosion")) {
        if (vampireExplodeSound.play()) {
          vampireExplodeSound.load();
          vampireExplodeSound.play();
        }

        setTimeout(
          () => boxes[laserPosition].classList.remove("explosion"),
          300
        );
        clearInterval(laserId);
      }
    }
  }
  if (event.code === "Space") {
    laserId = setInterval(() => {
      if (laserPosition - width >= 0) {
        moveLaser();
      } else {
        boxes[laserPosition].classList.remove("laser");
        clearInterval(laserId);
      }
    }, 100);
  }
}

document.addEventListener("keydown", laserShoot);

/////////////////////// INVADER BOMBS /////////////////////////

function invaderBombs() {
  let invaderBombStartPosition =
    invaders[Math.floor(Math.random() * invaders.length)];
  //console.log(invaderBombStartPosition, invaders[invaderBombStartPosition]);

  let clearBombs;

  function moveBombs() {
    boxes[invaderBombStartPosition].classList.remove("bomb");
    invaderBombStartPosition += width;
    boxes[invaderBombStartPosition].classList.add("bomb");

    if (boxes[invaderBombStartPosition].classList.contains("shooter")) {
      boxes[invaderBombStartPosition].classList.remove("shooter");
      resultsDisplay.innerText = `GAME OVER! Bitten! Score: ${score}`;
      clearInterval(clearBombs);
      gameLost();
      resultsDisplay.setAttribute(
        "style",
        "color: white; font-size: 12px; height: 60px; padding: 20px;"
      );

      gridwrapper.setAttribute("style", "height: 90vh;");

      gameOverSound.play();
      if (introMusic.play()) {
        introMusic.pause();
        playPauseBtn.innerHTML = "Paused &#9208;";
      }
      if (vampireExplodeSound.play()) {
        vampireExplodeSound.pause();
      }

      setTimeout(
        () => boxes[invaderBombStartPosition].classList.remove("bomb"),
        900
      );
      clearInterval(clearBombs);
    }
  }

  clearBombs = setInterval(() => {
    if (invaderBombStartPosition < 90) {
      moveBombs();
    } else {
      boxes[invaderBombStartPosition].classList.remove("bomb");
      clearInterval(clearBombs);
      clearInterval(bombsFallInterval);
    }
  }, 100);
}

window.onkeydown = function (e) {
  return e.keyCode !== 32;
};
