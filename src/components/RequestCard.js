import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import API_ENDPOINTS from '../config/api';
import { ListRequestContext } from '../context/ListRequestContext'
import { Button } from '../components/ui/button'

export default function RequestCard({ request }) {

    const { editRequestStatus, fetchRequests } = useContext(ListRequestContext)

    const [user, setUser] = useState(null)
    const [opendetails, setOpenDetails] = useState(false)

    const handleOpenDetails = () => {
        setOpenDetails(!opendetails)
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.USER.MY_USER(request.user_id));
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [request.user_id]);

    const handleStatusUpdate = async (status) => {
        editRequestStatus(request.id, status)
        fetchRequests()
    }

    return (
        <div className='w-full bg-white/50 border border-gray-100 rounded-2xl overflow-hidden transition-all hover:bg-white hover:shadow-soft-lift mb-4'>
            {/* Top Bar - Header */}
            <div
                onClick={handleOpenDetails}
                className={`flex flex-col sm:flex-row flex-wrap sm:flex-nowrap items-start sm:items-center justify-between p-4 cursor-pointer transition-colors ${opendetails ? 'bg-blue/5 border-b border-blue/10' : ''}`}
            >
                <div className='flex flex-wrap gap-x-8 gap-y-2 w-full'>
                    <div>
                        <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-0.5'>Request ID</span>
                        <span className='text-sm font-mono text-gray-800'>{request.id}</span>
                    </div>
                    <div>
                        <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-0.5'>Date Submitted</span>
                        <span className='text-sm text-gray-800'>{formatDate(request.date_submitted)}</span>
                    </div>
                    {user && (
                        <>
                            <div>
                                <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-0.5'>Applicant</span>
                                <span className='text-sm text-gray-800'>{user.first_name} {user.last_name}</span>
                            </div>
                            <div className='hidden md:block'>
                                <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-0.5'>Contact</span>
                                <span className='text-sm text-gray-800'>{user.phone_no}</span>
                            </div>
                        </>
                    )}
                    <div className='ml-auto pl-4 flex items-center'>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${request.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                request.status === 'Declined' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {request.status}
                        </span>
                        <svg className={`w-5 h-5 ml-4 text-gray-400 transition-transform ${opendetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Expanded Details */}
            {opendetails && (
                <div className='p-6 bg-white animate-fade-in'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                        <div className='bg-slate-50 p-4 rounded-xl border border-gray-100'>
                            <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-500 block mb-1'>Ownership Status</span>
                            <span className='text-sm text-gray-900 font-medium'>{request.ownership_status}</span>
                        </div>
                        <div className='bg-slate-50 p-4 rounded-xl border border-gray-100'>
                            <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-500 block mb-1'>Property Type</span>
                            <span className='text-sm text-gray-900 font-medium'>{request.property_type}</span>
                        </div>
                        <div className='bg-slate-50 p-4 rounded-xl border border-gray-100'>
                            <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-500 block mb-1'>Location</span>
                            <span className='text-sm text-gray-900 font-medium'>{request.city}, {request.country}</span>
                        </div>
                        <div className='bg-slate-50 p-4 rounded-xl border border-gray-100'>
                            <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-500 block mb-1'>Size</span>
                            <span className='text-sm text-gray-900 font-medium'>{request.total_bedrooms} Bed • {request.total_bathrooms} Bath</span>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                        <div>
                            <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-2'>Description</span>
                            <p className='text-sm text-gray-700 font-light leading-relaxed bg-slate-50 p-4 rounded-xl border border-gray-100 min-h-[80px]'>
                                {request.description}
                            </p>
                        </div>
                        <div>
                            <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-2'>Amenities</span>
                            <p className='text-sm text-gray-700 font-light leading-relaxed bg-slate-50 p-4 rounded-xl border border-gray-100 min-h-[80px]'>
                                {request.ammenities}{request.other_ammenities ? `, ${request.other_ammenities}` : ''}
                            </p>
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <div>
                            <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-3 border-b border-gray-100 pb-2'>Property Photos</span>
                            <div className='flex overflow-x-auto gap-4 pb-2 snap-x'>
                                {request.images && JSON.parse(request.images).map((image, index) => (
                                    <img key={index} className='h-32 w-48 object-cover rounded-xl shadow-sm border border-gray-200 snap-center shrink-0' src={image} alt={`Property ${index}`} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-3 border-b border-gray-100 pb-2'>Document Photos</span>
                            <div className='flex overflow-x-auto gap-4 pb-2 snap-x'>
                                {request.property_img && JSON.parse(request.property_img).map((image, index) => (
                                    <img key={index} className='h-32 w-48 object-cover rounded-xl shadow-sm border border-gray-200 snap-center shrink-0' src={image} alt={`Document ${index}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {request.status === 'Pending' && (
                        <div className='flex flex-wrap gap-4 justify-end mt-8 pt-6 border-t border-gray-100'>
                            <Button variant='outline' className='rounded-full px-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors' onClick={() => handleStatusUpdate('Declined')}>
                                Decline Request
                            </Button>
                            <Button className='rounded-full px-8 bg-green-500 hover:bg-green-600 text-white shadow-md shadow-green-500/20 transition-all hover:-translate-y-0.5' onClick={() => handleStatusUpdate('Approved')}>
                                Approve Listing
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
