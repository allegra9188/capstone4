import api from "../../store/api";

const politiciansApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPoliticians: builder.query({
      query: () => "/politicians",
    }),
    getPolitician: builder.query({
      query: (id) => `/politicians/${id}`,
    }),
  }),
});

export const { useGetPoliticiansQuery, useGetPoliticianQuery } = politiciansApi;
