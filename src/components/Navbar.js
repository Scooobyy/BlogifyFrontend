import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);  // close dropdown on logout
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar bg px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">📝 Blogify</Link>

        {/* Dropdown toggle button */}
        <button
          className="togglebtn p-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          aria-label="Toggle navigation menu"
        >
          &#9776; {/* This is the "hamburger" icon */}
        </button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div
            className="dropdown-menu show p-2"
            style={{ position: 'absolute', right: '1rem', top: '3.5rem', minWidth: '200px' }}
            ref={dropdownRef}
          >
            <Link
              className="dropdown-item"
              to="/dashboard"
              onClick={() => setDropdownOpen(false)}
            >
              Home
            </Link>

            
             {isAuthenticated && (
              <Link
                className="dropdown-item"
                to="/create-blog"
                onClick={() => setDropdownOpen(false)}
              >
                Create
              </Link>
            )}

             
                 
            {isAuthenticated && (
              <Link
                className="dropdown-item"
                to="/blogs"
                onClick={() => setDropdownOpen(false)}
              >
                My Blogs
              </Link>
            )}
            <Link
              className="dropdown-item"
              to="/about"
              onClick={() => setDropdownOpen(false)}
            >
              About
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  className="dropdown-item"
                  to="/login"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className="dropdown-item"
                  to="/signup"
                  onClick={() => setDropdownOpen(false)}
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
