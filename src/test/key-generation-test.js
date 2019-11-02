"use strict";

const { generateKeyPair } = require("../main/tckd");

const { publicKey, privateKey } = generateKeyPair(8);

require("fs").writeFileSync("./key.txt", formatKey(privateKey) + "\n\n" + compressKey(privateKey), "utf8");
require("fs").writeFileSync("./key.pub.txt", compressKey(publicKey), "utf8");

function formatKey(key) {
  return key.map(_ => _.join(" ")).join("\n");
}

function compressKey(key) {
  return key.map(_ => _.map(_ => parseInt(_, 32).toString(2).padStart(40, 0).match(/.{1,8}/g).map(_ => String.fromCharCode(10240 + parseInt(_, 2))).join("")).join("")).join("\n");
}

function decompressKey(str) {
  return str.split("").map(_ => parseInt(_.charCodeAt(0)))
}
