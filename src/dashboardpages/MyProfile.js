import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import '../css/Dashboard.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import skystaylogo from '../assets/skystaylogo.jpg'
import career from '../assets/career.svg'
import world from '../assets/world.svg'
import smartphone from '../assets/smartphone.svg'
import Listcard from '../components/Listcard'
import Portfoliocard from '../components/Portfoliocard';
import { Button } from '../components/ui/button';

import { UserContext } from '../context/UserContext'

export default function MyProfile() {

  const { user, updateUser } = useContext(UserContext)
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [myproperty, setMyProperty] = useState([]);
  const [likedproperties, setLikedProperties] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [work, setWork] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [location, setLocation] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setWork(user.work || '');
      setPhoneNo(user.phone_no || '');
      setLocation(user.city && user.country ? `${user.city}, ${user.country}` : '');
      setAboutMe(user.description || '');
    }
  }, [user]);

  useEffect(() => {
    const cachedProperties = localStorage.getItem('myProperties');
    if (cachedProperties) {
      setMyProperty(JSON.parse(cachedProperties));
    } else if (user) {
      axios.get(`https://skystayserver-n8xf.onrender.com/userproperty/${parseInt(user.userid, 10)}`)
        .then(response => {
          setMyProperty(response.data);
          localStorage.setItem('myProperties', JSON.stringify(response.data));
        })
        .catch(error => {
          // suppress to clean console
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      axios.get(`https://skystayserver-n8xf.onrender.com/user/${parseInt(user.id, 10)}/liked_properties`)
        .then(response => {
          setLikedProperties(response.data);
        })
        .catch(error => {
          // suppress to clean console
        });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
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

  const handleSaveProfile = async () => {
    let imageUrl = user.prof_image;

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
        console.error('Failed to upload image:', error);
        toast.error('Failed to upload image.');
        return;
      }
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      work: work,
      phone_no: phoneNo,
      city: location ? location.split(',')[0]?.trim() : '',
      country: location && location.includes(',') ? location.split(',')[1]?.trim() : '',
      description: aboutMe,
      prof_img: imageUrl,
    };

    try {
      await updateUser(userData);
      toast.success('Profile updated successfully!');
      setShowEditProfile(false);
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };

  return (
    <div className='font-outfit pb-20 max-w-7xl mx-auto'>
      <div className='mb-8 flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>My Profile</h1>
          <p className='text-gray-500 font-light mt-1'>Manage your personal information and preferences.</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left Sidebar: Profile Card */}
        <div className='w-full lg:w-1/3 space-y-6'>
          <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-8 flex flex-col items-center text-center'>
            <div className="relative mb-6">
              <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-blue to-pink shadow-md">
                <img
                  src={user.prof_img || skystaylogo}
                  className='w-full h-full object-cover rounded-full border-4 border-white'
                  alt='User Avatar'
                />
              </div>
            </div>
            <h2 className='font-sentientmedium text-2xl text-gray-900'>{user.first_name} {user.last_name}</h2>
            <p className='text-xs font-semibold text-blue bg-blue/10 px-3 py-1 rounded-full mt-2 uppercase tracking-wide'>Account ID: {user.userid}</p>

            <div className='w-full mt-8 space-y-4'>
              <div className='flex items-center text-sm'>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3 shadow-sm border border-gray-100">
                  <img className='w-4 h-4 opacity-70' src={career} alt='work' />
                </div>
                <div className="text-left">
                  <p className='text-xs text-gray-400 font-semibold uppercase'>My Work</p>
                  <p className='text-gray-700 font-medium'>{user.work || 'Not specified'}</p>
                </div>
              </div>
              <div className='flex items-center text-sm'>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3 shadow-sm border border-gray-100">
                  <img className='w-4 h-4 opacity-70' src={world} alt='location' />
                </div>
                <div className="text-left">
                  <p className='text-xs text-gray-400 font-semibold uppercase'>Lives In</p>
                  <p className='text-gray-700 font-medium'>
                    {user.city ? `${user.city}, ${user.country}` : 'Not specified'}
                  </p>
                </div>
              </div>
              <div className='flex items-center text-sm'>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3 shadow-sm border border-gray-100">
                  <img className='w-4 h-4 opacity-70' src={smartphone} alt='phone' />
                </div>
                <div className="text-left">
                  <p className='text-xs text-gray-400 font-semibold uppercase'>Contact</p>
                  <p className='text-gray-700 font-medium'>{user.phone_no || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <Button
              variant='outline'
              onClick={handleEditProfile}
              className="w-full mt-8 rounded-full py-6 text-gray-700 hover:text-blue hover:border-blue transition-colors shadow-sm"
            >
              {showEditProfile ? 'Cancel Editing' : 'Edit Profile'}
            </Button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className='w-full lg:w-2/3 space-y-8'>

          {/* Edit Profile Form Container */}
          {showEditProfile ? (
            <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-8 animate-fade-in'>
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h3 className='text-xl font-sentientmedium text-gray-900'>Edit Information</h3>
                <button className='text-sm text-gray-400 hover:text-pink transition-colors' onClick={handleEditProfile}>Close</button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
                <div className='flex flex-col'>
                  <label className='text-xs font-semibold text-gray-500 uppercase mb-2 ml-1'>First name</label>
                  <input
                    className='rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all'
                    placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='text-xs font-semibold text-gray-500 uppercase mb-2 ml-1'>Last name</label>
                  <input
                    className='rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all'
                    placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className='mb-5'>
                <label className='text-xs font-semibold text-gray-500 uppercase mb-2 ml-1'>Profile Image</label>
                <div className="flex items-center gap-4 bg-slate-50 border border-gray-200 border-dashed rounded-2xl p-4">
                  {(image || user.prof_img) && (
                    <img src={image || user.prof_img} alt='Selected' className='w-16 h-16 rounded-full object-cover shadow-sm' />
                  )}
                  <input
                    type='file'
                    id='imageUpload'
                    accept='image/*'
                    onChange={handleImageChange}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue/10 file:text-blue hover:file:bg-blue/20 transition-colors"
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
                <div className='flex flex-col'>
                  <label className='text-xs font-semibold text-gray-500 uppercase mb-2 ml-1'>My Work</label>
                  <input
                    className='rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all'
                    placeholder='Software Engineer, etc.' value={work} onChange={(e) => setWork(e.target.value)}
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='text-xs font-semibold text-gray-500 uppercase mb-2 ml-1'>Contact Number</label>
                  <input
                    className='rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all'
                    placeholder='+1 234 567 890' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
                <div className='flex flex-col md:col-span-2'>
                  <label className='text-xs font-semibold text-gray-500 uppercase mb-2 ml-1'>Location</label>
                  <input
                    className='rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all'
                    placeholder='Nairobi, Kenya' value={location} onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className='flex flex-col mb-8'>
                <label className='text-xs font-semibold text-gray-500 uppercase mb-2 ml-1'>About Me</label>
                <textarea
                  className='rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all min-h-[120px] resize-y'
                  placeholder='Tell us a little bit about yourself...' value={aboutMe} onChange={(e) => setAboutMe(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant='outline' className="rounded-full px-6" onClick={handleEditProfile}>Cancel</Button>
                <Button variant='promo' className="rounded-full px-8 shadow-glow-blue hover:-translate-y-1 transition-transform" onClick={handleSaveProfile}>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-8'>
              <h3 className='text-xl font-sentientmedium text-gray-900 mb-4'>About Me</h3>
              <p className='text-gray-600 font-light leading-relaxed whitespace-pre-wrap'>
                {user.description ? user.description : "You haven't added an about me description yet. Click 'Edit Profile' to add one."}
              </p>
            </div>
          )}

          {/* Liked Properties Section */}
          <div>
            <div className='flex items-center gap-4 mb-6'>
              <h3 className='text-xl font-sentientmedium text-gray-900'>My Favorites</h3>
              <div className='h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent' />
            </div>

            {likedproperties.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {likedproperties.map((property) => (
                  <Portfoliocard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className='bg-white/50 border border-gray-100 rounded-3xl p-10 text-center shadow-sm'>
                <div className="inline-flex w-16 h-16 rounded-full bg-pink/10 text-pink items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                </div>
                <h4 className='text-lg font-medium text-gray-900 mb-1'>No Favorites Yet</h4>
                <p className='text-sm text-gray-500 font-light'>Properties you "heart" will appear here.</p>
              </div>
            )}
          </div>

          {/* My Listings Section */}
          <div className="pt-4">
            <div className='flex items-center gap-4 mb-6'>
              <h3 className='text-xl font-sentientmedium text-gray-900'>Your Listings</h3>
              <div className='h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent' />
            </div>

            {myproperty.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                {myproperty.map((listing) => (
                  <Listcard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className='bg-white/50 border border-gray-100 rounded-3xl p-10 text-center shadow-sm'>
                <div className="inline-flex w-16 h-16 rounded-full bg-blue/10 text-blue items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <h4 className='text-lg font-medium text-gray-900 mb-1'>No Listings Found</h4>
                <p className='text-sm text-gray-500 font-light'>You don't have any properties currently listed.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
