import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Menu.css';

const Menu = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken'); // Remove JWT token from localStorage
        onLogout(); // Notify the app that the user is logged out
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        isLoggedIn && (
            <nav className="menu-nav">
                <div className="menu-logo">
                    <h1>NexGen Travel App</h1>
                </div>
                <ul className="menu-list">
                    <li className="menu-item">
                        <Link to="/destinations" className="menu-link">
                            Home
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/create-destination" className="menu-link">
                            Create Destination
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/manage-destinations" className="menu-link">
                            Manage Destinations
                        </Link>
                    </li>
                    <li className="menu-item">
                        <a href="#" onClick={handleLogout} className="menu-link">
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>
        )
    );
};

export default Menu;
