import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import api from "./api";
import { favoritesApi } from "../features/Account/favorites/favSlice";
import followsApi from "../features/Account/followings/followSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [followsApi.reducerPath]: followsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, favoritesApi.middleware, followsApi.middleware),
});

export default store;
