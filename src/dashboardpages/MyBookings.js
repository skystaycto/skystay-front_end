import React, { useContext, useState, useEffect } from 'react'
import BookingsCard from '../components/BookingsCard'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

export default function MyBookings() {

  const { user } = useContext(UserContext);

  const [currentBookings, setCurrentBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      axios.get(`https://skystayserver-n8xf.onrender.com/checkouts/${user.id}`)
        .then(response => {
          const allBookings = response.data;
          const now = new Date();
          const current = allBookings.filter(booking => new Date(booking.checkin_date) >= now);
          const past = allBookings.filter(booking => new Date(booking.checkin_date) < now);
          setCurrentBookings(current);
          setPastBookings(past);
          setLoading(false);
        })
        .catch(error => {
          console.error('There was an error fetching the bookings!', error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading && user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='font-outfit pb-20 max-w-7xl mx-auto'>
      <div className='mb-10'>
        <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>My Bookings</h1>
        <p className='text-gray-500 font-light mt-1'>Manage your upcoming trips and review past stays.</p>
      </div>

      <div className='mb-12'>
        <div className='flex items-center gap-4 mb-6'>
          <h2 className='text-xl font-sentientmedium text-gray-900'>Upcoming Trips</h2>
          <div className='h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent' />
        </div>

        {currentBookings.length > 0 ? (
          <div className='flex flex-wrap gap-6'>
            {currentBookings.map((listing) => (
              <BookingsCard key={listing.id} booking={listing} />
            ))}
          </div>
        ) : (
          <div className='bg-white/50 border border-gray-100 rounded-3xl p-10 text-center shadow-sm'>
            <div className="inline-flex w-16 h-16 rounded-full bg-blue/10 text-blue items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <h4 className='text-lg font-medium text-gray-900 mb-1'>No Upcoming Trips</h4>
            <p className='text-sm text-gray-500 font-light'>You don't have any reservations scheduled.</p>
          </div>
        )}
      </div>

      <div>
        <div className='flex items-center gap-4 mb-6'>
          <h2 className='text-xl font-sentientmedium text-gray-900'>Past Stays</h2>
          <div className='h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent' />
        </div>

        {pastBookings.length > 0 ? (
          <div className='flex flex-wrap gap-6'>
            {pastBookings.map((listing) => (
              <BookingsCard key={listing.id} booking={listing} />
            ))}
          </div>
        ) : (
          <div className='bg-white/50 border border-gray-100 rounded-3xl p-10 text-center shadow-sm'>
            <h4 className='text-lg font-medium text-gray-900 mb-1'>No History Found</h4>
            <p className='text-sm text-gray-500 font-light'>Your completed trips will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
