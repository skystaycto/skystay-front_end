import React, { useState } from 'react';
import axios from 'axios';
import 'react-phone-number-input/style.css'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PhoneInput from 'react-phone-number-input';
import { CheckCircle2, Home } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function OnboardForm() {

    const navigate = useNavigate()

    React.useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_no: '',
        current_residence: '',
        property_type: '',
        no_ofproperties: '',
        interest: '',
        external_listings: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phone_no: value });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            Swal.fire({ icon: 'error', title: 'Invalid Email', text: 'Please enter a valid email address.' });
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post('https://skystayserver-n8xf.onrender.com/addonboarding', formData);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Form submitted successfully!',
                confirmButtonColor: '#006CE4',
            }).then(() => {
                navigate('/');
            });
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg-slate-50 min-h-screen font-outfit pt-32 pb-24 px-6 md:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue/5 via-slate-50 to-slate-50'>

            <div className='max-w-3xl mx-auto'>

                {/* Header */}
                <div className='text-center mb-12' data-aos="fade-up">
                    <div className='inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-6 text-pink'>
                        <Home size={32} />
                    </div>
                    <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4'>Host with SkyStay</h1>
                    <p className='text-gray-500 text-lg max-w-xl mx-auto'>Fill out the form below to begin the onboarding process. Our team will review your application and reach out shortly.</p>
                </div>

                {/* Glassmorphic Form Card */}
                <div className='bg-white/90 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-[40px] p-8 md:p-12 relative overflow-hidden' data-aos="fade-up" data-aos-delay="100">

                    <form onSubmit={handleSubmit} className='relative z-10 space-y-6'>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Full Name *</label>
                                <input className='w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all' type='text' name='full_name' placeholder='Jane Doe' onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Email *</label>
                                <input className='w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all' type='email' name='email' placeholder='jane@example.com' value={formData.email} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div>
                            <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Phone No (WhatsApp preferred) *</label>
                            <div className='w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus-within:border-blue focus-within:ring-1 focus-within:ring-blue transition-all [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:focus:outline-none'>
                                <PhoneInput defaultCountry="KE" placeholder="Enter phone number" value={formData.phone_no} onChange={handlePhoneChange} />
                            </div>
                        </div>

                        <div className='p-6 bg-gray-50 border border-gray-100 rounded-3xl space-y-6'>
                            <div>
                                <label className='block font-bold text-gray-900 mb-3'>Current Residence *</label>
                                <div className='flex gap-6'>
                                    <label className='flex items-center gap-2 cursor-pointer group'>
                                        <input type="radio" className='w-4 h-4 text-blue border-gray-300 focus:ring-blue' name="current_residence" value="Kenya" onChange={handleInputChange} required />
                                        <span className='font-medium text-gray-600 group-hover:text-gray-900 transition-colors'>Kenya</span>
                                    </label>
                                    <label className='flex items-center gap-2 cursor-pointer group'>
                                        <input type="radio" className='w-4 h-4 text-blue border-gray-300 focus:ring-blue' name="current_residence" value="Outside Kenya" onChange={handleInputChange} required />
                                        <span className='font-medium text-gray-600 group-hover:text-gray-900 transition-colors'>Outside Kenya</span>
                                    </label>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>Property Type *</label>
                                    <input className='w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue transition-all' type='text' name='property_type' placeholder='e.g., Apartment, Villa, Cabin' value={formData.property_type} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label className='block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2'>No. of Properties *</label>
                                    <input className='w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue transition-all' type='number' name='no_ofproperties' min={1} placeholder='How many to list?' value={formData.no_ofproperties} onChange={handleInputChange} required />
                                </div>
                            </div>

                            <div>
                                <label className='block font-bold text-gray-900 mb-3'>I am interested in: *</label>
                                <div className='flex flex-wrap gap-6'>
                                    <label className='flex items-center gap-2 cursor-pointer group'>
                                        <input type="radio" className='w-4 h-4 text-blue border-gray-300 focus:ring-blue' name="interest" value="Short-Term Rental" onChange={handleInputChange} required />
                                        <span className='font-medium text-gray-600 group-hover:text-gray-900 transition-colors'>Short-Term</span>
                                    </label>
                                    <label className='flex items-center gap-2 cursor-pointer group'>
                                        <input type="radio" className='w-4 h-4 text-blue border-gray-300 focus:ring-blue' name="interest" value="Long-Term Rental" onChange={handleInputChange} required />
                                        <span className='font-medium text-gray-600 group-hover:text-gray-900 transition-colors'>Long-Term</span>
                                    </label>
                                    <label className='flex items-center gap-2 cursor-pointer group'>
                                        <input type="radio" className='w-4 h-4 text-blue border-gray-300 focus:ring-blue' name="interest" value="Both" onChange={handleInputChange} required />
                                        <span className='font-medium text-gray-600 group-hover:text-gray-900 transition-colors'>Both</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className='block font-bold text-gray-900 mb-1'>Listed on other platforms? *</label>
                                <p className='text-xs text-gray-500 mb-3'>e.g., Airbnb, Booking.com</p>
                                <div className='flex gap-6'>
                                    <label className='flex items-center gap-2 cursor-pointer group'>
                                        <input type="radio" className='w-4 h-4 text-blue border-gray-300 focus:ring-blue' name="external_listings" value="Yes" onChange={handleInputChange} required />
                                        <span className='font-medium text-gray-600 group-hover:text-gray-900 transition-colors'>Yes</span>
                                    </label>
                                    <label className='flex items-center gap-2 cursor-pointer group'>
                                        <input type="radio" className='w-4 h-4 text-blue border-gray-300 focus:ring-blue' name="external_listings" value="No" onChange={handleInputChange} required />
                                        <span className='font-medium text-gray-600 group-hover:text-gray-900 transition-colors'>No</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type='submit' className='w-full bg-pink-blue-gradient text-white font-bold text-lg py-4 rounded-full shadow-glow-blue hover:scale-105 transition-transform flex items-center justify-center gap-2 mt-8' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    Submit Application <CheckCircle2 size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
