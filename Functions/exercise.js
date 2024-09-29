let bookings = [];

const createBook = function (flightName, numPassengers, price) {
  numPassengers ||= 1;
  price ||= 99;
  const booking = {
    flightName,
    numPassengers,
    price,
  };

  bookings.push(booking);
  console.log(bookings);
};

createBook("Sofia-Memmingen");

let flight = "LH123";
const hristo = {
  name: "Hristo Hristov",
  passport: 214134121,
};

const checkIn = function (flightNumber, passenger) {
  flight = "BG1213";
  passenger.NAME = "Mr. " + passenger.name;

  if (passenger.passport === 214134121) {
    console.log("Check IN");
  }
};

checkIn(flight, hristo);

const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// Higher Orther Func
const transformer = function (str, fn) {
  console.log(fn(str));
};

transformer("Java Script the best !", upperFirstWord);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetHey = greet("Hey");
greetHey("Jonas");

const lufthansa = {
  airline: "LuftHansa",
  lataCode: "LH",
  bookings: [],
  book(flightNumber, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.lataCode}${flightNumber}`
    );
    this.bookings.push({
      flight: `${this.lataCode} ${flightNumber}`,
      name,
    });
  },
};

lufthansa.book(229, "Jonas Scherev");
console.log(lufthansa.bookings);

// Call and Apply ( when we used this in the function )

const book = lufthansa.book;
book.call(lufthansa, 23, "Sarah Williams");
console.log(lufthansa);

// Or

const flightData = [561, "George Kronekov"];
book.apply(lufthansa, flightData);

// Bind Method .Do it once and from then on reuse this func.It returns new func ! This keyword is dynamic !
// We can also define the values in the bind as list of parameters
const bookLH = book.bind(lufthansa);

bookLH(299, "Steven");
console.log(lufthansa);

const runOnce = function () {
  console.log("This will never run again !");
};
runOnce();

// IIFE
(function () {
  console.log("This will never run again !");
})();

// Some closures examples
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);
