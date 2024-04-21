import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import MusicDetailsPopup from './MusicDetailsPopup';

const MusicSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() === '') return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://itunes.apple.com/search?term=${searchTerm}&entity=musicTrack&limit=10`);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const memoizedResults = useMemo(() => searchResults, [searchResults]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
      <ul>
        {memoizedResults.map((result) => (
          <li key={result.trackId} onClick={() => handleResultClick(result)}>{result.trackName} - {result.artistName}</li>
        ))}
      </ul>
      <MusicDetailsPopup isOpen={selectedResult !== null} onClose={() => setSelectedResult(null)} details={selectedResult} />
    </div>
  );
};

export default MusicSearch;
