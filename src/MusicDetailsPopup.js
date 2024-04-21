import React, { useEffect, useRef } from 'react';

const MusicDetailsPopup = ({ isOpen, onClose, details }) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup">
      <div ref={popupRef} className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="details">
          <h2>{details.collectionName}</h2>
          <p>Artista: {details.artistName}</p>
          <p>Data de Lançamento: {new Date(details.releaseDate).toLocaleDateString()}</p>
          <p>Gênero: {details.primaryGenreName}</p>
          <p>Preço do Álbum: {details.collectionPrice} {details.currency}</p>
          <img src={details.artworkUrl100} alt={`${details.collectionName} - ${details.artistName}`} className="musica-imagem" />
        </div>
      </div>
    </div>
  );
};

export default MusicDetailsPopup;