import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isVisible, toggleNav, logout }) => {
  return (
    <div className={`side-nav ${isVisible ? 'visible' : ''}`}>
      <Link to="/" className="nav-link" onClick={toggleNav}>Home</Link>
      <Link to="/TopArtists" className="nav-link" onClick={toggleNav}>Top Artists</Link>
      <Link to="/TopSongs" className="nav-link" onClick={toggleNav}>Top Songs</Link>
      <button onClick={logout} className="nav-link logout-button">Logout</button>
    </div>
  );
};

export default Navbar;