import api from "../../../store/api";

const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticlesData: builder.query({
      query: () => "/articles",
    }),
    getArticlesDataFromCsv: builder.query({
      query:()=> '/articles/csv'
    }),
  }),
});

export const { useGetArticlesDataQuery,
useGetArticlesDataFromCsvQuery } = articlesApi;

export default articlesApi;
