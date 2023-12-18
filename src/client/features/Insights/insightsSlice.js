import api from "../../store/api";

const insightsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInsights: builder.query({
      query: () => "/lobbying/csv",
    }),
    getSummaries: builder.query({
        query: () => "/summaries/csv",
      }),
  }),
});

export const { useGetInsightsQuery, useGetSummariesQuery } = insightsApi;
