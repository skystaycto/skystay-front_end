import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner7 from '../assets/banner7.jpg'
import banner8 from '../assets/banner8.jpg'
import banner9 from '../assets/banner9.png'
import banner10 from '../assets/banner10.png'
import banner11 from '../assets/banner11.jpg'
import banner12 from '../assets/banner12.jpg'
import building from '../assets/building1.svg'
import cash from '../assets/cash1.svg'
import pay from '../assets/paycheque.svg'
import listing from '../assets/Listing.svg'
import vetting from '../assets/guestvetting.svg'
import price from '../assets/rightprice.svg'
import marionet from '../assets/marionet.svg'
import abnb from '../assets/abnb.svg'
import expedia from '../assets/expedia.svg'
import booking from '../assets/booking.svg'
import vrbo from '../assets/vrb.svg'
import homestayin from '../assets/homestayin.svg'
import hopper from '../assets/hopper.svg'
import concierge from '../assets/Concierge.jpg'
import support from '../assets/Customer Support.jpg'
import dressing from '../assets/Dressing Table.jpg'
import grocery from '../assets/Grocery Shelf.jpg'
import plumber from '../assets/Plumber.jpg'
import sofa from '../assets/Sofa.jpg'
import money from '../assets/Stack of Money.jpg'
import ticket from '../assets/Ticket Purchase.jpg'
import vacuum from '../assets/Vacuuming.jpg'

import slider1 from '../assets/slide1.jpg'
import slider2 from '../assets/slide2.jpg'
import slider3 from '../assets/slide3.jpg'
import slider4 from '../assets/slide4.jpg'
import slider5 from '../assets/slide5.jpg'
import slider6 from '../assets/slide6.jpg'

import { Button } from '../components/ui/button';
import { NavLink } from 'react-router-dom';

export default function Properties() {

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Helmet>
        <title>Property Management Services</title>
        <meta name="description" content="Maximize your property's potential with SkyStay Homes' expert property management services. We handle everything from tenant management, maintenance, and marketing to ensure a hassle-free experience for property owners." />
        <link rel="canonical" href="/properties" />
      </Helmet>

      {/* V2 Container Background */}
      <div className='min-h-screen bg-slate-50 font-outfit pb-20'>

        {/* Hero Area Replacement (A nice gradient top) */}
        <div className="pt-[140px] pb-[60px] bg-blue/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-blue/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

          <div className="relative z-10 text-center px-[7.5vw] md:px-6" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sentientmedium tracking-tight mb-6">
              Expert <span className="text-transparent bg-clip-text bg-blue-gradient">Property Management</span>
            </h1>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Maximize returns while minimizing headaches. Discover world-class care for your investments with SkyStay Homes.
            </p>
          </div>
        </div>

        {/* Section 1: Unlock potential */}
        <section className='px-[7.5vw] md:px-[5vw] my-20 flex flex-col md:flex-row items-center gap-12'>
          <div className='flex gap-4 w-full md:w-1/2 relative' data-aos="fade-right">
            {/* V2 floating images */}
            <img className='w-1/2 rounded-2xl shadow-soft-lift transform -translate-y-4 hover:-translate-y-6 transition-transform duration-500 hover:shadow-glow-blue object-cover' src={banner7} alt='beach apartment' />
            <img className='w-1/2 rounded-2xl shadow-soft-lift transform translate-y-8 hover:translate-y-6 transition-transform duration-500 hover:shadow-glow-pink object-cover' src={banner8} alt='villa' />
          </div>
          <div className='w-full md:w-1/2 bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-10 md:p-14' data-aos="fade-left">
            <h2 className='text-3xl lg:text-4xl font-sentientmedium mb-4 text-gray-900 tracking-tight'>
              Unlock the Potential of Your Assets
            </h2>
            <div className='h-1 w-24 bg-blue-gradient rounded-full mb-6' />

            <div className="space-y-4 text-gray-600 font-light text-base md:text-lg leading-relaxed mb-8">
              <p>SkyStay presents an exceptional investment opportunity for property owners in East Africa and beyond. Enjoy remarkable returns of 10-15% on your investment in U.S. dollars, making it an ideal choice for maximizing your financial growth.</p>
              <p>Our inclusive selection process welcomes a diverse range of properties. We focus on architectural excellence, innovative design, sustainable practices, and prime locations.</p>
              <p>Schedule a consultation with us today to learn how we can elevate your property's standards & help you stand out.</p>
            </div>

            <NavLink to={'/listing'}>
              <Button variant='promo' className="rounded-full px-8 py-6 shadow-glow-blue text-base hover:-translate-y-1 transition-transform">
                Get Started
              </Button>
            </NavLink>
          </div>
        </section>

        {/* Section 2: End to end property management */}
        <section className='px-[7.5vw] md:px-[5vw] my-24 flex flex-col md:flex-row-reverse items-center gap-12'>
          <div className='flex gap-4 w-full md:w-1/2 relative' data-aos="fade-left">
            <img className='w-1/2 rounded-2xl shadow-soft-lift transform translate-y-4 hover:translate-y-2 transition-transform duration-500 hover:shadow-glow-pink object-cover' src={banner9} alt='apartment interior' />
            <img className='w-1/2 rounded-2xl shadow-soft-lift transform -translate-y-8 hover:-translate-y-10 transition-transform duration-500 hover:shadow-glow-blue object-cover' src={banner10} alt='luxury property' />
          </div>
          <div className='w-full md:w-1/2 bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-10 md:p-14' data-aos="fade-right">
            <h2 className='text-3xl lg:text-4xl font-sentientmedium mb-4 text-gray-900 tracking-tight'>
              End-to-End <br />Property Management
            </h2>
            <div className='h-1 w-24 bg-blue-gradient rounded-full mb-6' />

            <div className="space-y-4 text-gray-600 font-light text-base md:text-lg leading-relaxed mb-8">
              <p>At SkyStay, we specialize in end-to-end management services tailored for property owners looking to rent their properties as short or long-term rentals. Our comprehensive approach includes strategic marketing to enhance occupancy rates.</p>
              <p>We take care of all cleaning, repairs, and maintenance, so you can enjoy peace of mind while your property is in our hands. Additionally, we efficiently handle the collection of booking fees, streamlining the entire rental process for you.</p>
            </div>

            <NavLink to={'/contactus'}>
              <Button variant='promo' className="rounded-full px-8 py-6 shadow-glow-blue text-base hover:-translate-y-1 transition-transform">
                Book a Consultation
              </Button>
            </NavLink>
          </div>
        </section>

        {/* Guarantee ROI Banner */}
        <section className='my-32 relative py-24 overflow-hidden'>
          <div className="absolute inset-0 bg-blue opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dppxu2h8h/image/upload/v1727532843/banner14_xshteb.jpg')] bg-cover bg-center mix-blend-overlay opacity-30"></div>

          <div className='relative z-10 px-[7.5vw] md:px-[5vw]'>
            <div className='text-center mb-16' data-aos="fade-up">
              <h2 className='font-sentientmedium text-white text-4xl lg:text-5xl tracking-tight'>Guarantee Your ROI</h2>
              <div className='h-1 w-24 bg-white/50 rounded-full mx-auto mt-6' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {[
                { img: cash, title: 'Invest', desc: 'Acquire your investment property today and unlock a pathway to financial security for the future.' },
                { img: building, title: 'Create', desc: 'Transform your investment property into a lucrative income stream with our exceptional interior design, professional photography, and effective marketing.' },
                { img: pay, title: 'Earn', desc: 'Receive between 10-15% ROI on Nairobi properties with a 1 year investment period.' }
              ].map((item, idx) => (
                <div key={idx} className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 transform hover:-translate-y-2 transition-all duration-300' data-aos="fade-up" data-aos-delay={idx * 150}>
                  <div className='h-16 w-16 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-soft-lift'>
                    <img className='h-8' src={item.img} alt={item.title} />
                  </div>
                  <h3 className='text-2xl font-semibold text-white text-center tracking-wide mb-4'>{item.title}</h3>
                  <p className='text-white/80 text-center font-light leading-relaxed'>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Management Fee Included */}
        <section className='px-[7.5vw] md:px-[5vw] my-24'>
          <div className='text-center mb-16' data-aos="fade-up">
            <h2 className='font-sentientmedium text-3xl lg:text-4xl text-gray-900 tracking-tight'>What's Included in our Management Fee?</h2>
            <div className='h-1 w-24 bg-blue-gradient rounded-full mx-auto mt-6 mb-6' />
            <p className='text-gray-600 font-light text-lg max-w-2xl mx-auto'>
              SkyStay offers a range of management services that give you complete peace of mind that your property is being professionally and profitably managed.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'>
            {[
              { img: listing, title: 'The Listing', desc: 'Draw in the ideal guests with an exceptional listing. We understand the keys to creating a successful listing and ensure your property grabs attention.' },
              { img: price, title: 'The Right Price', desc: 'Highlighting distinctive features via smart data pricing, we guarantee your income is maximized every single day of the week.' },
              { img: vetting, title: 'Guest Vetting', desc: 'Your comfort is our top priority. We meticulously screen all requests, accepting bookings only from guests who meet your specific criteria.' }
            ].map((fee, idx) => (
              <div key={idx} className='bg-white border border-gray-100 shadow-soft-lift rounded-3xl p-10 hover:shadow-glow-blue transition-shadow duration-300 text-center' data-aos="fade-up" data-aos-delay={idx * 150}>
                <img className='h-12 mx-auto mb-6' src={fee.img} alt={fee.title} />
                <h3 className='text-2xl font-semibold text-gray-900 mb-4'>{fee.title}</h3>
                <p className='text-gray-500 font-light leading-relaxed'>{fee.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Platforms Marquee / Grid */}
        <section className='bg-white py-24 mb-24 border-y border-gray-100'>
          <div className='px-[7.5vw] text-center mb-12' data-aos="fade-up">
            <h2 className='font-sentientmedium text-3xl text-gray-900 tracking-tight'>Be everywhere guests are looking and booking</h2>
            <div className='h-1 w-24 bg-blue-gradient rounded-full mx-auto mt-4 mb-4' />
            <p className='text-gray-500 font-light'>All properties are advertised on the world’s most trusted booking platforms.</p>
          </div>

          <div className='flex flex-wrap justify-center items-center gap-10 md:gap-16 px-10' data-aos="fade-up">
            {[marionet, abnb, expedia, booking, vrbo, homestayin, hopper].map((logo, index) => (
              <div key={index} className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
                <img className='h-12 object-contain' src={logo} alt='Platform' />
              </div>
            ))}
          </div>
        </section>

        {/* Maximize Property */}
        <section className='px-[7.5vw] md:px-[5vw] my-24 flex flex-col md:flex-row items-center gap-12'>
          <div className='w-full md:w-1/2 bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-10 md:p-14' data-aos="fade-right">
            <h2 className='text-3xl lg:text-4xl font-sentientmedium mb-4 text-gray-900 tracking-tight'>
              Maximize Your Property Investment
            </h2>
            <div className='h-1 w-24 bg-blue-gradient rounded-full mb-6' />

            <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed mb-8">
              Unlock the full potential of the long-term rental market with SkyStay. Enhance your occupancy rates, optimize your investment returns, and ensure compliance with all necessary regulations. Our comprehensive services include targeted marketing, professional housekeeping, and seamless coordination of repairs.
            </p>

            <NavLink to={'/aboutus'}>
              <Button variant='promo' className="rounded-full px-8 py-6 shadow-glow-blue text-base hover:-translate-y-1 transition-transform">
                Learn More
              </Button>
            </NavLink>
          </div>
          <div className='flex gap-4 w-full md:w-1/2 relative' data-aos="fade-left">
            <img className='w-1/2 rounded-2xl shadow-soft-lift transform translate-y-8 hover:translate-y-10 transition-transform duration-500 hover:shadow-glow-blue object-cover' src={banner11} alt='beach apartment' />
            <img className='w-1/2 rounded-2xl shadow-soft-lift transform -translate-y-4 hover:-translate-y-2 transition-transform duration-500 hover:shadow-glow-pink object-cover' src={banner12} alt='villa' />
          </div>
        </section>

        {/* One Stop Shop Grid V2 */}
        <section className='px-[7.5vw] md:px-[5vw] my-32'>
          <div className='text-center mb-16' data-aos="fade-up">
            <h2 className='font-sentientmedium text-4xl text-gray-900 tracking-tight'>Your One Stop Shop</h2>
            <div className='h-1 w-24 bg-blue-gradient rounded-full mx-auto mt-6 mb-6' />
            <p className='text-gray-600 font-light text-lg max-w-3xl mx-auto'>
              Once you have purchased your home, we offer a one stop solution from financing your entire interior design to managing all guest bookings without you having to spend a shilling. All money spent will come off your rental income.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto'>
            {[
              { icon: money, label: 'Financing Solutions' },
              { icon: vacuum, label: 'Housekeeping' },
              { icon: ticket, label: 'Guest Booking' },
              { icon: plumber, label: 'Maintenance' },
              { icon: dressing, label: 'Interior Design' },
              { icon: concierge, label: 'Concierge Services' },
              { icon: grocery, label: 'Re-stocking Amenities' },
              { icon: sofa, label: 'Custom Furniture' },
              { icon: support, label: 'Customer Relations' }
            ].map((srv, index) => (
              <div key={index} className='flex items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-soft-lift hover:-translate-y-1 transition-all duration-300' data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center p-2 mr-4 border border-gray-100">
                  <img src={srv.icon} alt={srv.label} className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold text-gray-800">{srv.label}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <NavLink to={'/contactus'}>
              <Button variant='promo' className="rounded-full px-10 py-6 text-lg shadow-glow-blue hover:-translate-y-1 transition-transform">
                Contact Us About Extra Services
              </Button>
            </NavLink>
          </div>
        </section>

        {/* Carousel Section Minimalized */}
        <section className="px-[7.5vw] mb-20">
          <div className="rounded-3xl overflow-hidden shadow-soft-lift border border-white/20" data-aos="zoom-in">
            <Slider {...settings}>
              {[slider1, slider2, slider3, slider4, slider5, slider6].map((slide, idx) => (
                <div key={idx} className="h-[400px] md:h-[600px] outline-none">
                  <img className="w-full h-full object-cover" src={slide} alt={`Banner ${idx + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </>
  )
}
