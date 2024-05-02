const fs = require("fs");

const data = fs.readFileSync("./day4/input2.txt", "utf8");
const lines = data.split("\n");

let totalPoints = 0;

lines.forEach((line) => {
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

  if (matchCount > 0) totalPoints += 2 ** (matchCount - 1);
});

console.log(totalPoints);
