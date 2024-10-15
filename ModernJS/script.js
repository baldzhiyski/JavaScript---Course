// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity,
// } from "./shoppingCard.js";
// console.log("Import module");

import * as ShoppingCart from "./shoppingCard.js";
ShoppingCart.addToCart("bread", 2);

// Not defined
// console.log(shippingCost);

// addToCart("Apples", 10);
// console.log(price);
// console.log(totalQuantity);

// Imports are not simple copies , it is a live connection
// Top level await only in modules
// const postsUrl = "https://jsonplaceholder.typicode.com/posts";
// const getLastPost = async function () {
//   const data = await fetch(postsUrl).then((responce) => responce.json());

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// Top level await
// const post = await getLastPost();
// console.log(post);

// closures
// const shoppingCardSec = (function () {
//   const cart = [];
//   const shippingCost = 27;
//   const totalQuantity = 23;
//   const totalPrice = 247;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to the card!`);
//   };

//   const orderStock = function (product, quantity, supplier) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to the card! Ordered from ${supplier}`
//     );
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

import cloneDeep from "lodash-es";

const state = {
  cart: {
    items: [
      { product: "Bread", quantity: 2, price: 2.99 },
      { product: "Milk", quantity: 1, price: 1.99 },
    ],
    totalItems: 2,
    totalPrice: 7.97,
  },
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
  },
};

const deepClone = cloneDeep(state);
state.user.name = "Karl Lagerfeld";
// Not changed in the deep Copy
console.log(deepClone);

import cloneDeep from "lodash-es";

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = "Hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const jonas = new Person("Jonas");

console.log("Jonas" ?? null);

console.log(state.cart.items.find((el) => el.quantity >= 2));
Promise.resolve("TEST").then((x) => console.log(x));

import "core-js/stable";
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polifilling async functions
import "regenerator-runtime/runtime";
