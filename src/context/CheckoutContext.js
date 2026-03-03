import { createContext, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast, Slide } from 'react-toastify';
import API_ENDPOINTS from '../config/api';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';

export const CheckoutContext = createContext()

export default function CheckoutProvider({children}){

    const [allservices, setAllServices] = useState([]);

    const addCheckout = async (checkoutDetails) => {
        try {
            const response = await axios.post(API_ENDPOINTS.CHECKOUT.CREATE, checkoutDetails);
            if (response.status === 201) {
                toast.success('Stay Booked!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Slide,
                    closeButton: false,
                });
                return response.data.id;
            }
        } catch (error) {
            console.error('Error adding checkout: ', error);
            if (error.response && error.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.error,
                });
            } else {
                console.error('Error adding checkout: ', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        }
    };

    
    const fetchAllServices = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.ADDITIONAL_SERVICE.LIST);
            if (response.status === 200) {
                setAllServices(response.data);

            }
        } catch (error) {
            console.error('Error fetching additional services: ', error);
        }
    }

    const addService = async (serviceData) => {
        try {
            const response = await axios.post(API_ENDPOINTS.ADDITIONAL_SERVICE.CREATE, serviceData);
            if (response.status === 201) {
                toast.success('Service created successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Slide,
                    closeButton: false,
                });
                return response.data.id;
            }
        } catch (error) {
            console.error('Error creating additional service: ', error);
            if (error.response && error.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.error,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        }
    }

    const editService = async (serviceData, additionalservice_id) => {
        try {
            const response = await axios.put(API_ENDPOINTS.ADDITIONAL_SERVICE.UPDATE(additionalservice_id), serviceData);
            if (response.status === 200) {
                fetchAllServices();
                toast.success('Service updated successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Slide,
                    closeButton: false,
                });
                return response.data.id;
            }
        } catch (error) {
            console.error('Error updating additional service: ', error);
            if (error.response && error.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.error,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        }
    }

    const deleteService = async (additionalservice_id) => {
        try {
            const response = await axios.delete(API_ENDPOINTS.ADDITIONAL_SERVICE.DELETE(additionalservice_id));
            if (response.status === 200) {
                fetchAllServices();
                toast.success('Service deleted successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Slide,
                    closeButton: false,
                });
                return response.data.id;
            }
        } catch (error) {
            console.error('Error deleting additional service: ', error);
            if (error.response && error.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.error,
                });
            } else {
                console.error('Error deleting additional service: ', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        }
    }

    const contextData = { 
        addCheckout,
        allservices,
        fetchAllServices,
        addService,
        editService,
        deleteService   
    }

    return (
        <CheckoutContext.Provider value={ contextData }>
            {children}
        </CheckoutContext.Provider>
    )
}