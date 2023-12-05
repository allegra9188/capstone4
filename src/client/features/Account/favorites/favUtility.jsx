import { useAddFavoriteCompanyMutation,
    useFetchFavoriteCompaniesQuery, 
    useRemoveFavoriteCompanyMutation } from "./favSlice";
  import { useGetAccountQuery } from "../../auth/authSlice";
  import { useSelector } from "react-redux";
  import { selectToken, selectUserId } from "../../auth/authSlice";

  
  export function useFavorites() {
    const userId = useSelector(selectUserId);
    const token = useSelector(selectToken);
    const [addFavoriteCompany] = useAddFavoriteCompanyMutation();
    const [removeFavoriteCompany] = useRemoveFavoriteCompanyMutation();
    const { data: user } = token ? useGetAccountQuery(userId) : { data: null };
    const { data: favoriteCompanies, refetch: refetchFavorites } = token
      ? useFetchFavoriteCompaniesQuery(userId)
      : { data: null, refetch: null };
  
    const handleAddFavorite = async (company) => {
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

    const handleRemoveFavorite = async (userId, companyId) => {
        try {
          await removeFavoriteCompany({ userId, companyId });
          refetchFavorites();
        } catch (error) {
          console.error("Failed to remove favorite company:", error);
        }
      };
  
    return { handleAddFavorite, handleRemoveFavorite, favoriteCompanies };
  }