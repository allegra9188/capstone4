import api from "../../store/api";

const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/companies",
      //
    }),
    getCompanyById: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetCompaniesQuery, useGetCompanyByIdQuery } = companyApi;
