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
    <div className="flex flex-col border my-2 text-center h-auto w-96 py-3 px-5 rounded mb-2 hover:shadow-md duration-1000 hover:bg-gray-100 transition-all">
      <img className="max-h-96 pb-[5px]" src={props.cocktail.strDrinkThumb} />
      <span className="text-2xl font-sans font-semibold">
        {props.cocktail.strDrink}
      </span>
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
      {
        <button
          className={`btn mx-auto w-[100%] ${
            isFav ? "btn-secondary" : "btn-primary"
          } rounded hover:shadow-md`}
          onClick={isFav ? removeFromFav : addFav}
        >
          {isFav ? "Удалить из избранного" : "Добавить в избранное"}
        </button>
      }
    </div>
  );
};

export default CocktailCard;
