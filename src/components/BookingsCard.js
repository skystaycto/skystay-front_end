import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import share from '../assets/share.svg'
import heart from '../assets/heart.svg'
import heartpink from '../assets/heartpink.svg'
import { UserContext } from '../context/UserContext'
import { LikesContext } from '../context/LikesContext';
import CommentCard from './CommentCard'
import { Button } from '../components/ui/button';

export default function BookingsCard({ booking }) {

    const { user } = useContext(UserContext);
    const { likes, addLike, deleteLike } = useContext(LikesContext);

    const [property, setProperty] = useState({});
    const [showCommentCard, setShowCommentCard] = useState(false);
    const [isHeartPink, setIsHeartPink] = useState(false);
    const [isCommented, setIsCommented] = useState(false);

    useEffect(() => {
        if (booking.property_id) {
            axios.get(`https://skystayserver-n8xf.onrender.com/property/${booking.property_id}`)
                .then(response => {
                    setProperty(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the property data!', error);
                });
        }
    }, [booking.property_id]);

    useEffect(() => {
        if (user && user.id && property.id) {
            const liked = likes.some(like => like.user_id === user.id && like.property_id === property.id);
            setIsHeartPink(liked);
        }
    }, [likes, user, property]);

    useEffect(() => {
        if (property.id && user && user.id) {
            axios.get(`https://skystayserver-n8xf.onrender.com/comments/${property.id}`)
                .then(response => {
                    const userCommented = response.data.some(comment => comment.user_id === user.id);
                    setIsCommented(userCommented);
                })
                .catch(error => {
                    // suppress
                });
        }
    }, [property, user]);

    const handleCommentClick = () => {
        setShowCommentCard(!showCommentCard);
    };

    const handleHeartClick = () => {
        if (isHeartPink) {
            deleteLike(user.id, property.id);
        } else {
            addLike({ user_id: user.id, property_id: property.id });
        }
        setIsHeartPink(!isHeartPink);
    };

    // Check if Check-In date is in the future relative to today
    const checkinDateString = new Date(booking.checkin_date).toISOString().split('T')[0];
    const todayString = new Date().toISOString().split('T')[0];
    const isUpcoming = todayString < checkinDateString;

    return (
        <div className='relative w-full md:w-[48%] xl:w-[31%] flex flex-col bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-blue overflow-hidden'>

            {/* Status Badge */}
            <div className={`absolute top-7 left-7 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${isUpcoming ? 'bg-blue/90 text-white' : 'bg-gray-800/80 text-white'}`}>
                {isUpcoming ? 'Upcoming' : 'Completed'}
            </div>

            {/* Image Area */}
            <div className='aspect-[16/10] w-full rounded-2xl overflow-hidden mb-4 relative bg-gray-100 group'>
                {Array.isArray(property.images) && property.images.length > 0 ? (
                    <img className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' src={property.images[0]} alt={property.title} />
                ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                        <span className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>No Image</span>
                    </div>
                )}

                {/* Quick Actions overlay */}
                <div className='absolute top-3 right-3 flex gap-2'>
                    <button onClick={handleHeartClick} className='w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm hover:scale-110 transition-transform'>
                        <img className='h-4 w-4' src={isHeartPink ? heartpink : heart} alt='like' />
                    </button>
                    <button className='w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm hover:scale-110 transition-transform'>
                        <img className='h-4 w-4 opacity-70' src={share} alt='share' />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className='flex flex-col flex-1 pb-1 px-1'>
                <p className='text-[10px] font-semibold text-blue uppercase tracking-wider mb-1 line-clamp-1'>
                    {property.property_type || 'Loading...'}
                </p>
                <h3 className='text-lg font-sentientmedium text-gray-900 line-clamp-1 mb-1'>{property.title || 'Loading...'}</h3>
                <p className='text-xs text-gray-500 font-light mb-4 line-clamp-1'>
                    {property.city ? `${property.city}, ${property.country}` : 'Loading...'}
                </p>

                <div className='bg-slate-50 border border-gray-100 rounded-2xl p-4 mt-auto space-y-3'>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col'>
                            <span className='text-[10px] text-gray-400 uppercase font-semibold'>Check In</span>
                            <span className='text-xs text-gray-800 font-medium'>{booking.checkin_date}</span>
                        </div>
                        <div className='h-6 w-px bg-gray-200'></div>
                        <div className='flex flex-col text-right'>
                            <span className='text-[10px] text-gray-400 uppercase font-semibold'>Check Out</span>
                            <span className='text-xs text-gray-800 font-medium'>{booking.checkout_date}</span>
                        </div>
                    </div>

                    <div className='border-t border-gray-200 pt-3 flex justify-between items-end'>
                        <span className='text-xs text-gray-500 font-light'>Total Amount</span>
                        <span className='text-lg font-sentientmedium text-pink'>${booking.total_price}</span>
                    </div>
                </div>

                <div className='mt-4 w-full'>
                    {isUpcoming ? (
                        <Button variant='outline' className='w-full rounded-xl border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 hover:border-red-300'>
                            Cancel Booking
                        </Button>
                    ) : (
                        !isCommented ? (
                            <Button className='w-full rounded-xl bg-gray-900 text-white hover:bg-black hover:shadow-glow-blue transition-all' onClick={handleCommentClick}>
                                Comment & Review
                            </Button>
                        ) : (
                            <Button disabled variant="outline" className='w-full rounded-xl text-gray-400 border-gray-200 bg-gray-50 opacity-70 cursor-not-allowed'>
                                Reviewed
                            </Button>
                        )
                    )}
                </div>
            </div>

            {showCommentCard && (
                <div className='absolute inset-0 z-20 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-fade-in'>
                    <CommentCard handleCommentClick={handleCommentClick} property={property} />
                </div>
            )}
        </div>
    )
}
