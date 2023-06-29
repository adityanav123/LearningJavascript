'use strict';

// functions
const displayMessage = function (message) {
  document.querySelector(`.message`).textContent = message;
};

// secret number init.
let secretNumber = Math.trunc(Math.random() * 20 + 1);
const secretNumberString = document.querySelector('.number').textContent;

// original message
const orgMessage = document.querySelector('.message').textContent;

let score = 20;
let maxScore = 0;

// LISTEN FOR EVENTS
document.querySelector('.check').addEventListener('click', function () {
  const guessed = Number(document.querySelector('.guess').value);

  if (!guessed) {
    displayMessage('Not a Number 🙈');
  } else {
    if (guessed !== secretNumber) {
      if (score > 0) {
        guessed > secretNumber
          ? displayMessage('☝ Too High')
          : displayMessage('👇 Too Low');

        --score;
      }
    } else if (guessed === secretNumber) {
      displayMessage(`Correct Number! 🎉`);
      maxScore = Math.max(maxScore, score);
      document.querySelector(`.number`).textContent = secretNumber;

      document.querySelector(`body`).style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = `30rem`;
    }
  }

  if (score <= 0) {
    displayMessage('Game Over 🚩');
  }

  // update the score.
  document.querySelector('.score').textContent = score;
  document.querySelector('.highscore').textContent = maxScore;
});

// Game reset
document.querySelector('.again').addEventListener('click', function () {
  document.querySelector(`body`).style.backgroundColor = '#222';
  document.querySelector('.number').style.width = `15rem`;
  displayMessage(orgMessage);
  document.querySelector('.guess').value = ``;
  document.querySelector(`.number`).textContent = `?`;
  document.querySelector('.score').textContent = 20;

  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
});
