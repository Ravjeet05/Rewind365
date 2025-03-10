import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TimeRangeButtons from '../components/TimeRangeButtons';

const TopArtists = ({ token }) => {
  const [topArtists, setTopArtists] = useState([]);
  const [timeRange, setTimeRange] = useState('short_term');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchArtists = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: { Authorization: `Bearer ${token}` },
        params: { time_range: timeRange, limit: 10 }
      });
      setTopArtists(data.items);
      setError('');
    } catch (err) {
      setError('Failed to load top artists. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [token, timeRange]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return (
    <div className="content-page">
      <h1 className="page-title">Your Top Artists</h1>
      <TimeRangeButtons timeRange={timeRange} onChange={setTimeRange} />
      
      {error && <p className="error-message">{error}</p>}
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="artists-list">
          {topArtists.map((artist) => (
            <div key={artist.id} className="artist-card">
              <img 
                src={artist.images[0]?.url || '/default-artist.png'} 
                alt={artist.name}
                className="artist-image"
              />
              <div className="artist-info">
                <h3>{artist.name}</h3>
                <p>Followers: {artist.followers.total.toLocaleString()}</p>
                <p>Genres: {artist.genres.slice(0, 3).join(', ') || 'No genres listed'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopArtists;