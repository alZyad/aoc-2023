const fs = require("fs");

const data = fs.readFileSync("./day7/input2.txt", "utf8");
const lines = data.split("\n").filter((line) => line.trim().length);

const totalHands = lines.length;

const informedHands = [];

lines.forEach((line) => {
  const [hand, bet] = line.split(" ").map((el) => el.trim());
  let sortedHand = { A: 0, K: 0, Q: 0, J: 0, T: 0, 9: 0, 8: 0, 7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0 };

  for (let index = 0; index < hand.length; index++) {
    const card = hand[index];
    sortedHand[card] = sortedHand[card] + 1;
  }

  let quintuples = 0;
  let quadruples = 0;
  let triples = 0;
  let pairs = 0;
  Object.values(sortedHand).forEach((occurences) => {
    switch (occurences) {
      case 5:
        quintuples++;
        break;
      case 4:
        quadruples++;
        break;
      case 3:
        triples++;
        break;
      case 2:
        pairs++;
        break;
      default:
        break;
    }
  });

  informedHands.push({ hand, features: [pairs, triples, quadruples, quintuples], bet });
});

const cardRanking = {
  A: 14, // Ace
  K: 13, // King
  Q: 12, // Queen
  J: 11, // Jack
  T: 10, // Ten
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
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
  if (hand1.features[3] !== hand2.features[3]) return hand2.features[3] - hand1.features[3];
  if (hand1.features[2] !== hand2.features[2]) return hand2.features[2] - hand1.features[2];
  if (hand1.features[1] !== hand2.features[1]) return hand2.features[1] - hand1.features[1];
  if (hand1.features[0] !== hand2.features[0]) return hand2.features[0] - hand1.features[0];
  return sortHighCards(hand1.hand, hand2.hand);
};

informedHands.sort(sortInformedHands);
const output = informedHands.reduce((acc, informedHand, index) => {
  return acc + informedHand.bet * (totalHands - index);
}, 0);
console.log("output", output);
