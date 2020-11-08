// Variables
var timer = document.querySelector("#timer")
var startButton = document.querySelector("#start-button")
var submitButton = document.querySelector("#submit-button")
var submitHighScoreButton = document.querySelector("#submit-high-score")
var initialsInput = document.querySelector("#initials-input")
var highScoreList = document.querySelector("#high-score-list")
var retakeQuizButton = document.querySelector("#retake-quiz-button")
var clearButton = document.querySelector("#clear-button")
var viewHighScores = document.querySelector('#view-high-scores')

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

var question;
var countdownTimer;
var remainingTime;

var pointCounter = 0;

// Show question function
function displayQuestion() {
    question = getQuestion();
    questionText.innerHTML = question.text;
    questionCounter++;
    questionNumber.innerHTML = "Question #" + questionCounter;

    // clear all answers for clean slate
    questionAnswers.innerHTML = ''
    question.answers.forEach(function (answer) {
        // Create li element for each answer
        // <li class="list-group-item">Option A</li>
        var li = document.createElement('li');
        li.innerHTML = answer;
        li.className = 'list-group-item';
        // Styling for when user selects an answer; hover stays on selected item
        li.addEventListener('click', function () {
            for (var i = 0; i < questionAnswers.children.length; i++) {
                var child = questionAnswers.children[i];
                child.classList.remove('selected');
            }
            li.classList.add('selected');
        })
        questionAnswers.appendChild(li);
    })
}

// Dynamic question/answers 
function getQuestion() {
    var randomIndex = Math.floor(Math.random() * questionsDatabase.length);
    return questionsDatabase[randomIndex];
}

// Question submit code
submitButton.addEventListener("click", function () {
    var selectedAnswerIndex = 0;
    for (var i = 0; i < questionAnswers.children.length; i++) {
        var child = questionAnswers.children[i];

        if (child.classList.contains("selected") === true) {
            selectedAnswerIndex = i;
        }
    }

    if (question.correctAnswer === selectedAnswerIndex) {
        displayMessage("Correct!");

        // Adding points to the score for correct answers
        pointCounter++;
    }

    else {
        remainingTime -= 5;
        if (remainingTime < 0) {
            remainingTime = 0;
        }
        timer.innerHTML = remainingTime;
        displayMessage("Wrong!");

    }

    setTimeout(function () {
        document.querySelector("#message-div").innerHTML = '&nbsp;';
        displayQuestion();
    }, 1000)

})

// Correct/Wrong text for answers
function displayMessage(message) {
    document.querySelector("#message-div").innerHTML = message;
}


// Start button code
startButton.addEventListener("click", function () {
    displayQuestion();
    navigateQuiz(1);
    remainingTime = 45;
    timer.innerHTML = remainingTime;

    // Timer function
    countdownTimer = setInterval(function () {
        remainingTime--;
        timer.innerHTML = remainingTime;
        if (remainingTime <= 0) {
            endGame();
        }
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

// End game function
function endGame() {
    // timer goes to 0
    remainingTime = 0;
    timer.innerHTML = remainingTime;
    clearInterval(countdownTimer);
    // go to high score card 
    navigateQuiz(2);
    // Message should say "Your High Score is:" and display score
    var realScore = document.querySelector("#real-score");
    realScore.innerHTML = "Your score: " + pointCounter;

}

// High Score save function
submitHighScoreButton.addEventListener('click', function () {
    var existingHighScoresJson = localStorage.getItem('highScores');
    var existingHighScores = [];
    if (existingHighScoresJson) {
        existingHighScores = JSON.parse(existingHighScoresJson);
    }

    var newHighScore = {
        initials: initialsInput.value,
        score: pointCounter
    };

    var found = false;
    existingHighScores.forEach(function (highScore) {
        if (highScore.initials === newHighScore.initials) {
            highScore.score = newHighScore.score;
            found = true;
        }
    });
    if (!found) {
        existingHighScores.push(newHighScore);
    }

    localStorage.setItem('highScores', JSON.stringify(existingHighScores));

    displayHighScores()

    //switch to high score card
    navigateQuiz(3)

    // Clear out initials input
    initialsInput.value = '';

})


// Show high scores function
function displayHighScores() {

    // Show all high scores in dynamic way
    var json = localStorage.getItem('highScores')
    var highScores = JSON.parse(json)

    if (!highScores) {
        highScores = []
    }

    // clear all scores for clean slate
    highScoreList.innerHTML = ''
    highScores.forEach(function (highScore) {
        /*
        <li class="list-group-item d-flex justify-content-between align-items-center">
            High Score 3
            <span class="badge badge-primary badge-pill">100</span>
        </li>
        */
        var li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        var text = document.createTextNode(highScore.initials);
        li.appendChild(text);
        var span = document.createElement("span");
        span.className = "badge badge-primary badge-pill";
        li.appendChild(span);
        span.innerHTML = highScore.score;

        highScoreList.appendChild(li);
    })
}

retakeQuizButton.addEventListener('click', function () {

    // Reset counters
    questionCounter = 0;
    pointCounter = 0;

    // Show question card
    navigateQuiz(0);
})

clearButton.addEventListener('click', function () {
    localStorage.setItem('highScores', JSON.stringify([]))

    // clear all scores for clean slate
    highScoreList.innerHTML = ''

})

viewHighScores.addEventListener('click', function () {
    endGame();
    displayHighScores()
    navigateQuiz(3)
})


// To Do
// add all questions + answers, get a random one
// add select function or radio button to questions
// add function to reduce time from timer when question is wrong
// add function to keep track of score
// add local storage for scores and initials
        // add function for displaying all high scores
        // add function for clearing all scores 
        // add function for re-starting game with the "Re-Take Quiz" button 
// add function and text for right and wrong answers once user selects their q and hits "Submit"
// if have time, make "Coding Quiz" in navbar perfectly centered 


// Psuedo Code
// When user hits "Start Quiz" button, they should start quiz and go to quiz cards
// add click event for quiz questions selection
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