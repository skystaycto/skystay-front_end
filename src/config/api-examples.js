// Example of how to use the dual-environment API configuration
import axios from 'axios';
import API_ENDPOINTS, { getCurrentEnvironment } from './config/api';

// Example 1: Simple GET request with automatic environment detection
const fetchProperties = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.PROPERTY.LIST.url);
    console.log('Properties:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    return null;
  }
};

// Example 2: GET request with ID
const fetchPropertyDetails = async (propertyId) => {
  try {
    const endpoint = API_ENDPOINTS.PROPERTY.DETAIL(propertyId);
    const response = await axios.get(endpoint.url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch property ${propertyId}:`, error);
    return null;
  }
};

// Example 3: POST request
const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.BOOKING.CREATE.url,
      bookingData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create booking:', error);
    return null;
  }
};

// Example 4: Check current environment
const logEnvironment = () => {
  console.log(`Running in ${getCurrentEnvironment()} mode`);
  console.log(`API Base URL: ${API_ENDPOINTS.PROPERTY.BASE.url}`);
};

// Example 5: String conversion (automatic)
const getPromoList = async () => {
  try {
    // The endpoint automatically converts to string with the correct URL
    const response = await axios.get(`${API_ENDPOINTS.PROMO.LIST}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch promos:', error);
    return null;
  }
};

export {
  fetchProperties,
  fetchPropertyDetails,
  createBooking,
  logEnvironment,
  getPromoList
};
