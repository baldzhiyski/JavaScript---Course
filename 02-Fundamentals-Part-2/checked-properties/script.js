// Get references to DOM elements
const myCheckBox = document.getElementById("myCheckBox");
const visaButton = document.getElementById("visaBtn");
const masterCardButton = document.getElementById("masterCard");
const payPalButton = document.getElementById("payPal");
const submitButton = document.getElementById("mySubmit");
const subResult = document.getElementById("subResult");
const paymentResult = document.getElementById("paymentResult");

// Constants
const successMessage = 'Successfully bought subscription via';

// Event listener for the submit button
submitButton.addEventListener('click', () => {
    validateSubscription();
    validatePaymentMethod();
});

// Function to validate subscription checkbox
function validateSubscription() {
    subResult.textContent = myCheckBox.checked
        ? ''
        : 'Please select the subscription button!';
}

// Function to validate selected payment method
function validatePaymentMethod() {
    if (visaButton.checked) {
        setPaymentResult('Visa');
    } else if (masterCardButton.checked) {
        setPaymentResult('MasterCard');
    } else if (payPalButton.checked) {
        setPaymentResult('PayPal');
    } else {
        paymentResult.textContent = 'Please choose a payment method!';
    }
}

// Helper function to set payment result message
function setPaymentResult(method) {
    paymentResult.textContent = `${successMessage} ${method}!`;
}
