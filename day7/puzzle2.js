const fs = require("fs");

const data = fs.readFileSync("./day7/input2.txt", "utf8");
const lines = data.split("\n").filter((line) => line.trim().length);

const totalHands = lines.length;

const informedHands = [];

lines.forEach((line) => {
  const [hand, bet] = line.split(" ").map((el) => el.trim());
  if (hand === "JJJJJ") {
    informedHands.push({ hand, features: [0, 0, 0, 0, 1], bet: parseInt(bet) });
  } else {
    let sortedHand = { A: 0, K: 0, Q: 0, J: 0, T: 0, 9: 0, 8: 0, 7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0 };

    for (let index = 0; index < hand.length; index++) {
      const card = hand[index];
      sortedHand[card] = sortedHand[card] + 1;
    }

    let features = [0, 0, 0, 0, 0]; // singleton, pairs, 3-kind, 4-kind, full house
    Object.entries(sortedHand).forEach(([card, occurences]) => {
      if (card === "J") return;
      if (occurences > 0) features[occurences - 1] += 1;
    });
    if (sortedHand["J"] > 0) {
      for (let index = features.length - 1; index >= 0; index--) {
        if (features[index] !== 0) {
          features[index] -= 1;
          features[index + sortedHand["J"]] += 1;
          foundExisting = true;
          break;
        }
      }
    }
    informedHands.push({ hand, features, bet: parseInt(bet) });
  }
});

const cardRanking = {
  A: 13, // Ace
  K: 12, // King
  Q: 11, // Queen
  T: 10, // Ten
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1, // Joker
};

const sortHighCards = (hand1, hand2) => {
  for (let index = 0; index < hand1.length; index++) {
    const card1 = hand1[index];
    const card2 = hand2[index];
    const diff = cardRanking[card2] - cardRanking[card1];
    if (diff !== 0) return diff;
  }
  return 0;
};

const sortInformedHands = (hand1, hand2) => {
  if (hand1.features[4] !== hand2.features[4]) return hand2.features[4] - hand1.features[4];
  if (hand1.features[3] !== hand2.features[3]) return hand2.features[3] - hand1.features[3];
  if (hand1.features[2] !== hand2.features[2]) return hand2.features[2] - hand1.features[2];
  if (hand1.features[1] !== hand2.features[1]) return hand2.features[1] - hand1.features[1];
  return sortHighCards(hand1.hand, hand2.hand);
};

informedHands.sort(sortInformedHands);
console.log("informedHands", informedHands.slice(0), informedHands.length);
const output = informedHands.reduce((acc, informedHand, index) => {
  return acc + informedHand.bet * (totalHands - index);
}, 0);
console.log("output", output);
