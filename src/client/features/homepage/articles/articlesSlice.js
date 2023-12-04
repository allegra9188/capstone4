import api from "../../../store/api";

const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticlesData: builder.query({
      query: () => "/articles",
    }),
  }),
});

export const { useGetArticlesDataQuery } = articlesApi;

export default articlesApi;
