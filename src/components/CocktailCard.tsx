import { CocktailCardProps, Drink } from "../Interfaces";
import { useAppSelector } from "../hooks/useAppSelector";
import React, { useState } from "react";
import { actions } from "../store/rootSlice";
import { useDispatch } from "react-redux";
import { CheckIsFav } from "../UglyFunctions/CheckIsFav";
import { GetIngredients } from "../UglyFunctions/GetIngredients";
export const CocktailCard = (props: CocktailCardProps) => {
  const dispatch = useDispatch();
  const ingredients = GetIngredients(props.cocktail);
  const { favoriteDrinks: favorites } = useAppSelector(
    (state) => state.rootReducer
  );

  const [isFav, setIsFav] = useState(
    CheckIsFav(props.cocktail.idDrink, favorites)
  );

  const removeFromFav = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFav(false);
    dispatch(actions.removeFromFavDrinks(props.cocktail.idDrink));
  };

  const addFav = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFav(true);
    dispatch(actions.addFavDrink(props.cocktail));
  };

  return (
    <div className="card my-10 w-96 rounded-3xl bg-base-100 shadow-xl">
      <img className="max-h-96 pb-[5px] rounded-t-3xl" src={props.cocktail.strDrinkThumb} />
      <div className="card-body">
        <span className="card-title">{props.cocktail.strDrink}</span>
        <ol className="">
          {Object.keys(ingredients).map((ingredient: any, index) => {
            return (
              <li key={index}>
                <span className="block">
                  <span className="font-semibold">{ingredient}</span>
                  {ingredients[ingredient] && ": " + ingredients[ingredient]}
                </span>
              </li>
            );
          })}
        </ol>
        <span className="text-left flex-1 text-sm">
          {props.cocktail.strInstructions}
        </span>
        <div className="card-actions">
          {
            <button
              className={`btn mx-auto w-[100%] ${
                isFav ? "btn bg-rose-600 hover:bg-rose-700" : "btn bg-green-700 hover:bg-green-900"
              } rounded hover:shadow-md`}
              onClick={isFav ? removeFromFav : addFav}
            >
              {isFav ? "Remove from favorites" : "Add to favorites"}
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
