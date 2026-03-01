import React, { useEffect, useState, useContext } from 'react'
import { Button } from '../components/ui/button'
import Editor from '../components/Editor'
import { useParams } from 'react-router-dom'
import SelectAmmenities2 from '../components/SelectAmmenities'
import UploadPhotos2 from '../components/Uploadphoto2'
import ImagePositioning from '../components/Imageposition'
import Ammenities from '../components/Ammenities'
import { useNavigate } from 'react-router-dom'
import { PropertyContext } from '../context/PropertyContext'

import Swal from 'sweetalert2';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import DeselectImage from '../components/DeselectImage'

export default function EditProperty() {

  const { property_id } = useParams()
  const { updateProperty } = useContext(PropertyContext)
  const [uploadPromise, setUploadPromise] = useState(null);
  const navigate = useNavigate();

  const [owner_id, setOwnerId] = useState('');
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [propertyType, setPropertyType] = useState('');
  const [title, setTitle] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [beds, setBeds] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [guests, setGuests] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [check_intime, setCheckInTime] = useState('');
  const [check_outtime, setCheckOutTime] = useState('');
  const [description, setDescription] = useState('');
  const [clickedAmmenities, setClickedAmmenities] = useState('');
  const [otherAmmenities, setOtherAmmenities] = useState('');
  const [photos, setPhotos] = useState([]);
  const [videoLink, setVideoLink] = useState('');

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await fetch(`https://skystayserver-n8xf.onrender.com/singleproperty/${property_id}`);
        if (!response.ok) throw new Error('Failed to fetch property');
        const data = await response.json();

        setProperty(data);
        setPropertyType(data.property_type);
        setOwnerId(data.owner_id);
        setTitle(data.title);
        setBedrooms(data.total_bedrooms);
        setBeds(data.total_beds);
        setBathrooms(data.total_bathrooms);
        setGuests(data.maximum_guests);
        setCity(data.city);
        setCountry(data.country);
        setGoogleMapsLink(data.g_mapslink);
        setCheckInTime(data.check_intime);
        setCheckOutTime(data.check_outtime);
        setDescription(data.description);
        setClickedAmmenities(data.ammenities);
        setOtherAmmenities(data.other_ammenities);
        setPhotos(data.images);
        setVideoLink(data.video_link);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };
    fetchPropertyData();
  }, [property_id]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (uploadPromise) {
      try {
        await uploadPromise;
      } catch (error) {
        showErrorToast('Failed to upload images');
        return;
      }
    }

    const updatedProperty = {
      owner_id: owner_id,
      property_type: propertyType,
      title: title,
      total_bedrooms: parseInt(bedrooms, 10),
      total_beds: parseInt(beds, 10),
      total_bathrooms: parseInt(bathrooms, 10),
      maximum_guests: parseInt(guests, 10),
      city: city,
      country: country,
      g_mapslink: googleMapsLink,
      check_intime: check_intime,
      check_outtime: check_outtime,
      description: description,
      ammenities: clickedAmmenities,
      other_ammenities: otherAmmenities,
      images: JSON.stringify(photos),
    };

    try {
      await updateProperty(property.id, updatedProperty);
      toast.success('Property updated successfully', toastOptions);
      navigate('/portfolio');
    } catch (error) {
      showErrorToast('Failed to update property');
    }
  }

  const toastOptions = {
    position: "top-left",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-outfit">
        <div className="w-12 h-12 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50 font-outfit py-[40px] px-[2.5vw] md:px-[5vw]'>
      <div className='max-w-5xl mx-auto'>
        <div className='text-center mb-10'>
          <h1 className='text-3xl lg:text-4xl font-sentientmedium text-gray-900 tracking-tight'>Edit Listing: {title}</h1>
          <div className='h-1 w-24 bg-blue-gradient rounded-full mx-auto mt-4' />
        </div>

        <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-8 lg:p-12 space-y-10'>

          {/* Owner Details */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Host Information</h2>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Owner ID</label>
              <input
                type='number'
                className='w-full md:w-1/2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-light outline-none transition-all focus:border-blue focus:ring-2 focus:ring-blue/20'
                value={owner_id}
                onChange={(e) => setOwnerId(e.target.value)}
              />
            </div>
          </div>

          {/* Property Core Details */}
          <div>
            <h2 className='text-xl font-sentientmedium text-gray-900 mb-6'>Core Details</h2>
            <div className='space-y-6'>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3'>Property Type</label>
                <div className='flex flex-wrap gap-4'>
                  {['Apartment', 'House', 'Penthouse', 'BeachHouse', 'Other'].map((type) => (
                    <label key={type} className={`cursor-pointer px-6 py-3 rounded-full border transition-all text-sm font-medium ${propertyType === type ? 'bg-blue text-white border-blue shadow-glow-blue' : 'bg-white text-gray-600 border-gray-200 hover:border-blue/50'}`}>
                      <input
                        type="radio"
                        name="propertyOwnership"
                        value={type}
                        className="hidden"
                        checked={propertyType === type}
                        onChange={(e) => setPropertyType(e.target.value)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Listing Title</label>
                <input
                  className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-base font-light outline-none transition-all focus:border-blue focus:ring-2 focus:ring-blue/20'
                  placeholder='Enter an eye-catching title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Bedrooms</label>
                  <input type='number' className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none transition-all focus:border-blue' placeholder='0' value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Beds</label>
                  <input type='number' className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none transition-all focus:border-blue' placeholder='0' value={beds} onChange={(e) => setBeds(e.target.value)} />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Bathrooms</label>
                  <input type='number' className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none transition-all focus:border-blue' placeholder='0' value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Max Guests</label>
                  <input type='number' className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none transition-all focus:border-blue' placeholder='0' value={guests} onChange={(e) => setGuests(e.target.value)} />
                </div>
              </div>

            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Location & Times */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className='text-xl font-sentientmedium text-gray-900 mb-6'>Location</h2>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Country</label>
                  <input className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none focus:border-blue' value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>City</label>
                  <input className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none focus:border-blue' value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Google Maps Link</label>
                  <input className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none focus:border-blue' placeholder='Paste full link here' value={googleMapsLink} onChange={(e) => setGoogleMapsLink(e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <h2 className='text-xl font-sentientmedium text-gray-900 mb-6'>House Rules</h2>
              <div className='flex items-center gap-4'>
                <div className="flex-1">
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Check-In</label>
                  <input type='time' className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none focus:border-blue' value={check_intime} onChange={(e) => setCheckInTime(e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Check-Out</label>
                  <input type='time' className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none focus:border-blue' value={check_outtime} onChange={(e) => setCheckOutTime(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Description */}
          <div>
            <h2 className='text-xl font-sentientmedium text-gray-900 mb-6'>Description</h2>
            <div className='border-0 rounded-2xl overflow-hidden shadow-sm'>
              <Editor editorHtml={description} setEditorHtml={setDescription} />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Amenities */}
          <div>
            <h2 className='text-xl font-sentientmedium text-gray-900 mb-6'>Amenities</h2>

            <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 mb-6">
              <p className='text-sm font-semibold text-gray-900 mb-4'>Current Amenities:</p>
              <Ammenities propertyData={property} />
            </div>

            <p className='text-sm text-gray-600 mb-4 font-light'>Reselect amenities below to overwrite the current list (leave untouched to keep current):</p>
            <div className="bg-white border text-sm border-gray-200 rounded-2xl p-6">
              <SelectAmmenities2 propertyAmmenities={property.ammenities} setClickedAmmenities={setClickedAmmenities} />
            </div>

            <div className="mt-6">
              <label className='block text-sm font-medium text-gray-700 mb-2'>Additional Amenities (Comma separated)</label>
              <textarea
                className='w-full h-24 rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none focus:border-blue'
                placeholder='e.g. Electric Vehicle Charger, Espresso Machine'
                value={otherAmmenities}
                onChange={(e) => setOtherAmmenities(e.target.value)}
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Media */}
          <div>
            <h2 className='text-xl font-sentientmedium text-gray-900 mb-6'>Media & Images</h2>

            <div className="mb-8">
              <label className='block text-sm font-medium text-gray-700 mb-2'>YouTube Video Tour Link</label>
              <input className='w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none focus:border-blue' placeholder='https://youtube.com/...' value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
            </div>

            <div className="bg-slate-50 border border-gray-200 border-dashed rounded-2xl p-8 mb-8 space-y-8">
              <div>
                <h3 className='text-base font-semibold text-gray-900 mb-4'>1. Upload New Photos</h3>
                <UploadPhotos2 photos={photos} setPhotos={setPhotos} setUploadPromise={setUploadPromise} />
              </div>

              <div>
                <h3 className='text-base font-semibold text-gray-900 mb-4'>2. Order Photos</h3>
                <ImagePositioning photos={photos} setPhotos={setPhotos} />
              </div>

              <div>
                <h3 className='text-base font-semibold text-gray-900 mb-4'>3. Remove Photos</h3>
                <DeselectImage photos={photos} setPhotos={setPhotos} />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className='pt-8 flex justify-end'>
            <Button variant='promo' className="rounded-full px-12 py-6 text-lg font-semibold shadow-glow-blue hover:-translate-y-1 transition-transform" onClick={handleSubmit}>
              Save Listing
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}
