import React from 'react';
import { reviews } from '../constants/reviews'
import Reviewcard from './Reviewcard'

export default function ReviewCarousel() {
  return (
    <div 
      className='px-[7.5vw] xsm:px-[10px] mt-5 mb-20' 
    >
        <div className='flex flex-row  items-center overflow-x-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
            {reviews.map((review) => {
                return (
                <div 
                    key={review.id} 
                    className="mx-5 my-10" 
                >
                    <Reviewcard review={review} />
                </div>
                );
            })}
        </div>
    </div>
  )
}

