import React from 'react'
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { Link } from "react-router-dom"

export default function CompanyCard({company}) {
    const token = useSelector(selectToken);
    const handleSubmit = (e) => {
        e.preventDefault();
        // will add function to add to favorite list once api is functional
        // need slice and connectivity to api and database

    }

  return (
    <>
        {token ?(
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
        )}   
             
    </>
  )
}
