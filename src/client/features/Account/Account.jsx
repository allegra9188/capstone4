import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../auth/authSlice";
import { useGetAccountQuery, useEditUserMutation } from "../auth/authSlice";
import { useState } from "react";

export default function Account() {
  const { id } = useParams();
  const { data: user, isLoading, isError } = useGetAccountQuery(id);
  const [updatedUser, setUpdatedUser] = useState({});
  const [showInputs, setShowInputs] = useState(false);
  const [editUser] = useEditUserMutation();

  const handleUpdate = async () => {
    try {
      await editUser({ id, ...updatedUser });
      // After the update is successful, you can update the UI or perform any other necessary actions.
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //   if (isError) {return <div>Error loading account</div>}

  //   console.log(user)

  return (
    <html id="myaccount-html">
      <main id="myAccount-main">
        <h2 className="details-name">
          <b>Name: </b>
          {showInputs ? (
            <>
              <br />
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
        <br />
        <div>
          {/* <h2>Email: <a href={`mailto:${user.email}`}>{user.email}</a></h2> */}
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
        </div>
        {/* <br /> */}
        <br />
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
      </main>
    </html>
  );
}
