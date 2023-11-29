import React from 'react'
import CompanyCard from './CompanyCard'
import { useGetCompaniesQuery } from './companySlice';


export default function Companies() {
  const { data:companies, isLoading} = useGetCompaniesQuery();
  //console.log(typeof(companies))
  
  if(isLoading){
    return <li>loading</li>
  }
  console.log(Array.isArray(companies))

  //const firstCompany = companies[1]
  return (
    <div>
       {companies?.map((company)=>(
        <CompanyCard company ={company}/>
       )
       )} 
            
    </div>
  )
}
