import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken, selectUserId } from "../features/auth/authSlice";
import { useState } from "react";

import "./Navbar.less";

/**
 * A simple navigation bar that displays "Log In" if the user is not logged in,
 * and "Log Out" if the user is logged in.
 */
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const userid = useSelector(selectUserId);
  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  // const [filter, setFilter] = useState("");

  return (
    <>
      <input type="checkbox" id="toggle" />
      <nav id="top">
        <h1 id="title">Tradetivity</h1>
        <label className="navbar-toggler" htmlFor="toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </label>
        <menu className="nav-list">
          <li className="nav-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/politicians">Politicians</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/companies">Companies</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/congress">Congress</NavLink>
          </li>
          {token ? (
            <>
              <li className="nav-item">
                <NavLink to={`/user/${userid}`}>My Account</NavLink>
              </li>
              <li className="nav-item">
                <a onClick={handleLogout}>Log Out</a>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink to="/login">Log In</NavLink>
            </li>
          )}
        </menu>
      </nav>
    </>
  );
}
