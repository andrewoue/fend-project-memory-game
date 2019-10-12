/*jshint esversion: 6 */

//TODO: Reset all card to ground state for shuffle/game start

/*
 * Create a list that holds all of your cards
 */


let clockOff = true;
let time = 0;
let moves = 0;
let toggledCards = [];

const cards = Array.from(document.querySelectorAll('.card'));
console.log(cards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function runClock() {
  time = 0;
  let clockTime = setInterval(() => {
    time++;
    displayClock();
    console.log(time);
  }, 1000);
}

function displayClock() {
  $('.clock').html(time);
  console.log(time);
}

function scoreMoves() {
  if (moves == 17) {
    $('ul li:eq(0)').css('visibility', 'hidden');
  } else if (moves == 25) {
    $('ul li:eq(1)').css('visibility', 'hidden');
  } else if (moves >= 32) {
    $('ul li:eq(2)').css('visibility', 'hidden');
  }
}

function addMoves() {
  moves++;
  const numberMoves = $('.moves').text(moves);
}

function shuffleCards() {
  console.log('Cards', cards);
  const shuffledCards = shuffle(cards);
  console.log('Shuffled Cards', shuffledCards);
  for (card of shuffledCards) {
    $('.deck').append(card);
  }
}

shuffleCards();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

console.log('What?');

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

$('.deck').on('click', function (event) {
  const clickTarget = event.target;
  if (clickTarget.classList.contains('card') && toggledCards.length < 2) {
    toggleCard(clickTarget);
    pushCard(clickTarget);
    addMoves(); //Added to keep track of moves
    scoreMoves(); //Added to score number of moves
  }

  if (clockOff) {
    runClock();
    clockOff = false;
  }

  if (toggledCards.length == 2) {
    checkMatch();
  }

  function toggleCard(clickTarget) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
  }

  function pushCard(clickTarget) {
    toggledCards.push(clickTarget);
    console.log(toggledCards);
  }

  function checkMatch() {
    if (toggledCards[0].firstElementChild.className ==
      toggledCards[1].firstElementChild.className) {
      toggledCards[0].classList.toggle('match');
      toggledCards[1].classList.toggle('match');
      toggledCards.length = 0;
      console.log('Match');
      console.log(toggledCards);
    } else {
      console.log('Try again!');
      setTimeout(() => {
        toggledCards[0].classList.toggle('open');
        toggledCards[0].classList.toggle('show');
        toggledCards[1].classList.toggle('open');
        toggledCards[1].classList.toggle('show');
        toggledCards.length = 0;
        console.log(toggledCards);
      }, 500);
    }
  }
});

//
// var deck = document.querySelector('.deck');
// deck.addEventListener('click', event => {
//   const clickTarget = event.target;
//   if (clickTarget.classList.contains('card')) {
//     console.log('You clicked me!');
//   }
// });
