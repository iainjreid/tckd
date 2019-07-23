const { randomKey, hashValue } = require("../main/tckd");

const results = [];

while (results.length < 1000) {
  const hashes = new Set();

  while (true) {
    const hash = hashValue(randomKey(4));

    if (hashes.has(hash)) {
      results.push(hashes.size);
      console.log("Collision after: %s", hashes.size)
      break;
    } else {
      hashes.add(hash);
    }
  }
}

console.log("Average attempts before collision: %s", results.reduce((a, b) => a + b, 0)/ results.length);
