import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import search2 from '../assets/search2.svg';
import ManageCard from '../components/ManageCard';
import { PropertyContext } from '../context/PropertyContext';
import { Button } from '../components/ui/button';

export default function ManageListing() {

  const { allproperties, fetchProperties } = useContext(PropertyContext);
  const [allfeatures, setAllFeatures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const propertiesPerPage = 6;

  useEffect(() => {
    setFilteredProperties(
      allproperties.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.property_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, allproperties]);

  useEffect(() => {
    const fetchAllFeatures = async () => {
      try {
        const response = await axios.get('https://skystayserver-n8xf.onrender.com/features');
        setAllFeatures(response.data);
      } catch (error) {
        console.error('Error fetching all features:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFeatures();
    fetchProperties();
  }, [fetchProperties]);

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProperties.length / propertiesPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='font-outfit pb-20 max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>Manage Listings</h1>
        <p className='text-gray-500 font-light mt-1'>View and promote all properties on the platform.</p>
      </div>

      <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-8 animate-fade-in'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8'>
          {/* Search Bar */}
          <div className='relative w-full md:w-96'>
            <input
              className='w-full rounded-full border border-gray-200 bg-white/50 pl-12 pr-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all'
              placeholder='Search Property Title, Id or City'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <img className='w-5 h-5 opacity-40' src={search2} alt='search' />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {currentProperties.length > 0 ? (
            currentProperties.map((listing) => (
              <ManageCard key={listing.id} listing={listing} allfeatures={allfeatures} />
            ))
          ) : (
            <div className='col-span-full py-12 text-center text-gray-400 font-light border border-gray-100 rounded-3xl bg-white/50'>
              No properties found matching your search.
            </div>
          )}
        </div>

        {pageNumbers.length > 1 && (
          <div className='flex justify-center mt-10 gap-2'>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${currentPage === number ? 'bg-blue text-white shadow-md shadow-blue/20' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
