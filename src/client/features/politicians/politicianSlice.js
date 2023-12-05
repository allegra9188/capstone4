import api from "../../store/api";

const politiciansApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPoliticians: builder.query({
      query: () => "/politicians",
    }),
    getPolitician: builder.query({
      query: (id) => `/politicians/${id}`,
    }),
    // added Dec 5th
    getPoliticianIdByName: builder.query({
      query: (name) => `/politicians/name/${name}`
    })
  }),
});

export const { useGetPoliticiansQuery, useGetPoliticianQuery, useGetPoliticianIdByNameQuery } = politiciansApi;
