let dolphinsTeamScores = [96, 108, 89];
let koalasTeamScores = [88, 91, 110];

let avgDolphins = calculateAverage(dolphinsTeamScores);
let avgKoalas = calculateAverage(koalasTeamScores);

console.log(`The winner of the competition is ${avgDolphins > avgKoalas ? "Dolphins' Team" : "Koalas' Team"}`);

function calculateAverage(scores) {
    // Use reduce to sum up the values in the array
    let sum = scores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
    // Calculate the average
    let average = sum / scores.length;
    
    return average;
}
