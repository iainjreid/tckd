"use strict";

/**
 * The first 11 primes, representable using 5 bits.
 */
const primes = [
  0b00010, 0b00011, 0b00101, 0b00111,
  0b01011, 0b01101, 0b10001, 0b10011,
  0b10111, 0b11101, 0b11111,
];

function generateKeyPair() {
  let privateKey = randomKeys(16, 32);
  let publicKey = privateKey.map((key) => key.split("").map((char) => hashValue(char)).join(""));

  return { publicKey, privateKey };
}

function hashValue(key, length = key.length) {
  let chunk, primeIndex;
  let hash = Array.from({ length }, () => 0);

  const target = key.padStart(8, "0").split("").map(_ => parseInt(_, 32));

  /**
   * Each chunk contains 8 values, each made up of 5 bits.
   */
  while ((chunk = target.splice(0, 8)).length) {
    for (let i1 = 0; i1 < hash.length; i1++) {
      for (let i2 = 0; i2 < chunk.length; i2++) {
        let x = primes[primeIndex++ % primes.length];

        x ^= rightRotate(chunk[i2], x);
        x ^= leftRotate(chunk[i2], x);

        for (let i3 = 0; i3 < (i2 ^ i1); i3++) {
          x ^= rightRotate(chunk[i2], x);
          x ^= leftRotate(chunk[i2], x);

          x ^= primes[i3 % 11];
        }

        hash[i1] ^= x;
      }
    }
  }

  return hash.map(_ => _.toString(32)).join("");
}

function leftRotate(value, count) {
  return (value >>> (5 - count)) | (value << (count % 5)) & 31;
}

function rightRotate(value, count) {
  return (value >>> (count % 5)) | (value << (5 - count)) & 31;
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

function randomBits(count) {
  return Array.from({ length: count }, randomBit);
}

function readKey(path) {
  const key = require("fs").readFileSync(path, "utf8")

  return key.split("\n").map(_ => _.split(" "))
}

module.exports = {
  generateKeyPair,
  hashValue,
  leftRotate,
  rightRotate,
  randomKey,
  randomKeys,
  randomBit,
  randomBits,
  readKey
}
