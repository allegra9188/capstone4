import React from 'react'
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useParams, Link } from "react-router-dom"
import { useGetCompanyByIdQuery } from './companySlice';
import { useAddFavoriteCompanyMutation } from '../Account/favorites/favSlice';

export default function CompanyCard({company}) {
  
  const {id} = useParams();
    const token = useSelector(selectToken);
    const [addFavoriteCompany] = useAddFavoriteCompanyMutation();

    const handleAddFavorite = async () => {
      const userId = 123; // Replace with the actual userId
      const companyId = 456; // Replace with the actual companyId
  
      try {
        await addFavoriteCompany({ userId, companyId });
        // Handle success or update the UI as needed
      } catch (error) {
        // Handle error
        console.error('Error adding favorite company:', error);
      }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // will add function to add to favorite list once api is functional
        // need slice and connectivity to api and database
      alert('button not define yet')
    }


    if(id!==undefined){
      const { data: company, isLoading } = useGetCompanyByIdQuery(id);
      if(isLoading){
        return (
          <p>loading ......</p>
        )
      }
      if(company === null || isNaN(id)){
        return (
          <>
            <br/>
            <h1 className="notExist">this company does not exist</h1>
            
          </>
        )
      }
      // this return is called by single student to list the details
      return (
        <>
        {company && (
            <div >
              
                <h2>{company.symbol}</h2>
                <p>Name: {company.security}</p>
                <p>Sector: {company.sector}</p>
                <p>Sub_industry: {company.sub_industry}</p>
                <p>Headquarter: {company.hq}</p>
                <p>Founded at year: {company.founded}</p>
                <button onClick={handleAddFavorite}>Favorite</button>
              
            </div>
          )
        }
      </>
      )
      
    }else{
      // this return is called by all students component
      return (
        <>
          <div>
          <h2>{company.symbol}</h2>
          <p> {company.security}</p>
          
          <Link to={`/companies/${company.id}`}>More Info</Link>
          <button onClick={handleAddFavorite}>Favorite</button>
        </div>
        </>
      )
      
    }
}
