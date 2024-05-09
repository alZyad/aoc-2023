const fs = require("fs");

const data = fs.readFileSync("./day6/input2.txt", "utf8");
const lines = data.split("\n");

const timingsData = lines[0]
  .split(" ")
  .slice(1)
  .map((time) => time.trim())
  .filter((time) => time.length);
const distancesData = lines[1]
  .split(" ")
  .slice(1)
  .map((distance) => distance.trim())
  .filter((distance) => distance.length);

const timing = parseInt(timingsData.reduce((acc, value) => acc + value, ""));
const distance = parseInt(distancesData.reduce((acc, value) => acc + value, ""));
console.log("timing", timing);
console.log("distance", distance);

let solutionCount = 0;

// can be greatly optimised by just looking for the first and last timings that win the race (by looping forward then backward) but the optimization was not needed
for (let time = 0; time < timing; time++) {
  if (time * (timing - time) > distance) solutionCount++;
}

console.log(solutionCount);
