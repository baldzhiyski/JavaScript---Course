// Using Spread Operator for Destructing arrays, objects
const arr = [1,2,...[3,4]];

const[a,b,...others] = [1,2,3,4,5];

console.log(a,b,others);

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  
    openingHours: {
      thu: {
        open: 12,
        close: 22,
      },
      fri: {
        open: 11,
        close: 23,
      },
      sat: {
        open: 0, // Open 24 hours
        close: 24,
      },
    },
    orderPizza : function(mainIngredient, ... otherIngredients){
        console.log(mainIngredient,otherIngredients);
    }
  };

 const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu , ...restaurant.starterMenu];
 console.log(pizza,risotto,otherFood);


 // Objects
const {sat,...weekDays} = restaurant.openingHours;
console.log(weekDays);

// Functions
const calculateSum = function(... numbers) {
   return numbers.reduce((sum,current) => sum + current,0)
}

console.log(calculateSum(3,4,5));

const x = [23,3,3];
console.log(calculateSum(...x));


restaurant.orderPizza("Tomatoes", "Letuce","Onion","Olives","Meat")