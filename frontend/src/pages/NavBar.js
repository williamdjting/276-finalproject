import React from "react";
import "../stylesheets/navbar.css";
import useAuth from "../hooks/useAuth";
import { useNavigate, NavLink } from "react-router-dom";
import SettingIcon from "../icons/setting.svg"

const NavBar = () => {
  // const authed = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  //set acttive style
  let activeStyle = {
    backgroundColor: "white",
    color: "#278ed3",
    height: "100%"
  };

  //handle funtions
  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  //render html elements
  return (
    <div className="nav">
      <p className="logo">Splittr</p>

      {localStorage.getItem("role") == "admin" ? (
        <ul style={{justifyContent: "end"}}>

          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li className="margin-auto">
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Dashboard
          </NavLink>
          </li>

          <li>
          <NavLink
            to="/newform"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Create Request
          </NavLink>

          </li>

          <li className="icon"><a href="/editprofile"><img src={SettingIcon} alt="setting"/></a></li>

          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      )}
    
    </div>
  );
};
export default NavBar;
