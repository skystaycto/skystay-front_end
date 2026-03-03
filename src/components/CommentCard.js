import React, { useState, useContext } from 'react'
import axios from 'axios'
import API_ENDPOINTS from '../config/api'
import { toast, Slide } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { UserContext } from '../context/UserContext';
import clean from '../assets/clean.svg'
import accuracy2 from '../assets/accuracy.svg'
import myvalue from '../assets/value.svg'
import map from '../assets/map.svg'
import communicate from '../assets/communicate.svg'
import key from '../assets/key.svg'
import { Button } from '../components/ui/button';

export default function CommentCard({ handleCommentClick, property }) {

    const { user } = useContext(UserContext)

    const [cleanliness, setCleanliness] = useState(0.0);
    const [accuracy, setAccuracy] = useState(0.0);
    const [checkin, setCheckin] = useState(0.0);
    const [value, setvalue] = useState(0.0);
    const [location, setLocation] = useState(0.0);
    const [communication, setCommunication] = useState(0.0);
    const [comment, setComment] = useState('');

    const calculateAverage = () => {
        const total = cleanliness + accuracy + checkin + value + location + communication;
        return total / 6;
    };

    const handleSubmit = (event) => {
        event.preventDefault()

        const averageRating = calculateAverage();

        const newComment = {
            user_id: user.id,
            user_names: `${user.first_name} ${user.last_name}`,
            user_img: user.prof_img,
            property_id: property.id,
            rating_average: averageRating,
            cleanliness: cleanliness,
            accuracy: accuracy,
            check_in: checkin,
            value: value,
            location: location,
            communication: communication,
            comment: comment,
            visible: true
        };

        axios.post(API_ENDPOINTS.SOCIAL.COMMENTS, newComment)
            .then((response) => {
                toast.success('Comment Posted!', {
                    position: 'top-right',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    transition: Slide,
                    closeButton: false,
                })
                handleCommentClick()
            })
            .catch((error) => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to Post Comment',
                    showConfirmButton: false,
                    timer: 3000,
                    iconColor: '#FF385C',
                })
            })
    }

    return (
        <div className='w-full bg-white/95 backdrop-blur-md border border-gray-100 shadow-soft-lift rounded-2xl p-4 md:p-6'>
            <div className='flex justify-between items-center mb-4 border-b border-gray-100 pb-3'>
                <div>
                    <h3 className='text-lg font-sentientmedium text-gray-900'>Review Stay</h3>
                    <p className='text-[10px] text-gray-500 uppercase tracking-wider font-semibold line-clamp-1'>{property.title}</p>
                </div>
                <button onClick={handleCommentClick} className='text-xs text-gray-400 hover:text-pink transition-colors w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 ml-2'>✕</button>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-4'>
                <div className='flex flex-col'>
                    <div className='flex items-center gap-2 mb-1.5'>
                        <img className='w-3.5 h-3.5 opacity-60' src={clean} alt='Cleanliness' />
                        <span className='text-[10px] font-semibold text-gray-500 uppercase tracking-wider'>Cleanliness</span>
                    </div>
                    <input type='number' min='1.0' max='5.0' step='0.5' placeholder='5.0' className='w-full rounded-lg bg-slate-50 border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue transition-colors' onChange={(e) => setCleanliness(parseFloat(e.target.value) || 0)} />
                </div>

                <div className='flex flex-col'>
                    <div className='flex items-center gap-2 mb-1.5'>
                        <img className='w-3.5 h-3.5 opacity-60' src={accuracy2} alt='Accuracy' />
                        <span className='text-[10px] font-semibold text-gray-500 uppercase tracking-wider'>Accuracy</span>
                    </div>
                    <input type='number' min='1.0' max='5.0' step='0.5' placeholder='5.0' className='w-full rounded-lg bg-slate-50 border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue transition-colors' onChange={(e) => setAccuracy(parseFloat(e.target.value) || 0)} />
                </div>

                <div className='flex flex-col'>
                    <div className='flex items-center gap-2 mb-1.5'>
                        <img className='w-3.5 h-3.5 opacity-60' src={key} alt='Check-In' />
                        <span className='text-[10px] font-semibold text-gray-500 uppercase tracking-wider'>Check-in</span>
                    </div>
                    <input type='number' min='1.0' max='5.0' step='0.5' placeholder='5.0' className='w-full rounded-lg bg-slate-50 border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue transition-colors' onChange={(e) => setCheckin(parseFloat(e.target.value) || 0)} />
                </div>

                <div className='flex flex-col'>
                    <div className='flex items-center gap-2 mb-1.5'>
                        <img className='w-3.5 h-3.5 opacity-60' src={myvalue} alt='Value' />
                        <span className='text-[10px] font-semibold text-gray-500 uppercase tracking-wider'>Value</span>
                    </div>
                    <input type='number' min='1.0' max='5.0' step='0.5' placeholder='5.0' className='w-full rounded-lg bg-slate-50 border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue transition-colors' onChange={(e) => setvalue(parseFloat(e.target.value) || 0)} />
                </div>

                <div className='flex flex-col'>
                    <div className='flex items-center gap-2 mb-1.5'>
                        <img className='w-3.5 h-3.5 opacity-60' src={map} alt='Location' />
                        <span className='text-[10px] font-semibold text-gray-500 uppercase tracking-wider'>Location</span>
                    </div>
                    <input type='number' min='1.0' max='5.0' step='0.5' placeholder='5.0' className='w-full rounded-lg bg-slate-50 border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue transition-colors' onChange={(e) => setLocation(parseFloat(e.target.value) || 0)} />
                </div>

                <div className='flex flex-col'>
                    <div className='flex items-center gap-2 mb-1.5'>
                        <img className='w-3.5 h-3.5 opacity-60' src={communicate} alt='Communication' />
                        <span className='text-[10px] font-semibold text-gray-500 uppercase tracking-wider'>Communication</span>
                    </div>
                    <input type='number' min='1.0' max='5.0' step='0.5' placeholder='5.0' className='w-full rounded-lg bg-slate-50 border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue transition-colors' onChange={(e) => setCommunication(parseFloat(e.target.value) || 0)} />
                </div>
            </div>

            <div className='flex flex-col mb-6'>
                <span className='text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5'>Your Review</span>
                <textarea className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue transition-colors resize-none h-20' placeholder='Share details of your own experience at this place' onChange={(e) => setComment(e.target.value)} />
            </div>

            <Button variant='promo' className='w-full rounded-xl shadow-glow-blue py-5' onClick={(e) => handleSubmit(e)}>Submit Review</Button>
        </div>
    )
}
