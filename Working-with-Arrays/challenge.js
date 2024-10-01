const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

const isEatingTooMuch = function (dog) {
  return dog.curFood * 1000 > dog.recommendedFoodPortion;
};

// 1 Task
dogs.forEach((dog) => {
  const recommendedFoodPortion = dog.weight * 0.75 * 28 * 1000;
  dog.recommendedFoodPortion = recommendedFoodPortion;
});

console.log(dogs);

// 2 Task
const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));
isEatingTooMuch(sarahDog)
  ? console.log("The dog is eating too much !")
  : console.log("The dog is eating fine !");

// 3 Task
const ownersEatTooMuch = dogs
  .filter((dog) => isEatingTooMuch(dog))
  .flatMap((dog) => dog.owners);

const ownersEatTooLittle = dogs
  .filter((dog) => !isEatingTooMuch(dog))
  .flatMap((dog) => dog.owners);

console.log(ownersEatTooLittle);
console.log(ownersEatTooMuch);

// 4 Task
const ownersEatTooMuch2 = dogs
  .filter((dog) => isEatingTooMuch(dog))
  .forEach((dog) => {
    const ownersString = dog.owners.join(" and ");
    console.log(`${ownersString}'s dogs eat too much!`);
  });

// 5 Task
console.log(
  dogs.some((dog) => dog.curFood * 1000 === dog.recommendedFoodPortion)
);

// 6 Task
console.log(
  dogs.some((dog) => dog.curFood * 1000 <= dog.recommendedFoodPortion)
);

// 7 Task
let newDogArr = dogs.filter(
  (dog) => dog.curFood * 1000 <= dog.recommendedFoodPortion
);

// 8 Task
const shallowCopy = dogs
  .slice()
  .sort((a, b) => a.recommendedFoodPortion - b.recommendedFoodPortion);
console.log(shallowCopy);
