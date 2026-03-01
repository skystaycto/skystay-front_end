import React, { useState } from 'react';
import { ammenities } from '../constants/ammenities';

export default function SelectAmmenities2( { propertyAmmenities, setClickedAmmenities }) {
  // Parse the propertyAmmenities string to get initial selected amenities
  const initialSelected = propertyAmmenities.split(',').map(name => name.trim());

  // State to keep track of selected amenities
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    // Convert amenity names to their corresponding IDs for the initial state
    const initialSelectedIds = ammenities
      .filter(amenity => initialSelected.includes(amenity.name))
      .map(amenity => amenity.id);
    setSelectedAmenities(initialSelectedIds);
  }, [propertyAmmenities]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (id) => {
    const updatedSelected = selectedAmenities.includes(id)
      ? selectedAmenities.filter(amenityId => amenityId !== id)
      : [...selectedAmenities, id];
    setSelectedAmenities(updatedSelected);

    // Update the parent component with the new selected amenities
    const selectedNames = ammenities
      .filter(amenity => updatedSelected.includes(amenity.id))
      .map(amenity => amenity.name)
      .join(', ');
    setClickedAmmenities(selectedNames);
  };

  return (
    <div className="flex flex-wrap">
      {ammenities.map((amenity) => (
        <div key={amenity.id} className={`flex items-center mr-4 mb-2 ${selectedAmenities.includes(amenity.id) ? 'bg-blue-500' : ''}`}>
          <input
            type="checkbox"
            id={`amenity-${amenity.id}`}
            checked={selectedAmenities.includes(amenity.id)}
            onChange={() => handleCheckboxChange(amenity.id)}
            className="mr-2"
          />
          <label htmlFor={`amenity-${amenity.id}`} className="flex items-center cursor-pointer">
            <img src={amenity.svg_name} alt={amenity.name} className="mr-2" />
            {amenity.name}
          </label>
        </div>
      ))}
    </div>
  );
}
