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

const seedRanges = seeds.reduce((_seedRanges, seed) => {
  if (_seedRanges.length != 0 && _seedRanges[_seedRanges.length - 1].length == 1) {
    _seedRanges[_seedRanges.length - 1].push(seed);
  } else {
    _seedRanges.push([seed]);
  }
  return _seedRanges;
}, []);

let closestLocation = Infinity;
const conversionMapsValues = Object.values(conversionMaps);
seedRanges.forEach(([startSeed, range]) => {
  console.log("[startSeed, range]", [startSeed, range]);
  for (let seed = startSeed; seed < startSeed + range; seed++) {
    let conversionHolder = seed;
    conversionMapsValues.forEach((conversionMapList) => {
      console.log("conversionMapList", conversionMapList);
      let stale = true;
      for (let i = 0; i < conversionMapList.length; i++) {
        const { destination, source, range } = conversionMapList[i];
        if (!stale) {
          break;
        }
        if (conversionHolder >= source && conversionHolder - source < range) {
          conversionHolder = destination + (conversionHolder - source);
          stale = false;
        }
      }
    });
    closestLocation = Math.min(closestLocation, conversionHolder);
  }
});
console.log("closestLocation", closestLocation);
