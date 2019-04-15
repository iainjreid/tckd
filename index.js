"use strict";

const numOfChars = 8;
const bitsPerChar = 5;
const totalBits = numOfChars * bitsPerChar;

const chars = [
  ...Array.from({ length: 10 }).map(Number.call, _ => String.fromCharCode(_ + 48)),
  ...Array.from({ length: 22 }).map(Number.call, _ => String.fromCharCode(_ + 65))
];

const key = [];

for (let i = 0; i < 32; i++) {
  key.push(Array.from({ length: numOfChars }, randomHash).join(" "));
}

require("fs").writeFileSync("./key.txt", key.join("\n"), "utf8");

function randomHash() {
  const i = Array.from({ length: totalBits }, randomBit);
  const o = Array(bitsPerChar);

  while (i.length) {
    o[i.length] = chars[parseInt(i.splice(0, bitsPerChar).join(""), 2)];
  }

  return o.join("");
}

function randomBit() {
  return Math.floor(Math.random() * 2);
}
