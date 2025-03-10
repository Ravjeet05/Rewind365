import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TimeRangeButtons from '../components/TimeRangeButtons';

const TopSongs = ({ token }) => {
  const [topSongs, setTopSongs] = useState([]);
  const [timeRange, setTimeRange] = useState('short_term');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSongs = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: { Authorization: `Bearer ${token}` },
        params: { time_range: timeRange, limit: 10 }
      });
      setTopSongs(data.items);
      setError('');
    } catch (err) {
      setError('Failed to load top songs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [token, timeRange]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <div className="content-page">
      <h1 className="page-title">Your Top Songs</h1>
      <TimeRangeButtons timeRange={timeRange} onChange={setTimeRange} />
      
      {error && <p className="error-message">{error}</p>}
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="songs-list">
          {topSongs.map((song) => (
            <div key={song.id} className="song-card">
              <img 
                src={song.album.images[0]?.url || '/default-song.png'} 
                alt={song.name}
                className="song-image"
              />
              <div className="song-info">
                <h3>{song.name}</h3>
                <p>Artist: {song.artists.map(artist => artist.name).join(', ')}</p>
                <p>Album: {song.album.name}</p>
                <p>Duration: {Math.floor(song.duration_ms / 60000)}:{((song.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopSongs;