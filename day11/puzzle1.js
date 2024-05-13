const fs = require("fs");

const data = fs.readFileSync("./day11/input2.txt", "utf8");
const lines = data.split("\n").filter((line) => line.trim().length);

let output = 0;

let matrix = [];

lines.forEach((line, index) => {
  const lineArray = line.trim().split("");
  matrix.push(lineArray);
  if (lineArray.every((location) => location === ".")) {
    matrix.push(lineArray);
  }
});
// console.table(matrix);
const pushZeroesColumn = (matrix, column) => {
  for (let row = 0; row < matrix.length; row++) {
    matrix[row] = [...matrix[row].slice(0, column), ".", ...matrix[row].slice(column)];
  }
};

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

emptyColumns.forEach((column, index) => {
  pushZeroesColumn(matrix, column + index);
});

// console.table(matrix);

let galaxies = [];

for (let i = 0; i < matrix[0].length; i++) {
  for (let j = 0; j < matrix.length; j++) {
    const location = matrix[j][i];
    if (location === "#") galaxies.push([i, j]);
  }
}

for (let n = 0; n < galaxies.length; n++) {
  for (let m = n + 1; m < galaxies.length; m++) {
    output += Math.abs(galaxies[m][0] - galaxies[n][0]) + Math.abs(galaxies[m][1] - galaxies[n][1]);
  }
}
console.log("output", output);
