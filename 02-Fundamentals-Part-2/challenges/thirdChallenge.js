const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🔶 Yellow card"],
]);

// Create an array 'events' of the different game events (no duplicates)
const events = [...new Set(gameEvents.values())];
console.log(events);

gameEvents.delete(92);
console.log(gameEvents);

gameEvents.forEach((v, k) => {
  if (k <= 45) {
    console.log(`[FIRST HALF]${k} : ${v}`);
  } else {
    console.log(`[SECOND HALF]${k} : ${v}`);
  }
});
