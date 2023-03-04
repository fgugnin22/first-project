import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { example } from "../cocktailExample";
import { original } from "immer";

import { Drink } from "../Interfaces/index";
const FAV_KEY = "88005553535";
interface FavState {
  favoriteDrinks: Drink[];
}
const initialState: FavState = {
  favoriteDrinks: JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]"),
};
const rootSlice = createSlice({
  name: "rootReducer",
  initialState,
  reducers: {
    addFavDrink(state, action: PayloadAction<Drink>) {
      state.favoriteDrinks.push(action.payload);
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favoriteDrinks));
    },
    removeFromFavDrinks(state, action) {
      state.favoriteDrinks = state.favoriteDrinks.filter(
        (f) => f.idDrink !== action.payload
      );
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favoriteDrinks));
    },
  },
});
export default rootSlice.reducer;
export const actions = rootSlice.actions;
export const { name } = rootSlice;
