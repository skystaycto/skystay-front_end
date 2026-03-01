import React, { useState, useContext, useEffect } from 'react';
import search2 from '../assets/search2.svg';
import RequestCard from '../components/RequestCard';
import { ListRequestContext } from '../context/ListRequestContext';

export default function ApproveListing() {

  const { requests, fetchRequests } = useContext(ListRequestContext);

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedFilter, setSelectedFilter] = useState('Pending');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRequests = requests.filter((request) => {
    if (selectedFilter !== 'All' && request.status !== selectedFilter) {
      return false;
    }
    if (searchQuery) {
      return (
        request.id.toString().includes(searchQuery) ||
        request.ownership_status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.property_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className='font-outfit pb-20 max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>Approve Requests</h1>
        <p className='text-gray-500 font-light mt-1'>Review and manage new property listing submissions.</p>
      </div>

      <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-8 animate-fade-in'>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8'>

          {/* Search Bar */}
          <div className='w-full lg:w-96'>
            <div className='relative w-full'>
              <input
                className='w-full rounded-full border border-gray-200 bg-white/50 pl-12 pr-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all'
                placeholder='Search ID, Type, Location'
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <img className='w-5 h-5 opacity-40' src={search2} alt='search' />
              </div>
            </div>
            <p className='text-[10px] text-gray-400 mt-2 ml-4'>Search by ID, Ownership Status, Property Type, Country, City</p>
          </div>

          {/* Filters */}
          <div className='flex flex-wrap gap-2 p-1 bg-slate-100 rounded-full border border-gray-200/60'>
            {['All', 'Pending', 'Approved', 'Declined'].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-6 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${selectedFilter === filter
                    ? 'bg-blue text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                  }`}
              >
                {filter === 'Pending' ? 'Submitted' : filter === 'Declined' ? 'Rejected' : filter}
              </button>
            ))}
          </div>
        </div>

        <div className='space-y-4'>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request, index) => (
              <RequestCard key={index} request={request} />
            ))
          ) : (
            <div className='py-12 text-center text-gray-400 font-light border border-gray-100 rounded-3xl bg-white/50'>
              No requests found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
