const fs = require("fs");

const data = fs.readFileSync("./day11/input2.txt", "utf8");
const lines = data.split("\n").filter((line) => line.trim().length);

let output = 0;

const expansionSize = 1e6 - 1;

let matrix = [];
let emptyRows = [];

lines.forEach((line, index) => {
  const lineArray = line.trim().split("");
  matrix.push(lineArray);
  if (lineArray.every((location) => location === ".")) {
    emptyRows.push(index);
  }
});

let emptyColumns = [];

for (let column = 0; column < matrix[0].length; column++) {
  let isEmpty = true;
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row][column] === "#") {
      isEmpty = false;
      break;
    }
  }
  if (isEmpty) {
    emptyColumns.push(column);
  }
}

let galaxies = [];

for (let i = 0; i < matrix[0].length; i++) {
  for (let j = 0; j < matrix.length; j++) {
    const location = matrix[j][i];
    if (location === "#") galaxies.push([i, j]);
  }
}

for (let n = 0; n < galaxies.length; n++) {
  for (let m = n + 1; m < galaxies.length; m++) {
    const leftestGalaxyHorizontal = Math.min(galaxies[n][0], galaxies[m][0]);
    const rightestGalaxyHorizontal = Math.max(galaxies[n][0], galaxies[m][0]);
    const highestGalaxyVertical = Math.min(galaxies[n][1], galaxies[m][1]);
    const lowestGalaxyVertical = Math.max(galaxies[n][1], galaxies[m][1]);
    const horizontalExpansion = emptyColumns.reduce((acc, emptyColumn) => {
      if (emptyColumn > leftestGalaxyHorizontal && emptyColumn < rightestGalaxyHorizontal) {
        return acc + expansionSize;
      }
      return acc;
    }, 0);
    const verticalExpansion = emptyRows.reduce((acc, emptyRow) => {
      if (emptyRow > highestGalaxyVertical && emptyRow < lowestGalaxyVertical) {
        return acc + expansionSize;
      }
      return acc;
    }, 0);
    output += Math.abs(galaxies[m][0] - galaxies[n][0]) + Math.abs(galaxies[m][1] - galaxies[n][1]) + verticalExpansion + horizontalExpansion;
  }
}
console.log("output", output);
