import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast, Slide } from 'react-toastify';
import API_ENDPOINTS from '../config/api';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';

export const PropertyContext = createContext()

const CACHE_TIMEOUT = 15 * 60 * 1000; // 15 minutes

let propertiesCache = {
    data: null,
    timestamp: null,
};


export default function PropertyProvider ({children}){ 

    const [allproperties, setAllproperties] = useState([])
    
    const navigate = useNavigate()
    
    const addProperty = async ( newProperty) => {
        try {
            const response = await axios.post(API_ENDPOINTS.PROPERTY.CREATE, newProperty);
            if (response.status === 201) {
                toast.success('Property Listed!', {
                    position: "top-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                    closeButton: false,
                });
                navigate('/'); // Redirect to the property detail page or another appropriate page
            }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Failed to add request',
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        }
    };

    const fetchProperties = async () => {
        const now = new Date().getTime();

        // Check if we have cached data and if it's still valid
        if (propertiesCache.data && (now - propertiesCache.timestamp < CACHE_TIMEOUT)) {
            setAllproperties(propertiesCache.data);
            return;
        }

        try {
            const response = await axios.get(API_ENDPOINTS.PROPERTY.LIST);
            setAllproperties(response.data);

            // Update cache
            propertiesCache = {
                data: response.data,
                timestamp: now,
            };
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch properties',
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        } 
    };

    
    const fetchPropertiesNoCache = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.PROPERTY.LIST);
            setAllproperties(response.data);
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch properties',
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        } 
    };

    
    const updatePropertyWithNewDates = async (propertyId, checkinDate, checkoutDate, existingDates) => {
        const getDatesBetween = (start, end) => {
            const dates = [];
            let currentDate = new Date(start);
            currentDate.setDate(currentDate.getDate() + 1); 
            const endDate = new Date(end);
    
            // Correct the logic to include the start date
            while (currentDate <= endDate) { // Include the check-out date
                dates.push(currentDate.toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }
    
            return dates;
        };
    
        const newDates = getDatesBetween(checkinDate, checkoutDate);
        const allDates = Array.from(new Set([...existingDates.split(','), ...newDates])).join(',');
    
        console.log(`Updating property ${propertyId} with dates:`, allDates);
    
        try {
            const response = await axios.put(API_ENDPOINTS.PROPERTY.UPDATE(propertyId), { dates_booked: allDates });
            console.log('Server response:', response.data);
            fetchProperties(); // Assuming this refreshes the property data
            return response.data;
        } catch (error) {
            console.error('Error updating booked dates:', error);
        }
    };


    const updateProperty = async (propertyId, data) => {
        try {
            const response = await axios.put(API_ENDPOINTS.PROPERTY.UPDATE(propertyId), data);
            console.log('Server response:', response.data);
            fetchProperties(); // Assuming this refreshes the property data
            return response.data;
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };
    
    const contextData = {
        addProperty,
        allproperties,
        fetchProperties,
        fetchPropertiesNoCache,
        updatePropertyWithNewDates,
        updateProperty
    }

    return (
        <PropertyContext.Provider value={ contextData }>
            {children}
        </PropertyContext.Provider>
    )
}