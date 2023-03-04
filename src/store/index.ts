import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { cocktailApi } from "./cocktailAPI/cocktail.api";
import rootReducer from "./rootSlice";

export const store = configureStore({
  reducer: {
    [cocktailApi.reducerPath]: cocktailApi.reducer,
    rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cocktailApi.middleware),
});
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>