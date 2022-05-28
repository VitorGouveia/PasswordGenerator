import { fn } from "./types/function";
import { generateRandomNumber } from "./lib/generate-random-number";

type generatePasswordProps = {
  length?: number;
};

export const symbols = [
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
  "]",
];

export const generatePassword: fn<generatePasswordProps, string> = ({
  length = 20,
}) => {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
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
    "z",
  ];

  let password = [];
  const random = [symbols, numbers, alphabet];

  for (let i = 0; length >= i; i++) {
    // choose one of the three arrays to get the character from
    // then, inside the next array, choose another character to pull from
    const randomCharArray =
      random[
        generateRandomNumber({
          min: 0,
          max: random.length - 1,
        })
      ];

    const randomChar =
      randomCharArray[
        generateRandomNumber({
          min: 0,
          max: randomCharArray.length - 1,
        })
      ];

    const charIsFromAlphabet = alphabet.includes(randomChar);

    if (charIsFromAlphabet) {
      // have a change to uppercase
      const RNG = generateRandomNumber({
        min: 0,
        max: 1,
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
