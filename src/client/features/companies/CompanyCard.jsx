import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectToken,
  selectUserId,
  useGetAccountQuery,
} from "../auth/authSlice";
import { useParams, Link } from "react-router-dom";
import { useGetCompanyByIdQuery } from "./companySlice";
import {
  useAddFavoriteCompanyMutation,
  useFetchFavoriteCompaniesQuery,
  useRemoveFavoriteCompanyMutation,
} from "../Account/favorites/favSlice";

export default function CompanyCard({ company }) {
  const { id } = useParams();
  const userId = useSelector(selectUserId);
  const [addFavoriteCompany] = useAddFavoriteCompanyMutation();
  const [removeFavoriteCompany] = useRemoveFavoriteCompanyMutation();
  const { data: user } = useGetAccountQuery(userId);
  const { data: favoriteCompanies, refetch: refetchFavorites } = useFetchFavoriteCompaniesQuery(userId);

  const handleAddFavorite = async () => {
    try {
      if (company && user && favoriteCompanies) {
        const userId = user.id;
        const companyId = company.id;

        const isCompanyFavorite = favoriteCompanies.some(
          (favorite) => favorite.companyId === company.id
        );

        if (isCompanyFavorite) {
          // If the company is already a favorite, remove it
          await removeFavoriteCompany({ userId, companyId });
        } else {
          // If the company is not a favorite, add it
          await addFavoriteCompany({ userId, companyId });
        }

        // Refetch favorite companies to update the data
        refetchFavorites();
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

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
            <button onClick={handleAddFavorite}>
              {favoriteCompanies && favoriteCompanies.some((favorite) => favorite.companyId === company.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
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
          <button className="favButton" onClick={handleAddFavorite}>
            {favoriteCompanies && favoriteCompanies.some((favorite) => favorite.companyId === company.id)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
        </div>
      </>
    );
  }
}
