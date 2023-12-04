import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../auth/authSlice";
import { useGetAccountQuery, useEditUserMutation } from "../auth/authSlice";
import { useState, useEffect } from "react";
import { useRemoveFavoriteCompanyMutation, useFetchFavoriteCompaniesQuery } from "./favorites/favSlice";

export default function Account() {
  const { id } = useParams();
  const { data: user, isLoading, isError } = useGetAccountQuery(id);
  const [updatedUser, setUpdatedUser] = useState({});
  const [showInputs, setShowInputs] = useState(false);
  const [editUser] = useEditUserMutation();
  const { data: favoriteCompanies, refetch } = useFetchFavoriteCompaniesQuery(id);
  const [removeFavoriteCompany] = useRemoveFavoriteCompanyMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      await editUser({ id, ...updatedUser });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleRemoveFavorite = async (userId, companyId) => {
    try {
      await removeFavoriteCompany({ userId, companyId });
      refetch();
    } catch (error) {
      console.error("Failed to remove favorite company:", error);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //   if (isError) {return <div>Error loading account</div>}

    // console.log(favoriteCompanies)

  return (
    <div id="myaccount-html">
      <section id="myAccount-main">
      <h2><span className="username-text label">Hi, User:</span> <span className="value">{user.username}</span></h2>
        <h2 id="details-name">
          <b>Name: </b>
          {showInputs ? (
            <>
              <input
                className="myAccount-inputs"
                id="firstName-Update"
                type="text"
                placeholder={updatedUser.firstName || user.firstName}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, firstName: e.target.value })
                }
              />
              <input
                className="myAccount-inputs"
                id="lastName-Update"
                type="text"
                placeholder={updatedUser.lastName || user.lastName}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, lastName: e.target.value })
                }
              />
            </>
          ) : (
            <p className="myAcct-info-text">
              {user.firstName} {user.lastName}
            </p>
          )}
        </h2>
        
          <h2>Email: </h2>
          {showInputs ? (
            <input
              className="myAccount-inputs"
              id="email-input"
              type="text"
              placeholder={updatedUser.email || user.email}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, email: e.target.value })
              }
            />
          ) : (
            <p className="myAcct-info-text">{user.email}</p>
          )}
        <div>
        <button
          className="myAccount-btns"
          id="update-btn"
          onClick={() => setShowInputs(!showInputs)}
        >
          {showInputs ? "Hide" : "Update"}
        </button>
        {showInputs && (
          <button
            className="myAccount-btns"
            id="save-btn"
            onClick={handleUpdate}
          >
            Save
          </button>
        )}

        <button
          className="myAccount-btns"
          id="acct-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
        </div>
      </section>
      <section id="favCompanies-Section"> 
  <h2 id="FavComp-headerText" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
    Favorite Companies {isDropdownOpen ? "▼" : "▶"}
  </h2>
  <div className={`favCompany-dropdownDiv ${isDropdownOpen ? 'expanded' : ''}`}>
  <h3 id="clickFav-text">{!isDropdownOpen ? "Click Favorite Companies!" : ""}</h3>
  {isDropdownOpen && (
    favoriteCompanies && favoriteCompanies.length > 0 ? (
      favoriteCompanies.map(({ company: companyData }) => (
        <div className="favCompanies" key={companyData.id}>
          <h3><span className="label">Company Name:</span> <span className="value">{companyData.security}</span></h3>
          <p><span className="label">Ticker Symbol:</span> <span className="value">{companyData.symbol}</span></p>
          <p><span className="label">Sub_Industry:</span> <span className="value">{companyData.sub_industry}</span></p>
          <p><span className="label">Headquarted in:</span> <span className="value">{companyData.hq}</span></p>
          <p><span className="label">Founded in:</span> <span className="value">{companyData.founded}</span></p>
          <button className="favButton" onClick={() => handleRemoveFavorite(id, companyData.id)}>
              Remove from Favorites
          </button>

        </div>
        
      ))
    ) : (
      <p>No favorited companies</p>
    )
  )}
  </div>
</section>
    </div>
  );
}
