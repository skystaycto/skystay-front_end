import React, { useState, useEffect,useContext } from 'react'
import axios from 'axios';
import API_ENDPOINTS from '../config/api';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './ui/button'
import { CheckoutContext } from '../context/CheckoutContext';

export default function EditService({toggleEditForm, selectedService}) {

  const {editService} = useContext(CheckoutContext)
  const [, setService] = useState({});

  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios.get(API_ENDPOINTS.PROPERTY.SINGLE_SERVICE(selectedService))
    .then((response) => {
      setService(response.data);
      setName(response.data.service_name);
      setPrice(response.data.service_price);
      setDescription(response.data.service_description);
      setImage(response.data.service_image);
    })
    .catch((error) => {
      console.error('Error fetching service:', error);
    });
  },[selectedService])

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Set the imageFile state
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlEditService = async () => {
    let imageUrl = image;

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const response = await fetch(API_ENDPOINTS.UPLOAD.UPLOAD_SINGLE, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          imageUrl = result.secure_url;
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        console.error('Failed to upload image:', error);
        toast.error('Failed to upload image.');
        return;
      }
    }

    const serviceData = {
      service_name: name,
      service_description: description,
      service_image: imageUrl,
      service_price: parseInt(price),
    };

    try {
      await editService(serviceData, selectedService);
      toggleEditForm(); // Close edit profile section after successful update
    } catch (error) {
      console.error('Failed to update service:', error);
      toast.error('Failed to update service.');
    }
  };

  return (
    <div className='w-fit mx-auto font-outfit bg-white border-[1px] border-solid border-gray-300 p-[10px] rounded-sm'>
      <p className='text-xs font-light underline cursor-pointer text-blue text-end'  onClick={toggleEditForm}>Close</p>
      <div className='w-fit sm:w-full xsm:w-full mb-[10px]'>
        <p className='text-base text-center font-semibold my-1.5 md:text-base sm:text-base xsm:text-base'>
          Edit Service
        </p>
        <div className='h-1 w-full bg-blue-gradient my-1.5'/>
      </div>
      {/* Input info section */}
      <div className='my-[5px]'>
        <div className='my-[10px]'>
          <p className='text-base font-medium'>Name</p>
          <input className='w-full text-sm font-light border-[1px] border-solid border-gray-300 rounded-sm p-[5px]' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          <p className='text-base font-medium'>Price(USD)</p>
          <div className=' my-[5px]'>
            <label className='w-full md:w-auto sm:w-auto xsm:w-auto'>
              <input type='number' className='w-full text-sm font-light border-[1px] border-solid border-gray-300 rounded-sm p-[5px]' placeholder='USD' value={price} onChange={(e) => setPrice(e.target.value)}/>
            </label>
          </div>
        </div>
        <div className='my-[10px]'>
          <p className='text-base font-medium'>Service Description</p>
          <textarea className='w-full xsm:w-[100%] h-[140px] my-[5px] text-sm font-light border-[1px] border-solid border-gray-300 rounded-sm p-[5px] outline-none' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        {/* Upload Image */}
        <div className='my-[10px]'>
          <label htmlFor='imageUpload' className='text-sm'>
            Upload Service Image
          </label>
          <input type='file' id='imageUpload' accept='image/*' onChange={handleImageChange} />
          {image && (
            <div>
              <img src={image} alt='Selected' style={{ width: '100%', height: 'auto' }} />
            </div>
          )}
        </div>
        <div className='my-[10px] flex flex-col items-center justify-center'>
          <Button variant='promo' onClick={handlEditService} >SAVE</Button>
        </div>
      </div>
    </div>
  )
}
