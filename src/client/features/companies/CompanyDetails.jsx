import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetCompanyByIdQuery } from "./companySlice";
import { useGetQuiverDataFromCsvQuery } from "../quiver/quiverSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";

function CompanyDetails() {
  const { id } = useParams();
  const token = useSelector(selectToken);
  const { data: companyData, isLoading } = useGetCompanyByIdQuery(id);
  const { data: quiverData } = useGetQuiverDataFromCsvQuery();
  const transactionForThisCompany = quiverData?.filter(
    (transaction) => transaction.Ticker === companyData?.symbol
  );
  console.log(id);

  if (id !== undefined) {
    if (isLoading) {
      return <p className="loading">Loading ......</p>;
    }
    if (companyData === null || isNaN(id)) {
      return (
        <>
          <br />
          <h1 className="notExist">This company does not exist</h1>
        </>
      );
    }
    //   this return is called by a single company to list the details
    return (
      <>
        {companyData && (
          <div className="company-card">
            <h2 className="h2-title">{companyData.symbol}</h2>
            <div className="company-detail">
              <p>
                Company: <span id="company-name">{companyData.security}</span>
              </p>
              <p>Sector: {companyData.sector}</p>
              <p>Sub Industry: {companyData.sub_industry}</p>
              <p>Headquarter: {companyData.hq}</p>
              <p>Founding Year: {companyData.founded}</p>
            </div>
            {token && (
              <button
                className="favButton"
                onClick={() => handleAddFavorite(companyData)}
              >
                {favoriteCompanies &&
                favoriteCompanies.some(
                  (favorite) => favorite.companyId === companyData.id
                )
                  ? "Unfavorite"
                  : "Favorite"}
              </button>
            )}
            <h2 className="h2-title">Politician Trading Activity</h2>
            <div className="recentComp-activity">
              {transactionForThisCompany?.map((element, index) => {
                return (
                  <div className="trade-card" key={index}>
                    <p>
                      <Link
                        className="politician-detail"
                        to={`/politicians/name/${element.Representative}`}
                      >
                        <span id="rep-name">{element.Representative}</span>
                      </Link>
                    </p>
                    <p>
                      {element.House}, {element.Party}
                    </p>
                    <p>Date Reported: {element.ReportDate}</p>
                    <p>Transaction Date: {element.TransactionDate}</p>
                    <p>
                      <span id="transaction-type">{element.Transaction}</span>
                    </p>
                    <p>Range: {element.Range}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default CompanyDetails;
