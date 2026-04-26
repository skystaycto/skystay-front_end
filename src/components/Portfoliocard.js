import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { LikesContext } from '../context/LikesContext';
import { Star, Heart } from 'lucide-react';
import bed3 from '../assets/bed3.svg';
import bath3 from '../assets/bath3.svg';
import '../css/Propertycard.css';

export default function Portfoliocard({ property }) {
    const { user } = useContext(UserContext);
    const { likes, addLike, deleteLike } = useContext(LikesContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isHeartPink, setIsHeartPink] = useState(false);

    useEffect(() => {
        if (user && user.id) {
            const liked = likes.some(like => like.user_id === user.id && like.property_id === property.id);
            setIsHeartPink(liked);
        }
    }, [likes, user, property.id]);

    const handleHeartClick = (e) => {
        e.preventDefault();
        if (isHeartPink) {
            deleteLike(user.id, property.id);
        } else {
            addLike({ user_id: user.id, property_id: property.id });
        }
        setIsHeartPink(!isHeartPink);
    };

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

    const getTodaysPrice = () => {
        const priceData = property.price;
        if (!priceData) return 0;
        const priceEntries = priceData.split(',').map(entry => {
            const [date, price] = entry.split(':');
            return { date, price: parseFloat(price) };
        });
        priceEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const today = new Date().toISOString().split('T')[0];
        let latestPrice = null;
        for (let entry of priceEntries) {
            if (new Date(entry.date) <= new Date(today)) {
                latestPrice = entry.price;
                break;
            }
        }
        return latestPrice !== null ? latestPrice : 0;
    };

    return (
        <div
            className='group bg-white rounded-3xl p-3 shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-soft-lift transition-all duration-300 cursor-pointer relative font-outfit w-full max-w-[320px] mx-auto'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 mb-4'>
                <Slider {...sliderSettings} className='h-full w-full property-slider'>
                    {property.images.map((image, index) => (
                        <div key={index} className='h-full bg-gray-200 outline-none'>
                            <img
                                className='h-full w-full object-cover aspect-[4/3]'
                                src={image}
                                alt={`property pic ${index + 1}`}
                                onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=SkyStay'; }}
                            />
                        </div>
                    ))}
                </Slider>

                {/* Floating Heart Button */}
                {user && user.id && (
                    <button
                        onClick={handleHeartClick}
                        className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all z-10 focus:outline-none
                        ${isHeartPink ? 'bg-white shadow-sm scale-110' : 'bg-black/20 hover:bg-white hover:scale-110 hover:shadow-sm'}
                        `}
                    >
                        <Heart
                            size={18}
                            className={`transition-colors duration-300 ${isHeartPink ? 'fill-pink text-pink' : 'text-white'}`}
                        />
                    </button>
                )}

                {/* Decorative Tag */}
                {Number(property.overall_rating) > 4.8 && (
                    <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-gray-900 shadow-sm z-10 border border-white/40'>
                        Guest favorite
                    </div>
                )}
            </div>

            <NavLink to={`/singleproperty/${property.property_id}`} className="block px-2 pb-1">
                <div className='flex justify-between items-start mb-1 gap-2'>
                    <h3 className='font-bold text-gray-900 text-base truncate group-hover:text-blue transition-colors'>{property.city}</h3>
                    <div className='flex items-center gap-1 shrink-0 bg-gray-50 px-2 py-0.5 rounded-md'>
                        <Star size={12} className="fill-gold text-gold" />
                        <span className='text-xs font-bold text-gray-700'>{Number(property.overall_rating).toFixed(1)}</span>
                    </div>
                </div>

                <p className='text-gray-800 text-sm truncate mb-0.5 font-medium'>{property.title}</p>
                <p className='text-gray-400 text-xs mb-3'>{property.property_type}</p>

                <div className='flex items-center gap-4 mb-4 text-gray-500'>
                    <div className='flex items-center gap-1.5'>
                        <img className='w-4 opacity-70' src={bed3} alt="beds" />
                        <span className='text-xs font-medium'>{property.total_bedrooms} Beds</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <img className='w-4 opacity-70' src={bath3} alt="baths" />
                        <span className='text-xs font-medium'>{property.total_bathrooms} Baths</span>
                    </div>
                </div>

                <div className='flex items-baseline gap-1 pt-3 border-t border-gray-100 mt-auto'>
                    <span className='font-extrabold text-gray-900 text-lg'>${getTodaysPrice()}</span>
                    <span className='text-gray-500 text-sm font-medium'> night</span>
                </div>
            </NavLink>
        </div>
    );
}
