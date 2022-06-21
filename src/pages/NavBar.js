import React from 'react'
import '../stylesheets/navbar.css';


const NavBar = () => {
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
                    <a href="/login">Log Out</a>

                </li>
                </ul>
             
        </div>
    );


};
export default NavBar;