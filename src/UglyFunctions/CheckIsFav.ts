import { Drink } from "../Interfaces";

export const CheckIsFav = (id: string, favorites: Drink[]) => {
  for (let drink of favorites) {
    if (drink.idDrink === id) {
      return true;
    }
  }
  return false;
};
