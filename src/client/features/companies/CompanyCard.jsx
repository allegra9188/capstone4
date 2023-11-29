import React from 'react'
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useParams, Link } from "react-router-dom"
import { useGetCompanyByIdQuery } from './companySlice';
export default function CompanyCard({company}) {

  
  const {id} = useParams();
    const token = useSelector(selectToken);
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
      if(company ===null || isNaN(id)){
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
            <div>
              <li>
                <h2>{company.symbol}</h2>
                <p>Name: {company.security}</p>
                <p>Sector: {company.sector}</p>
                <p>Sub_industry: {company.sub_industry}</p>
                <p>Headquarter: {company.hq}</p>
                <p>Founded at year: {company.founded}</p>
                <button onClick={handleSubmit}>Favorite</button>
              </li>
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
          <button onClick={handleSubmit}>Favorite</button>
        </div>
        </>
      )
      
    }
  return (
    <>
        {/* {token ?(
        <section>
          <h2>{company.symbol}</h2>
          <p>Security: {company.security}</p>
          <p>Sector: {company.sector}</p>
          <p>Sub_industry: {company.sub_industry}</p>
          <p>Headquarter: {company.hq}</p>
          <p>Founded at year: {company.founded}</p>
          <Link to={`/companies/${company.id}`}>More Info</Link>
          <button onClick={handleSubmit}>Favorite</button>
        </section>
        ) : (
        <section>
          <h2>{politician.name}</h2>
          <p>Security: {company.security}</p>
          <p>Sector: {company.sector}</p>
          <p>Sub_industry: {company.sub_industry}</p>
          <p>Headquarter: {company.hq}</p>
          <p>Founded at year: {company.founded}</p>
          <Link to={`/companies/${company.id}`}>More Info</Link>
        </section>
        )}    */}
             
        <div>
          <h2>{company.symbol}</h2>
          <p>Security: {company.security}</p>
          <p>Sector: {company.sector}</p>
          <p>Sub_industry: {company.sub_industry}</p>
          <p>Headquarter: {company.hq}</p>
          <p>Founded at year: {company.founded}</p>
          <Link to={`/companies/${company.id}`}>More Info</Link>
          <button onClick={handleSubmit}>Favorite</button>
        </div>
        
    </>
  )
}
