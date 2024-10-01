"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach((movement, index) => {
    let type = movement > 0 ? "deposit" : "withdrawal";
    let html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } deposit</div>
          <div class="movements__value">${movement}€</div>
        </div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterBegin", html);
  });
};
const calcPrintBalance = (acc) => {
  const balance = acc.movements.reduce((acc, curVal, i, arr) => {
    return acc + curVal;
  }, 0);
  acc.balance = balance;
  labelBalance.textContent = `${balance}€`;
};
const createUsernames = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toLowerCase();
  });
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${income}€`;
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((dep) => (dep * acc.interestRate) / 100)
    .filter((interest) => interest > 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (currentAcc) {
  // Display movements
  displayMovements(currentAcc.movements);

  //Display balance
  calcPrintBalance(currentAcc);

  // Display summary
  calcDisplaySummary(currentAcc);
};

createUsernames(accounts);

let loggedAcc;

// Event Handlers

btnLogin.addEventListener("click", function (e) {
  console.log("We are in");
  // Prevent Form from submitting
  e.preventDefault();

  loggedAcc = accounts.find((acc) => acc.username === inputLoginUsername.value);

  // If such acc exists
  if (loggedAcc?.pin === Number(inputLoginPin.value)) {
    // Display UI and message

    labelWelcome.textContent = `Welcome back, ${loggedAcc.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(loggedAcc);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo = "";

  if (
    amount > 0 &&
    loggedAcc.balance >= amount &&
    recieverAcc &&
    recieverAcc.username !== loggedAcc.username
  ) {
    console.log("Transfer valid");

    loggedAcc.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI(loggedAcc);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && loggedAcc.movements.some((mov) => mov >= amount * 0.1)) {
    loggedAcc.movements.push(amount);

    updateUI(loggedAcc);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Delete an account");

  const confirmUsername = inputCloseUsername.value;
  const confirmPass = Number(inputClosePin.value);

  if (loggedAcc.username === confirmUsername && loggedAcc.pin === confirmPass) {
    console.log("Deletion starting");
    const index = accounts.findIndex((acc) => acc.username === confirmUsername);
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = "";

    console.log(accounts);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////// Examples
const eurToUsd = 1.1;
movements.map((movement) => {
  return movement * eurToUsd;
});

const deposits = movements.filter((mov) => {
  return mov > 0;
});

const withdrawals = movements.filter((mov) => {
  return mov <= 0;
});
