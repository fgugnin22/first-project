import { useEffect, useReducer } from "react";
import { useTransition, animated } from "react-spring";
import CocktailCard from "../components/CocktailCard";
import { useSearchDelay } from "../hooks/useSearchDelay";
import { useSearchCocktailsByNameQuery } from "../store/cocktailAPI/cocktail.api";
import { Drink, HomePageState, action } from "../Interfaces/index";
import { GetIngredients } from "../UglyFunctions/GetIngredients";
const HOME_PAGE_ACTIONS = {
  SET_COCKTAIL: "set-new-cocktail",
  SET_INPUT_STRING: "set-input-string",
  TOGGLE_DROPDOWN: "toggle-dropdown",
  SET_INGREDIENTS: "set-ingredients",
};
const defaultHomePageState: HomePageState = {
  inputSearchString: "",
  dropdown: true,
  cocktail: {},
  ingredients: {},
};

const HomePageReducer = (state: HomePageState, action: action) => {
  switch (action.type) {
    case HOME_PAGE_ACTIONS.SET_COCKTAIL:
      return { ...state, cocktail: action.payload };
    case HOME_PAGE_ACTIONS.SET_INPUT_STRING:
      return { ...state, inputSearchString: action.payload };
    case HOME_PAGE_ACTIONS.TOGGLE_DROPDOWN:
      return { ...state, dropdown: action.payload };
    case HOME_PAGE_ACTIONS.SET_INGREDIENTS:
      return { ...state, ingredients: action.payload };
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
    skip: delayedSearch.length < 1,
    refetchOnFocus: true,
  });
  const dropdownClickHandler = (cocktail: Drink) => {
    const ingredients: Object = GetIngredients(cocktail);
    dispatch({ type: HOME_PAGE_ACTIONS.SET_INGREDIENTS, payload: ingredients });
    dispatch({ type: HOME_PAGE_ACTIONS.SET_COCKTAIL, payload: cocktail });
  };
  useEffect(() => {
    dispatch({
      type: HOME_PAGE_ACTIONS.TOGGLE_DROPDOWN,
      payload: delayedSearch.length > 1 && cocktailsByName?.drinks?.length! > 0,
    });
  }, [delayedSearch, cocktailsByName]);
  const transition = useTransition(state.dropdown, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div className="pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Брух умер от кринжа</p>
      )}

      <div className="relative w-screen">
        <input
          onMouseLeave={() =>
            dispatch({
              type: HOME_PAGE_ACTIONS.TOGGLE_DROPDOWN,
              payload: false,
            })
          }
          onMouseEnter={() =>
            dispatch({ type: HOME_PAGE_ACTIONS.TOGGLE_DROPDOWN, payload: true })
          }
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Напиткогугл"
          value={state.inputSearchString}
          onChange={(e) =>
            dispatch({
              type: HOME_PAGE_ACTIONS.SET_INPUT_STRING,
              payload: e.target.value,
            })
          }
        />
        {/* {animated dropdown with react-spring} */}
        {transition((style, item) =>
          item ? (
            <animated.ul
              style={style}
              onMouseLeave={() =>
                dispatch({
                  type: HOME_PAGE_ACTIONS.TOGGLE_DROPDOWN,
                  payload: false,
                })
              }
              onMouseEnter={() =>
                dispatch({
                  type: HOME_PAGE_ACTIONS.TOGGLE_DROPDOWN,
                  payload: true,
                })
              }
              className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white"
            >
              {(isLoading || isFetching) && (
                <p className="text-center">Загрузочка...</p>
              )}
              {cocktailsByName?.drinks?.map((cocktail: Drink) => (
                <li
                  key={cocktail.idDrink}
                  onClick={() => dropdownClickHandler(cocktail)}
                  className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  {cocktail.strDrink}
                </li>
              ))}
            </animated.ul>
          ) : (
            ""
          )
        )}
      </div>
      {Object.keys(state.cocktail).length > 0 && (
        <CocktailCard
          key={state.cocktail.idDrink}
          cocktail={state.cocktail}
          proportions={Object.values(state.ingredients)}
          ingredients={Object.keys(state.ingredients)}
        />
      )}
    </div>
  );
};

export default HomePage;
