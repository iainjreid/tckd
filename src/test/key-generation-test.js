"use strict";

const { randomKeys, hashValue } = require("../main/tckd");

const key = [];

for (let i = 0; i < 32; i++) {
  key.push(randomKeys(8));
}

require("fs").writeFileSync("./key.txt", key.map(_ => _.join(" ")).join("\n"), "utf8");
require("fs").writeFileSync("./key.pub.txt", key.map(_ => _.map(hashValue).join(" ")).join("\n"), "utf8");
