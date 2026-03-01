import React, { useState, useContext } from 'react'
import UploadPhotos from '../components/Uploadphoto'
import { Button } from '../components/ui/button'
import Editor from '../components/Editor'
import SelectAmmenities from '../components/SelectAmmenities'

import { PropertyContext } from '../context/PropertyContext'

export default function PublishListing() {

  const { addProperty } = useContext(PropertyContext)

  const generateUniqueId = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomPart = '';
    for (let i = 0; i < 3; i++) {
      randomPart += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    const uniqueId = `SKY${year}${month}${day}${hours}${minutes}${randomPart}`;
    return uniqueId.toUpperCase();
  };

  const [ownerid, setOwnerid] = useState('')
  const [propertyId] = useState(generateUniqueId());
  const [propertyType, setPropertyType] = useState('')
  const [title, setTitle] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [beds, setBeds] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [guests, setGuests] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [googleMapsLink, setGoogleMapsLink] = useState('')
  const [check_intime, setCheckInTime] = useState('')
  const [check_outtime, setCheckOutTime] = useState('')
  const [description, setDescription] = useState('')
  const [videoLink, setVideoLink] = useState('')

  const [clickedAmmenities, setClickedAmmenities] = useState('')
  const [otherAmmenities, setOtherAmmenities] = useState('')
  const [photos, setPhotos] = useState([])

  const newProperty = {
    owner_id: ownerid,
    property_id: propertyId,
    ownership_status: "yes",
    visible: true,
    promo_feature: "None",
    property_type: propertyType,
    total_views: 1,
    title: title,
    total_bedrooms: parseInt(bedrooms, 10) || 0,
    total_beds: parseInt(beds, 10) || 0,
    total_bathrooms: parseInt(bathrooms, 10) || 0,
    maximum_guests: parseInt(guests, 10) || 0,
    city: city,
    country: country,
    g_mapslink: googleMapsLink,
    check_intime: check_intime,
    check_outtime: check_outtime,
    description: description,
    ammenities: clickedAmmenities,
    other_ammenities: otherAmmenities,
    images: JSON.stringify(photos),
    dates_booked: "2024-07-13,2024-07-14,2024-07-15,2024-07-19,2024-07-20,2024-07-21,2024-07-22,2024-08-19,2024-08-20",
    overall_rating: 0,
    clean_avgrating: 0,
    accuracy_avgrating: 0,
    check_in_avgrating: 0,
    value_avgrating: 0,
    location_avgrating: 0,
    communication_avgrating: 0,
    video_link: videoLink,
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(newProperty)
      .then(response => {
        console.log('Property added successfully');
      })
      .catch(error => {
        console.error('Error adding property:', error);
      });
  };

  const propertyTypeOptions = ['Apartment', 'House', 'Penthouse', 'BeachHouse', 'Other'];

  return (
    <div className='font-outfit pb-20 max-w-5xl mx-auto'>
      <div className='mb-10 text-center'>
        <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>Publish Listing (Admin)</h1>
        <p className='text-gray-500 font-light mt-2 max-w-2xl mx-auto'>Directly publish an approved property listing to the platform database.</p>
        <p className='text-xs font-mono bg-blue/10 text-blue inline-block px-3 py-1 rounded-full mt-3'>Draft ID: {propertyId}</p>
      </div>

      <form className='space-y-8' onSubmit={handleSubmit}>

        {/* Basic Info Section */}
        <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-10'>
          <h2 className='text-xl font-sentientmedium text-gray-900 mb-6 flex items-center gap-3'>
            <span className="w-8 h-8 rounded-full bg-pink text-white flex items-center justify-center text-sm font-bold shadow-glow-pink">1</span>
            Core Identity
          </h2>

          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Owner ID</label>
                <input className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='User ID of the owner' onChange={(e) => setOwnerid(e.target.value)} required />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3'>Property Type</label>
                <div className='flex flex-wrap gap-2'>
                  {propertyTypeOptions.map((type) => (
                    <label key={type} className={`px-4 py-2 rounded-full border cursor-pointer transition-all text-sm font-medium ${propertyType === type ? 'bg-blue text-white border-blue shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:bg-slate-50'}`}>
                      <input type="radio" name="propertyType" value={type} className="sr-only" onChange={(e) => setPropertyType(type)} />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className='pt-2'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Property Title</label>
              <input className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='Listing Title' onChange={(e) => setTitle(e.target.value)} required />
            </div>
          </div>
        </div>

        {/* Accommodation Specs */}
        <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-10'>
          <h2 className='text-xl font-sentientmedium text-gray-900 mb-6 flex items-center gap-3'>
            <span className="w-8 h-8 rounded-full bg-pink text-white flex items-center justify-center text-sm font-bold shadow-glow-pink">2</span>
            Accommodation Specs
          </h2>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>
            <div>
              <label className='block text-[10px] font-semibold uppercase text-gray-500 mb-2'>Bedrooms</label>
              <input type='number' min="0" className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='e.g. 2' onChange={(e) => setBedrooms(e.target.value)} />
            </div>
            <div>
              <label className='block text-[10px] font-semibold uppercase text-gray-500 mb-2'>Beds</label>
              <input type='number' min="0" className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='e.g. 3' onChange={(e) => setBeds(e.target.value)} />
            </div>
            <div>
              <label className='block text-[10px] font-semibold uppercase text-gray-500 mb-2'>Bathrooms</label>
              <input type='number' min="0" className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='e.g. 1' onChange={(e) => setBathrooms(e.target.value)} />
            </div>
            <div>
              <label className='block text-[10px] font-semibold uppercase text-gray-500 mb-2'>Max Guests</label>
              <input type='number' min="0" className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='e.g. 4' onChange={(e) => setGuests(e.target.value)} />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Country</label>
              <input className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='Country Name' onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>City / Province</label>
              <input className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='City Name' onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>

          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Google Maps Link</label>
            <input className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='https://maps.google.com...' onChange={(e) => setGoogleMapsLink(e.target.value)} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Check-In Time</label>
              <input type='time' className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' onChange={(e) => setCheckInTime(e.target.value)} />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Check-Out Time</label>
              <input type='time' className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' onChange={(e) => setCheckOutTime(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Narrative & Details */}
        <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-10'>
          <h2 className='text-xl font-sentientmedium text-gray-900 mb-6 flex items-center gap-3'>
            <span className="w-8 h-8 rounded-full bg-pink text-white flex items-center justify-center text-sm font-bold shadow-glow-pink">3</span>
            Narrative & Details
          </h2>

          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Rich Description</label>
            <div className='rounded-xl overflow-hidden border border-gray-200'>
              <Editor editorHtml={description} setEditorHtml={setDescription} />
            </div>
          </div>

          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Amenities Selection</label>
              <div className='bg-slate-50 p-4 rounded-xl border border-gray-200 mt-2'>
                <SelectAmmenities setClickedAmmenities={setClickedAmmenities} />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Other Amenities</label>
              <textarea className='w-full h-20 rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors resize-none' placeholder='Separate with commas...' onChange={(e) => setOtherAmmenities(e.target.value)}></textarea>
            </div>
          </div>
        </div>

        {/* Media & Launch */}
        <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-10'>
          <h2 className='text-xl font-sentientmedium text-gray-900 mb-6 flex items-center gap-3'>
            <span className="w-8 h-8 rounded-full bg-pink text-white flex items-center justify-center text-sm font-bold shadow-glow-pink">4</span>
            Media Gallery
          </h2>

          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Virtual Tour / Video Link</label>
            <input className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='YouTube or Vimeo Link' onChange={(e) => setVideoLink(e.target.value)} />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Photo Gallery</label>
            <div className='bg-slate-50 p-4 border border-gray-200 border-dashed rounded-xl'>
              <UploadPhotos setPhotos={setPhotos} />
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center pt-6'>
          <Button variant='promo' className='w-full md:w-auto px-16 py-5 rounded-full text-lg shadow-glow-blue bg-blue hover:bg-black hover:shadow-black/20 hover:-translate-y-1 transition-all' type="submit">Publish to Platform</Button>
        </div>

      </form>
    </div>
  )
}
