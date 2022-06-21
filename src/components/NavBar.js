import React from 'react'



const NavBar = () => {
    return (
        <nav>
            <a href="/" className="logo">Splittr</a>
            <ul>
                <li>
                    <a href="/">Dashboard</a>

                </li>

                <li>
                    <a href="/newform">Create Share</a>
                </li>

                <li>
                    <a href="/login">Login</a>

                </li>
            </ul>
        </nav>
    );


};
export default NavBar;