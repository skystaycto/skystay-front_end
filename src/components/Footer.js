import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Linkedin, Send } from 'lucide-react'
import '../css/Footer.css'
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer() {

  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://skystayserver-n8xf.onrender.com/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Subscribed successfully!", { position: "bottom-right", autoClose: 2000, theme: "colored" });
        setEmail('');
      }
    } catch (error) {
      toast.error('Failed to subscribe', { position: "bottom-right", autoClose: 2000, theme: "colored" });
    }
  };


  return (
    <footer className="bg-white border-t border-gray-100 mt-20 relative z-10 font-outfit">

      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-pink-blue-gradient opacity-50"></div>

      <div className='max-w-[1400px] mx-auto px-6 md:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8'>

          {/* Brand Column */}
          <div className='col-span-1 md:col-span-4 lg:col-span-3 pr-4'>
            <h3 className='text-2xl font-bold tracking-tighter mb-4'>
              <span className='text-blue'>SkyStay</span><span className='text-pink'>.</span>
            </h3>
            <p className='text-sm text-gray-500 mb-6 leading-relaxed'>
              A premium experience for your next destination. Discover properties that inspire everywhere in the world.
            </p>
            <div className='flex space-x-4'>
              <a href='https://facebook.com' target='_blank' rel="noreferrer" className='p-2 bg-gray-50 rounded-full text-gray-400 hover:text-blue hover:bg-blue/10 transition-colors'>
                <Facebook size={18} />
              </a>
              <a href='https://instagram.com' target='_blank' rel="noreferrer" className='p-2 bg-gray-50 rounded-full text-gray-400 hover:text-pink hover:bg-pink/10 transition-colors'>
                <Instagram size={18} />
              </a>
              <a href='https://twitter.com' target='_blank' rel="noreferrer" className='p-2 bg-gray-50 rounded-full text-gray-400 hover:text-blue hover:bg-blue/10 transition-colors'>
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Spacer for layout */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Column 1 */}
          <div className='col-span-1 md:col-span-4 lg:col-span-2'>
            <h4 className='font-semibold text-gray-900 mb-6'>Company</h4>
            <ul className='space-y-3 text-sm text-gray-500'>
              <li><NavLink to='/aboutus' className='hover:text-blue transition-colors'>About Us</NavLink></li>
              <li><NavLink to='/contactus' className='hover:text-blue transition-colors'>Contact</NavLink></li>
              <li><NavLink to='/blog' className='hover:text-blue transition-colors'>Blog</NavLink></li>
              <li><NavLink to='/privacypolicy' className='hover:text-blue transition-colors'>Privacy Policy</NavLink></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className='col-span-1 md:col-span-4 lg:col-span-2'>
            <h4 className='font-semibold text-gray-900 mb-6'>Hosting</h4>
            <ul className='space-y-3 text-sm text-gray-500'>
              <li><NavLink to='/listing' className='hover:text-pink transition-colors'>SkyStay your home</NavLink></li>
              <li><NavLink to='/properties' className='hover:text-pink transition-colors'>Property Management</NavLink></li>
              <li><NavLink to='/onboardform' className='hover:text-pink transition-colors'>Onboarding</NavLink></li>
              <li><NavLink to='/faq' className='hover:text-pink transition-colors'>Help & FAQs</NavLink></li>
            </ul>
          </div>

          {/* Spacer for layout */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Newsletter Column */}
          <div className='col-span-1 md:col-span-12 lg:col-span-3'>
            <div className='bg-gray-50/50 p-6 rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow'>
              <h4 className='font-semibold text-gray-900 mb-2'>Stay connected</h4>
              <p className='text-sm text-gray-500 mb-4'>Get curated properties delivered to your inbox.</p>
              <form onSubmit={handleSubscribe} className='flex gap-2 group'>
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className='w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue text-sm transition-all'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className='bg-pink-blue-gradient text-white p-3 rounded-xl hover:shadow-glow-blue transition-all flex items-center justify-center shrink-0 hover:scale-105'>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400'>
          <p className='font-medium'>© {new Date().getFullYear()} SkyStay.Homes, Inc.</p>
          <div className='flex space-x-6 mt-4 md:mt-0 font-medium'>
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
