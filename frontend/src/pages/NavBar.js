import React from "react";
import "../stylesheets/navbar.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SettingIcon from "../icons/setting.svg"

const NavBar = () => {
  // const authed = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  //handle funtions
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="nav">
      <p className="logo">Splittr</p>

      {localStorage.getItem("role") == "admin" ? (
        <ul>

          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li className="margin-auto">
            <a href="/">Dashboard</a>
          </li>

          <li>
            <a href="/newform">Create Share</a>
          </li>

          <li className="icon"><a href="/profile"><img src={SettingIcon} alt="setting"/></a></li>

          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      )}
    
    </div>
  );
};
export default NavBar;
