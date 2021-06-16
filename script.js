'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, playing, activePlayer, currentScore;

//Starting Conditions
const init = () => {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const rollTheDice = () => {
  if (playing) {
    //Generate a random Dice roll
    const diceNo = Math.trunc(Math.random() * 6 + 1);

    //Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = 'dice-' + diceNo + '.png';

    //check if diceNo is 1
    if (diceNo != 1) {
      currentScore += diceNo;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player with current score =0
      switchPlayer();
    }
  }
};

const holdTheScoreHandler = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      //switch player with current score =0
      switchPlayer();
    }
  }
};

btnRoll.addEventListener('click', rollTheDice);
btnHold.addEventListener('click', holdTheScoreHandler);
btnNew.addEventListener('click', init);
