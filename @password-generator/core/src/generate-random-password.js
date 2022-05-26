import {generateRandomNumber} from "./lib/generate-random-number.js";
export const generatePassword = ({
  length = 20
}) => {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const symbols = [
    "[",
    "!",
    "@",
    "#",
    "$",
    "%",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "]"
  ];
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  let password = [];
  const random = [symbols, numbers, alphabet];
  for (let i = 0; length >= i; i++) {
    const randomCharArray = random[generateRandomNumber({
      min: 0,
      max: random.length - 1
    })];
    const randomChar = randomCharArray[generateRandomNumber({
      min: 0,
      max: randomCharArray.length - 1
    })];
    const charIsFromAlphabet = alphabet.includes(randomChar);
    if (charIsFromAlphabet) {
      const RNG = generateRandomNumber({
        min: 0,
        max: 1
      });
      if (!!RNG) {
        password.push(randomChar.toUpperCase());
      } else {
        password.push(randomChar.toLowerCase());
      }
    } else {
      password.push(randomChar);
    }
  }
  return password.join("");
};
