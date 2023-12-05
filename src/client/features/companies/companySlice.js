import api from "../../store/api";

const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/companies",
      //
    }),
    getCompanyById: builder.query({
      query: (id) => `/companies/${id}`,
    }),
    getCompanyIdByTicker: builder.query({
      query: (ticker)=> `/companies/name/${ticker}`
    })
  }),
});

export const { useGetCompaniesQuery, useGetCompanyByIdQuery, useGetCompanyIdByTickerQuery } = companyApi;
