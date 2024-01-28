'use strict';
const rolldice = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const currentScore = document.querySelectorAll('.current-score');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
let playerState = 0;
let playerScores = {
  player1: 0,
  player2: 0,
};

rolldice.addEventListener('click', () => {
  const randomNum = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${randomNum}.png`;
  if (randomNum === 1) {
    document
      .querySelector(`.player--${playerState}`)
      .classList.remove('player--active');
    currentScore[playerState].innerText = 0;
    playerState = playerState === 0 ? 1 : 0;
    document
      .querySelector(`.player--${playerState}`)
      .classList.add('player--active');
  }
  currentScore[playerState].innerText = randomNum;
});

hold.addEventListener('click', () => {
  const player = document.getElementById(`score--${playerState}`);
  if (playerState === 0) {
    playerScores.player1 =
      playerScores.player1 + Number(currentScore[playerState].innerText);
    player.innerHTML = playerScores.player1;
    winner(playerScores.player1);
  } else {
    playerScores.player2 =
      playerScores.player2 + Number(currentScore[playerState].innerText);
    player.innerHTML = playerScores.player2;
    winner(playerScores.player2);
  }
});

const winner = function (score) {
  if (score >= 10) {
    document
      .querySelector(`.player--${playerState}`)
      .classList.add('player--winner');
    dice.classList.add('hidden');
    rolldice.classList.add('hidden');
    hold.classList.add('hidden');
  }
};

newGame.addEventListener('click', () => {
  playerScores = {
    player1: 0,
    player2: 0,
  };
  document
    .querySelector(`.player--${playerState}`)
    .classList.remove('player--active');
  document.querySelector(`.player--${0}`).classList.add('player--active');
  document.getElementById(`score--${0}`).innerHTML = 0;
  document.getElementById(`score--${1}`).innerHTML = 0;
  document.querySelector(`.player--${0}`).classList.remove('player--winner');
  document.querySelector(`.player--${1}`).classList.remove('player--winner');
  dice.classList.remove('hidden');
  rolldice.classList.remove('hidden');
  hold.classList.remove('hidden');
  currentScore[0].innerHTML = 0;
  currentScore[1].innerHTML = 0;
  playerState = 0;
});
