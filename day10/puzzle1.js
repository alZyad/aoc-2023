const fs = require("fs");

const data = fs.readFileSync("./day10/input2.txt", "utf8");
const lines = data.split("\n").filter((line) => line.trim().length);

let output = 0;

let matrix = [];

let startingPoint;

lines.forEach((line, y) => {
  const pipeRow = line.trim().split(""); // or pipeline :)
  matrix.push(pipeRow);
  pipeRow.forEach((pipe, x) => {
    if (pipe === "S") startingPoint = [x, y];
  });
});

let loopLength = 1;

let lastPipe = startingPoint;
console.log("startingPoint", startingPoint);
let currentPipe = [startingPoint[0], startingPoint[1] - 1]; // in the input we can either go N or S from the starting point, we choose to travel N

while (currentPipe[0] !== startingPoint[0] || currentPipe[1] !== startingPoint[1]) {
  loopLength++;
  const pipe = matrix[currentPipe[1]][currentPipe[0]];
  switch (pipe) {
    case "|":
      if (lastPipe[1] > currentPipe[1]) {
        // we came from S
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0], currentPipe[1] - 1]; // we go N
      } else {
        // we came from N
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0], currentPipe[1] + 1]; // we go S
      }
      break;
    case "-":
      if (lastPipe[0] > currentPipe[0]) {
        // we came from E
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0] - 1, currentPipe[1]]; // we go W
      } else {
        // we came from W
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0] + 1, currentPipe[1]]; // we go E
      }
      break;
    case "L":
      if (lastPipe[1] < currentPipe[1]) {
        // we came from N
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0] + 1, currentPipe[1]]; // we go E
      } else {
        // we came from E
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0], currentPipe[1] - 1]; // we go N
      }
      break;
    case "J":
      if (lastPipe[1] < currentPipe[1]) {
        // we came from N
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0] - 1, currentPipe[1]]; // we go W
      } else {
        // we came from W
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0], currentPipe[1] - 1]; // we go N
      }
      break;
    case "F":
      if (lastPipe[1] > currentPipe[1]) {
        // we came from S
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0] + 1, currentPipe[1]]; // we go E
      } else {
        // we came from E
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0], currentPipe[1] + 1]; // we go S
      }
      break;
    case "7":
      if (lastPipe[1] > currentPipe[1]) {
        // we came from S
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0] - 1, currentPipe[1]]; // we go W
      } else {
        // we came from W
        lastPipe = currentPipe;
        currentPipe = [currentPipe[0], currentPipe[1] + 1]; // we go S
      }
      break;

    default:
      throw new Error("This is not a loop.");
  }
}

console.log("loopLength", loopLength);
output = Math.floor(loopLength / 2);
console.log("output", output);
