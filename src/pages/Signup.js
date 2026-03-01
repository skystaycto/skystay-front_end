import React, { useState, useContext } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import { Helmet } from 'react-helmet-async';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import signupbanner from '../assets/signupbanner.jpg';
import { UserContext } from '../context/UserContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Signup() {
  const { registerUser, handleGoogleSuccess } = useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    password: '',
    confirm_password: '',
    role: 'Client',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateUserId = () => {
    const now = new Date();
    return `${now.getFullYear().toString().slice(2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }
    const userId = generateUserId();
    const dataToSubmit = { ...formData, userid: userId };

    try {
      await registerUser(dataToSubmit);
      navigate('/verification', { state: { email: formData.email } });
    } catch (error) {
      console.error("Registration Error: ", error);
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone_no: value });
  };

  return (
    <div className='bg-slate-50 min-h-screen font-outfit pt-24 pb-20 flex items-center'>
      <Helmet>
        <title>Sign Up | SkyStay.Homes</title>
        <link rel="canonical" href="/signup" />
      </Helmet>

      <div className='max-w-[1200px] w-full mx-auto px-6 md:px-8 flex items-stretch gap-12'>

        {/* Form Section */}
        <div className='w-full lg:w-1/2 flex items-center justify-center' data-aos="fade-up">
          <div className='bg-white/90 backdrop-blur-xl border border-white/50 shadow-floating rounded-[40px] p-8 md:p-12 w-full max-w-md relative overflow-hidden'>

            {/* Subtle glow behind form */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-blue/5 rounded-full blur-[80px] pointer-events-none'></div>

            <div className='text-center mb-10 relative z-10'>
              <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>Create an account</h1>
              <p className='text-gray-500 mt-2 font-medium'>Welcome to SkyStay.Homes</p>
            </div>

            <form onSubmit={handleSubmit} className='relative z-10 space-y-5'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>First name</label>
                  <input className='w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all' type='text' name='first_name' value={formData.first_name} onChange={handleChange} placeholder='First name' required />
                </div>
                <div>
                  <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Last name</label>
                  <input className='w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all' type='text' name='last_name' value={formData.last_name} onChange={handleChange} placeholder='Last name' required />
                </div>
              </div>

              <div>
                <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Email</label>
                <input className='w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all' type='email' name='email' value={formData.email} onChange={handleChange} placeholder='you@example.com' required />
              </div>

              <div>
                <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Phone Number</label>
                <div className='w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus-within:border-blue focus-within:ring-1 focus-within:ring-blue transition-all [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:focus:outline-none'>
                  <PhoneInput defaultCountry="KE" placeholder="Enter phone number" value={formData.phone_no} onChange={handlePhoneChange} />
                </div>
              </div>

              <div>
                <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Password</label>
                <input className='w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all' type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Create a password' required />
              </div>

              <div>
                <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Confirm Password</label>
                <input className='w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all' type='password' name='confirm_password' value={formData.confirm_password} onChange={handleChange} placeholder='Confirm your password' required />
              </div>

              <button type='submit' className='w-full bg-pink-blue-gradient text-white font-bold py-4 rounded-full shadow-glow-blue hover:scale-105 transition-transform mt-8 block text-center'>
                Create Account
              </button>

              <div className='relative flex items-center py-6'>
                <div className='flex-grow border-t border-gray-200'></div>
                <span className='flex-shrink-0 mx-4 text-gray-400 text-sm font-medium'>or sign up with</span>
                <div className='flex-grow border-t border-gray-200'></div>
              </div>

              <div className='flex justify-center'>
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => { console.log('Login Failed'); }} />
              </div>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className='hidden lg:flex w-1/2 rounded-[40px] overflow-hidden shadow-soft-lift relative' data-aos="fade-left">
          <img src={signupbanner} alt='banner' className='w-full h-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent'></div>
          <div className='absolute bottom-12 left-12 right-12'>
            <h2 className='text-4xl font-extrabold text-white mb-4'>Your journey starts here.</h2>
            <p className='text-white/80 text-lg'>Join SkyStay to access exclusive properties, seamless booking, and premium host services.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
