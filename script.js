const $ = document;

const btnDice = $.querySelector(".btn--dice");
const btnNew = $.querySelector(".btn--new");
const btnHold = $.querySelector(".btn--hold");
const diceBox = $.querySelector(".dice-wrapper");
const player1 = $.querySelector(".player-1");
const player2 = $.querySelector(".player-2");
const playerName = $.querySelectorAll(".player__name");

let currentScoreplayer1 = $.querySelector(".current-score-1");
let currentScoreplayer2 = $.querySelector(".current-score-2");
let totalScoreplayer1 = $.querySelector(".player-1__score");
let totalScoreplayer2 = $.querySelector(".player-2__score");

let currentScore1,
  currentScore2,
  totalScore1,
  totalScore2 = 0;

let isPlayer1Active = true;
let isGameEnd = false;

function randomNumberGen() {
  return Math.floor(Math.random() * 6) + 1;
}

function createDiceUi(diceNumber) {
  let diceWrapper = $.createElement("div");
  diceWrapper.classList.add("dice");

  let dicePoints = $.createElement("div");
  dicePoints.classList.add(`dice__point--${diceNumber}`);

  for (let point = 0; point < diceNumber; point++) {
    let dicePoint = $.createElement("p");
    dicePoint.classList.add("dice__point");
    dicePoints.append(dicePoint);
  }

  diceWrapper.append(dicePoints);
  diceBox.append(diceWrapper);
}

function hideDice() {
  diceBox.classList.remove("hide");
}

function detectActivePlayer(player1) {
  isPlayer1Active = player1.classList.contains("player--active") ? true : false;
}

function changeActivePlayer() {
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
}

function changeCurrentScore(isPlayer1Active, diceNumber = 0) {
  if (isPlayer1Active) {
    currentScore1 = diceNumber ? currentScore1 + diceNumber : 0;
    currentScoreplayer1.innerHTML = currentScore1;
  } else {
    currentScore2 = diceNumber ? currentScore2 + diceNumber : 0;
    currentScoreplayer2.innerHTML = currentScore2;
  }
}

function changeTotalScore(isPlayer1Active) {
  if (isPlayer1Active) {
    totalScore1 += currentScore1;
    totalScoreplayer1.innerHTML = totalScore1;
  } else {
    totalScore2 += currentScore2;
    totalScoreplayer2.innerHTML = totalScore2;
  }
}

function rollDiceHandler() {
  if (isGameEnd) return;
  diceBox.innerHTML = "";
  hideDice();
  let diceNumber = randomNumberGen();
  createDiceUi(diceNumber);
  if (diceNumber === 1) {
    detectActivePlayer(player1);
    changeActivePlayer();
    changeCurrentScore(isPlayer1Active);
  } else {
    detectActivePlayer(player1);
    changeCurrentScore(isPlayer1Active, diceNumber);
  }
}

function holdHandler() {
  if (isGameEnd) return;
  detectActivePlayer(player1);
  changeTotalScore(isPlayer1Active);
  changeCurrentScore(isPlayer1Active);
  if (totalScore1 < 100 && totalScore2 < 100) {
    detectActivePlayer(player1);
    changeActivePlayer();
  } else if (totalScore1 >= 100 || totalScore2 >= 100) {
    let winnerIndex = totalScore1 > totalScore2 ? 0 : 1;
    playerName[winnerIndex].innerHTML = "winner";
    isGameEnd = true;
  }
}

function resetGameBtnHandler() {
  isGameEnd = false;
  totalScore1 = 0;
  totalScore2 = 0;
  totalScoreplayer1.innerHTML = totalScore1;
  totalScoreplayer2.innerHTML = totalScore2;
  changeCurrentScore(true);
  changeCurrentScore(false);
  changeActivePlayer();
  hideDice();
}

btnDice.addEventListener("click", rollDiceHandler);
btnHold.addEventListener("click", holdHandler);
btnNew.addEventListener("click", resetGameBtnHandler);
