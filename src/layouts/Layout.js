import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/App.css';
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop';
import ScrollToTopButton from '../components/ScrollToTopButton';
export default function Layout() {

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, [])

  return (
    <div>
      <div className='position-fixed'>
        <Navbar />
      </div>
      <div className='main-content'>
        <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
      <ScrollToTopButton />
      {/* WhatsApp Chat Icon */}
      <a href="https://wa.me/254743501162" target="_blank" className="whatsapp_float" rel="noopener noreferrer">
        <i className="fa-brands fa-whatsapp whatsapp-icon"></i>
      </a>
    </div>
  )
}
