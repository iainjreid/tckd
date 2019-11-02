const { hashValue, generateKeyPair } = require("../main/tckd");

// const { publicKey, privateKey } = generateKeyPair(8);

// const signature = hashValue("facebook", 8).split("").map((char, i) => {
//   return privateKey[parseInt(char, 32)][i];
// });

// const verified = hashValue("facebook", 8).split("").every((char, i) => {
//   return hashValue(signature[i]) === publicKey[parseInt(char, 32)][i];
// });


console.log(hashValue("twittertwittersadasdasdasdtwitterasdasdasdasdasdasdaskjdhaksjdhkajshdkaljshdkjashdflkajshdflkajsdhflkjashdlfkjahsldkfjhaslkjdhf", 32));
console.log(hashValue("swittertwittersadasdasdasdtwitterasdasdasdasdasdasdaskjdhaksjdhkajshdkaljshdkjashdflkajshdflkajsdhflkjashdlfkjahsldkfjhaslkjdhf", 32));

// console.log(signature.join(" "), verified ? "✓" : "✖");
