import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Listcard({ listing }) {
  return (
    <NavLink to={`/singleproperty/${listing.property_id}`} className='group relative flex flex-col bg-white/80 backdrop-blur-xl border border-gray-100 shadow-soft-lift p-3 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-blue cursor-pointer h-full'>
      <div className='aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 mb-3'>
        <img className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105' src={listing.images[0]} alt={listing.title} />
      </div>
      <div className='px-1 pb-1 flex flex-col flex-1'>
        <p className='text-[10px] font-semibold text-blue uppercase tracking-wider mb-1 line-clamp-1'>{listing.property_type}</p>
        <p className='text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-pink transition-colors'>{listing.title}</p>
      </div>
    </NavLink>
  )
}
