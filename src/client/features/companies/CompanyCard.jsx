import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { Link } from "react-router-dom";
import { useFavorites } from "../Account/favorites/favUtility";
import { useGetQuiverDataFromCsvQuery } from "../quiver/quiverSlice";

export default function CompanyCard({ company }) {
  const token = useSelector(selectToken);
  const { handleAddFavorite, favoriteCompanies } = useFavorites();

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
          <button
            className="favButton"
            onClick={() => handleAddFavorite(company)}
          >
            {favoriteCompanies &&
            favoriteCompanies.some(
              (favorite) => favorite.companyId === company.id
            )
              ? "Unfavorite"
              : "Favorite"}
          </button>
        )}
      </div>
    </>
  );
}
