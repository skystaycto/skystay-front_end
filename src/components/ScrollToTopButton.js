import React, { useState, useEffect } from 'react';
import bluearrow from '../assets/blue arrow.svg'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 xsm:right-2 z-50 bg-opacity-80  bg-white shadow-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer flex items-center justify-center"
          style={{width: '32px', height: '32px', borderRadius: '50%'}}
        >
          <img className='w-[18px]' src={bluearrow} alt="Scroll to top"/>
        </div>
      )}
    </div>
  );
};

export default ScrollToTopButton;
