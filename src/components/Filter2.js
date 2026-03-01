import React, {useState, useContext} from 'react'
import { Button } from './ui/button';

import usd from '../assets/US Dollar.jpg'
import bed2 from '../assets/bed2.svg'
import bath2 from '../assets/bath2.svg'
import longterm from '../assets/longterm.svg'

import parking from '../assets/parking.svg'
import kitchen from '../assets/kitchen.svg'
import swimming from '../assets/swimming.svg'
import wifi from '../assets/wifi.svg'
import work from '../assets/work.svg'
import gym from '../assets/gym.svg'
import tv from '../assets/tv.svg'
import security from '../assets/security.svg'
import safe from '../assets/safe.svg'
import elevator from '../assets/elevator.svg'
import air from '../assets/Air.png'
import balcony from '../assets/balcony.svg'

import { FilterContext } from '../context/FilterContext';


export default function Filter2() {

    const {filterTerms, setFilterTerms} = useContext(FilterContext);
    
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [amenities, setAmenities] = useState([]);

    const handleAmenityChange = (e, amenity) => {
        if (e.target.checked) {
            setAmenities([...amenities, amenity]);
        } else {
            setAmenities(amenities.filter(a => a !== amenity));
        }
    };


    const handlefilter = () => {
        const newFilterTerms = {
            ...filterTerms,
            minPrice,
            maxPrice,
            bedrooms,
            bathrooms,
            amenities,
        };
        setFilterTerms(newFilterTerms);
    };


  return (
    <div className='w-[250px] font-outfit rounded-lg border-[1px] border-solid border-gray-300 lg:w-full md:w-full sm:w-full xsm:w-full'>
        <div onClick={handlefilter} className='flex flex-row items-center justify-end px-[10px]'>
            <Button variant='promo'>Apply</Button>
        </div>
        <div className='lg:flex lg:w-4/6 lg:m-auto lg:items-center lg:justify-center  md:flex md:w-full md:items-center md:justify-center'>
            <div className='lg:w-full md:w-full'>
                <p className='font-semibold font-sentientmedium px-[10px] py-[5px]'>Price</p>
                <div className='flex flex-row justify-between px-[10px] py-[10px] md:justify-around sm:justify-around xsm:justify-around'>
                    <div>
                        <p className='text-xs font-semibold'>Min Price</p>
                        <div className='flex w-fit'>
                            <div className='w-[30px] flex items-center justify-center rounded-l-lg border-[1px] border-solid border-gray-300'>
                                <img src={usd}/>
                            </div>
                            <input min={0} onChange={(e) => setMinPrice(e.target.value)} type='number'  className='w-[80px] border-[1px] border-solid border-gray-300 px-2 py-1 rounded-l-none rounded-r-lg'/>
                        </div>
                    </div>
                    <div>
                        <p className='text-xs font-semibold'>Max Price</p>
                        <div className='flex w-fit'>
                            <div className='w-[30px] flex items-center justify-center rounded-l-lg border-[1px] border-solid border-gray-300'>
                                <img src={usd}/>
                            </div>
                            <input min={0} onChange={(e) => setMaxPrice(e.target.value)} type='number'  className='w-[80px] border-[1px] border-solid border-gray-300 px-2 py-1 rounded-l-none rounded-r-lg'/>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='lg:w-full md:w-full'>
                <p className='font-semibold font-sentientmedium px-[10px] py-[5px]'>Bedrooms & Bathrooms</p>
               
                <div className='flex flex-row justify-between px-[10px] py-[10px] md:justify-around sm:justify-around xsm:justify-around'>
                    <div>
                        <p className='text-xs font-semibold'>Bedrooms</p>
                        <div className='flex w-fit'>
                            <div className='w-[30px] flex items-center justify-center rounded-l-lg border-[1px] border-solid border-gray-300'>
                                <img className='w-[20px]' src={bed2}/>
                            </div>
                            <input onChange={(e) => setBedrooms(e.target.value)} type='number'  className='w-[80px] border-[1px] border-solid border-gray-300 px-2 py-1 rounded-l-none rounded-r-lg'/>
                        </div>
                    </div>
                    <div>
                        <p className='text-xs font-semibold'>Bathrooms</p>
                        <div className='flex w-fit'>
                            <div className='w-[30px] flex items-center justify-center rounded-l-lg border-[1px] border-solid border-gray-300'>
                                <img className='w-[20px]' src={bath2}/>
                            </div>
                            <input onChange={(e) => setBathrooms(e.target.value)} type='number' className='w-[80px] border-[1px] border-solid border-gray-300 px-2 py-1 rounded-l-none rounded-r-lg'/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        
        <div className='w-fit m-auto flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-2 my-2 rounded-lg'>
            <input onChange={(e) => handleAmenityChange(e, 'Long Term Stay')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
            <img className='px-[5px]' src={longterm}/>
            <p className='text-sm'>Long term stays allowed</p>
        </div>
        <div className='px-[10px] mb-5'>
            <p className='font-semibold font-sentientmedium text-sm'>Ammenities:</p>
            <div className='flex flex-wrap'>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-2 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'Parking')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={parking}/>
                    <p className='text-xs'>Parking</p>
                </div>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-2 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'Kitchen')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={kitchen}/>
                    <p className='text-xs'>Kitchen</p>
                </div>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-1 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'Wifi')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={wifi}/>
                    <p className='text-xs'>Wifi</p>
                </div>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-1 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'Swimming Pool')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={swimming}/>
                    <p className='text-xs'>Swimming Pool</p>
                </div>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-1 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'Workspace')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={work}/>
                    <p className='text-xs'>Workspace</p>
                </div>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-1 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'Gym')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={gym}/>
                    <p className='text-xs'>Gym</p>
                </div>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-1 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'Air Conditioner')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={air}/>
                    <p className='text-xs'>Air Conditioning</p>
                </div>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-1 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'TV')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={tv}/>
                    <p className='text-xs'>HDTV</p>
                </div>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-1 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'Safe')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={safe}/>
                    <p className='text-xs'>Safe</p>
                </div>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-1 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'Security')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={security}/>
                    <p className='text-xs'>Security Cameras</p>
                </div>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-1 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'Balcony')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={balcony}/>
                    <p className='text-xs'>Balcony</p>
                </div>
                <div className='w-fit flex flex-row items-center justify-center border-[1px] border-solid border-gray-300 px-1 m-1 rounded-lg'>
                    <input onChange={(e) => handleAmenityChange(e, 'Elevator')} className='px-[5px]' type="checkbox" id="long-term-stays" name="long-term-stays"/>
                    <img className='px-[5px]' src={elevator}/>
                    <p className='text-xs'>Elevator</p>
                </div>
            </div>
        </div>
    </div>
  )
}
