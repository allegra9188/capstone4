import api from "../../../store/api";

const houseDataApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHouseData: builder.query({
      query: () => "/house",
    }),
  }),
});

export const { useGetHouseDataQuery } = houseDataApi;

export default houseDataApi;