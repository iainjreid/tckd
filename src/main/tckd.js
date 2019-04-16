"use strict";

/**
 * The first 5 bit primes.
 */
const primes = [
  0b0000010, 0b0000011, 0b00000101, 0b00000111,
  0b0001011, 0b0001101, 0b00010001, 0b00010011,
  0b0010111, 0b0011101, 0b00011111,
];

function generateKeyPair() {
  let publicKey = "";
  let privateKey = "";

  return { publicKey, privateKey };
}

function hashValue(key) {
  const hash = key.split("").map(_ => parseInt(_, 32));

  for (let i1 = 0; i1 < 8; i1++) {
    for (let i2 = 0; i2 < 8; i2++) {
      let x = primes[i2];

      for (let i3 = 0; i3 < (i2 ^ i1) % 3; i3++) {
        x ^= rightRotate(x, x) ^ primes[i3 % 11] ^ leftRotate(x, x);
      }

      hash[i1] ^= x;
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

function randomKey() {
  return parseInt(randomBits(40).join(""), 2).toString(32);
}

function randomKeys(count) {
  return Array.from({ length: count }, randomKey);
}

function randomBit() {
  return Math.floor(Math.random() * 2);
}

function randomBits(count) {
  return Array.from({ length: count }, randomBit);
}

const privateKey = readKey("./key.txt");
const publicKey = readKey("./key.pub.txt");

const signature = hashValue("facebook").split("").map((char, i) => {
  return privateKey[parseInt(char, 32)][i];
});

const verified = hashValue("facebook").split("").map((char, i) => {
  return hashValue(publicKey[parseInt(char, 32)][i]);
});

console.log(signature, verified)

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
  randomBits
}
