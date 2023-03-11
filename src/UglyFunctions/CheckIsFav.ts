import { Drink } from "../Interfaces";

export const CheckIsFav = (id: string, favorites: Drink[]) => {
    return favorites.some((drink: Drink) => drink.idDrink === id);
};
