import React from 'react';
import { Link } from 'react-router-dom';
import App from '../App';

function Header({ isLoggedIn }) {
    const handleLogout = () => {
        App.removeToken();
    };

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <img src="/Logo.png" alt="Logo" width="230" height="50" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home Page</Link>
                        </li>

                        {!isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link">Register</Link>
                                    </li>
                                </>

                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">Profile Page</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/support" className="nav-link">Contact Support</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/reservation" className="nav-link">Reservations</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/">
                                        <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                                    </Link>
                                </li>


                            </>


                        )}


                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
