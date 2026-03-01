import React,{useState, useContext} from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
// import share from '../assets/share.svg'
import dots from '../assets/dots.svg'
import '../css/Dashboard.css'
export default function ServiceCard({service, toggleEditForm, setSelectedService}) {

    const [editVisible, setEditVisible] = useState(false);

    const { deleteService } = useContext(CheckoutContext);

    const handleEditClick = () => {
        setEditVisible(!editVisible);
    };

  return (
    <div className='w-[300px] font-outfit flex flex-col m-[10px]  border-[1px] border-solid border-gray-300 p-[10px] rounded-sm '>
        <div className='w-full flex  justify-between'>
            <div className='dotcontainer flex flex-col items-center justify-center'>
                <img onClick={handleEditClick} className='h-[16px] cursor-pointer' src={dots} alt='share'/>
                {editVisible && (
                    <div className='menucont w-[100px] bg-white rounded-sm p-[5px] border-[1px] border-solid border-gray-300 flex flex-col items-center justify-center'>
                        <p className='text-[10px] self-end underline cursor-pointer' onClick={handleEditClick}>Close</p>
                        <button className='editbtn4' onClick={() => { setSelectedService(service.id); toggleEditForm();}}>Edit service</button>
                        <button onClick={() => deleteService(service.id)} className='editbtn4'>Delete service</button>
                    </div>
                )}
            </div>
        </div>
        <div className='my-[10px]'>
            <img className='w-full rounded-[4px]' src={service.service_image} />
        </div>
        <div>
            <p className='font-light'>{service.service_name} <span className='font-bold'>${service.service_price}</span></p>
            <p className='text-sm font-medium overflow-hidden'>{service.service_description}</p>
        </div>
    </div>
  )
}

