import { CocktailCard } from "../components/CocktailCard";
import { useAppSelector } from "../hooks/useAppSelector";
import { Drink } from "../Interfaces/index";
import {Transition} from "react-transition-group"
import { GetIngredients } from "../UglyFunctions/GetIngredients";

const FavoritesPage = () => {
  const { favoriteDrinks: favorites } = useAppSelector(
    (state) => state.rootReducer
  );
  
  return (
    <div className="grid grid-cols-3 gap-4 grid-flow-row justify-items-center">
      {favorites &&
        favorites.map((drink: Drink) => {
          const ingredientsObj = GetIngredients(drink);
          return (
            <CocktailCard
              key={drink.idDrink}
              cocktail={drink}
              proportions={Object.values(ingredientsObj)}
              ingredients={Object.keys(ingredientsObj)}
            ></CocktailCard>
          );
        })}
    </div>
  );
};

export default FavoritesPage;
