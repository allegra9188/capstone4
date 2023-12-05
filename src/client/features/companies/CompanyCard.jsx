import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useParams, Link } from "react-router-dom";
import { useGetCompanyByIdQuery } from "./companySlice";
import { useFavorites } from "../Account/favorites/favUtility";
import { useGetQuiverDataQuery } from "../quiver/quiverSlice";
export default function CompanyCard({ company }) {
  const { id } = useParams();
  const token = useSelector(selectToken); 
  const { handleAddFavorite, favoriteCompanies } = useFavorites();
  const { data: companyData, isLoading } = useGetCompanyByIdQuery(id);
  const { data: quiverData } = useGetQuiverDataQuery();
  const transactionForThisCompany = quiverData?.filter(
    (transaction) => transaction.Ticker === companyData?.symbol
  );

  if (id !== undefined) {
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
    // this return is called by a single company to list the details
    return (
      <>
        {companyData && (
          <div className="company-card">
            <h2>{companyData.symbol}</h2>
            <div className="company-detail">
              <p>Company: <span id="company-name">{companyData.security}</span></p>
              <p>Sector: {companyData.sector}</p>
              <p>Sub Industry: {companyData.sub_industry}</p>
              <p>Headquarter: {companyData.hq}</p>
              <p>Founding Year: {companyData.founded}</p>
            </div>
            {token && (
          <button className="favButton" onClick={() => handleAddFavorite(companyData)}>
          {favoriteCompanies && favoriteCompanies.some((favorite) => favorite.companyId === companyData.id)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </button>
          )}
          <h2>Politician Trading Activity</h2>
            {transactionForThisCompany?.map((element, index) => {
              return (
                <div className="trade-card" key={index}>
                  <p>
                    <span id="rep-name">{element.Representative}</span>
                  </p>
                  <p>{element.House}</p>
                  <p>Date Reported: {element.ReportDate}</p>
                  <p>Transaction Date: {element.TransactionDate}</p>
                  <p>
                    <span id="transaction-type">{element.Transaction}</span>
                  </p>
                  <p>Range: {element.Range}</p>
                  <p>{element.Party}</p>
                </div>
              );
            })}
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
          <Link className="companyCard-Link" to={`/companies/${company.id}`}>
            More Info
          </Link>
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
