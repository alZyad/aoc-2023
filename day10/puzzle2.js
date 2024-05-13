const fs = require("fs");

const data = fs.readFileSync("./day10/input2.txt", "utf8");
const lines = data.split("\n").filter((line) => line.trim().length);

let matrix = [];

let startingPoint;

lines.forEach((line, y) => {
  const pipeRow = line.trim().split(""); // or pipeline :)
  matrix.push(pipeRow);
  pipeRow.forEach((pipe, x) => {
    if (pipe === "S") startingPoint = [x, y];
  });
});

// console.table(matrix);

let loopPipes = {};
for (let x = 0; x < matrix[0].length; x++) {
  loopPipes[x] = [];
}

let lastPipe = startingPoint;
let currentPipe = [startingPoint[0], startingPoint[1] - 1]; // in the input we can either go N or S from the starting point, we choose to travel N
loopPipes[startingPoint[0]].push(startingPoint[1]);

while (currentPipe[0] !== startingPoint[0] || currentPipe[1] !== startingPoint[1]) {
  loopPipes[currentPipe[0]].push(currentPipe[1]);
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

let insideLoopCounter = 0;

let insideLoopPipes = [];

for (let y = 0; y < matrix.length; y++) {
  let insideLoopTracker = 0; // if tracker is odd integer then we are inside the loop, we advance by counting borders horizontally
  let eastPipes = []; // includes L and F pipes
  let westPipes = []; // includes J and 7 pipes
  for (let x = 0; x < matrix[y].length; x++) {
    const pipe = matrix[y][x];
    if (loopPipes[x].includes(y)) {
      switch (pipe) {
        case "|":
        case "S": // change depending on input
          insideLoopTracker += 1;
          break;
        case "-":
        case ".":
          break;
        default:
          switch (pipe) {
            case "L":
              eastPipes.push(1); // 1 is North & 0 is South
              break;
            case "F":
              eastPipes.push(0); // 1 is North & 0 is South
              break;
            case "J":
              westPipes.push(1); // 1 is North & 0 is South
              break;
            case "7":
              westPipes.push(0); // 1 is North & 0 is South
              break;

            default:
              break;
          }
          break;
      }
    } else {
      // translate west & east pipes into equivalent '|' pipes
      if (eastPipes.length !== westPipes.length) throw new Error("count is off");
      const insideLoopTrackerBis = [...eastPipes, ...westPipes].reduce((sum, parityValue) => sum + parityValue, 0);

      if ((insideLoopTracker + insideLoopTrackerBis) % 2 === 1) {
        insideLoopCounter++;
        insideLoopPipes.push([x, y]);
      }
    }
  }
}

console.log("output", insideLoopCounter);
