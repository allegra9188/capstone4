import api from "../../store/api";

const quiverApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuiverData: builder.query({
      query: () => "/quiverquant",
      //
    }),
    
  }),
});

export const { useGetQuiverDataQuery } = quiverApi;
