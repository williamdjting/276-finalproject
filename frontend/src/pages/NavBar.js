import React from 'react'
import '../stylesheets/navbar.css';
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

   // const authed = useAuth();
    const {logout} = useAuth();
    const navigate = useNavigate();

    //handle funtions
    const handleLogout = () => {
        logout();
        navigate("/login");
      };
    return (

        <div className="nav">
            <p className="logo">Splittr</p>
           
            <ul>
                <li>
                    <a href="/">Dashboard</a>

                </li>

                <li>
                    <a href="/newform">Create Share</a>
                </li>

                <li>
                    <button onClick={handleLogout}>Log Out</button>

                </li>
                </ul>
             
        </div>
    );


};
export default NavBar;