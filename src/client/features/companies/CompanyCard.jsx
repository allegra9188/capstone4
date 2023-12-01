import React, { useEffect, useState } from "react";
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
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const [addFavoriteCompany] = useAddFavoriteCompanyMutation();
  const [removeFavoriteCompany] = useRemoveFavoriteCompanyMutation();
  const { data: user, isLoading } = useGetAccountQuery(userId);
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: favoriteCompanies } = useFetchFavoriteCompaniesQuery();

  // Check if the current company is a favorite
  useEffect(() => {
    if (favoriteCompanies) {
      const isCompanyFavorite = favoriteCompanies.some(
        (favorite) => favorite.companyId === company.id
      );
      setIsFavorite(isCompanyFavorite);
    }
  }, [favoriteCompanies, company]);

  const handleAddFavorite = async () => {
    try {
      if (company && user) {
        const userId = user.id;
        const companyId = company.id;

        if (isFavorite) {
          // If the company is already a favorite, remove it
          // You might want to confirm this action with the user (e.g., show a confirmation modal)
          // For now, we are removing it directly without confirmation
          await removeFavoriteCompany({ userId, companyId });
        } else {
          // If the company is not a favorite, add it
          await addFavoriteCompany({ userId, companyId });
        }

        // Toggle the favorite state
        setIsFavorite(!isFavorite);
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
          <div>
            <h2>{companyData.symbol}</h2>
            <p>Name: {companyData.security}</p>
            <p>Sector: {companyData.sector}</p>
            <p>Sub_industry: {companyData.sub_industry}</p>
            <p>Headquarter: {companyData.hq}</p>
            <p>Founded at year: {companyData.founded}</p>
            <button onClick={handleAddFavorite}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        )}
      </>
    );
  } else {
    // this return is called by all companies component
    return (
      <>
        <div>
          <h2>{company.symbol}</h2>
          <p> {company.security}</p>
          <Link to={`/companies/${company.id}`}>More Info</Link>
          <button onClick={handleAddFavorite}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </>
    );
  }
}
