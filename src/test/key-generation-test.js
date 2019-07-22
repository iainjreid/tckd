"use strict";

const { generateKeyPair } = require("../main/tckd");

const { publicKey, privateKey } = generateKeyPair();

require("fs").writeFileSync("./key.txt", privateKey.join("\n"), "utf8");
require("fs").writeFileSync("./key.pub.txt", publicKey.join("\n"), "utf8");
