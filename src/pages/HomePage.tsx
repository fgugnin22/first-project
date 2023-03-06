import { useEffect, useReducer } from "react";
import CocktailCard from "../components/CocktailCard";
import { useSearchDelay } from "../hooks/useSearchDelay";
import { useSearchCocktailsByNameQuery } from "../store/cocktailAPI/cocktail.api";
import { Drink, HomePageState, action } from "../Interfaces/index";
import Dropdown from "../components/Dropdown";
const HOME_PAGE_ACTIONS = {
  SET_COCKTAIL: "set-new-cocktail",
  SET_INPUT_STRING: "set-input-string",
  TOGGLE_DROPDOWN: "toggle-dropdown",
};
const defaultHomePageState: HomePageState = {
  inputSearchString: "",
  dropdown: false,
  cocktail: {},
};

const HomePageReducer = (state: HomePageState, action: action) => {
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
  const dropdownClickHandler = (cocktail: Drink) => {
    dispatch({ type: HOME_PAGE_ACTIONS.SET_COCKTAIL, payload: cocktail });
  };
  useEffect(() => {
    dispatch({
      type: HOME_PAGE_ACTIONS.TOGGLE_DROPDOWN,
      payload: delayedSearch.length > 2 && cocktailsByName?.length! > 0,
    });
  }, [delayedSearch, cocktailsByName]);

  return (
    <div className="pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Брух умер от кринжа</p>
      )}
      <div className="relative w-[calc(100%-18px)] dropdown dropdown-hover">
        <input
          type="text"
          className="input rounded-none focus:outline-none input-bordered w-full overflow-hidden"
          placeholder="Напиткогугл"
          value={state.inputSearchString}
          onChange={(e) =>
            dispatch({
              type: HOME_PAGE_ACTIONS.SET_INPUT_STRING,
              payload: e.target.value,
            })
          }
        />
        {state.dropdown ? (
          <Dropdown
            onClick={dropdownClickHandler}
            isLoading={isLoading || isFetching}
            items={cocktailsByName}
            isVisible={state.dropdown}
          ></Dropdown>
        ) : (
          ""
        )}
      </div>
      {Object.keys(state.cocktail).length > 0 && (
        <CocktailCard key={state.cocktail.idDrink} cocktail={state.cocktail} />
      )}
    </div>
  );
};

export default HomePage;
