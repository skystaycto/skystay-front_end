import React from 'react'

import whatsapp from '../assets/Whatsapp3.svg'
import phone from '../assets/phone2.svg'

export default function ContactsMini() {
  return (
    <div className='w-fit mr-[20px] rounded-sm  bg-opacity-10 flex flex-row items-center justify-center shadow-sm  2xl:hidden  lg:hidden'>
        <img className='m-[10px]  cursor-pointer w-[18px]' src={whatsapp}/>
        <img className='m-[10px]  cursor-pointer w-[18px]' src={phone}/>
    </div>
  )
}
