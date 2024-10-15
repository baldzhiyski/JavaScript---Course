console.log("Exporting module");

// scoped to the module
// all top level variables are private
const shippingCost = 10;
const cart = [];

// works if top level code !
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the card!`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity };
export const orderStock = function (product, quantity, supplier) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to the card! Ordered from ${supplier}`
  );
};
