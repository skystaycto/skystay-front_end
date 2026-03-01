import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckoutContext } from '../context/CheckoutContext';
import ServiceCard from '../components/ServiceCard'
import EditService from '../components/EditService'
import { Plus, Image as ImageIcon } from 'lucide-react';

export default function MyListings() {

  const { addService, allservices, fetchAllServices } = useContext(CheckoutContext)
  const [selectedService, setSelectedService] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchAllServices();
  }, [fetchAllServices]);

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddService = async () => {
    if (!name || !price || !description) {
      toast.error("Please fill all required fields.");
      return;
    }

    let imageUrl = image;

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const response = await fetch('https://skystayserver-n8xf.onrender.com/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          imageUrl = result.secure_url;
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        toast.error('Failed to upload image.');
        return;
      }
    }

    const serviceData = {
      service_name: name,
      service_description: description,
      service_image: imageUrl,
      service_price: parseInt(price),
    };

    try {
      await addService(serviceData);
      toast.success('Service added successfully');
      setPrice('');
      setName('');
      setDescription('');
      setImage(null);
      setImageFile(null);
      fetchAllServices();
    } catch (error) {
      toast.error('Failed to Add Service');
    }
  };

  return (
    <div className='w-full font-outfit animate-in fade-in slide-in-from-bottom-4 duration-500'>

      {/* Header */}
      <div className='mb-10'>
        <h2 className='text-3xl font-extrabold text-gray-900 mb-2'>Manage Services</h2>
        <p className='text-gray-500 text-lg'>Enhance your guests' stay with premium add-ons.</p>
      </div>

      {/* Services Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
        {allservices.map((service) => (
          <ServiceCard key={service.id} service={service} toggleEditForm={toggleEditForm} setSelectedService={setSelectedService} />
        ))}
        {allservices.length === 0 && (
          <div className='col-span-full py-12 text-center bg-white/50 rounded-3xl border border-gray-100 border-dashed'>
            <p className='text-gray-500 font-medium'>No services found. Add your first service below.</p>
          </div>
        )}
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200'>
          <div className='bg-white rounded-3xl p-8 max-w-lg w-full shadow-floating border border-white/20 animate-in zoom-in-95 duration-300'>
            <EditService toggleEditForm={toggleEditForm} selectedService={selectedService} />
          </div>
        </div>
      )}

      {/* Add Service Card */}
      <div className='bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100 max-w-3xl relative overflow-hidden group'>
        {/* Subtle Glow */}
        <div className='absolute top-0 right-0 w-64 h-64 bg-blue/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue/10 transition-colors duration-700'></div>

        <h3 className='text-2xl font-bold text-gray-900 mb-8 relative z-10'>Create New Service</h3>

        <div className='space-y-6 relative z-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider'>Service Name</label>
              <input
                className='w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all'
                placeholder='e.g., Luxury Airport Transfer'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className='block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider'>Price (USD)</label>
              <input
                type='number'
                className='w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all'
                placeholder='0.00'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider'>Description</label>
            <textarea
              className='w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all h-32 resize-none'
              placeholder='Describe what guests will receive...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider'>Featured Image</label>
            <div className='border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center cursor-pointer hover:bg-gray-50 hover:border-blue/50 transition-all relative overflow-hidden group/upload'>
              <input type='file' accept='image/*' onChange={handleImageChange} className='absolute inset-0 opacity-0 cursor-pointer z-10' />
              {image ? (
                <img src={image} alt="Preview" className='absolute inset-0 w-full h-full object-cover rounded-3xl' />
              ) : (
                <div className='text-gray-400 group-hover/upload:text-blue transition-colors'>
                  <ImageIcon className='mx-auto mb-3 w-10 h-10 opacity-50 group-hover/upload:opacity-100 group-hover/upload:-translate-y-1 transition-all' />
                  <span className='text-sm font-medium block'>Drop an image here, or click to browse</span>
                </div>
              )}
            </div>
          </div>

          <button
            className='w-full bg-pink-blue-gradient text-white font-bold text-lg py-4 rounded-2xl shadow-glow-blue hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mt-4'
            onClick={handleAddService}
          >
            <Plus size={20} /> Publish Service
          </button>
        </div>
      </div>
    </div>
  )
}
