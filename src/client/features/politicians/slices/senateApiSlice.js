import api from "../../../store/api";

const senateDataApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSenateData: builder.query({
      query: () => "/senate",
    }),
  }),
});

export const { useGetSenateDataQuery } = senateDataApi;

export default senateDataApi;
