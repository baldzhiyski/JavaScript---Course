let js = "amazing";

if(js === "amazing"){
    console.log("Logging...");
}


let users = [
    {
        name: "Alice",
        age: 25,
        isMember: true
    },
    {
        name: "Bob",
        age: 30,
        isMember: false
    },
    {
        name: "Charlie",
        age: 22,
        isMember: true
    }
];

users.forEach(user=>{
    console.log(user.name + "-" + user.age)
});

let isIsland = false;
const countryName = "Bulgaria"
const language = "Bulgarian";



console.log(typeof isIsland);
console.log(typeof language);

const description = `In ${countryName} people speak ${language} !`;

console.log(description);

// language = "German"; cannot be reasigned , const variable

switch (language) {
    case "Bulgarian":
        console.log("Winner !");
        break; // This stops the execution from falling into the default case.
    default:
        console.log("Loser");
};

