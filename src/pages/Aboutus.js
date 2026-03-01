import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink } from 'react-router-dom';

import banner5 from '../assets/banner5.jpg'
import banner6 from '../assets/banner6.png'
import worldmap from '../assets/worldmap.jpg'

import slider1 from '../assets/slide1.jpg'
import slider2 from '../assets/slide2.jpg'
import slider3 from '../assets/slide3.jpg'
import slider4 from '../assets/slide4.jpg'
import slider5 from '../assets/slide5.jpg'
import slider6 from '../assets/slide6.jpg'

import { Globe2, ShieldCheck, HeartHandshake, Headset } from 'lucide-react';

export default function Aboutus() {

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const beachUrl = "https://res.cloudinary.com/dppxu2h8h/image/upload/v1727532846/beach_licp6s.jpg";

  return (
    <div className='bg-slate-50 min-h-screen font-outfit pb-20'>
      <Helmet>
        <title>About Us | SkyStay.Homes</title>
        <meta name="description" content="Get To Know Us And What We Offer" />
        <link rel="canonical" href="/aboutus" />
      </Helmet>

      {/* Hero Section */}
      <div className='relative pt-32 pb-24 px-6 md:px-8 overflow-hidden flex flex-col items-center text-center bg-gray-900'>
        {/* Background Image with Overlay */}
        <div className='absolute inset-0 z-0'>
          <img src={beachUrl} alt="Hero background" className='w-full h-full object-cover opacity-40' />
          <div className='absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/60 to-slate-50'></div>
        </div>

        <div className='relative z-10 max-w-4xl' data-aos="fade-up">
          <span className='text-pink font-bold text-sm tracking-widest uppercase mb-4 block'>Our Story</span>
          <h1 className='text-4xl md:text-6xl font-extrabold tracking-tighter text-white leading-tight mb-6'>
            Connecting you to <br className='hidden md:block' />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-300'>unforgettable stays.</span>
          </h1>
          <p className='text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
            Welcome to SkyStay.Homes, your premier destination for property listing and management. We connect property owners with the perfect clients, turning houses into memorable homes.
          </p>
        </div>
      </div>

      <div className='max-w-[1400px] mx-auto px-6 md:px-8'>

        {/* Intro Section - Glass Cards */}
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center -mt-16 z-20 relative'>
          <div className='rounded-[32px] overflow-hidden shadow-floating group' data-aos="fade-up">
            <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' src={banner5} alt='Luxury property' />
          </div>
          <div className='bg-white/80 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-[32px] p-8 md:p-12' data-aos="fade-up" data-aos-delay="100">
            <h2 className='text-3xl font-extrabold text-gray-900 mb-6'>Find the right home for you</h2>
            <div className='h-1 w-20 bg-pink-blue-gradient rounded-full mb-8'></div>
            <p className='text-gray-600 leading-relaxed text-lg mb-6'>
              Welcome to SkyStay, your premier choice for vacation rentals across key locations. Our fully serviced apartments and homes combine the luxury of hotel-like amenities with the comfort and privacy of home.
            </p>
            <p className='text-gray-600 leading-relaxed text-lg mb-8'>
              Experience the comfort of well-equipped properties while exploring at your own pace. With prime locations, you'll enjoy easy access to tourist attractions, restaurants, and business centers.
            </p>
            <NavLink to='/portfolio' className='inline-block bg-pink-blue-gradient text-white font-bold py-3.5 px-8 rounded-full shadow-glow-blue hover:scale-105 transition-transform'>
              Discover More
            </NavLink>
          </div>
        </section>

        {/* What We Offer / Mission */}
        <section className='mt-32' style={{ backgroundImage: `url(${worldmap})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
          <div className='text-center mb-16' data-aos="fade-up">
            <h2 className='text-4xl font-extrabold text-gray-900 mb-4'>Why SkyStay?</h2>
            <p className='text-gray-500 max-w-2xl mx-auto text-lg'>We understand the challenges of marketing properties and finding reliable tenants. We are dedicated to offering comprehensive solutions that cater to both local and international markets.</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              { icon: Globe2, title: 'Global Reach', desc: 'Cutting-edge marketing strategies to ensure your property gets maximum exposure across the globe.' },
              { icon: ShieldCheck, title: 'Seamless Mgmt', desc: 'From listing creation and tenant screening to rent collection and maintenance coordination.' },
              { icon: HeartHandshake, title: 'Tailored Solutions', desc: 'Every property is unique. We offer customized solutions to fit your specific requirements.' },
              { icon: Headset, title: '24/7 Support', desc: 'Our support team is available around the clock to assist with any inquiries or issues.' },
            ].map((service, idx) => (
              <div key={idx} className='bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-soft-lift hover:-translate-y-2 transition-all duration-300' data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className='w-14 h-14 bg-gradient-to-br from-blue/10 to-pink/10 rounded-2xl flex items-center justify-center mb-6 text-blue'>
                  <service.icon size={28} />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>{service.title}</h3>
                <p className='text-gray-500 leading-relaxed'>{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who We Are - Reverse Layout */}
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-32'>
          <div className='bg-white/80 backdrop-blur-xl border border-white/50 shadow-soft-lift rounded-[32px] p-8 md:p-12 order-2 lg:order-1' data-aos="fade-right">
            <h2 className='text-3xl font-extrabold text-gray-900 mb-6'>Who We Are</h2>
            <div className='h-1 w-20 bg-pink-blue-gradient rounded-full mb-8'></div>
            <p className='text-gray-600 leading-relaxed text-lg mb-6'>
              Welcome to SkyStay, your home away from home. SkyStay full serviced apartments offer luxury and convenience in one beautiful setting. Enjoy the freedom to explore the city at your own pace.
            </p>
            <p className='text-gray-600 leading-relaxed text-lg'>
              Exquisitely appointed accommodations range from neat studios to luxurious three-bedroom penthouse suites. Elegantly furnished with designer décor and state-of-the-art technologies.
            </p>
          </div>
          <div className='rounded-[32px] overflow-hidden shadow-floating group order-1 lg:order-2' data-aos="fade-left">
            <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' src={banner6} alt='Luxurious interior' />
          </div>
        </section>

        {/* Experience Carousel */}
        <section className='mt-32 mb-16 bg-white p-4 rounded-[40px] shadow-sm border border-gray-100' data-aos="fade-up">
          <div className='rounded-[32px] overflow-hidden h-[400px] md:h-[500px]'>
            <Slider {...settings} className='h-full'>
              {[slider1, slider2, slider3, slider4, slider5, slider6].map((slide, idx) => (
                <div key={idx} className='h-[400px] md:h-[500px] outline-none'>
                  <img className='w-full h-full object-cover' src={slide} alt={`Experience ${idx + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
        </section>

      </div>
    </div>
  )
}
