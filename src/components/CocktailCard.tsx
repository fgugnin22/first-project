import { CocktailCardProps } from "../Interfaces";
import { useAppSelector } from "../hooks/useAppSelector";
import React, { useState } from "react";
import { actions } from "../store/rootSlice";
import { Transition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { CheckIsFav } from "../UglyFunctions/CheckIsFav";
export const CocktailCard = (props: CocktailCardProps) => {
  const dispatch = useDispatch();

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
    <div className="border my-2 text-center h-auto w-96 overflow-hidden py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <img className="max-h-96 pb-[5px]" src={props.cocktail.strDrinkThumb} />
      <span className="text-2xl font-sans font-semibold">
        {props.cocktail.strDrink}
      </span>
      <ol className="">
        {props.ingredients.map((ingredient, index: number) => {
          return (
            <span className="block" key={index}>
              <span className="font-semibold">{ingredient}</span>
              {props.proportions[index] && ": " + props.proportions[index]}
            </span>
          );
        })}
      </ol>
      <span className="text-left text-sm">
        {props.cocktail.strInstructions}
      </span>
      {
        <button
          className={`py-2 px-4 ${
            isFav ? "bg-rose-600" : "bg-cyan-400"
          } rounded hover:shadow-md transition-all`}
          onClick={isFav ? removeFromFav : addFav}
        >
          {isFav ? "Удалить из избранного" : "Добавить в избранное"}
        </button>
      }
    </div>
  );
};

export default CocktailCard;
