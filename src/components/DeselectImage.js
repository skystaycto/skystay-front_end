import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';

export default function DeselectImage({ photos, setPhotos }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (index) => {
    console.log(`Image clicked: ${index}`);
    setSelectedImageIndex(index);
  };

  const handleRemoveImage = () => {
    if (selectedImageIndex !== null) {
      console.log(`Removing image at index: ${selectedImageIndex}`);
      const updatedPhotos = photos.filter((_, index) => index !== selectedImageIndex);
      setPhotos(updatedPhotos);
      setSelectedImageIndex(null); // Reset selection after removal
      console.log('Updated photos:', updatedPhotos);
    }
  };

  const renderSelectedImage = () => {
    if (selectedImageIndex === null) return null;

    return (
      <div>
        <h3>Selected Image</h3>
        <img src={photos[selectedImageIndex]} alt={`Selected ${selectedImageIndex + 1}`} style={{ height: '200px', width: 'auto' }} />
        <Button variant="promo3" onClick={handleRemoveImage}>
            Remove Selected Image
        </Button>
      </div>
    );
  };

  return (
    <div>
      <h2>Select Image to Remove</h2>
      <div className="flex flex-wrap">
        {photos.map((src, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            style={{
              border: selectedImageIndex === index ? '2px solid red' : '2px solid transparent',
              cursor: 'pointer',
              margin: '10px',
            }}
          >
            <img src={src} alt={`Item ${index + 1}`} style={{ height: '200px', width: 'auto' }} />
          </div>
        ))}
      </div>
      {renderSelectedImage()}
    </div>
  );
}

DeselectImage.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPhotos: PropTypes.func.isRequired,
};
