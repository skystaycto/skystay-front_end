import React, { useState, useEffect } from 'react';
import { ammenities } from '../constants/ammenities';

export default function SelectAmmenities({ setClickedAmmenities }) {
  const [selectedAmmenities, setSelectedAmmenities] = useState([]);

  const toggleAmmenity = (id) => {
    setSelectedAmmenities((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((amenityId) => amenityId !== id)
        : [...prevSelected, id]
    );
  };

  useEffect(() => {
    const selectedNames = selectedAmmenities.map(id => {
      const amenity = ammenities.find(amenity => amenity.id === id);
      return amenity ? amenity.name : null;
    }).filter(name => name !== null); // Remove null values

    const selectedNamesString = selectedNames.join(', '); // Join names with commas

    setClickedAmmenities(selectedNamesString);
  }, [selectedAmmenities, setClickedAmmenities]);

  return (
    <div className='flex flex-wrap'>
      {ammenities.map((ammenity) => (
        <div
          key={ammenity.id}
          onClick={() => toggleAmmenity(ammenity.id)}
          className={`w-fit flex flex-row items-center justify-center border-2 border-solid border-slate-200 p-1 m-1 rounded-lg cursor-pointer ${
            selectedAmmenities.includes(ammenity.id) ? 'bg-blue' : ''
          }`}
        >
          <img className='px-[5px]' src={ammenity.svg_name} alt={ammenity.name} />
          <p className={`text-xs ${selectedAmmenities.includes(ammenity.id) ? 'text-white' : ''}`}>
            {ammenity.name}
          </p>
        </div>
      ))}
    </div>
  );
}
