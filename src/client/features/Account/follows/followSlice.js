import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const followsApi = createApi({
  reducerPath: 'followsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    addFollowedPoliticians: builder.mutation({
      query: ({ userId, politicianId }) => ({
        url: `/user-follows/politicians/${userId}/add-follow/${politicianId}`,
        method: 'POST',
      }),
      // Provide the 'follows' tag when a new follows is added
      providesTags: ['Follows'],
      // Invalidate the 'follows' tag to trigger refetching when a new follow is added
      invalidatesTags: ['Follows'],
    }),
    removeFollowedPoliticians: builder.mutation({
      query: ({ userId, politicianId }) => ({
        url: `/user-follows/politicians/${userId}/remove-follow/${politicianId}`,
        method: 'DELETE',
      }),
      // Provide and invalidate the 'follows' tag when a follow is removed
      providesTags: ['Follows'],
      invalidatesTags: ['Follows'],
    }),
    fetchFollowedPoliticians: builder.query({
      query: (userId) => `/user-follows/${userId}/following`,
      // Provide the 'follows' tag when fetching the followed politicians
      
    }),
    providesTags: ['Follows'],
    // invalidatesTags: ['follows'],
  }),
});

export const {
    useAddFollowedPoliticiansMutation,
    useRemoveFollowedPoliticiansMutation,
    useFetchFollowedPoliticiansQuery,
} = followsApi;

export default followsApi;
