import api from "../../../store/api";

const houseDataApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHouseDataFromS3: builder.query({
      query: () => "/house/s3",
    }),
    getHouseDataFromProPublica: builder.query({
      query: () => "/member/house/csv",
    }),
  }),
});

export const { useGetHouseDataQuery } = houseDataApi;

export default houseDataApi;