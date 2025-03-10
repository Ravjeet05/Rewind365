import React from 'react';
import { FaMusic, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const Home = () => (
  <div className="home-container">
    <div className="header">
      <h1>Rewind 365</h1>
      <h3>Your Spotify stats, anytime, anywhere!</h3>
    </div>

    <div className="hero-section">
      <div className="hero-text">
        <h2>Discover Your Music Personality</h2>
        <p>Unlock your listening history beyond Spotify’s annual Wrapped</p>
        <div className="features">
          <div className="feature-card">
            <FaMusic size={40} className="feature-icon" />
            <h4>Real-time Insights</h4>
            <p>See your top artists and tracks updated daily</p>
          </div>
          <div className="feature-card">
            <FaCalendarAlt size={40} className="feature-icon" />
            <h4>Flexible Time Frames</h4>
            <p>Compare 4-week, 6-month, and all-time stats</p>
          </div>
          <div className="feature-card">
            <FaChartLine size={40} className="feature-icon" />
            <h4>Deep Analytics</h4>
            <p>Track your music evolution over time</p>
          </div>
        </div>
      </div>
    </div>

    <div className="spotify-branding">
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png" alt="Spotify Logo" className="spotify-logo" />
      <p>
        Data provided by <a href="https://www.spotify.com" target="_blank" rel="noopener noreferrer">Spotify</a>
      </p>
    </div>

    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Connect Your Spotify</h3>
          <p>Log in securely with your Spotify account</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>Explore Your Stats</h3>
          <p>Check your top artists, tracks, and more</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Track Your Growth</h3>
          <p>See how your music taste evolves over time</p>
        </div>
      </div>
    </div>

    <footer className="footer">
      <p>
        <a href="/PrivacyPolicy.html">Privacy Policy</a> | <a href="/TermsOfService.html">Terms of Service</a>
      </p>
    </footer>
  </div>
);

export default Home;
