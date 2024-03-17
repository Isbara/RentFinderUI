import React from 'react';
import { Link } from 'react-router-dom';

function HeaderNotLogged() {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <img src="/Logo.png" alt="Logo" width="230" height="50" />
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <img src="../public/Logo.png" alt="Logo" />
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home Page</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/support" className="nav-link">Contact Support</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">Profile Page</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default HeaderNotLogged;