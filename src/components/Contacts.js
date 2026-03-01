import React from 'react'

import whatsapp from '../assets/Whatsapp2.svg'
import email from '../assets/email.svg'
import phone from '../assets/telephone.svg'
import facebook from '../assets/facebook2.svg'
import twitter from '../assets/twitter2.svg'
import onstagram from '../assets/instagram2.svg'

export default function Contacts() {
  return (
    <div className='w-[44px]  xl:w-[36px] lg:w-[36px] mr-[10px] bg-white bg-opacity-90 xl:bg-opacity-20 h-fit border-[1px] border-solid border-blue rounded-sm flex flex-col items-center justify-center shadow-sm xsm:hidden sm:hidden md:hidden xl:hidden  '>
        <img className='m-[10px] xl:mx-0 xl:w-[18px] lg:mx-0 lg:w-[18px] cursor-pointer w-[24px]' src={whatsapp}/>
        <img className='m-[10px] xl:mx-0 xl:w-[18px] lg:mx-0 lg:w-[18px] cursor-pointer w-[24px]' src={email}/>
        <img className='m-[10px] xl:mx-0 xl:w-[18px] lg:mx-0 lg:w-[18px] cursor-pointer w-[24px]' src={phone}/>
        <img className='m-[10px] xl:mx-0 xl:w-[18px] lg:mx-0 lg:w-[18px] cursor-pointer w-[24px]' src={facebook}/>
        <img className='m-[10px] xl:mx-0 xl:w-[18px] lg:mx-0 lg:w-[18px] cursor-pointer w-[24px]' src={twitter}/>
        <img className='m-[10px] xl:mx-0 xl:w-[18px] lg:mx-0 lg:w-[18px] cursor-pointer w-[24px]' src={onstagram}/>
    </div>
  )
}
