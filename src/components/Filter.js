import React, {useState} from 'react'
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import '../css/Filter.css'
import search from '../assets/search.svg'
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export default function Filter({ filterTerms, setFilterTerms, allproperties = [] }) {

const [destination, setDestination] = useState( null);
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [guests, setGuests] = useState(0);

const navigate = useNavigate();

const uniquecities = Array.from(new Set(allproperties.map(property => property.city))).sort((a, b) => a.localeCompare(b));

const destinations = uniquecities.map(city => ({ value: city, label: city }));


const customStyles = (height = '40px') => ({
    control: (provided) => ({
        ...provided,
        borderRadius: '1.5rem',
        borderColor: 'rgba(107, 114, 128, 1)',
        padding: '0 0.25rem',
        fontSize: '0.875rem', // text-sm
        fontWeight: '300', // font-light
        minHeight: height,
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: '100%',
        padding: '0 3px',
    }),
    input: (provided) => ({
        ...provided,
        margin: '0',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'rgba(107, 114, 128, 1)', // text-slate-400
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'rgba(0, 0, 0, 1)', // text-black
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '0.375rem', // rounded-lg
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(59, 130, 246, 1)' : 'white', // bg-blue-500 : bg-white
        color: state.isFocused ? 'white' : 'black',
    }),
    });

    const handlefilter = () => {
        const filterTermsToTransfer = {destination, startDate, endDate, guests};
        setFilterTerms(filterTermsToTransfer);
        navigate('/portfolio');
    };
    
  return (
    <div className='w-full font-outfit'>
        <div className='w-fit flex flex-row items-center justify-center px-3.5 py-1.5 rounded-full bg-white border-solid border-[2px] md:border-[8px] border-slate-200 md:flex-col md:rounded-xl md:px-2.5 sm:flex-col sm:rounded-xl sm:px-2.5 sm:py-2.5 xsm:flex-col xsm:px-1.5 xsm:py-0.5 xsm:rounded xsm:w-full '>
            <div className='flex flex-row w-fit md:py-3.5 xsm:flex-col xsm:w-3/4 xsm:py-1.5'>
                <div className='flex flex-col  w-fit md:w-[230px] mx-0.5 xsm:w-full xsm:py-1.5'>
                    <label className='text-xs font-normal text-black px-3'>Destination</label>
                    <Select
                        options={destinations}
                        value={destination}
                        onChange={setDestination}
                        placeholder='Choose Destination'
                        styles={customStyles('36px')} // Adjust height here
                        className='font-light text-sm xsm:text-xs '
                    />
                </div>
                <div className='flex flex-col  w-fit mx-0.5 xsm:w-full xsm:py-1.5'>
                    <label className='text-xs font-normal text-black px-3'>Arrival</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText='Add Arrival Date'
                        className='font-light text-sm px-3 py-1 rounded-3xl border-solid border-[1px] border-slate-400'
                    />
                </div>
            </div>
            <div className='flex flex-row w-fit md:py-2.5 md:w-full md:justify-around sm:w-full sm:justify-around sm:py-2.5 xsm:flex-col xsm:w-3/4 xsm:py-1.5'>
                <div className='flex flex-col  w-fit mx-0.5 xsm:w-full xsm:py-1.5'>
                    <label className='text-xs font-normal text-black px-3'>Departure</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText='Add Departure Date'
                        className='font-light text-sm px-3 py-1 rounded-3xl border-solid border-[1px] border-slate-400'
                    />
                </div>
                <div className='flex flex-col w-[120px] md:w-fit mx-0.5 sm:w-fit xsm:w-full xsm:py-1.5'>
                    <label className='text-xs font-normal text-black px-3'>Guests</label>
                    <input
                        className='font-light text-sm px-3 py-1 rounded-3xl border-solid border-[1px] border-slate-400'
                        type='number'
                        placeholder='Add Guests'
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
                    />
                </div>
            </div>
            <div onClick={handlefilter} className='flex items-center justify-center mx-0.5 cursor-pointer md:hidden sm:hidden xsm:hidden'>
                <div className='w-[34px] flex  items-center justify-center rounded-[17px] h-[34px] bg-blue hover:bg-pink'><img src={search} alt='search'/></div>
            </div>
            <div onClick={handlefilter} className='flex items-center justify-center mx-0.5 cursor-pointer 2xl:hidden xl:hidden lg:hidden '>
                <Button variant='promo'>Search Availability</Button>
            </div>
        </div>
    </div>
  )
}
