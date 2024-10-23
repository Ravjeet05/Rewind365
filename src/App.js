import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const CLIENT_ID = "47331cd847784cd38b8610a61edc8cb8";
  const REDIRECT_URI = "https://wapped365-4z15yv5w3-ravjeet05s-projects.vercel.app";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read";

  const [token, setToken] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false); // State to control nav visibility

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible); // Toggle the visibility of the sidebar
  };

  return (
    <Router>
      <div className="App">
        {!token ? (
          <div className="login-container">
            <h1>Welcome! Please log in to Spotify.</h1>
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
              className="login-link"
            >
              Login to Spotify
            </a>
          </div>
        ) : (
          <div className="main-container">
            {/* Top navigation bar */}
            <header className="top-nav">
              <button className="nav-toggle" onClick={toggleNav}>
                ☰ {isNavVisible ? "Close" : "Menu"}
              </button>
              <h3 className="header-title">Wrapped 365</h3>
            </header>

            {/* Sliding sidebar (appears from the left) */}
            <div className={`side-nav ${isNavVisible ? "visible" : ""}`}>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/top-artists" className="nav-link">Top Artists</Link>
              <Link to="/top-songs" className="nav-link">Top Songs</Link>
              <button onClick={logout} className="nav-link logout-button">Logout</button>
            </div>

            {/* Main content area */}
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/top-artists" element={<TopArtists token={token} />} />
                <Route path="/top-songs" element={<TopSongs token={token} />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

// Home Page Component
const Home = () => (
  <>
  <div className="header">
    <h1>Wrapped 365</h1>
    <h3>Access your Spotify Wrapped at any time!
      Use the menu to see your top artists and songs!
    </h3>
  </div>
  <div className="tracks">
      <h1>Welcome to Wrapped 365</h1>
      <p>Use the menu to navigate through your top artists and songs.</p>
    </div></>
);

// Top Artists Component
const TopArtists = ({ token }) => {
  const [topArtists, setTopArtists] = useState([]);
  const [timeRange, setTimeRange] = useState("short_term"); // Default time range

  useEffect(() => {
    const getTopArtists = async () => {
      if (!token) return;

      try {
        const { data } = await axios.get(`https://api.spotify.com/v1/me/top/artists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            time_range: timeRange, // Use the selected time range
            limit: 10,
          },
        });
        setTopArtists(data.items);
      } catch (error) {
        console.error("Error fetching top artists:", error.response || error.message);
      }
    };

    getTopArtists();
  }, [token, timeRange]); // Fetch new data when token or timeRange changes

  // Function to handle time range changes
  const handleTimeRangeChange = (range) => {
    setTimeRange(range); // Update the time range state
  };

  return (
    <div>
      <h1 className="Artist-Song">Your Top Artists</h1>
      {/* Time range buttons */}
      <div className="time-range-buttons">
        <button
          onClick={() => handleTimeRangeChange("short_term")}
          className={timeRange === "short_term" ? "active" : ""}
        >
          Short Term
        </button>
        <button
          onClick={() => handleTimeRangeChange("medium_term")}
          className={timeRange === "medium_term" ? "active" : ""}
        >
          Medium Term
        </button>
        <button
          onClick={() => handleTimeRangeChange("long_term")}
          className={timeRange === "long_term" ? "active" : ""}
        >
          Long Term
        </button>
      </div>
      <div className="artists-list">
        {topArtists.length > 0 ? (
          topArtists.map((artist) => (
            <div key={artist.id} className="artist">
              <img src={artist.images[0]?.url} alt={artist.name} style={{ width: "100px", borderRadius: "50%" }} />
              <h3>{artist.name}</h3>
              <p>Followers: {artist.followers.total.toLocaleString()}</p>
              <p>Genres: {artist.genres.join(", ")}</p>
            </div>
          ))
        ) : (
          <p>No top artists available. Try again later.</p>
        )}
      </div>
    </div>
  );
};



// Top Songs Component
const TopSongs = ({ token }) => {
  const [topSongs, setTopSongs] = useState([]);
  const [timeRange, setTimeRange] = useState("short_term"); // Default time range

  useEffect(() => {
    const getTopSongs = async () => {
      if (!token) return;

      try {
        const { data } = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            time_range: timeRange, // Use the selected time range
            limit: 10,
          },
        });
        setTopSongs(data.items);
      } catch (error) {
        console.error("Error fetching top songs:", error.response || error.message);
      }
    };

    getTopSongs();
  }, [token, timeRange]); // Fetch new data when token or timeRange changes

  // Function to handle time range changes
  const handleTimeRangeChange = (range) => {
    setTimeRange(range); // Update the time range state
  };

  return (
    <div>
      <h1 className="Artist-Song">Your Top Songs</h1>
      {/* Time range buttons */}
      <div className="time-range-buttons">
        <button
          onClick={() => handleTimeRangeChange("short_term")}
          className={timeRange === "short_term" ? "active" : ""}
        >
          Short Term
        </button>
        <button
          onClick={() => handleTimeRangeChange("medium_term")}
          className={timeRange === "medium_term" ? "active" : ""}
        >
          Medium Term
        </button>
        <button
          onClick={() => handleTimeRangeChange("long_term")}
          className={timeRange === "long_term" ? "active" : ""}
        >
          Long Term
        </button>
      </div>
      <div className="songs-list">
        {topSongs.length > 0 ? (
          topSongs.map((song) => (
            <div key={song.id} className="song">
              <img src={song.album.images[0]?.url} alt={song.name} style={{ width: "100px" }} />
              <h3>{song.name}</h3>
              <p>Artist: {song.artists.map(artist => artist.name).join(", ")}</p>
              <p>Album: {song.album.name}</p>
            </div>
          ))
        ) : (
          <p>No top songs available. Try again later.</p>
        )}
      </div>
    </div>
  );
};



export default App;
