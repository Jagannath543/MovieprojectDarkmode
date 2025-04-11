import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearch(value);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark');
  };

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setIsDark(true);
      document.body.classList.add('dark');
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🎬 TrailerMovies</Link>
      </div>

      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </div>

      <div className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search movies..."
            className="searchInput"
          />
        </div>

        <ul className="navLinks">
          <li><Link to="/" className="navLink" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" className="navLink" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" className="navLink" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
        </ul>

        <button className="themeToggle" onClick={toggleTheme}>
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
