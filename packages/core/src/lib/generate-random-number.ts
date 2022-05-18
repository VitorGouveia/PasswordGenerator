import { fn } from "../types/function";

type generateRandomNumberProps = {
  min: number;
  max: number;
};

export const generateRandomNumber: fn<generateRandomNumberProps, number> = ({
  min,
  max,
}) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
