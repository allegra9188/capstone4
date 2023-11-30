import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

/** Authentication endpoints */
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    getAccount: builder.query({
      query: (id) => `/user/${id}`,
      // providesTags: ["user"],
    }),
    // getAccount: builder.query({
    //   query: (id) => `/account/${id}`,
    // }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetAccountQuery } = authApi;

/** Session storage key for auth token */
const TOKEN_KEY = "token";
const USER_ID_KEY = "userId";

/** Reducer that stores payload's token in state and session storage */
const storeToken = (state, { payload }) => {
  state.token = payload.token;
  state.userId = payload.user.id;
  sessionStorage.setItem(TOKEN_KEY, payload.token);
  sessionStorage.setItem(USER_ID_KEY, payload.user.id)
};

/** Keeps track of JWT sent from API */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem(TOKEN_KEY),
    userId: sessionStorage.getItem(USER_ID_KEY),
  },
  reducers: {
    /** Logging out means wiping the stored token */
    logout: (state) => {
      state.token = null;
      state.userId = null;
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_ID_KEY);
    },
  },
  extraReducers: (builder) => {
    // Store token when register or login succeeds
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
      storeToken(state, action);
    });
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      storeToken(state, action);
    });
  },
});

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;
