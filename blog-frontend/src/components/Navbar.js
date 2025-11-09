import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { logout } from '../services/authService';
import '../styles/Navbar.css';

function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    BlogPlatform
                </Link>
                <div className="navbar-links">
                    {user ? (
                        <>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/create-post" className="nav-link">Create Post</Link>
                            <span className="nav-user">Hello, {user.username}</span>
                            <button onClick={handleLogout} className="nav-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
