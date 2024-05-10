const fs = require("fs");

const data = fs.readFileSync("./day8/input3.txt", "utf8");
const lines = data.split("\n").filter((line) => line.trim().length);

const instructions = lines[0].trim().split("");

const map = {};
let startingNodes = [];

lines.forEach((line, index) => {
  if (index > 0) {
    const start = line.slice(0, 3);
    const left = line.slice(7, 10);
    const right = line.slice(12, 15);
    map[start] = [left, right];
    if (start[2] === "A") startingNodes.push(start);
  }
});

const stepCounts = startingNodes.map((startNode) => {
  let stepCount = 0;
  let currentNode = startNode;

  while (currentNode[2] !== "Z") {
    const instruction = instructions[stepCount % instructions.length]; // consume instruction
    stepCount++; // increment step count
    const formattedInstruction = instruction === "L" ? 0 : 1;
    currentNode = map[currentNode][formattedInstruction];
  }

  return stepCount;
});

// stolen code online
const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (ns) => ns.reduce(lcm, 1);

// LCM doesn't give the correct answer always for this puzzle, but the input is kind enough it works in this particular case
console.log(lcmAll(stepCounts));
