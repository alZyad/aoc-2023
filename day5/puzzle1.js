const fs = require("fs");

const data = fs.readFileSync("./day5/input2.txt", "utf8");
const lines = data.split("\n");

let lowestLocation = 0;

const conversionMaps = {};

let conversionType = "";
let seeds;
lines.forEach((line, index) => {
  if (index === 0) {
    seeds = line.trim().split(" ");
    seeds.shift();
    seeds = seeds.map((nbr) => parseInt(nbr));
    return;
  }
  if (line.trim().length > 0) {
    if (line.includes("map")) {
      conversionType = line.split("map")[0].trim();
      conversionMaps[conversionType] = [];
    } else {
      const conversionRange = line
        .trim()
        .split(" ")
        .map((nbr) => parseInt(nbr));
      conversionMaps[conversionType].push({ destination: conversionRange[0], source: conversionRange[1], range: conversionRange[2] });
    }
  }
});

let closestLocation = Infinity;
seeds.forEach((seed) => {
  let conversionHolder = seed;
  const conversionMapsValues = Object.values(conversionMaps);
  conversionMapsValues.forEach((conversionMapList, index) => {
    let stale = true;
    conversionMapList.forEach(({ destination, source, range }) => {
      if (conversionHolder >= source && conversionHolder - source < range && stale) {
        conversionHolder = destination + (conversionHolder - source);
        stale = false;
      }
    });
  });
  closestLocation = Math.min(closestLocation, conversionHolder);
});
console.log("closestLocation", closestLocation);
