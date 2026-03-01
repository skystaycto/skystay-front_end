import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';

import facebook from '../assets/facebook2.svg'
import twitter from '../assets/twitterblue.svg'
import onstagram from '../assets/instagram2.svg'
import tiktok from '../assets/tiktokblue.svg'
import linkedin from '../assets/linkedin.svg'

import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contactus() {

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const consultationurl = "https://res.cloudinary.com/dppxu2h8h/image/upload/v1727532842/consultation_mzuj0o.jpg"

  return (
    <div className='bg-slate-50 min-h-screen font-outfit pb-20'>
      <Helmet>
        <title>Contact Us | SkyStay.Homes</title>
        <meta name="description" content="Get in touch with SkyStay Homes. We're here to help you." />
        <link rel="canonical" href="/contactus" />
      </Helmet>

      {/* Hero Section */}
      <div className='relative pt-32 pb-24 px-6 md:px-8 overflow-hidden flex flex-col items-center text-center bg-gray-900'>
        {/* Background Image with Overlay */}
        <div className='absolute inset-0 z-0'>
          <img src={consultationurl} alt="Hero background" className='w-full h-full object-cover opacity-30' />
          <div className='absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/60 to-slate-50'></div>
        </div>

        <div className='relative z-10 max-w-4xl' data-aos="fade-up">
          <span className='text-blue font-bold text-sm tracking-widest uppercase mb-4 block'>Get in touch</span>
          <h1 className='text-4xl md:text-6xl font-extrabold tracking-tighter text-white leading-tight mb-6'>
            Drop us any <br className='hidden md:block' />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-300'>Queries.</span>
          </h1>
          <p className='text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
            We're here to help you. Reach out to schedule a consultation or ask any questions about our premium stays.
          </p>
        </div>
      </div>

      <div className='max-w-[1400px] mx-auto px-6 md:px-8'>

        {/* Contact Info Cards */}
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center -mt-16 z-20 relative'>

          <div className='bg-white/90 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-[32px] p-8 md:p-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300' data-aos="fade-up" data-aos-delay="100">
            <div className='w-16 h-16 bg-gradient-to-br from-blue/10 to-pink/10 rounded-2xl flex items-center justify-center mb-6 text-blue group-hover:scale-110 transition-transform'>
              <Mail size={32} />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Email Us</h3>
            <p className='text-gray-500 font-medium'>bookme@skystay.homes</p>
          </div>

          <div className='bg-white/90 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-[32px] p-8 md:p-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300' data-aos="fade-up" data-aos-delay="200">
            <div className='w-16 h-16 bg-gradient-to-br from-blue/10 to-pink/10 rounded-2xl flex items-center justify-center mb-6 text-pink group-hover:scale-110 transition-transform'>
              <Phone size={32} />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Call Us</h3>
            <p className='text-gray-500 font-medium'>+254 743 501162</p>
          </div>

          <div className='bg-white/90 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-[32px] p-8 md:p-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300' data-aos="fade-up" data-aos-delay="300">
            <h3 className='text-xl font-bold text-gray-900 mb-6'>Follow Us On</h3>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <a href='https://www.facebook.com/share/U2yjnyzw9LeaAvs5/?mibextid=qi2Omg' target='_blank' rel='noreferrer' className='hover:scale-110 transition-transform bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md'>
                <img className='w-6 h-6' src={facebook} alt='facebook' />
              </a>
              <a href='https://www.instagram.com/skystayhomes?igsh=bHNxaGV4YzM5bnFv' target='_blank' rel='noreferrer' className='hover:scale-110 transition-transform bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md'>
                <img className='w-6 h-6' src={onstagram} alt='instagram' />
              </a>
              <a href='https://vm.tiktok.com/ZMhJ9XY14/' target='_blank' rel='noreferrer' className='hover:scale-110 transition-transform bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md'>
                <img className='w-6 h-6' src={tiktok} alt='tiktok' />
              </a>
              <a href='https://x.com/SkyStayHomes?t=HM_Sn6GHk4YaBqA9Cbv7Gw&s=09' target='_blank' rel='noreferrer' className='hover:scale-110 transition-transform bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md'>
                <img className='w-6 h-6' src={twitter} alt='twitter' />
              </a>
              <a href='https://www.linkedin.com/company/skystay/' target='_blank' rel='noreferrer' className='hover:scale-110 transition-transform bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md'>
                <img className='w-6 h-6' src={linkedin} alt='linkedin' />
              </a>
            </div>
          </div>

        </section>

        {/* Google Maps Section */}
        <section className='mt-32' data-aos="fade-up">
          <div className='text-center mb-12'>
            <div className='inline-flex items-center justify-center p-3 bg-blue/10 rounded-full mb-4 text-blue'>
              <MapPin size={28} />
            </div>
            <h2 className='text-3xl font-extrabold text-gray-900 mb-4'>Our Location</h2>
            <p className='text-gray-500 font-medium text-lg max-w-xl mx-auto'>
              Ikigai Westlands.<br />
              Peponi Road, Westlands, Nairobi, Kenya
            </p>
          </div>

          <div className='rounded-[40px] overflow-hidden sm:h-[400px] h-[500px] bg-white p-4 shadow-sm border border-gray-100' data-aos="fade-up">
            <div className='w-full h-full rounded-[32px] overflow-hidden relative shadow-inner'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1723.4457424806005!2d36.78301165018569!3d-1.2353539983713522!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1778626384a9%3A0x6d0348e249fad188!2sIkigai%20Nairobi%20(Westlands)!5e0!3m2!1sen!2ske!4v1727526945791!5m2!1sen!2ske"
                title='SkyStay Homes office location'
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
