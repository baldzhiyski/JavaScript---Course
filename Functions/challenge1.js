const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
};

poll.displayResult = function (type) {
  if (type === "string") {
    console.log(`Poll results are ${this.answers.join(" ").trim()}`);
  } else if (type === "array") {
    console.log(this.answers);
  }
};

poll.registerNewAnswer = function () {
  const validOptions = [0, 1, 2, 3];
  let answer = window.prompt(this.question + "\n" + this.options.join("\n"));
  while (typeof answer !== "number" && !validOptions.includes(Number(answer))) {
    console.warn("INVALID Option !");
    answer = window.prompt(this.question + "\n" + this.options.join("\n"));
  }
  console.log(`Answer was : ${this.options[answer].split(/ /g)[1]}`);
  this.answers[answer] += 1;
  this.displayResult("string");
};

document
  .querySelector(".buy")
  .addEventListener("click", poll.registerNewAnswer());
