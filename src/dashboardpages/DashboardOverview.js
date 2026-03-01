import React from 'react'
import Statcard from '../components/Statcard'
import { stats } from '../constants/stats'

import { ListingsLineChart, RevenueLineChart, BookingStatusPieChart, MonthlyBookingsLineChart } from '../components/ChartComponents';

export default function DashboardOverview() {
  return (
    <div className='font-outfit pb-10 max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>Dashboard Overview</h1>
        <p className='text-gray-500 font-light mt-2'>Welcome back. Here's what's happening today.</p>
      </div>

      <div className='overflow-x-auto pb-6 mb-4 hide-scrollbar pt-2 px-1'>
        <div className='flex gap-4 min-w-max'>
          {stats.map((stat) => (
            <Statcard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>

      <div className='space-y-8 mt-4'>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
          <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 md:p-8 animate-fade-in'>
            <p className='text-xl font-sentientmedium text-gray-900'>Listings Overview</p>
            <p className='text-sm mt-1 text-gray-500 font-light mb-6'>Listings growth over time</p>
            <div className='w-full'>
              <ListingsLineChart />
            </div>
          </div>

          <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 md:p-8 animate-fade-in' style={{ animationDelay: '100ms' }}>
            <p className='text-xl font-sentientmedium text-gray-900'>Revenue Overview</p>
            <p className='text-sm mt-1 text-gray-500 font-light mb-6'>Monthly Revenue over time</p>
            <div className='w-full'>
              <RevenueLineChart />
            </div>
          </div>
        </div>

        <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 md:p-8 animate-fade-in' style={{ animationDelay: '200ms' }}>
          <p className='text-xl font-sentientmedium text-gray-900 mb-2'>Bookings Overview</p>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6'>
            <div className='flex flex-col items-center bg-slate-50 border border-gray-100 rounded-2xl p-6'>
              <p className='font-medium text-gray-700 w-full mb-1 text-center'>Booking Distribution</p>
              <p className='text-xs text-gray-500 font-light w-full mb-6 text-center'>Current state of all bookings</p>
              <div className='w-full max-w-[250px]'>
                <BookingStatusPieChart />
              </div>
            </div>
            <div className='flex flex-col bg-slate-50 border border-gray-100 rounded-2xl p-6'>
              <p className='font-medium text-gray-700 mb-1'>Monthly Performance</p>
              <p className='text-xs text-gray-500 font-light mb-6'>Volume of bookings month-over-month</p>
              <div className='w-full flex-grow flex flex-col justify-center'>
                <MonthlyBookingsLineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
