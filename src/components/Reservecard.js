import React, { useState } from 'react';
import CalendarComponent from './Calendar';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import '../css/Home.css'

const ReserveCard = ({ onToggle, propertyData }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const navigate = useNavigate();

    const getTodaysPrice = () => {
        const priceData = propertyData.price;
      
        // Parse the priceData into an array of date-price pairs
        const priceEntries = priceData.split(',').map(entry => {
          const [date, price] = entry.split(':');
          return { date, price: parseFloat(price) };
        });
      
        // Sort the priceEntries by date in descending order
        priceEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
      
        // Get today's date in the format YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];
      
        // Iterate through the sorted priceEntries and find the latest price
        let latestPrice = null;
        for (let entry of priceEntries) {
          if (new Date(entry.date) <= new Date(today)) {
            latestPrice = entry.price;
            break;
          }
        }
      
        // Return the latest price found, or null if no price is available
        return latestPrice !== null ? latestPrice : 0;
    };
    
    const pricePerNight =  getTodaysPrice();

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const calculateNights = () => {
        if (!startDate || !endDate) return 0;
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const numberOfNights = calculateNights();
    const totalCost = numberOfNights * pricePerNight;

    const handleReserve = () => {
        navigate('/checkout', {
            state: { check_in: startDate, check_out: endDate, propertyData, numberOfNights }
        });
    };

    

    return (
        <div >
            {/* Reserve Card */}
            <div className='w-[350px] h-fit border-2 border-solid rounded-lg p-[10px] ml-[20px] flex flex-col items-center justify-start lg:bg-white md:bg-white sm:bg-white sm:p-[5px] sm:items-start xsm:bg-white xsm:w-[300px] xsm:p-[5px]'>
                <p onClick={onToggle} className='text-xs self-start underline text-pink 2xl:hidden xl:hidden '>Close</p>
                <p className='text-base font-semibold'>Reserve</p>
                <div className='w-full flex flex-col items-center justify-start lg:items-start md:items-start sm:items-start xsm:items-start'>
                    <CalendarComponent
                        startDate={startDate}
                        endDate={endDate}
                        handleDateChange={handleDateChange}
                        propertyData={propertyData}
                    />
                </div>
                <div className='w-full mt-4 flex flex-col items-start justify-start sm:mt-2 xsm:mt-2'>
                    <p className='text-sm'>Price: <span className='text-lg font-bold'>${pricePerNight}</span> per Night</p>
                    <div>
                        <div className='flex flex-row'>
                            <p className='text-sm'>Number of nights: <span className='text-lg font-bold'>{numberOfNights}</span></p>
                        </div>
                    </div>
                    <div>
                    <p>Total: <span className='text-lg font-bold'>${totalCost}</span></p>
                    </div>
                </div>
                <Button variant='promo3' onClick={handleReserve}>Reserve</Button>
                <p className='my-2 text-xs text-center self-center'>
                    You won't be charged yet
                </p>
                
            </div>
        </div>
    );
};

export default ReserveCard;