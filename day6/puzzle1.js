const fs = require("fs");

const data = fs.readFileSync("./day6/input2.txt", "utf8");
const lines = data.split("\n");

let output = 1;

const timings = lines[0]
  .split(" ")
  .slice(1)
  .map((time) => parseInt(time.trim()))
  .filter((time) => time);
const distances = lines[1]
  .split(" ")
  .slice(1)
  .map((distance) => parseInt(distance.trim()))
  .filter((distance) => distance);
// console.log("timings", timings);
// console.log("distances", distances);

for (let index = 0; index < timings.length; index++) {
  let solutionCount = 0;
  const timing = timings[index];
  const distance = distances[index];
  // console.log("timing", timing, "distance", distance);
  for (let time = 0; time < timing; time++) {
    // console.log(time, time * (timing - time));
    if (time * (timing - time) > distance) solutionCount++;
  }
  if (solutionCount > 0) output = output * solutionCount;
}

console.log(output);
