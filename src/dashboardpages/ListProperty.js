import React, { useEffect, useContext, useState } from 'react'
import UploadPhotos from '../components/Uploadphoto'
import PhotosUpload from '../components/PhotosUpload'
import { Button } from '../components/ui/button'
import SelectAmmenities from '../components/SelectAmmenities'
import { UserContext } from '../context/UserContext'
import { ListRequestContext } from '../context/ListRequestContext'


export default function ListProperty() {

  const { user } = useContext(UserContext)
  const { addRequest } = useContext(ListRequestContext)

  const [propertyOwnership, setPropertyOwnership] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [title, setTitle] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [beds, setBeds] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [country, setCountry] = useState('')
  const [province, setProvince] = useState('')
  const [googleMapsLink, setGoogleMapsLink] = useState('')
  const [description, setDescription] = useState('')
  const [clickedAmmenities, setClickedAmmenities] = useState('')
  const [addedAmmenities, setAddedAmmenities] = useState('')
  const [photos, setPhotos] = useState([])
  const [documentPhotos, setDocumentPhotos] = useState([])

  const newRequest = {
    user_id: user?.id,
    date_submitted: new Date(),
    status: "Pending",
    ownership_status: propertyOwnership,
    property_type: propertyType,
    title: title,
    total_bedrooms: parseInt(bedrooms, 10) || 0,
    total_beds: parseInt(beds, 10) || 0,
    total_bathrooms: parseInt(bathrooms, 10) || 0,
    city: province,
    country: country,
    g_mapslink: googleMapsLink,
    description: description,
    ammenities: clickedAmmenities,
    other_ammenities: addedAmmenities,
    images: JSON.stringify(photos),
    property_img: JSON.stringify(documentPhotos)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addRequest(newRequest)
      .then(response => {
        console.log('Request added successfully');
      })
      .catch(error => {
        console.error('Error adding property:', error);
      });
  }

  const ownershipOptions = [
    { value: 'yes', label: 'Yes, I own it' },
    { value: 'no', label: 'No, I manage it' },
    { value: 'leased', label: 'I have leased it' },
  ];

  const propertyTypeOptions = ['Apartment', 'House', 'Penthouse', 'BeachHouse', 'Other'];

  return (
    <div className='font-outfit pb-20 max-w-5xl mx-auto'>
      <div className='mb-10 text-center'>
        <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>List Your Property</h1>
        <p className='text-gray-500 font-light mt-2 max-w-2xl mx-auto'>Share your space with travelers from around the world. Fill out the details below to submit your property for review.</p>
      </div>

      <form className='space-y-8' onSubmit={handleSubmit}>

        {/* Basic Info Section */}
        <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-10'>
          <h2 className='text-xl font-sentientmedium text-gray-900 mb-6 flex items-center gap-3'>
            <span className="w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center text-sm font-bold shadow-glow-blue">1</span>
            Basic Information
          </h2>

          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3'>Ownership Status</label>
                <div className='space-y-2'>
                  {ownershipOptions.map((opt) => (
                    <label key={opt.value} className={`flex items-center p-3 rounded-xl border cursor-pointer transition-colors ${propertyOwnership === opt.value ? 'bg-blue/5 border-blue' : 'bg-white border-gray-200 hover:bg-slate-50'}`}>
                      <input type="radio" name="propertyOwnership" value={opt.value} className="sr-only" onChange={() => setPropertyOwnership(opt.value)} />
                      <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${propertyOwnership === opt.value ? 'border-blue' : 'border-gray-300'}`}>
                        {propertyOwnership === opt.value && <div className="w-2 h-2 rounded-full bg-blue" />}
                      </div>
                      <span className={`text-sm ${propertyOwnership === opt.value ? 'font-medium text-blue' : 'text-gray-600'}`}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3'>Property Type</label>
                <div className='flex flex-wrap gap-2'>
                  {propertyTypeOptions.map((type) => (
                    <label key={type} className={`px-4 py-2 rounded-full border cursor-pointer transition-all text-sm font-medium ${propertyType === type ? 'bg-pink text-white border-pink shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:bg-slate-50'}`}>
                      <input type="radio" name="propertyType" value={type} className="sr-only" onChange={() => setPropertyType(type)} />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className='pt-2'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Property Title</label>
              <input className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='e.g. Stunning Penthouse with Ocean View' onChange={(e) => setTitle(e.target.value)} required />
              <p className='text-[10px] text-gray-400 mt-1'>Catch guests' attention with a listing title that highlights what makes your place special.</p>
            </div>
          </div>
        </div>

        {/* Accommodation Details */}
        <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-10'>
          <h2 className='text-xl font-sentientmedium text-gray-900 mb-6 flex items-center gap-3'>
            <span className="w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center text-sm font-bold shadow-glow-blue">2</span>
            Accommodation Details
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Bedrooms</label>
              <input type='number' min="0" className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='e.g. 2' onChange={(e) => setBedrooms(e.target.value)} />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Beds</label>
              <input type='number' min="0" className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='e.g. 3' onChange={(e) => setBeds(e.target.value)} />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Bathrooms</label>
              <input type='number' min="0" className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='e.g. 1.5' onChange={(e) => setBathrooms(e.target.value)} />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Country</label>
              <input className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='e.g. United States' onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>State / Province / City</label>
              <input className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='e.g. California, Los Angeles' onChange={(e) => setProvince(e.target.value)} />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Google Maps Link</label>
            <input className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors' placeholder='https://goo.gl/maps/...' onChange={(e) => setGoogleMapsLink(e.target.value)} />
          </div>
        </div>

        {/* Description & Amenities */}
        <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-10'>
          <h2 className='text-xl font-sentientmedium text-gray-900 mb-6 flex items-center gap-3'>
            <span className="w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center text-sm font-bold shadow-glow-blue">3</span>
            Description & Amenities
          </h2>

          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Property Description</label>
            <textarea className='w-full h-40 rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors resize-none' placeholder='Describe your place. What makes it unique? What should guests expect?' onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Select Included Amenities</label>
              <p className='text-xs text-gray-400 mb-4'>Click to select all that apply.</p>
              <div className='bg-slate-50 p-4 rounded-xl border border-gray-200'>
                <SelectAmmenities setClickedAmmenities={setClickedAmmenities} />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Additional Amenities</label>
              <textarea className='w-full h-20 rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:bg-white transition-colors resize-none' placeholder='e.g. Electric Vehicle Charger, Board Games (Separate with commas)' onChange={(e) => setAddedAmmenities(e.target.value)}></textarea>
            </div>
          </div>
        </div>

        {/* Media Uploads */}
        <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-10'>
          <h2 className='text-xl font-sentientmedium text-gray-900 mb-6 flex items-center gap-3'>
            <span className="w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center text-sm font-bold shadow-glow-blue">4</span>
            Media & Verification
          </h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <div>
              <label className='block text-sm font-medium text-gray-900 mb-1'>Property Photos</label>
              <p className='text-xs text-gray-500 font-light mb-4'>High-quality photos help attract more guests. Please upload clear and well-lit photos.</p>
              <div className='bg-slate-50 p-4 border border-gray-200 border-dashed rounded-xl'>
                <UploadPhotos setPhotos={setPhotos} />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-900 mb-1'>Ownership Documents</label>
              <p className='text-xs text-gray-500 font-light mb-4'>This is to confirm that you are indeed the property owner. These will remain private.</p>
              <div className='bg-slate-50 p-4 border border-gray-200 border-dashed rounded-xl'>
                <PhotosUpload setDocumentPhotos={setDocumentPhotos} />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center pt-6'>
          <Button variant='promo' className='w-full md:w-auto px-16 py-5 rounded-full text-lg shadow-glow-blue hover:scale-105 transition-transform' type="submit">Submit Listing Request</Button>
          <p className='text-xs font-light text-gray-500 text-center mt-6 max-w-lg'>"After submitting, our team will review your property details and respond within 48 hours. Thank you for listing with SkyStay Homes!"</p>
        </div>

      </form>
    </div>
  )
}
