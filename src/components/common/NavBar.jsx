import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { getFromLocalStorage, removeFromLocalStorage } from '../../util/authUtils';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getFromLocalStorage('currentUser');
    setCurrentUser(user);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    removeFromLocalStorage('currentUser');
    setCurrentUser(null);
    setShowDropdown(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-brand">
          <span className="logo">🧳</span>
          <span className="brand-name">OpportuniCam</span>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            <span className="icon">🏠</span> Home
          </Link>
          <Link to="/categories" className="nav-link">
            <span className="icon">📂</span> Categories
          </Link>

          {currentUser && (
            <>
              <Link to="/saved" className="nav-link">
                <span className="icon">🔖</span> Saved
              </Link>
              <Link to="/profile" className="nav-link">
                <span className="icon">👤</span> Profile
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="nav-right">
        {currentUser ? (
          <>
            <Link to="/post-job" className="btn-post-job">
              Post a Job
            </Link>

            <div className="profile-dropdown" ref={dropdownRef}>
              <button className="profile-btn" onClick={toggleDropdown}>
                <div className="avatar-circle">
                  {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : 'L'}
                </div>
                <span className="profile-name">{currentUser.fullName || 'User'}</span>
                <span className="dropdown-arrow">▼</span>
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="user-info">
                    <strong>{currentUser.fullName}</strong>
                    <p>{currentUser.email}</p>
                    <span className="user-type">{currentUser.userType || 'Job Seeker'}</span>
                  </div>

                  <div className="dropdown-divider"></div>

                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    👤 My Profile
                  </Link>
                  <Link to="/saved" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    🔖 Saved Jobs
                  </Link>

                  <div className="dropdown-divider"></div>

                  <button className="dropdown-item sign-out" onClick={handleSignOut}>
                    ↪ Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-signin">Sign In</Link>
            <Link to="/signup" className="btn-signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;