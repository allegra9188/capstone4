import { useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { logout } from "../auth/authSlice";
import { useGetAccountQuery, useEditUserMutation } from "../auth/authSlice";
import { useState } from "react";
import { useFavorites } from "../Account/favorites/favUtility";
import { useFollows } from "../Account/follows/followUtility";

export default function Account() {
  const { id } = useParams();
  const { data: user, isLoading, isError } = useGetAccountQuery(id);
  const [updatedUser, setUpdatedUser] = useState({});
  const [showInputs, setShowInputs] = useState(false);
  const [editUser] = useEditUserMutation();
  const { handleRemoveFavorite, favoriteCompanies } = useFavorites();
  const { handleRemoveFollow, followedPoliticians } = useFollows();
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isFollowsDropdownOpen, setIsFollowsDropdownOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div>Error loading account</div>;
  }

  return (
    <div id="myAccount-html">
      <div
        id="sidebar"
        className={isSidebarOpen ? "expanded" : ""}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {!isSidebarOpen && <div className="vertical-text">Account Details</div>}
        <div className="sidebar-content">
          <section id="myAccount-main">
            <h2>
              <span className="username-text label">Hi,</span>{" "}
              <span className="value">{user.username}</span>
            </h2>
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
                      setUpdatedUser({
                        ...updatedUser,
                        firstName: e.target.value,
                      })
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                  <input
                    className="myAccount-inputs"
                    id="lastName-Update"
                    type="text"
                    placeholder={updatedUser.lastName || user.lastName}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        lastName: e.target.value,
                      })
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                </>
              ) : (
                <p className="myAcct-info-text">
                  {user.firstName} {user.lastName}
                </p>
              )}
            </h2>

            <h2 id="details-email">
              Email:
              {showInputs ? (
                <input
                  className="myAccount-inputs"
                  id="email-update"
                  type="text"
                  placeholder={updatedUser.email || user.email}
                  onChange={(e) =>
                    setUpdatedUser({ ...updatedUser, email: e.target.value })
                  }
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <p className="myAcct-info-text"> {user.email}</p>
              )}
            </h2>
            <div>
              <button
                className="myAccount-btns"
                id="update-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInputs(!showInputs);
                }}
              >
                {showInputs ? "Hide" : "Update"}
              </button>
              {showInputs && (
                <>
                  <button
                    className="myAccount-btns"
                    id="update-btn"
                    onClick={() => setShowInputs(!showInputs)}
                  >
                    {showInputs ? "Hide" : "Update"}
                  </button>
                  <button
                    className="myAccount-btns"
                    id="save-btn"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                </>
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
        </div>
      </div>

      <section id="favCompanies-Section">
        <h2
          id="FavComp-headerText"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Favorite Companies {isDropdownOpen ? "▼" : "▶"}
        </h2>
        <div
          className={`favCompany-dropdownDiv ${
            isDropdownOpen ? "expanded" : ""
          }`}
        >
          {isDropdownOpen &&
            (favoriteCompanies && favoriteCompanies.length > 0 ? (
              favoriteCompanies.map(({ company: companyData }) => (
                <div className="favCompanies" key={companyData.id}>
                  <h3>
                    <span className="label">Company Name:</span>{" "}
                    <span className="value">{companyData.security}</span>
                  </h3>
                  <p>
                    <span className="label">Ticker:</span>{" "}
                    <span className="value">{companyData.symbol}</span>
                  </p>
                  <p>
                    <span className="label">Sub Industry:</span>{" "}
                    <span className="value">{companyData.sub_industry}</span>
                  </p>
                  <p>
                    <span className="label">Headquarters:</span>{" "}
                    <span className="value">{companyData.hq}</span>
                  </p>
                  <p>
                    <span className="label">Founded:</span>{" "}
                    <span className="value">{companyData.founded}</span>
                  </p>
                  <Link
                    className="companyCard-Link"
                    to={`/companies/${companyData.id}`}
                  >
                    More Info
                  </Link>
                  <button
                    className="favButton"
                    onClick={() => handleRemoveFavorite(id, companyData.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>No favorited companies</p>
            ))}
        </div>
      </section>

      <section id="followedPoliticians-Section">
        <h2
          id="FollowPolitician-headerText"
          onClick={() => {
            setIsFollowsDropdownOpen(!isFollowsDropdownOpen);
          }}
        >
          Followed Politicians {isFollowsDropdownOpen ? "▼" : "▶"}
        </h2>
        <div
          className={`folPolitician-dropdownDiv ${
            isFollowsDropdownOpen ? "expanded" : ""
          }`}
        >
          {isFollowsDropdownOpen &&
            (followedPoliticians && followedPoliticians.length > 0 ? (
              followedPoliticians.map(({ politician: politicianData }) => (
                <div className="favCompanies" key={politicianData.id}>
                  <h3>
                    <span className="label">Name:</span>{" "}
                    <span className="value">
                      {politicianData.first_name +
                        " " +
                        politicianData.last_name}
                    </span>
                  </h3>
                  <p>
                    <span className="label">Party:</span>{" "}
                    <span className="value">{politicianData.party}</span>
                  </p>
                  <p>
                    <span className="label">Role: </span>{" "}
                    <span className="value">{politicianData.role}</span>
                  </p>
                  <Link to={`/politicians/${politicianData.id}`}>
                    More Info
                  </Link>
                  <button
                    className="favButton"
                    onClick={() => handleRemoveFollow(id, politicianData.id)}
                  >
                    Unfollow
                  </button>
                </div>
              ))
            ) : (
              <p>No followed politicians</p>
            ))}
        </div>
      </section>
    </div>
  );
}
