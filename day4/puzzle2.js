const fs = require("fs");

const data = fs.readFileSync("./day4/input2.txt", "utf8");
const lines = data.split("\n");

let cardCount = 0;
let cardModifiers = [...Array(lines[0].length)].map((i) => 1);

lines.forEach((line, index) => {
  const [rawWinningList, rawDrawList] = line.split(":")[1].split("|");
  const winningList = rawWinningList
    .split(" ")
    .filter((nbr) => nbr.length)
    .map((nbr) => parseInt(nbr));
  const drawList = rawDrawList
    .split(" ")
    .filter((nbr) => nbr.length)
    .map((nbr) => parseInt(nbr));

  let matchCount = 0;
  winningList.forEach((winningNbr) => {
    if (drawList.includes(winningNbr)) matchCount += 1;
  });

  const currentCardModifier = cardModifiers[0];
  cardCount += currentCardModifier;
  cardModifiers.shift();
  cardModifiers.push(1);
  for (let index = 0; index < matchCount; index++) {
    cardModifiers[index] += currentCardModifier;
  }
});

console.log(cardCount);
