const checkButton = document.querySelector(".btn.check");
const againButton = document.querySelector(".btn.again");
let input = document.querySelector(".guess");
let randomNumber = generateRandomNumber();
let score = document.querySelector(".score");
let highscore = document.querySelector(".highscore");
let message = document.querySelector(".message");

checkButton.onclick = checkNumber;
againButton.onclick = resetGame;

console.log(randomNumber);

function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
}

function updateMessage(text) {
    message.textContent = text;
}

function updateBackgroundColor(color) {
    document.querySelector("body").style.backgroundColor = color;
}

function checkNumber() {
    const guessValue = Number(input.value);

    if (!input.value) {
        updateMessage("Please enter a number.");
        return;
    }

    if (guessValue === randomNumber) {
        correctGuess();
    } else {
        wrongGuess(guessValue);
    }
}

function correctGuess() {
    updateMessage("Correct guess!");
    updateBackgroundColor("#60b347");

    if (Number(highscore.textContent) < randomNumber) {
        highscore.textContent = randomNumber;
    }

    score.textContent = 20;
}

function wrongGuess(guessValue) {
    score.textContent = Number(score.textContent) - 1;
    if (guessValue > randomNumber) {
        updateMessage("Wrong guess! Too High!");
    } else {
        updateMessage("Wrong guess! Too Low!");
    }
}

function resetGame() {
    randomNumber = generateRandomNumber();
    console.log(randomNumber);
    score.textContent = 20;
    input.value = '';
    updateBackgroundColor("black");
    updateMessage("Start guessing...");
}
