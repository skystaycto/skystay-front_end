import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filterTerms, setFilterTerms] = useState({
        destination: null,
        startDate: null,
        endDate: null,
        guests: 0,
        minPrice: 0,
        maxPrice: 0,
        bedrooms: 0,
        bathrooms: 0,
        amenities: []
    });

    const [language, setLanguage] = useState('en');
    const [open, setOpen] = useState(false);

    const handleLanguageChange = (code) => {
        setLanguage(code);
        setOpen(false);
    };

    return (
        <FilterContext.Provider value={{ filterTerms, setFilterTerms, language, setLanguage, handleLanguageChange, open, setOpen }}>
            {children}
        </FilterContext.Provider>
    );
};
