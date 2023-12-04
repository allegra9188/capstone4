import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    addFavoriteCompany: builder.mutation({
      query: ({ userId, companyId }) => ({
        url: `/user-favorites/companies/${userId}/add-favorite/${companyId}`,
        method: 'POST',
      }),
      // Provide the 'Favorites' tag when a new favorite is added
      providesTags: ['Favorites'],
      // Invalidate the 'Favorites' tag to trigger refetching when a new favorite is added
      invalidatesTags: ['Favorites'],
    }),
    removeFavoriteCompany: builder.mutation({
      query: ({ userId, companyId }) => ({
        url: `/user-favorites/companies/${userId}/remove-favorite/${companyId}`,
        method: 'DELETE',
      }),
      // Provide and invalidate the 'Favorites' tag when a favorite is removed
      providesTags: ['Favorites'],
      invalidatesTags: ['Favorites'],
    }),
    fetchFavoriteCompanies: builder.query({
      query: (userId) => `/user-favorites/${userId}/favorites`,
      // Provide the 'Favorites' tag when fetching the favorite companies
      
    }),
    providesTags: ['Favorites'],
    // invalidatesTags: ['Favorites'],
  }),
});

export const {
  useAddFavoriteCompanyMutation,
  useRemoveFavoriteCompanyMutation,
  useFetchFavoriteCompaniesQuery,
} = favoritesApi;

export default favoritesApi;
