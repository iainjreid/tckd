const { randomKey, hashKey } = require("../main/tckd");

const loggedKeys = new Set();
const loggedHashes = new Set();

while (true) {
  const key = randomKey();
  const hash = hashKey(key);

  if (loggedKeys.has(key)) {
    throw Error(`Collision in keys at: ${loggedKeys.size}`);
  }

  if (loggedHashes.has(hash)) {
    throw Error(`Collision in hashes at: ${loggedHashes.size}`);
  }

  loggedKeys.add(key);
  loggedHashes.add(hash);
}
