const fs = require("fs");

const data = fs.readFileSync("./day9/input2.txt", "utf8");
const lines = data.split("\n").filter((line) => line.trim().length);

let output = 0;

const areAllZero = (values) => values.every((value) => value === 0);

lines.forEach((line) => {
  let lastValues = line
    .trim()
    .split(" ")
    .map((value) => parseInt(value));
  let valuesList = [lastValues];

  while (!areAllZero(lastValues)) {
    lastValues = lastValues
      .map((value, index) => {
        if (index < lastValues.length - 1) return lastValues[index + 1] - value;
        return null;
      })
      .slice(0, lastValues.length - 1);
    valuesList.push(lastValues);
  }
  const extrapolation = valuesList.reverse().reduce((acc, values) => values[0] - acc, 0);
  output += extrapolation;
});
console.log("output", output);
