import { useAppSelector } from "../hooks/useAppSelector";
import { CocktailCard } from "../components/CocktailCard";
import { Drink } from "../Interfaces/index";

const CocktalCardList = () => {
    const { favoriteDrinks: favorites } = useAppSelector(
        (state) => state.rootReducer
    );
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 grid-flow-row justify-items-center">
            {favorites &&
                favorites.map((drink: Drink) => {
                    return (
                        <CocktailCard
                            key={drink.idDrink}
                            cocktail={drink}
                        ></CocktailCard>
                    );
                })}
        </div>
    );
};

export default CocktalCardList;
