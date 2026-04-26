import React, { useState } from 'react'
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import '../css/Propertycard.css'

export default function Propertycard({ property }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: isHovered,
    appendDots: dots => (
      <div style={{ bottom: "10px" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <div
      className='group bg-white rounded-3xl p-3 shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-soft-lift transition-all duration-300 cursor-pointer relative font-outfit'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-4'>
        <Slider {...sliderSettings} className='h-full w-full property-slider'>
          {property.images.map((image, index) => (
            <div key={index} className='h-full bg-gray-200'>
              <img
                className='h-full w-full object-cover aspect-[4/3] sm:aspect-square'
                src={image}
                alt={`property pic ${index + 1}`}
                onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=SkyStay'; }}
              />
            </div>
          ))}
        </Slider>

        {/* Floating Heart Button */}
        <button
          onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked); }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all z-10 focus:outline-none
            ${isLiked ? 'bg-white shadow-sm scale-110' : 'bg-black/20 hover:bg-white hover:scale-110 hover:shadow-sm'}
          `}
        >
          <Heart
            size={18}
            className={`transition-colors duration-300 ${isLiked ? 'fill-pink text-pink' : 'text-white'}`}
          />
        </button>

        {/* Decorative Tag */}
        {Number(property.overall_rating) > 4.8 && (
          <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-gray-900 shadow-sm z-10 border border-white/40'>
            Guest favorite
          </div>
        )}
      </div>

      <NavLink to={`/singleproperty/${property.property_id}`} className="block px-2 pb-1">
        <div className='flex justify-between items-start mb-1 gap-2'>
          <h3 className='font-bold text-gray-900 text-base truncate group-hover:text-blue transition-colors'>{property.city}, {property.country}</h3>
          <div className='flex items-center gap-1 shrink-0 bg-gray-50 px-2 py-0.5 rounded-md'>
            <Star size={12} className="fill-gold text-gold" />
            <span className='text-xs font-bold text-gray-700'>{Number(property.overall_rating).toFixed(1)}</span>
          </div>
        </div>
        <p className='text-gray-500 text-sm truncate mb-0.5'>{property.title}</p>
        <p className='text-gray-400 text-sm mb-4'>Entire {property.property_type}</p>

        <div className='flex items-baseline gap-1 pt-3 border-t border-gray-100 mt-auto'>
          <span className='font-extrabold text-gray-900 text-lg'>${property.price_per_night}</span>
          <span className='text-gray-500 text-sm font-medium'> night</span>
        </div>
      </NavLink>
    </div>
  )
}
