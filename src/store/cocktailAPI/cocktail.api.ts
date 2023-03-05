import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Drink, ServerResponse} from "../../Interfaces/index"
export const cocktailApi = createApi({
  reducerPath: "cocktail/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchCocktailsByName: build.query<Drink[], string>({
      query: (search: string) => ({
        url: `search.php`,
        params: {
          s: search,
        },
      }),
      transformResponse: (response: ServerResponse<Drink[]>) => {
        return response.drinks}
    }),
  }),
});
export const { useSearchCocktailsByNameQuery } = cocktailApi;
