import React, { useEffect, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

const GoogleTranslate = () => {
  const { language } = useContext(FilterContext);

  useEffect(() => {
    const loadGoogleTranslateScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,es,fr,de,it,ja,zh-CN',
          autoDisplay: false
        }, 'google_translate_element');
      }
    };

    window.googleTranslateElementInit = initializeGoogleTranslate;

    const ensureGoogleTranslate = async () => {
      if (!window.google || !window.google.translate) {
        await loadGoogleTranslateScript();
      }
      initializeGoogleTranslate();
    };

    ensureGoogleTranslate().catch(error => {
      console.error('Error loading or initializing Google Translate script:', error);
    });
  }, []);

  useEffect(() => {
    if (window.google && window.google.translate) {
      const intervalId = setInterval(() => {
        const langSelect = document.querySelector('.goog-te-combo');
        if (langSelect) {
          clearInterval(intervalId);
          langSelect.value = language;
          langSelect.dispatchEvent(new Event('change'));
        }
      }, 100);
    }
  }, [language]);
  

  return <div id="google_translate_element" className='w-fit h-[22px] overflow-hidden'></div>;
};

export default GoogleTranslate;
