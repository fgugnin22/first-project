// @ts-nocheck it do be kinda ugly tho fr no cap
import { Drink } from "../Interfaces";

export const GetIngredients = (cocktail: Drink) => {
  return Object.keys(cocktail).reduce(
    (obj: Object, currentValue: keyof Drink, index: number) => {
      if (
        currentValue.includes("strIngredient") &&
        cocktail[currentValue] !== null
      ) {
        obj[cocktail[currentValue]] =
          cocktail["strMeasure" + currentValue.at(-1)];
      }
      return obj;
    },
    {}
  );
};
