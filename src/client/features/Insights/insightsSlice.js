import api from "../../store/api";

const insightsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInsights: builder.query({
      query: () => "/lobbying/csv",
    }),
  }),
});

export const { useGetInsightsQuery } = insightsApi;
