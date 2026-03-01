import React from 'react'

export default function Statcard({ stat }) {
  return (
    <div className='min-w-[220px] bg-white/80 backdrop-blur-xl border border-gray-100 shadow-soft-lift p-[24px] rounded-3xl flex flex-col justify-center items-end md:min-w-[200px] sm:min-w-[170px] xsm:min-w-[160px] transition-transform hover:-translate-y-1 hover:shadow-glow-blue group'>
      <p className='text-[38px] font-sentientmedium tracking-tight text-transparent bg-clip-text bg-blue-gradient lg:text-[36px] md:text-[32px] sm:text-[28px] xsm:text-[24px] mb-1'>
        {stat.value}
      </p>
      <p className='text-sm sm:text-xs xsm:text-xs font-light text-gray-500 group-hover:text-blue transition-colors text-right'>
        {stat.title}
      </p>
    </div>
  )
}
