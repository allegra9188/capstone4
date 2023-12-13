import api from "../../store/api";

const quiverApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // this query get data from api and save to csv
    getQuiverDataFromApi: builder.query({
      query: () => "/quiverquant",
      //
    }),
    // this query read data from csv
    getQuiverDataFromCsv: builder.query({
      query: () => "/quiverquant/csv",
      //
    }),
  }),
});

export const { useGetQuiverDataFromApiQuery, useGetQuiverDataFromCsvQuery } = quiverApi;
