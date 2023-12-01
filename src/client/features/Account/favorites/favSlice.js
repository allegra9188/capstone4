import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api' }), // Adjust the base URL as needed
  endpoints: (builder) => ({
    addFavoriteCompany: builder.mutation({
        query: ({ userId, companyId }) => ({
          url: `/user-favorites/companies/${userId}/add-favorite/${companyId}`,
          method: 'POST',
        }),
      }),
    fetchFavoriteCompanies: builder.query({
      query: () => '/favorites/companies',
    }),
  }),
});

export const { useAddFavoriteCompanyMutation, useFetchFavoriteCompaniesQuery } = favoritesApi;

export default favoritesApi;
