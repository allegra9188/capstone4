import api from "../../../store/api";

const senateDataApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSenateData: builder.query({
      query: () => "/senate",
    }),
    getSenateDataFromProPublica: builder.query({
      query: () => "/member/senate/csv",
    }),
  }),
});

export const { useGetSenateDataQuery, useGetSenateDataFromProPublicaQuery } = senateDataApi;

export default senateDataApi;
