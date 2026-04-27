import React, { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async';
import { decode } from 'blurhash';
import AOS from 'aos';
import 'aos/dist/aos.css';
import worldmap from '../assets/worldmap.jpg'
import widereach from '../assets/widereach.jpg'
import dashboard from '../assets/dashboard2.jpg'
import payment from '../assets/payments.jpg'
import support from '../assets/support.jpg'
import list from '../assets/list.svg'
import review from '../assets/review.svg'
import submit from '../assets/meeting.png'
import upload from '../assets/negotiate.png'
import jane from '../assets/jane.jpg'
import ndirangu from '../assets/ndirangu.jpg'
import schnider from '../assets/schnider.jpg'

import { Button } from '../components/ui/button';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { GoogleLogin } from '@react-oauth/google';

export default function Listing() {

  const { loginUser, handleGoogleSuccess } = React.useContext(UserContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleHostLogin = async () => {
    const userdata = { email, password };
    await loginUser(userdata);
    setShowLoginModal(false);
  };

  const propertytypes = useMemo(() => ['Vacation Home', 'Apartment', 'Bed & Breakfast', 'Guest House', 'Property'], []);
  const [currentProperty, setCurrentProperty] = useState(propertytypes[0]);
  const [blurDataUrl, setBlurDataUrl] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const hash = "LWDKv9%h%it8O_e,ROaeaJbIjXWC";
    const pixels = decode(hash, 32, 32);

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(32, 32);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);
    const base64String = canvas.toDataURL();
    setBlurDataUrl(base64String);
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const intervalId = setInterval(() => {
      setCurrentProperty((prevProperty) => {
        const currentIndex = propertytypes.indexOf(prevProperty);
        const nextIndex = (currentIndex + 1) % propertytypes.length;
        return propertytypes[nextIndex];
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [propertytypes]);

  const banner14url = "https://res.cloudinary.com/dppxu2h8h/image/upload/v1727532843/banner14_xshteb.jpg"

  return (
    <>
      <Helmet>
        <title>List Your Property On SkyStay.Homes</title>
        <meta name="description" content="List your property on SkyStay Homes. Reach out to our team for more information." />
        <link rel="canonical" href="/listing" />
      </Helmet>

      <div className='min-h-screen bg-slate-50 font-outfit pb-20'>
        {/* Hero Section Container */}
        <div className="relative w-full mb-32">
          {/* Hero Background */}
          <div className='w-full relative h-[65vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden'
            style={{ backgroundImage: `url(${isImageLoaded ? banner14url : blurDataUrl})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
            data-aos="fade-down">

            <div className="absolute inset-0 bg-blue/80 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>

            <div className="relative z-10 text-center px-6 -mt-16">
              <h1 className='text-3xl md:text-5xl font-light text-white mb-4' data-aos="fade-up">Welcome to SkyStay Homes</h1>
              <p className='text-xl md:text-4xl font-light text-white max-w-4xl leading-tight' data-aos="fade-up" data-aos-delay="200">
                List Your <span className='text-transparent bg-clip-text bg-pink-blue-gradient font-bold drop-shadow-lg'>{currentProperty}</span> <br />and Reach Millions of Travellers Worldwide
              </p>
            </div>

            {/* Hidden image to trigger onload */}
            <img
              src={banner14url}
              alt="Banner"
              onLoad={handleImageLoad}
              style={{ display: 'none' }}
            />
          </div>

          {/* Floating glass box at the bottom overlapping the next section */}
          <div className="absolute -bottom-24 left-0 right-0 flex justify-center z-20">
            <div className="w-[90%] md:w-[85%] max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl shadow-soft-lift p-8 md:p-10 border border-white/40" data-aos="fade-up" data-aos-delay="400">
              <p className='text-base md:text-lg font-light text-center text-gray-700 leading-relaxed mb-8'>
                "We are thrilled that you are considering listing your property on SkyStay.Homes! Our platform connects property owners with travelers looking for unique and comfortable places to stay. Maximize your rental potential today."
              </p>
              <div className='flex flex-wrap items-center justify-center gap-4'>
                <NavLink to="/signup" state={{ role: 'Host' }}>
                  <Button variant='promo' className="rounded-full px-8 py-6 text-lg shadow-glow-blue hover:-translate-y-1 transition-transform bg-pink-blue-gradient text-white border-0 w-full sm:w-auto">
                    Sign up as a Host
                  </Button>
                </NavLink>
                <Button onClick={() => setShowLoginModal(true)} variant='outline' className="rounded-full px-8 py-6 text-lg hover:-translate-y-1 transition-transform border-gray-300 text-gray-700 bg-white w-full sm:w-auto">
                  Log in as Host
                </Button>
                <NavLink to={'/onboardform'}>
                  <Button variant='promo' className="rounded-full px-8 py-6 text-lg shadow-glow-pink hover:-translate-y-1 transition-transform bg-white text-pink border border-pink w-full sm:w-auto">
                    Onboard Property
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Why List Section */}
        <div className='mt-10 py-20 relative'>
          <div className="absolute inset-0 opacity-10 bg-center bg-cover bg-fixed" style={{ backgroundImage: `url(${worldmap})` }}></div>

          <div className="relative z-10 px-[7.5vw]">
            <div className='text-center mb-16' data-aos="fade-up">
              <h2 className='text-3xl md:text-4xl font-sentientmedium text-gray-900 tracking-tight'>
                Why List Your Property on SkyStay?
              </h2>
              <div className='h-1 w-24 bg-blue-gradient rounded-full mx-auto mt-6' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
              {[
                { title: 'Wide Reach', img: widereach, desc: 'Our platform is visited by hundreds of travelers daily. We market your property to travellers from the USA, UK among other countries.' },
                { title: 'Easy Management', img: dashboard, desc: 'Our user-friendly dashboard makes it simple to manage your listings, bookings, and communications with guests.' },
                { title: 'Professional Support', img: support, desc: 'We offer professional support to help you with listing optimization, photography tips, and guest management.' },
                { title: 'Secure Payments', img: payment, desc: 'Our secure payment system ensures you receive payments promptly and safely.' }
              ].map((reason, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-soft-lift hover:shadow-glow-blue transition-all duration-300 transform hover:-translate-y-2 flex flex-col sm:flex-row items-center gap-6" data-aos="fade-up" data-aos-delay={idx * 150}>
                  <div className="w-full sm:w-1/3 flex-shrink-0">
                    <img className='w-full rounded-2xl shadow-sm object-cover h-32 sm:h-auto' src={reason.img} alt={reason.title} />
                  </div>
                  <div className="w-full sm:w-2/3 text-center sm:text-left">
                    <h3 className='text-xl font-sentientmedium text-gray-900 mb-3'>{reason.title}</h3>
                    <p className='text-gray-500 font-light text-sm leading-relaxed'>{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Onboarding Flow Banner */}
        <section className='my-20 relative py-24 overflow-hidden'>
          <div className="absolute inset-0 bg-blue-gradient opacity-95"></div>

          <div className='relative z-10 px-[7.5vw] max-w-7xl mx-auto'>
            <div className='text-center mb-16' data-aos="fade-up">
              <h2 className='font-sentientmedium text-white text-3xl md:text-4xl tracking-tight'>How Onboarding Works</h2>
              <div className='h-1 w-24 bg-white/50 rounded-full mx-auto mt-6' />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
              {[
                { img: list, title: 'Fill Form', desc: 'Interested property owners should fill out the onboarding form on the website. The sales team will review and contact you.' },
                { img: submit, title: 'Meeting Arranged', desc: 'A virtual or physical meeting is organized to discuss the details, answer questions, and explain more about our service.' },
                { img: upload, title: 'Negotiation', desc: 'The property owner confirms their decision to onboard the property, followed by negotiations on commission terms.' },
                { img: review, title: 'Contract Signing', desc: 'Once both parties agree on terms, the contract is signed, and the property is officially onboarded.' }
              ].map((step, idx) => (
                <div key={idx} className='bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center' data-aos="fade-up" data-aos-delay={idx * 150}>
                  <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center p-4 mb-6 shadow-soft-lift">
                    <img className='w-full h-full object-contain' src={step.img} alt={step.title} />
                  </div>
                  <h3 className='text-xl font-semibold text-white mb-4'>{step.title}</h3>
                  <p className='text-white/80 font-light text-sm leading-relaxed'>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className='px-[7.5vw] py-10 max-w-7xl mx-auto'>
          <div className='text-center mb-16' data-aos="fade-up">
            <h2 className='text-3xl md:text-4xl font-sentientmedium text-gray-900 tracking-tight'>Owner Testimonials</h2>
            <div className='h-1 w-24 bg-blue-gradient rounded-full mx-auto mt-6' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
            {[
              { img: jane, name: 'Jane D.', role: 'Property Owner', quote: "Listing my property on SkyStay Homes has been a game-changer. The platform is easy to use and the support team is fantastic!" },
              { img: ndirangu, name: 'Mr Ndirangu', role: 'Property Owner', quote: "SkyStay Homes has helped me reach more guests and increase my bookings. Highly recommend working with them!" },
              { img: schnider, name: 'Dan Schnider', role: 'Property Owner', quote: "I had an apartment in Kenya that was empty for almost half the year. Skystay helped connect with travellers and managed operations." }
            ].map((testimonial, idx) => (
              <div key={idx} className='bg-white border border-gray-100 rounded-3xl p-8 shadow-soft-lift flex flex-col items-center text-center relative pt-14 mt-10' data-aos="fade-up" data-aos-delay={idx * 150}>
                <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100">
                  <img src={testimonial.img} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-pink text-4xl mb-2 font-serif">"</div>
                <p className='text-gray-600 font-light text-sm italic mb-6 leading-relaxed'>
                  {testimonial.quote}
                </p>
                <div className="mt-auto">
                  <h4 className='text-gray-900 font-semibold'>{testimonial.name}</h4>
                  <p className="text-gray-400 text-xs">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='text-center bg-pink/5 border border-pink/20 rounded-3xl p-12' data-aos="zoom-in">
            <h2 className='text-3xl font-sentientmedium text-gray-900 tracking-tight mb-4'>Ready to List Your Property?</h2>
            <p className='text-gray-600 font-light text-lg mb-8 max-w-2xl mx-auto'>
              Join our community of hosts and start earning today! Click the button below to begin your journey with SkyStay Homes.
            </p>
            <NavLink to="/signup" state={{ role: 'Host' }}>
              <Button variant='promo' className="rounded-full px-10 py-6 text-lg shadow-glow-pink bg-pink hover:bg-pink/90 border-0 hover:-translate-y-1 transition-transform">
                Sign Up as a Host Now
              </Button>
            </NavLink>
          </div>
        </section>

      </div>

      {/* Host Login Modal */}
      {showLoginModal && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm'>
          <div className='bg-white/95 backdrop-blur-xl rounded-3xl shadow-floating border border-white/20 w-full max-w-[450px] mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-300'>
            <div className='flex items-center justify-between p-5 border-b border-gray-100/50'>
              <div className='w-8'></div>
              <h3 className='font-bold text-lg'>Host Login</h3>
              <button onClick={() => setShowLoginModal(false)} className='p-2 hover:bg-black/5 rounded-full transition-colors'>
                <span className='text-xl opacity-60'>&times;</span>
              </button>
            </div>

            <div className='p-8'>
              <div className='space-y-4'>
                <input
                  className='w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all'
                  type='email'
                  placeholder='Email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className='w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className='flex items-center gap-2 pt-1'>
                  <input
                    type='checkbox'
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className='rounded border-gray-300 text-blue focus:ring-blue'
                  />
                  <label className='text-sm text-gray-600'>Remember me</label>
                </div>

                <button
                  onClick={handleHostLogin}
                  className='w-full bg-pink-blue-gradient text-white font-bold py-4 rounded-xl hover:shadow-glow-blue hover:-translate-y-1 transition-all duration-300 mt-2'
                >
                  Log In
                </button>
              </div>

              <div className='relative my-8'>
                <div className='absolute inset-0 flex items-center'><div className='w-full border-t border-gray-200/60'></div></div>
                <div className='relative flex justify-center'><span className='bg-white px-4 text-xs font-medium text-gray-500 uppercase tracking-widest'>or</span></div>
              </div>

              <div className='w-full hover:-translate-y-1 transition-transform duration-300 rounded-xl overflow-hidden shadow-sm'>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.log('Login Failed')}
                  useOneTap
                  containerProps={{ style: { width: '100%' } }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
