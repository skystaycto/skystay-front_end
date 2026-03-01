import React, { useContext, useRef } from 'react';
import { FilterContext } from '../context/FilterContext';
import enFlag from '../assets/uk.png';
import esFlag from '../assets/spain.png';
import frFlag from '../assets/france.png';
import deFlag from '../assets/germany.png';
import itFlag from '../assets/italy.png';
import jaFlag from '../assets/japan.png';
import zhFlag from '../assets/china.png';
import useOutsideClick from './useOutsideClick';

const flags = [
  { code: 'en', src: enFlag, alt: 'English' },
  { code: 'es', src: esFlag, alt: 'Spanish' },
  { code: 'fr', src: frFlag, alt: 'French' },
  { code: 'de', src: deFlag, alt: 'German' },
  { code: 'it', src: itFlag, alt: 'Italian' },
  { code: 'ja', src: jaFlag, alt: 'Japanese' },
  { code: 'zh-CN', src: zhFlag, alt: 'Chinese' }
];

const FlagDropdown = () => {
    const {language, handleLanguageChange, open, setOpen} = useContext(FilterContext)
  
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setOpen(false));

  const selectedFlag = flags.find(flag => flag.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center bg-blue rounded outline-none p-2"
        onClick={() => setOpen(!open)}
      > 
        <img src={selectedFlag.src} alt={selectedFlag.alt} className="w-6 rounded cursor-pointer" />
      </div>
      {open && (
        <div className="absolute top-full left-0 bg-blue border rounded mt-1 w-full">
          {flags.map(flag => (
            <div
              key={flag.code}
              className="flex items-center cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleLanguageChange(flag.code)}
            >
              <img src={flag.src} alt={flag.alt} className="w-6 rounded" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlagDropdown;
