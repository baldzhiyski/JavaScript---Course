  function fruitProcessor(apples,oranges){
    console.log(apples,oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
  }

  const juice = fruitProcessor(5, 10);

  console.log(juice);

  // Function declaration
  function calcAge1(birthYear){
    return 2024 - birthYear;
  }

  const age = calcAge1(2004); 
  console.log(age);

  // Function expression
  const calcAge2 = function (birthYear){
    return 2024 - birthYear;
  }

  console.log(calcAge2(2003));

  // Arrow functions
  const add = (a, b) => a + b;
  console.log(add(15,25));

  const sumOfEvens = numbers => 
    numbers
        .filter(num => num % 2 === 0) // Filters even numbers
        .reduce((sum, num) => sum + num, 0); // Sums them up

  const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  console.log(`The sum of the events is equal to ${sumOfEvens(numbersArray)}`);

  const friends = ['Michael','Steven','Joshua'];

  friends.push('George');
  friends.unshift('Kratos')
  console.log(friends.length)

console.log("Before sorting:", friends);

friends.sort((a, b) => b.localeCompare(a));
console.log("After sorting in descending order:", friends);

if(friends.includes('Steven')) console.log('Logging....');

const person = {
    name: "John",
    age: 30,
    greet: function() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};

// Calling the function within the object
person.greet();