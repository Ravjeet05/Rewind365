import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';
import './App.css';

const App = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPE = 'user-top-read';
  const encodedRedirectUri = encodeURIComponent(REDIRECT_URI);
  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodedRedirectUri}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`; 

  const [token, setToken] = useState('');
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.sessionStorage.getItem('token');

    if (!storedToken && hash) {
      const tokenMatch = hash.match(/access_token=([^&]*)/);
      storedToken = tokenMatch && tokenMatch[1];
      window.sessionStorage.setItem('token', storedToken);
      window.location.hash = '';
    }
    setToken(storedToken || '');
  }, []);

  const logout = () => {
    setToken('');
    window.sessionStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App">
        {!token ? (
          <div className="auth-container">
            <h1>Rewind 365</h1>
            <a
              href={authUrl}
              className="spotify-login"
            >
              Login with Spotify
            </a>
          </div>
        ) : (
          <div className="app-container">
            <header className="app-header">
              <button 
                className="nav-toggle" 
                onClick={() => setIsNavVisible(!isNavVisible)}
              >
                ☰ {isNavVisible ? 'Close' : 'Menu'}
              </button>
              <h1 className="app-title">Rewind 365</h1>
            </header>

            <Navbar 
              isVisible={isNavVisible}
              toggleNav={() => setIsNavVisible(false)}
              logout={logout}
            />

            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/TopArtists" element={<TopArtists token={token} />} />
                <Route path="/TopSongs" element={<TopSongs token={token} />} />
              </Routes>
            </main>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;