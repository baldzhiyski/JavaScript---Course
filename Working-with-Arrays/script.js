"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2014-11-18T21:31:17.178Z",
    "2014-12-23T07:42:02.383Z",
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-05-02 T17:01:17.194Z",
    "2024-09-02T23:36:17.929Z",
    "2024-10-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

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

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const daysPassed = calcDaysPassed(new Date(), date);

  // Logic to format based on the number of days passed
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed === 2) return "2 days ago";
  if (daysPassed === 3) return "3 days ago";
  if (daysPassed === 7) return "A week ago";

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  const hour = `${date.getHours()}`.padStart(2, 0);
  const minutes = `${date.getMinutes()}`.padStart(2, 0);

  return `${day}/${month}/${year}, ${hour}:${minutes}`;
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: `${currency}`,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((movement, index) => {
    let type = movement > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[index]);
    const parsedDate = formatMovementDate(date);

    const formattedMov = formatCur(movement, acc.locale, acc.currency);

    let html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } deposit</div>
         <div class="movements__date">${parsedDate}</div>
          <div class="movements__value">${formattedMov}</div>
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
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
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

  labelSumIn.textContent = formatCur(income, acc.locale, acc.currency);
  labelSumOut.textContent = formatCur(outcomes, acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((dep) => (dep * acc.interestRate) / 100)
    .filter((interest) => interest > 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const updateUI = function (currentAcc) {
  // Display movements
  displayMovements(currentAcc);

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

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      loggedAcc.locale,
      options
    ).format(now);

    updateUI(loggedAcc);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    loggedAcc.balance >= amount &&
    recieverAcc &&
    recieverAcc.username !== loggedAcc.username
  ) {
    console.log("Transfer valid");

    loggedAcc.movements.push(-amount);
    recieverAcc.movements.push(amount);
    loggedAcc.movementsDates.push(new Date());
    recieverAcc.movementsDates.push(new Date());
    updateUI(loggedAcc);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && loggedAcc.movements.some((mov) => mov >= amount * 0.1)) {
    loggedAcc.movements.push(amount);

    loggedAcc.movementsDates.push(new Date());
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

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(loggedAcc, !sorted);
  sorted = !sorted;
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

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
