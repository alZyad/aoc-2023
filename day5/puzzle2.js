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

const computeForwardItinerary = (seed, initialMapIndex) => {
  let itinerary = Array(8).fill(null);
  itinerary[initialMapIndex] = seed;
  if (initialMapIndex > 6) return itinerary;
  for (let mapIndex = initialMapIndex; mapIndex < 7; mapIndex++) {
    const currentSeed = itinerary[mapIndex];
    for (let i = 0; i < conversionMapsValues[mapIndex].length; i++) {
      const { destination, source, range } = conversionMapsValues[mapIndex][i];
      if (currentSeed >= source && currentSeed < source + range) {
        itinerary[mapIndex + 1] = destination + (currentSeed - source);
        break;
      }
    }
    if (itinerary[mapIndex + 1] === null) {
      itinerary[mapIndex + 1] = currentSeed;
    }
  }
  return itinerary;
};

const computeBackwardItinerary = (seed, initialMapIndex) => {
  let itinerary = Array(8).fill(null);
  itinerary[initialMapIndex] = seed;
  if (initialMapIndex === 0) return itinerary;
  for (let mapIndex = initialMapIndex; mapIndex > 0; mapIndex--) {
    const currentSeed = itinerary[mapIndex];
    for (let i = 0; i < conversionMapsValues[mapIndex - 1].length; i++) {
      const { destination, source, range } = conversionMapsValues[mapIndex - 1][i];
      if (currentSeed >= destination && currentSeed < destination + range) {
        itinerary[mapIndex - 1] = source + (currentSeed - destination);
        break;
      }
    }
    if (itinerary[mapIndex - 1] === null) {
      itinerary[mapIndex - 1] = currentSeed;
    }
  }
  return itinerary;
};

const mergeItineraries = (backward, forward) => {
  return backward.map((seed, index) => seed ?? forward[index]);
};

const compareItineraries = (itinerary1, itinerary2) => {
  return itinerary1.every((seed, index) => seed === itinerary2[index]);
};

let breakpoints = [];
conversionMapsValues.forEach((conversionMapList, index) => {
  const zeroForward = computeForwardItinerary(0, index);
  const zeroBackward = computeBackwardItinerary(0, index);
  const zeroItinerary = mergeItineraries(zeroBackward, zeroForward);
  breakpoints.push(zeroItinerary);
  conversionMapList.forEach((ranges) => {
    const forward = computeForwardItinerary(ranges.source, index);
    const backward = computeBackwardItinerary(ranges.source, index);
    const itinerary = mergeItineraries(backward, forward);
    breakpoints.push(itinerary);
    const endForward = computeForwardItinerary(ranges.source + ranges.range, index);
    const endBackward = computeBackwardItinerary(ranges.source + ranges.range, index);
    const endItinerary = mergeItineraries(endBackward, endForward);
    breakpoints.push(endItinerary);
  });
});

breakpoints.sort((itinerary1, itinerary2) => itinerary1[0] - itinerary2[0]);
breakpoints = breakpoints.filter((item, pos, ary) => {
  return pos === ary.length - 1 || !compareItineraries(item, ary[pos + 1]);
});
console.log("breakpoints", breakpoints.length);

seedRanges.forEach(([startSeed, range]) => {
  console.log("[startSeed, range]", [startSeed, range]);
  for (let seed = startSeed; seed < startSeed + range; seed++) {
    let [start, end] = [0, breakpoints.length - 1];
    let middle;
    while (end - start > 1) {
      middle = Math.floor((end + start) / 2);
      if (seed >= breakpoints[middle][0]) {
        start = middle;
      } else {
        end = middle;
      }
    }
    const currentLocation = breakpoints[start][7] + (seed - breakpoints[start][0]);
    closestLocation = Math.min(currentLocation, closestLocation);
  }
});
console.log("closestLocation", closestLocation);
