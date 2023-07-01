'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const rollBtnEl = document.querySelector('.btn--roll');
const newBtnEl = document.querySelector('.btn--new');
const holdBtnEl = document.querySelector('.btn--hold');

// functions
const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = (activePlayer + 1) % 2;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

const init = function () {
    // removing the winner class
    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);

    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);

    // resetting all the scores
    score0El.textContent = 0;
    score1El.textContent = 0;
    scores = [0, 0];
    currentScore = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    playing = true;
    activePlayer = 0;
};

// starting conditions
let scores;
let currentScore;
let activePlayer;
let playing; // game state
init();

// rolling dice functionality
rollBtnEl.addEventListener('click', function () {
    if (playing) {
        // generate random dice roll
        const dice = Math.trunc(Math.random() * 6 + 1);

        // display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // check if '1' is rolled
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // switch to next player
            switchPlayer();
        }
    }
});

holdBtnEl.addEventListener('click', function () {
    if (playing) {
        // add current score to active player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // check if player score >= 100 -> exit the game
        if (scores[activePlayer] >= 100) {
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');

            diceEl.classList.add('hidden');

            playing = false;
        } else {
            // player switch
            switchPlayer();
        }
    }
});

// resetting the game
newBtnEl.addEventListener('click', function () {
    init();
});
