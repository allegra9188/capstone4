import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useParams, Link } from "react-router-dom";
import { useGetCompanyByIdQuery } from "./companySlice";
import { useFavorites } from "../Account/favorites/favUtility";

export default function CompanyCard({ company }) {
  const { id } = useParams();
  const token = useSelector(selectToken); 
  const { handleAddFavorite, favoriteCompanies } = useFavorites();


  if (id !== undefined) {
    const { data: companyData, isLoading } = useGetCompanyByIdQuery(id);
    if (isLoading) {
      return <p>Loading ......</p>;
    }
    if (companyData === null || isNaN(id)) {
      return (
        <>
          <br />
          <h1 className="notExist">This company does not exist</h1>
        </>
      );
    }
    // this return is called by a single student to list the details
    return (
      <>
      
        {companyData && (
          <div className="company-card">
            <h2>{companyData.symbol}</h2>
            <p>Name: {companyData.security}</p>
            <p>Sector: {companyData.sector}</p>
            <p>Sub_industry: {companyData.sub_industry}</p>
            <p>Headquarter: {companyData.hq}</p>
            <p>Founded at year: {companyData.founded}</p>
            {token && (
          <button className="favButton" onClick={() => handleAddFavorite(companyData)}>
          {favoriteCompanies && favoriteCompanies.some((favorite) => favorite.companyId === companyData.id)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </button>
          )}
          </div>
        )}
      </>
    );
  } else {
    // this return is called by all companies component
    return (
      <>
        <div className="company-card">
          <h2>{company.symbol}</h2>
          <p> {company.security}</p>
          <Link className="companyCard-Link" to={`/companies/${company.id}`}>More Info</Link>
          {token && (
          <button className="favButton" onClick={() => handleAddFavorite(company)}>
          {favoriteCompanies && favoriteCompanies.some((favorite) => favorite.companyId === company.id)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </button>
          )}
        </div>
      </>
    );
  }
}
