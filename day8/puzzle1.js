const fs = require("fs");

const data = fs.readFileSync("./day8/input2.txt", "utf8");
const lines = data.split("\n").filter((line) => line.trim().length);

const instructions = lines[0].trim().split("");

const map = {};

lines.forEach((line, index) => {
  if (index > 0) {
    const start = line.slice(0, 3);
    const left = line.slice(7, 10);
    const right = line.slice(12, 15);
    map[start] = [left, right];
  }
});

const startNode = "AAA";
const targetNode = "ZZZ";

let stepCount = 0;
let currentNode = startNode;

while (currentNode !== targetNode) {
  const instruction = instructions[stepCount % instructions.length]; // consume instruction
  stepCount++; // increment step count
  const formattedInstruction = instruction === "L" ? 0 : 1;
  currentNode = map[currentNode][formattedInstruction];
}

console.log(stepCount);
