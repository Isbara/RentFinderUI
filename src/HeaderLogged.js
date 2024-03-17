import React from 'react';
import { Link } from 'react-router-dom';

function HeaderNotLogged() {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">RENT FINDER</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
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