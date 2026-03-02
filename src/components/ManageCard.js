import React, { useState, useEffect, useContext } from 'react'
import { PropertyContext } from '../context/PropertyContext';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom';
import promote from '../assets/promote.svg'
import edit4 from '../assets/edit4.svg'
import visible from '../assets/visible.svg'
import { Button } from '../components/ui/button';

export default function ManageCard({ listing: initialListing, allfeatures }) {

  const { fetchPropertiesNoCache } = useContext(PropertyContext);

  const [showPromoForm, setShowPromoForm] = useState(false);
  const [user, setUser] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [listing, setListing] = useState(initialListing);

  const navigate = useNavigate();

  const togglePromoForm = () => {
    setShowPromoForm(!showPromoForm);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://skystayserver-n8xf.onrender.com/myuser/${listing.owner_id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [listing.owner_id]);

  const customStyles = (height = '40px') => ({
    control: (provided) => ({
      ...provided,
      borderRadius: '1rem',
      borderColor: 'rgba(229, 231, 235, 1)',
      padding: '0 0.25rem',
      fontSize: '0.875rem',
      fontWeight: '300',
      minHeight: height,
      height: height,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '100%',
      padding: '0 8px',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(156, 163, 175, 1)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'rgba(17, 24, 39, 1)',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0.75rem',
      overflow: 'hidden',
      border: '1px solid rgba(229, 231, 235, 1)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(0, 108, 228, 0.1)' : 'white',
      color: state.isFocused ? 'rgba(0, 108, 228, 1)' : 'black',
      cursor: 'pointer',
    }),
  });

  const featureOptions = allfeatures.map(feature => ({
    value: feature.feature_name,
    label: feature.feature_name.trim(),
  }));

  const handleFeatureChange = (selectedOption) => {
    setSelectedFeature(selectedOption.value);
  };

  const handleEdit = () => {
    navigate(`/editproperty/${listing.property_id}`);
  };

  const saveFeature = async () => {
    try {
      await axios.patch(`https://skystayserver-n8xf.onrender.com/propertypromo/${listing.id}`, {
        promo_feature: selectedFeature,
      });
      setListing((prevListing) => ({
        ...prevListing,
        promo_feature: selectedFeature,
      }));
      fetchPropertiesNoCache();
      togglePromoForm();
      toast.success('Promotion feature saved!', toastOptions);
    } catch (error) {
      console.error('Error saving feature:', error);
      showErrorToast('Failed to save feature!');
    }
  };

  const handleVisibility = async () => {
    try {
      await axios.patch(`https://skystayserver-n8xf.onrender.com/propertyvisibility/${listing.id}`, {
        visible: !listing.visible,
      });
      setListing((prevListing) => ({
        ...prevListing,
        visible: !prevListing.visible,
      }));
      fetchPropertiesNoCache();
      toast.success('Property visibility updated!', toastOptions);
    } catch (error) {
      console.error('Error updating visibility:', error);
      showErrorToast('Failed to update visibility!');
    }
  }

  const toastOptions = {
    position: "top-left",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
    closeButton: false,
  };

  const showErrorToast = (message) => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Error',
      text: message,
      showConfirmButton: false,
      timer: 3000,
      iconColor: '#FF385C',
    });
  };

  return (
    <div className='relative w-full bg-white/50 border border-gray-100 rounded-2xl p-4 transition-all hover:bg-white hover:shadow-soft-lift'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='w-full sm:w-[150px] aspect-square rounded-xl overflow-hidden shadow-sm shrink-0'>
          {Array.isArray(listing.images) && listing.images.length > 0 ? (
            <img className='w-full h-full object-cover transition-transform duration-500 hover:scale-105' src={listing.images[0]} alt="Property" />
          ) : (
            <div className='w-full h-full bg-gray-100 flex items-center justify-center text-gray-400'>No Image</div>
          )}
        </div>

        <div className='flex-1 flex flex-col'>
          <div className='mb-3'>
            <h3 className='text-base font-sentientmedium text-gray-900 line-clamp-1 mb-1'>{listing.title}</h3>
            <p className='text-xs text-gray-500 line-clamp-1'>{listing.city}, {listing.country}</p>
          </div>

          <div className='grid grid-cols-2 gap-x-2 gap-y-1 mt-auto'>
            <div className='text-[10px] text-gray-400 uppercase font-semibold'>Property ID</div>
            <div className='text-xs font-mono text-gray-700'>{listing.property_id}</div>

            <div className='text-[10px] text-gray-400 uppercase font-semibold'>Owner</div>
            <div className='text-xs text-gray-700 truncate'>{user.first_name} {user.last_name}</div>

            <div className='text-[10px] text-gray-400 uppercase font-semibold mt-2'>Promoted</div>
            <div className='text-xs mt-2'>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${listing.promo_feature !== "None" && listing.promo_feature ? 'bg-pink/10 text-pink' : 'bg-gray-100 text-gray-500'}`}>
                {listing.promo_feature !== "None" && listing.promo_feature ? listing.promo_feature : 'No'}
              </span>
            </div>

            <div className='text-[10px] text-gray-400 uppercase font-semibold'>Visible</div>
            <div className='text-xs'>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${listing.visible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {listing.visible ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2 lg:gap-3 justify-start sm:justify-end'>
        <button onClick={togglePromoForm} className='flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink/10 text-pink hover:bg-pink hover:text-white transition-colors text-[10px] font-semibold uppercase tracking-wide'>
          <img src={promote} alt="Promote" className='h-3 brightness-0 invert flex-shrink-0 opacity-80' style={{ filter: 'brightness(0) saturate(100%) invert(43%) sepia(87%) saturate(3015%) hue-rotate(323deg) brightness(101%) contrast(106%)' }} /> Promote
        </button>
        <button onClick={handleVisibility} className='flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-[10px] font-semibold uppercase tracking-wide'>
          <img className='h-3 opacity-60' src={visible} alt="visible" /> Toggle Vis
        </button>
        <button onClick={handleEdit} className='flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100 text-blue hover:bg-blue hover:text-white transition-colors text-[10px] font-semibold uppercase tracking-wide'>
          <img className='h-3 opacity-80' src={edit4} alt="edit" style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(91%) saturate(2891%) hue-rotate(204deg) brightness(96%) contrast(101%)' }} /> Edit
        </button>
      </div>

      {showPromoForm && (
        <div className='absolute inset-0 z-10 bg-white/90 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-center border border-gray-200 shadow-xl animate-fade-in'>
          <div className='flex justify-between items-start mb-4'>
            <div>
              <h4 className='font-semibold text-gray-900'>Promote Property</h4>
              <p className='text-xs text-gray-500 font-mono mt-1'>{listing.property_id}</p>
            </div>
            <button onClick={togglePromoForm} className='text-xs text-gray-400 hover:text-pink transition-colors'>Cancel</button>
          </div>

          <div className='mb-6'>
            <label className='block text-xs font-semibold uppercase text-gray-500 mb-2'>Select Feature Section</label>
            <Select
              value={featureOptions.find((option) => option.value === selectedFeature)}
              onChange={handleFeatureChange}
              options={featureOptions}
              placeholder="Select Promotion"
              styles={customStyles('44px')}
              className='text-sm'
            />
          </div>

          <Button onClick={saveFeature} variant='promo' className='w-full rounded-xl py-5 shadow-glow-blue'>
            Save Promotion
          </Button>
        </div>
      )}
    </div>
  )
}
