"use strict";

const numOfChars = 8;
const bitsPerChar = 5;
const totalBits = numOfChars * bitsPerChar;

/**
 * The base32 alphabet.
 */
const chars = [
  ...Array.from({ length: 10 }).map(Number.call, _ => String.fromCharCode(_ + 48)),
  ...Array.from({ length: 22 }).map(Number.call, _ => String.fromCharCode(_ + 65)),
];

/**
 * The first 8 primes.
 */
const primes = [
  0b0000010, 0b0000011, 0b00000101, 0b00000111,
  0b0001011, 0b0001101, 0b00010001, 0b00010011,
];

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

const key = [];

for (let i = 0; i < 32; i++) {
  key.push(Array.from({ length: numOfChars }, randomKey));
}

require("fs").writeFileSync("./key.txt", key.map(_ => _.join(" ")).join("\n"), "utf8");
require("fs").writeFileSync("./key.pub.txt", key.map(_ => _.map(hashKey).join(" ")).join("\n"), "utf8");

function hashKey(key) {
  const hash = key.split("").map(_ => parseInt(_, 32));

  for (let i1 = 0; i1 < 8; i1++) {
    for (let i2 = 0; i2 < 8; i2++) {
      let x = primes[i2];
      
      for (let i3 = 0; i3 < (i2 ^ i1) % 3; i3++) {
        x ^= rightRotate(x, x) ^ primes[i3 % 8] ^ leftRotate(x, x);
      }

      x |= primes[i2] << 1;

      hash[i1] ^= x % 0b11111;
    }
  }

  return hash.map(_ => _.toString(32)).join("").toUpperCase();
}

function leftRotate(value, count) {
  return (value % 0b11111 >>> (bitsPerChar - count)) | (value % 0b11111 << (count % bitsPerChar)) & 31;
}

function rightRotate(value, count) {
  return (value % 0b11111 >>> (count % bitsPerChar)) | (value % 0b11111 << (bitsPerChar - count)) & 31;
}

function randomKey() {
  const I = Array.from({ length: totalBits }, randomBit);
  const O = Array(numOfChars);

  while (I.length) {
    O[I.length] = chars[parseInt(I.splice(0, bitsPerChar).join(""), 2)];
  }

  return O.join("");
}

function randomBit() {
  return Math.floor(Math.random() * 2);
}
