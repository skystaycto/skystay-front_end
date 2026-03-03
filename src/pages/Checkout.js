import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import API_ENDPOINTS from '../config/api';
import { PromoCodesContext } from '../context/PromoCodesContext';
import { PesapalContext } from '../context/PesapalContext';
import FrameComponent from '../components/IframeComponent';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import personal from '../assets/personal.svg'
import promo from '../assets/Promo.svg'
import conditions from '../assets/conditions.svg'
import { Button } from '../components/ui/button'
import night from '../assets/night.svg'
import bankcard from '../assets/bankcard.svg'
import { CreditCard, ShieldCheck } from 'lucide-react';

export default function Checkout() {

  const { user } = useContext(UserContext);
  const { allpromocodes, fetchAllPromocodes } = useContext(PromoCodesContext);
  const { redirect_url, orderRequest } = useContext(PesapalContext);

  const location = useLocation();
  const { check_in, check_out, propertyData, numberOfNights } = location.state || {};

  const checkInDateString = check_in ? check_in.toLocaleDateString() : 'Not set';
  const checkOutDateString = check_out ? check_out.toLocaleDateString() : 'Not set';

  const getTodaysPrice = () => {
    if (!propertyData || !propertyData.price) return 0;
    const priceData = propertyData.price;
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

  const roomtotal = getTodaysPrice() * (numberOfNights || 0);

  const generateUniqueBookingId = () => {
    const timestamp = Date.now().toString(36).slice(-5).toUpperCase();
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    return `SKY-${timestamp}-${randomNumber}`;
  };

  const [additionalServices, setAdditionalServices] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [policyRead, setPolicyRead] = useState(false);
  const [promocode, setPromocode] = useState('');
  const [discount, setDiscount] = useState(0);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [guestFirstName, setGuestFirstName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [request, setRequest] = useState('');

  useEffect(() => {
    axios.get(API_ENDPOINTS.ADDITIONAL_SERVICE.LIST)
      .then(response => {
        const servicesWithQuantity = response.data.map(service => ({ ...service, quantity: 0 }));
        setAdditionalServices(servicesWithQuantity);
      })
      .catch(error => {
        console.error('Error fetching additional services', error);
      });
  }, []);

  const applyPromocode = () => {
    fetchAllPromocodes().then(() => {
      const foundPromocode = allpromocodes.find(pc => pc.code === promocode);
      if (foundPromocode && new Date(foundPromocode.expiry_date) > new Date()) {
        const discountPercentage = foundPromocode.discount / 100;
        const discountAmount = roomtotal * discountPercentage;
        setDiscount(Math.round(discountAmount));
      } else {
        setDiscount(0);
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Invalid or Expired Promocode' });
      }
    }).catch(error => {
      Swal.fire({ icon: 'error', title: 'Oops...', text: error?.response?.data?.error || 'Error' });
    });
  };

  const handleServiceQuantityChange = (id, e) => {
    const newQuantity = Number(e.target.value);
    setAdditionalServices(prevServices =>
      prevServices.map(service => service.id === id ? { ...service, quantity: newQuantity } : service)
    );
  };

  const additionalServicesTotal = additionalServices.reduce((total, service) => {
    return total + (service.quantity || 0) * service.service_price;
  }, 0);

  const alltotal = roomtotal + additionalServicesTotal - discount;

  const formatDate = (date) => {
    if (date instanceof Date) return date.toISOString().slice(0, 10);
    return date;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted || !policyRead) {
      Swal.fire({ icon: 'warning', title: 'Terms', text: 'Please accept the terms and conditions to proceed.' });
      return;
    }

    const newCheckout = {
      user_id: user?.id || null,
      property_id: propertyData?.id,
      guest_firstname: guestFirstName || (user?.first_name || ''),
      guest_lastname: guestLastName || (user?.last_name || ''),
      guest_email: guestEmail || (user?.email || ''),
      guest_phone: phoneNumber || (user?.phone_no || ''),
      arrival_time: arrivalTime,
      request: request,
      checkout_date: formatDate(check_out),
      checkin_date: formatDate(check_in),
      total_price: alltotal,
      payment_method: '',
      payment_confirmed: false,
      termsAccepted: termsAccepted,
      policyRead: policyRead,
      status: 'Booked',
      propertyid: propertyData?.property_id,
      bookingid: generateUniqueBookingId()
    };

    try {
      const response = await orderRequest(newCheckout);
      if (response) {
        // wait for pesapal redirect
      } else {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Request failed' });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Request Failed', text: 'There was an issue processing your checkout.' });
    }
  };

  return (
    <div className='bg-slate-50 min-h-screen font-outfit pt-32 pb-24'>
      <div className='max-w-[1200px] mx-auto px-6 md:px-8'>

        <div className='mb-12'>
          <h1 className='text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight'>Confirm and pay</h1>
        </div>

        {!redirect_url ? (
          <div className='flex flex-col lg:flex-row gap-12'>

            {/* Left Column: Forms & Options */}
            <div className='w-full lg:w-3/5 space-y-8'>

              {/* Additional Services */}
              <div className='bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Enhance Your Stay</h2>
                <div className='space-y-4'>
                  {additionalServices.map(service => (
                    <div key={service.id} className='flex flex-col sm:flex-row items-center border border-gray-200 rounded-2xl p-4 gap-4 transition-colors hover:border-blue/50'>
                      {service.service_image && <img className='w-20 h-20 rounded-xl object-cover' src={service.service_image} alt={service.service_name} />}
                      <div className='flex-1 text-center sm:text-left'>
                        <p className='font-bold text-gray-900'>{service.service_name}</p>
                        <p className='text-sm text-gray-500 mb-2'>{service.service_description}</p>
                      </div>
                      <div className='flex items-center gap-4 border-l border-gray-100 pl-4'>
                        <div className='flex flex-col items-center'>
                          <span className='text-xs font-bold uppercase tracking-wider text-gray-400 mb-1'>Qty</span>
                          <input value={service.quantity || 0} onChange={(e) => handleServiceQuantityChange(service.id, e)} className='w-16 h-10 border border-gray-300 rounded-lg text-center font-bold focus:outline-none focus:border-blue' min={0} type='number' />
                        </div>
                        <div className='text-right'>
                          <span className='block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1'>Price</span>
                          <span className='font-bold text-lg text-gray-900'>${service.service_price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Information (if not logged in) */}
              {!user && (
                <div className='bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 bg-blue/10 rounded-full flex items-center justify-center text-blue'>
                      <img src={personal} alt="personal icon" className='w-5 h-5 opacity-70' />
                    </div>
                    <h2 className='text-2xl font-bold text-gray-900'>Guest Details</h2>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div>
                      <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>First Name *</label>
                      <input className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue transition-all' type='text' onChange={(e) => setGuestFirstName(e.target.value)} />
                    </div>
                    <div>
                      <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Last Name *</label>
                      <input className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue transition-all' type='text' onChange={(e) => setGuestLastName(e.target.value)} />
                    </div>
                  </div>
                  <div className='mb-4'>
                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Email *</label>
                    <input className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue transition-all' type='email' onChange={(e) => setGuestEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Phone Number *</label>
                    <div className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus-within:border-blue transition-all [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:focus:outline-none'>
                      <PhoneInput defaultCountry="KE" placeholder="Enter phone number" value={phoneNumber} onChange={setPhoneNumber} />
                    </div>
                  </div>
                </div>
              )}

              {/* Logistics & Promo */}
              <div className='bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-4'>Arrival Logistics</h3>
                    <div className='mb-4'>
                      <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Estimated Arrival</label>
                      <input className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue transition-all' type='time' onChange={(e) => setArrivalTime(e.target.value)} />
                    </div>
                    <div>
                      <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Special Requests</label>
                      <textarea className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue transition-all h-24 resize-none' placeholder='Any specific needs?' onChange={(e) => setRequest(e.target.value)}></textarea>
                    </div>
                  </div>

                  <div>
                    <div className='flex items-center gap-2 mb-4'>
                      <img src={promo} alt='Promo code' className='w-5 h-5' />
                      <h3 className='font-bold text-gray-900'>Promo Code</h3>
                    </div>
                    <div className='flex gap-2'>
                      <input className='flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue transition-all' placeholder='Enter code' type='text' value={promocode} onChange={(e) => setPromocode(e.target.value)} />
                      <button className='bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors' onClick={applyPromocode}>Apply</button>
                    </div>

                    <div className='mt-8 pt-8 border-t border-gray-100'>
                      <div className='flex items-center gap-2 mb-4'>
                        <img src={conditions} alt='Terms' className='w-5 h-5' />
                        <h3 className='font-bold text-gray-900'>Terms & Conditions</h3>
                      </div>
                      <label className='flex items-start gap-3 cursor-pointer group mb-3'>
                        <input type='checkbox' className='mt-1 w-4 h-4 rounded border-gray-300 text-blue focus:ring-blue' required onChange={() => setTermsAccepted(!termsAccepted)} />
                        <span className='text-sm text-gray-600 group-hover:text-gray-900 transition-colors'>I accept the general fare terms and conditions</span>
                      </label>
                      <label className='flex items-start gap-3 cursor-pointer group'>
                        <input type='checkbox' className='mt-1 w-4 h-4 rounded border-gray-300 text-blue focus:ring-blue' required onChange={() => setPolicyRead(!policyRead)} />
                        <span className='text-sm text-gray-600 group-hover:text-gray-900 transition-colors'>I have read and accepted the <NavLink to='/privacypolicy' className='text-blue hover:underline'>privacy policy</NavLink></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary Sticky Card */}
            <div className='w-full lg:w-2/5'>
              <div className='bg-white/80 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-[40px] p-8 md:p-10 sticky top-32'>

                <div className='flex items-center gap-4 border-b border-gray-100 pb-6 mb-6'>
                  {propertyData?.images?.[0] && (
                    <img src={propertyData.images[0]} alt="Property" className='w-24 h-24 rounded-2xl object-cover shadow-sm' />
                  )}
                  <div>
                    <p className='text-sm text-gray-500 font-medium mb-1'>Selected Property</p>
                    <p className='font-bold text-gray-900 leading-tight'>{propertyData?.title || 'Unknown Property'}</p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4 mb-6'>
                  <div className='bg-gray-50 rounded-2xl p-4 text-center border border-gray-100'>
                    <p className='text-xs font-bold uppercase tracking-wider text-gray-400 mb-1'>Check-in</p>
                    <p className='font-bold text-gray-900'>{checkInDateString}</p>
                  </div>
                  <div className='bg-gray-50 rounded-2xl p-4 text-center border border-gray-100'>
                    <p className='text-xs font-bold uppercase tracking-wider text-gray-400 mb-1'>Check-out</p>
                    <p className='font-bold text-gray-900'>{checkOutDateString}</p>
                  </div>
                </div>

                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between items-center text-gray-600'>
                    <span>${getTodaysPrice()} x {numberOfNights} nights</span>
                    <span className='font-medium'>${roomtotal}</span>
                  </div>

                  {additionalServices.filter(s => s.quantity > 0).map(service => (
                    <div key={service.id} className='flex justify-between items-center text-gray-600'>
                      <span className='truncate pr-4'>{service.service_name} (x{service.quantity})</span>
                      <span className='font-medium'>${service.quantity * service.service_price}</span>
                    </div>
                  ))}

                  {discount > 0 && (
                    <div className='flex justify-between items-center text-pink font-medium'>
                      <span>Promo Code Discount</span>
                      <span>-${discount}</span>
                    </div>
                  )}
                </div>

                <div className='border-t border-gray-200 pt-6 mb-8 flex justify-between items-center'>
                  <span className='text-xl font-extrabold text-gray-900'>Total (USD)</span>
                  <span className='text-3xl font-extrabold text-gray-900'>${alltotal}</span>
                </div>

                <button className='w-full bg-pink-blue-gradient text-white font-bold py-4 rounded-full shadow-glow-blue hover:scale-105 transition-transform flex items-center justify-center gap-2' onClick={handleSubmit}>
                  <CreditCard size={20} />
                  Confirm and Pay
                </button>

                <div className='mt-6 flex items-center justify-center gap-2 text-gray-400 text-sm font-medium'>
                  <ShieldCheck size={16} />
                  Secure Payment Powered by Pesapal
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className='max-w-4xl mx-auto'>
            <FrameComponent redirect_url={redirect_url} />
          </div>
        )}

      </div>
    </div>
  )
}
