import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="logo">🧳</span>
        <span className="brand-name">OpportuniCam</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
      </div>

      <div className="nav-auth">
        <Link to="/login" className="btn-signin">Sign In</Link>
        <Link to="/signup" className="btn-signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;