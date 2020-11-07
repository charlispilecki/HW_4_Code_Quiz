// Variables
var timer = document.querySelector("#timer")
var startButton = document.querySelector("#start-button")

// Question Cards
var questionCounter = 0;

var questionNumber = document.querySelector("#question-number")
var questionText = document.querySelector("#question-text")
var questionAnswers = document.querySelector("#question-answers")

var introCard = document.querySelector("#intro-card")
var questionCard = document.querySelector("#question-card")
var initialScoreCard = document.querySelector("#initial-score-card")
var highScoreCard = document.querySelector("#high-score-card")
var allCards = [introCard, questionCard, initialScoreCard, highScoreCard]

var question = {
    "text": "Inside which HTML element do we put JavaScript code?",
    "answers": [
      "Javascript",
      "Scripting",
      "Script"
    ],
    "correctAnswer": 2
  }

// Show question function
function displayQuestion(){
    questionText.innerHTML=question.text;
    questionCounter++;
    questionNumber.innerHTML="Question #" + questionCounter;

    // clear all answers for clean slate
    questionAnswers.innerHTML=''
    question.answers.forEach(function(answer){
        // Create li element for each answer
        // <li class="list-group-item">Option A</li>
        var li = document.createElement('li');
        li.innerHTML = answer;
        li.className = 'list-group-item';
        questionAnswers.appendChild(li);
    })
}

// Start button code
startButton.addEventListener("click", function () {
    displayQuestion();
    navigateQuiz(1);
    var remainingTime = 30;
    timer.innerHTML = remainingTime; 

    // Timer function
    var countdownTimer = setInterval(function () {
        remainingTime--;
        timer.innerHTML = remainingTime; 

    }, 1000)
})

// Changing screen/card
// need to make all cards invisible unless the card has the ID of whatever is passed in

function navigateQuiz(cardIndex) {

    // make all cards invisible
    allCards.forEach(function (card) {
        card.classList.add('hidden')
    })

    // get the one we want to show
    var cardToShow = allCards[cardIndex]
    // make that card visible
    cardToShow.classList.remove('hidden')
}

// To Do
// add all questions + answers, get a random one
// add select function or radio button to questions
// add function to reduce time from timer when question is wrong
// add function to keep track of score
// add local storage for scores and initials
        // add function for displaying all high scores
        // add function for clearing all scores 
        // add function for re-starting game (navbar "Coding Quiz" takes user back to start) 
        // AND the "Re-Take Quiz" button - same function
// add function and text for right and wrong answers once user selects their q and hits "Submit"
// if have time, make "Coding Quiz" in navbar perfectly centered 


// Psuedo Code
// When user hits "Start Quiz" button, they should start quiz and go to quiz cards
// add click event for quiz questions selection
// "Coding Quiz" in navbar should reset and take user to the first screen
// create timer functionality
// Navbar "High Score" should take user to the High Score page

// When user starts quiz, they are taken to the first quiz question
// timer starts
// they should be able to click to select their answer 
// when they hit "submit" they should be A)taken to the next q and B)gain points OR lose time

    // if a user gets a question wrong, they lose 10 seconds from their time

    // if a user gets a question right, then they get 1 point
    // and your time keeps ticking but does not otherwise change

    // the game is over when the timer gets to 0

    // then the user can add their initials and their score gets recorded 