import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from './ui/button';
import '../css/Minifilter.css'
export default function Minifilter({ filterTerms, setFilterTerms, allproperties=[] }) {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [destination, setDestination] = useState(null);
  const [guests, setGuests] = useState(0);

  const navigate = useNavigate();

  const uniquecities = Array.from(new Set(allproperties.map(property => property.city))).sort((a, b) => a.localeCompare(b));

  const destinations = uniquecities.map(city => ({ value: city, label: city }));

  const customStyles = (height = '40px') => ({
    control: (provided) => ({
      ...provided,
      borderRadius: '0.25rem',
      borderColor: 'rgba(255, 255, 255, 1)',
      padding: '0 0.25rem',
      fontSize: '0.75rem', // text-sm
      fontWeight: '300', // font-light
      minHeight: height,
      height: height,
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
      borderRadius: '0.25rem', // rounded-lg
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(59, 130, 246, 1)' : 'white', // bg-blue-500 : bg-white
      color: state.isFocused ? 'white' : 'black',
    }),
  });

  const handlefilter = () => {
    const filterTermsToTransfer = { destination, startDate, endDate, guests };
    setFilterTerms(filterTermsToTransfer);
    navigate('/portfolio');
  };


  return (
    <div className='w-[350px] border-2 border-solid border-slate-200 rounded-lg  font-outfit bg-sky-600'>
      <div className=' flex flex-row items-center justify-around py-[5px]'>
        <div className='flex flex-col items-center justify-center'>
            <Select
                options={destinations}
                value={destination}
                onChange={setDestination}
                placeholder='Choose Destination'
                styles={customStyles('36px')} // Adjust height here
                className='font-light text-xs xsm:text-xs w-[180px] '
            />
            <input className='w-[180px] mt-2' placeholder='Guests' type='number' onChange={(e) => setGuests(e.target.value)}></input>
        </div>
        <div className='w-[140px]' >
            <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText='Arrival'
            className='w-full relative mb-2'
            calendarClassName="custom-datepicker"
            
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText='Departure'
                className='w-full relative'
                calendarClassName="custom-datepicker"
                
            />
        </div>
      </div>
      <div onClick={handlefilter} className='flex flex-row items-center justify-center mb-[5px]'>
        <Button variant='promo3'>Search Availability</Button>
      </div>
    </div>
  )
}
