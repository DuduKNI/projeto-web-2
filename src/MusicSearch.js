// MusicSearch.js
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import MusicDetailsPopup from './MusicDetailsPopup';

const MusicSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setSearchResults([]);
    setError('');

    if (searchTerm.trim() === '') {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://itunes.apple.com/search?term=${searchTerm}&entity=musicTrack&limit=10`);
        const results = response.data.results;

        if (results.length === 0) {
          setError('Nenhum resultado encontrado');
        } else {
          setSearchResults(results);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Nenhum resultado encontrado');
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Pesquisar Músicas" />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.trackId} onClick={() => handleResultClick(result)}>{result.trackName} - {result.artistName}</li>
          ))}
        </ul>
      )}
      <MusicDetailsPopup isOpen={selectedResult !== null} onClose={() => setSelectedResult(null)} details={selectedResult} />
    </div>
  );
};

export default MusicSearch;
