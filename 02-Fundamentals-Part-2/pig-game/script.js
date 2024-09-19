let pictures = ["dice-1.png", "dice-2.png", "dice-3.png", "dice-4.png", "dice-5.png", "dice-6.png"];
const totalScore1 = document.querySelector("#score--0");
const totalScore2 = document.querySelector("#score--1");
const currentScore1 = document.querySelector("#current--0");
const currentScore2 = document.querySelector("#current--1");

const dice = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn.btn--roll");
const holdBtn = document.querySelector(".btn.btn--hold");
const resetGameBtn = document.querySelector(".btn.btn--new");

// Add variable to track the current player (0 for player 1, 1 for player 2)
let activePlayerIndex = 0; 

rollBtn.addEventListener("click", () => {
    let randomPicNumber = Math.floor(Math.random() * 6) + 1;
    dice.src = pictures[randomPicNumber - 1];

    // Get the current active player's scores based on the active player index
    let currentScore = activePlayerIndex === 0 ? currentScore1 : currentScore2;

    if (randomPicNumber === 1) {
        // Reset the current score of the active player to 0
        currentScore.textContent = 0;

        // Switch the active player
        switchPlayer();
        return;
    }

    // Add the rolled number to the current score
    currentScore.textContent = Number(currentScore.textContent) + randomPicNumber;
});

holdBtn.addEventListener("click", function() {
    let totalScore = activePlayerIndex === 0 ? totalScore1 : totalScore2;
    let currentScore = activePlayerIndex === 0 ? currentScore1 : currentScore2;

    // Add current score to total score
    totalScore.textContent = Number(totalScore.textContent) + Number(currentScore.textContent);

    // Reset current score to 0
    currentScore.textContent = 0;

    // Switch the active player
    switchPlayer();
});

resetGameBtn.addEventListener("click", () => {
    // If player 2 is active, switch back to player 1
    if (activePlayerIndex !== 0) switchPlayer();
    
    // Reset all scores
    totalScore1.textContent = 0;
    totalScore2.textContent = 0;
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;

    // Reset the dice image to the default one
    dice.src = "dice-1.png";
});

function switchPlayer() {
    const activePlayer = document.querySelector(".player--active");
    const inactivePlayer = document.querySelector(".player:not(.player--active)");

    // Remove the active class from the active player and add it to the inactive player
    activePlayer.classList.remove("player--active");
    inactivePlayer.classList.add("player--active");

    // Switch the active player index (0 for player 1, 1 for player 2)
    activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
}
