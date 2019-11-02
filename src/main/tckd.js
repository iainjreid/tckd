"use strict";

function generateKeyPair(depth = 4) {
  const privateKey = [];
  const publicKey = [];

  for (let i1 = 0; i1 < 32; i1++) {
    const privateKeyRow = [];
    const publicKeyRow = [];

    for (let i2 = 0; i2 < 16; i2++) {
      const key = randomKey(depth);

      privateKeyRow.push(key);
      publicKeyRow.push(hashValue(key));
    }

    privateKey.push(privateKeyRow);
    publicKey.push(publicKeyRow);
  }

  return { publicKey, privateKey };
}

function hashValue(value, length = 8) {
  let input = "";
  let state = 0n;

  /**
   * For each character in the value that should be hashed, take the character code, and add it to the input.
   */
  value.split("").forEach((char) => {
    input += char.charCodeAt(0).toString(2);
  })

  /**
   * The input must be padded until it can be split evenly into blocks of 40 bits (the preconfigured bitrate).
   */
  while (input.length % length * 5) {
    input += "0";
  }

  /**
   * For each chunk of 40 bits found in the input, XOR them into the rolling state.
   */
  input.match(RegExp(`.{1,${length * 5}}`, "g")).forEach((chunk) => {
    state ^= BigInt("0b" + chunk);
  });

  return state.toString(32).padStart(length, "0");
}

function randomKey(length = 8) {
  let key = "";

  while (key.length < length) {
    key += parseInt(randomBits(5).join(""), 2).toString(32);
  }

  return key;
}

function randomKeys(count, length) {
  return Array.from({ length: count }, () => randomKey(length));
}

function randomBit() {
  return Math.floor(Math.random() * 2);
}

function randomBits(length) {
  return Array.from({ length }, (randomBit));
}

module.exports = {
  generateKeyPair, hashValue,
  randomKey, randomKeys,
  randomBit, randomBits,
};
