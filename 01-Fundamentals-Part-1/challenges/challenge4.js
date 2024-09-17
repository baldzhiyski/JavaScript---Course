let billValues = [275, 40, 430];

// Get a random index from the array
let randomIndex = Math.floor(Math.random() * billValues.length);

// Access the random value
let randomBill = billValues[randomIndex];
let tip;

if(randomBill>=50 && randomBill<=300){
    tip = 0.15*randomBill;
}else{
    tip = 0.2*randomBill;
}

console.log(`The bill was ${randomBill} , the tip was ${tip}, and the total 
    value was ${randomBill+tip}`);