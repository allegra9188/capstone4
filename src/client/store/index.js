import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import api from "./api";
import { favoritesApi } from "../features/Account/favorites/favSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, favoritesApi.middleware),
});

export default store;
