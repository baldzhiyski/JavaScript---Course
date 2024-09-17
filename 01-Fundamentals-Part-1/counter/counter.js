// Get references to buttons and elements
const decreaseButton = document.getElementById("decrease");
const resetButton = document.getElementById("reset");
const increaseButton = document.getElementById("increase");
const countLabel = document.getElementById("countLabel");
const invalidMessage = document.getElementById("invalidMessage");

// General function to update the counter
function updateCounter(action) {
    let currentValue = parseInt(countLabel.textContent); // Convert current count to a number
    
    // Perform the respective action
    if (action === 'decrease') {
        if (currentValue === 0) {
            invalidMessage.textContent = "Negative numbers are not supported!";
            return;
        }
        countLabel.textContent = currentValue - 1;
    } else if (action === 'increase') {
        invalidMessage.textContent = ""; // Clear invalid message if increasing
        countLabel.textContent = currentValue + 1;
    } else if (action === 'reset') {
        invalidMessage.textContent = ""; // Clear invalid message
        countLabel.textContent = 0;
    }
}

// Attach event listeners to buttons
decreaseButton.onclick = () => updateCounter('decrease');
increaseButton.onclick = () => updateCounter('increase');
resetButton.onclick = () => updateCounter('reset');
