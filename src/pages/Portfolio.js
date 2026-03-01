import React, { useState, useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Filter from '../components/Filter';
import Minifilter from '../components/Minifilter';
import Filter2 from '../components/Filter2';

import { FilterContext } from '../context/FilterContext';
import { PropertyContext } from '../context/PropertyContext';
import { LikesContext } from '../context/LikesContext';

import Portfoliocard from '../components/Portfoliocard';

export default function Portfolio() {

  useEffect(() => {
    fetchProperties();
    fetchLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const { filterTerms, setFilterTerms } = useContext(FilterContext);
  const { allproperties, fetchProperties } = useContext(PropertyContext);
  const { fetchLikes } = useContext(LikesContext);

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const isDateBooked = (datesBooked, startDate, endDate) => {
    if (!datesBooked) return false;
    const bookedDates = datesBooked.split(',').map(date => new Date(date));
    for (let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
      if (bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return true;
      }
    }
    return false;
  };

  const getTodaysPrice = (property) => {
    const priceData = property.price;

    if (!priceData) return 0;

    const priceEntries = priceData.split(',').map(entry => {
      const [date, price] = entry.split(':');
      return { date, price: parseFloat(price) };
    });

    priceEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
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

  const filteredProperties = allproperties.filter((property) => {
    if (!filterTerms) return true;

    const { destination, startDate, endDate, guests, minPrice, maxPrice, bedrooms, bathrooms, amenities } = filterTerms;

    const matchesDestination = destination ? property.city === destination.value : true;
    const matchesBookingDates = startDate && endDate ? !isDateBooked(property.dates_booked, startDate, endDate) : true;
    const matchesGuests = guests ? property.total_beds >= guests : true;
    const matchesMinPrice = minPrice ? getTodaysPrice(property) >= minPrice : true;
    const matchesMaxPrice = maxPrice ? getTodaysPrice(property) <= maxPrice : true;
    const matchesBedrooms = bedrooms ? property.total_bedrooms >= bedrooms : true;
    const matchesBathrooms = bathrooms ? property.total_bathrooms >= bathrooms : true;
    const matchesAmenities = amenities && amenities.length ? amenities.every(amenity => property.ammenities && property.ammenities.includes(amenity)) : true;

    return matchesDestination && matchesBookingDates && matchesGuests && matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesBathrooms && matchesAmenities;
  });


  return (
    <>
      <Helmet>
        <title>Book Now | SkyStay.Homes</title>
        <meta name="description" content="Quick, Simple, Easy to Use No Reservation Costs. Great rates" />
        <link rel="canonical" href="/portfolio" />
      </Helmet>

      <div className='min-h-screen bg-slate-50 font-outfit pb-20'>
        {/* Subtle decorative background for V2 */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue/5 rounded-full filter blur-[100px]"></div>
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-pink/5 rounded-full filter blur-[120px]"></div>
        </div>

        {/* Filter Section */}
        <div className="pt-24 pb-8 px-[2.5vw] md:px-[5vw]">
          {/* Desktop Filter Wrapper */}
          <div className='hidden sm:block w-fit mx-auto bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-full p-2 mb-6'>
            <Filter filterTerms={filterTerms} setFilterTerms={setFilterTerms} allproperties={allproperties} />
          </div>

          <div className='hidden sm:flex justify-center xl:hidden 2xl:hidden'>
            <button className='font-outfit cursor-pointer w-fit p-3 text-sm font-medium bg-white text-gray-700 border border-gray-200 shadow-sm rounded-full hover:bg-gray-50 transition-colors' onClick={toggleAdvancedFilters}>
              {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>
          </div>

          {/* Mobile Filter Wrapper */}
          <div className='w-full sm:hidden'>
            <div className='w-full flex flex-col items-center justify-center'>
              <div className="w-full bg-white shadow-soft-lift rounded-3xl p-4 mb-4 border border-gray-100">
                <Minifilter filterTerms={filterTerms} setFilterTerms={setFilterTerms} allproperties={allproperties} />
              </div>
              <button className='font-outfit cursor-pointer w-fit p-3 px-6 text-sm font-medium bg-white text-gray-700 border border-gray-200 shadow-sm rounded-full hover:bg-gray-50 transition-colors' onClick={toggleAdvancedFilters}>
                {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
              </button>
            </div>
          </div>
        </div>

        <div className='px-[2.5vw] md:px-[5vw] flex lg:flex-col md:flex-col sm:flex-col xsm:flex-col gap-8'>

          {/* Advanced Filters Sidebar (Left) */}
          {showAdvancedFilters && (
            <div className='2xl:hidden xl:hidden w-full lg:mb-8 animate-fade-in'>
              <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6">
                <Filter2 />
              </div>
            </div>
          )}
          <div className='hidden lg:block xl:w-1/4 2xl:w-1/5 shrink-0'>
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 sticky top-24">
              <Filter2 />
            </div>
          </div>

          {/* Properties Grid */}
          <div className='flex-1 grid gap-6 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xsm:grid-cols-1 justify-items-center sm:justify-items-stretch'>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <div key={property.id} className="w-full" data-aos="fade-up" data-aos-delay={(index % 4) * 100}>
                  <Portfoliocard property={property} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <h3 className="text-2xl font-sentientmedium text-gray-900 mb-2">No properties found</h3>
                <p className='text-lg font-light text-gray-500'>We couldn't find any properties matching your current filters. Try adjusting your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
