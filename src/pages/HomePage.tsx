import { SearchBar } from "../components/SearchBar";
import { useEffect, useReducer } from "react";
import CocktailCard from "../components/CocktailCard";
import { useSearchDelay } from "../hooks/useSearchDelay";
import { useSearchCocktailsByNameQuery } from "../store/cocktailAPI/cocktail.api";
import { action } from "../Interfaces/index";
import Dropdown from "../components/Dropdown";
const defaultHomePageState = {
    inputSearchString: "",
    dropdown: false,
    cocktail: {},
};
export const HOME_PAGE_ACTIONS = {
    SET_COCKTAIL: "set-new-cocktail",
    SET_INPUT_STRING: "set-input-string",
    TOGGLE_DROPDOWN: "toggle-dropdown",
};
const HomePageReducer = (
    state: typeof defaultHomePageState,
    action: action
) => {
    switch (action.type) {
        case HOME_PAGE_ACTIONS.SET_COCKTAIL:
            return { ...state, cocktail: action.payload };
        case HOME_PAGE_ACTIONS.SET_INPUT_STRING:
            return { ...state, inputSearchString: action.payload };
        case HOME_PAGE_ACTIONS.TOGGLE_DROPDOWN:
            return { ...state, dropdown: action.payload };
        default:
            return { ...state };
    }
};

const HomePage = () => {
    const [state, dispatch] = useReducer(HomePageReducer, defaultHomePageState);

    const delayedSearch = useSearchDelay(state.inputSearchString);

    const {
        isLoading,
        isError,
        isFetching,
        data: cocktailsByName,
    } = useSearchCocktailsByNameQuery(delayedSearch, {
        skip: delayedSearch.length < 3,
        refetchOnFocus: true,
    });
    useEffect(() => {
        dispatch({
            type: HOME_PAGE_ACTIONS.TOGGLE_DROPDOWN,
            payload: delayedSearch.length > 2 && cocktailsByName?.length! > 0,
        });
    }, [delayedSearch, cocktailsByName]);

    return (
        <div className="pt-10 h-[100%] w-screen">
            {isError && (
                <p className="text-center text-red-600">Брух умер от кринжа</p>
            )}
            <div className="relative w-[calc(100%-18px)]  dropdown dropdown-hover">
                <SearchBar dispatch={dispatch} />
                <Dropdown
                    isVisible={state.dropdown}
                    dispatch={dispatch}
                    isLoading={isLoading || isFetching}
                    items={cocktailsByName}
                ></Dropdown>
            </div>
            <div className="flex justify-center">
                {Object.keys(state.cocktail).length > 0 && (
                    <CocktailCard
                        key={state.cocktail.idDrink}
                        cocktail={state.cocktail}
                    />
                )}
            </div>
        </div>
    );
};

export default HomePage;
