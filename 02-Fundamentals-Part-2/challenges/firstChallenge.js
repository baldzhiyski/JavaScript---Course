const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

let players1 = game.players[0];
let [gk1] = players1;

let players2 = game.players[1];

let allPlayers = [...players1, ...players2];

let playersFinal = ["Thiago", "Coutinho", "Perisic", ...players1];

console.log(allPlayers);

let { team1, x: draw, team2 } = game.odds;

console.log(team1, draw);

team1 > team2 ? console.log("Team One Wins ! ") : console.log("Team Two Wins!");

function printGoals(...players) {
  let number = 0;

  players.forEach((player) => {
    console.log(player);
    number++;
  });
  console.log(`Goals scored: ${number}`);
}

printGoals(...players1);
