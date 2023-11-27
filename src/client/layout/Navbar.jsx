import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";
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

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const [filter, setFilter] = useState('')
  const searchRegex = new RegExp(filter, 'i')

  return (
    <nav className="top">
      <menu>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <form>
          <input 
          type="text"
          placeholder="Search..."
          onChange={(e) => setFilter(e.target.value)}
          />
        </form>
        
        <li>
          <NavLink to="/politicians">Politicians</NavLink>
        </li>
        <li>
          <NavLink to="/companies">Companies</NavLink>
        </li>
        {token ? (
          <li>
            <a onClick={handleLogout}>Log Out</a>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        )}
      </menu>
    </nav>
  );
}
