import React from 'react'
import { ammenities } from '../constants/ammenities'


export default function Ammenities( {propertyData}) {

  // Split the amenities string into an array of amenity names
  const propertyAmmenities = propertyData.ammenities.split(',').map(item => item.trim());
  const otherAmmenities = propertyData.other_ammenities.split(',').map(item => item.trim());

  // Filter the ammenities array to include only those that match the property amenities
  const filteredAmmenities = ammenities.filter(ammenity =>
    propertyAmmenities.includes(ammenity.name)
  );

  return (
    <div>
      <div className='flex flex-wrap'>
        {filteredAmmenities.map(ammenity => (
          <div
            key={ammenity.id}
            className='w-fit flex flex-row items-center justify-center border-2 border-solid border-slate-200 p-1 m-1 rounded-lg'
          >
            <img className='px-[5px]' src={ammenity.svg_name} alt={ammenity.name} />
            <p className='text-xs'>{ammenity.name}</p>
          </div>
        ))}
      </div>
      <div className='flex flex-wrap'>
        {otherAmmenities.map(ammenity => (
          <div
            key={ammenity}
            className='w-fit flex flex-row items-center justify-center border-2 border-solid border-slate-200 p-1 m-1 rounded-lg'
          >
            <p className='text-xs'>{ammenity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
