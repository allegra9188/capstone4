import api from "../../store/api";
import { createSlice } from "@reduxjs/toolkit";

const companyApi = api.injectEndpoints({
    endpoints: (builder)=> ({
        getCompanies: builder.query({
            query: ()=> '/companies',
            //
        }),
        getCompanyById: builder.query({
            query: (id) => `/companies/${id}`,
            
          }),
    }),
    
})

export const {
    useGetCompaniesQuery,
    useGetCompanyByIdQuery
} = companyApi
