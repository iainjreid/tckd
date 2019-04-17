const { readKey, hashValue } = require("../main/tckd");

const privateKey = readKey("./key.txt");
const publicKey = readKey("./key.pub.txt");

const signature = hashValue("facebook").split("").map((char, i) => {
  return hashValue(privateKey[parseInt(char, 32)][i]);
});

const verified = hashValue("facebook").split("").map((char, i) => {
  return publicKey[parseInt(char, 32)][i];
});

console.log(hashValue(signature.join("")), hashValue(verified.join("")))
