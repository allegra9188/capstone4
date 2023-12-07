import React from "react";
import { useAddFavoriteCompanyMutation, useFetchFavoriteCompaniesQuery } from "./favSlice";

export default function Favorite() {
const { data: favoriteCompanies, error, isLoading } = useFetchFavoriteCompaniesQuery();
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

if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading favorite companies</p>;
  }


 return (
    <div>
         <h2>Your Favorite Companies</h2>
         {favoriteCompanies.map((company) => (
            <div key={company.id}>
            <p>{company.name}</p>
            <button onClick={() => handleAddFavorite(company.id)}>Add to Favorites</button>
        </div>
      ))}
    </div>
 );
}
