import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken, selectUserId } from "../features/auth/authSlice";

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

  const closeNav = () => {
    document.getElementById('toggle').checked = false;
  };

  return (
    <>
      <input type="checkbox" id="toggle" />
      <nav id="top">
        {/* <h1 id="title">Tradetivity</h1> */}
       <h1 id="title"> <NavLink to="/" onClick={closeNav}>Tradetivity</NavLink></h1>
        <label className="navbar-toggler" htmlFor="toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </label>
        <menu className="nav-list">
        <li className="nav-item">
            <NavLink to="/" onClick={closeNav}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/politicians" onClick={closeNav}>Politicians</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/companies" onClick={closeNav}>Companies</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/insights" onClick={closeNav}>Insights</NavLink>
          </li>
          {token ? (
            <>
              <li className="nav-item">
                <NavLink to={`/user/${userid}`} onClick={closeNav}>My Account</NavLink>
              </li>
              <li className="nav-item">
                <a onClick={() => {handleLogout(); closeNav();}}>Log Out</a>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink to="/login" onClick={closeNav}>Log In</NavLink>
            </li>
          )}
        </menu>
      </nav>
    </>
  );
}