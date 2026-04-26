import React from 'react';
import { NavLink } from 'react-router-dom';

import landscape from '../assets/propertylandscape.jpg';

export default function Sky() {
  return (
    <div className='min-h-[90vh] flex flex-col md:flex-row font-outfit bg-slate-50'>
      {/* Booking Side */}
      <NavLink
        to="/portfolio"
        className="group relative flex-1 flex flex-col justify-center items-center h-[45vh] md:h-[90vh] bg-blue overflow-hidden transition-all duration-500 hover:flex-[1.2]"
      >
        <div className="absolute inset-0 bg-blue-gradient opacity-90 transition-opacity group-hover:opacity-100"></div>
        <div className="relative z-10 flex flex-col items-center transform transition-transform duration-500 group-hover:scale-110">
          <h2 className="text-4xl md:text-5xl font-sentientmedium text-white tracking-tight drop-shadow-md">Find a Stay</h2>
          <p className="text-white/80 mt-2 font-light text-lg">Book your perfect getaway</p>
        </div>
      </NavLink>

      {/* Property Management Side */}
      <NavLink
        to="/properties"
        className="group relative flex-1 flex flex-col justify-center items-center h-[45vh] md:h-[90vh] overflow-hidden transition-all duration-500 hover:flex-[1.2]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${landscape})` }}
        ></div>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
        <div className="relative z-10 flex flex-col items-center transform transition-transform duration-500 group-hover:scale-110">
          <h2 className="text-4xl md:text-5xl font-sentientmedium text-white tracking-tight drop-shadow-md">Manage Property</h2>
          <p className="text-white/90 mt-2 font-light text-lg drop-shadow">Let us handle your investment</p>
        </div>
      </NavLink>
    </div>
  );
}
