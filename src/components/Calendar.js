import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/Home.css'

const CalendarComponent = ({ startDate, endDate, handleDateChange, propertyData }) => {

    // Split the dates_booked string into an array of strings and convert each to a Date object
    const bookedDates = propertyData.dates_booked.split(',').map(date => new Date(date.trim()));

    const handleDateChangeInternal = (dates) => {
        handleDateChange(dates);
    };

    const isBooked = (date) => {
        return bookedDates.some(
            bookedDate => bookedDate.toDateString() === date.toDateString()
        );
    };

    const highlightWithRanges = [
        {
            "react-datepicker__day--highlighted-custom-1": bookedDates
        }
    ];

    const clearDates = () => {
        handleDateChange([null, null]);
    };

  return (
    <div>
        <p className='text-base font-light'>Select Check In Dates</p>
        <div className='flex mt-2 lg:flex lg:flex-col md:flex md:flex-col sm:flex sm:flex-col xsm:flex xsm:flex-col'>
            <p className='text-xs font-light'>Check-in Date: <span className='text-xs font-semibold'>{startDate ? startDate.toDateString() : 'Not selected'}</span></p>
            <p className='text-xs font-light ml-[10px] lg:ml-0 md:ml-0 sm:ml-0 xsm:ml-[0px]'>Check-out Date: 
            <span className='text-xs font-semibold'>{endDate ? endDate.toDateString() : 'Not selected'}</span></p>
        </div>
        <p className='text-xs my-2 underline font-bold cursor-pointer' onClick={clearDates}>Clear Dates</p>
        <div className='calendar-wrapper notranslate'>
            <DatePicker
                selected={startDate}
                onChange={handleDateChangeInternal}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                minDate={new Date()}
                excludeDates={bookedDates}
                highlightDates={highlightWithRanges}
                placeholderText='Select check-in and check-out dates'
                dayClassName={(date) => isBooked(date) ? "booked-date notranslate" : undefined}
                calendarClassName='full-width-calendar notranslate'
            />
        </div>
    </div>
  );
};

export default CalendarComponent;
