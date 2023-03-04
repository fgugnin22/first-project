import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Drink} from "../../Interfaces/index"
export const cocktailApi = createApi({
  reducerPath: "cocktail/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchCocktailsByName: build.query({
      query: (search: string) => ({
        url: `search.php`,
        params: {
          s: search,
          // per page: 10,
        },
      }),
      // transformResponse: ...
    }),
    // здесь что то еще будет
  }),
});
export const { useSearchCocktailsByNameQuery } = cocktailApi;
