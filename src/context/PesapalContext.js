import { createContext, useState } from "react";
import axios from 'axios';
import API_ENDPOINTS from '../config/api';

export const PesapalContext = createContext();

export default function PesapalProvider({ children }) {

    const [token, setToken] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [orderData, setOrderData] = useState({});
    const [notificationid] = useState('879bc49d-2d1b-4977-8f46-dcacffd962dd');
    // eslint-disable-next-line no-unused-vars
    const [callback_url, setCallback_url] = useState('https://www.skystay.homes/paymentresponse');
    // Gotten from order Request
    // eslint-disable-next-line no-unused-vars
    const [merchant_reference,setMerchant_reference] = useState('');
    const [redirect_url,setRedirect_url] = useState('');
    const [order_tracking_id, setOrder_tracking_id] = useState('');
    const [payment_status_description, setPayment_status_description] = useState('');

    // Gotten from transaction status
    const [payment_method,setPayment_method] = useState('');
    const [amount,setAmount] = useState(0);
    const [description,setDescription] = useState('');
    const [message,setMessage] = useState('');
    const [currency,setCurrency] = useState('');

    // Utility to get current date and time
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Add transaction data to the database
    const addTransaction = async (data) => {
        try {
            const response = await axios.post(API_ENDPOINTS.CUSTOM.TRANSACTION, data);
            if (response.status === 200 || response.status === 201) {  // Check for 200 or 201
                console.log('Transaction successful:', response.data);
            } else {
                console.error('Transaction failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    // Helper to fetch Pesapal token
    const getPesapalToken = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.CUSTOM.PESAPAL_TOKEN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                return data.token; // Return token for next step
            } else {
                console.error('Error fetching token:', data.message);
                return null;
            }
        } catch (error) {
            console.error('Error fetching token:', error);
            return null;
        }
    };

    // Helper to submit order request
    const orderRequest = async (orderData) => {
      console.log('orderRequest called with orderData:', orderData);

      try {
          setOrderData(orderData);
          console.log('Storing orderData in localStorage:', orderData);
          localStorage.setItem('orderData', JSON.stringify(orderData));
      } catch (error) {
          console.error('Error setting localStorage for orderData:', error);
      }

        const tokenValue = await getPesapalToken();
        console.log('getPesapalToken returned:', tokenValue);
        if (!tokenValue) {
            return null;
        }
        try {
            const response = await axios.post(API_ENDPOINTS.CUSTOM.ORDER_REQUEST, {
                token: tokenValue,
                callback_url,
                notification_id: notificationid,
                orderData: {
                    bookingid: orderData.bookingid,
                    currency: orderData.currency || 'USD',
                    total_price: orderData.total_price,
                    propertyid: orderData.propertyid,
                    guest_email: orderData.guest_email,
                    guest_phone: orderData.guest_phone,
                    guest_firstname: orderData.guest_firstname,
                    guest_lastname: orderData.guest_lastname,
                }
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('orderRequest response:', response);
            if (response.status === 200) {
                setOrder_tracking_id(response.data.order_tracking_id);
                console.log('setting order_tracking_id:', response.data.order_tracking_id);
                localStorage.setItem('order_tracking_id', response.data.order_tracking_id);
                setMerchant_reference(response.data.merchant_reference);
                setRedirect_url(response.data.redirect_url);
                return response.data; // Return order data for next step
            } else {
                console.error('Order request failed:', response.data.message);
                return null;
            }
        } catch (error) {
            console.error('Error submitting order request:', error);
            return null;
        }
    };

    // Helper to get transaction status
    const getTransactionStatus = async (trackingId) => {
        console.log('getTransactionStatus called with trackingId:', trackingId);
        const tokenValue = await getPesapalToken();
        if (!tokenValue) {
            return null;
        }
        try {
            const response = await axios.post(API_ENDPOINTS.CUSTOM.TRANSACTION_STATUS, {
                token: tokenValue,
                order_tracking_id: trackingId,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                const data = response.data;
                setPayment_method(data.payment_method);
                setAmount(data.amount);
                setPayment_status_description(data.payment_status_description);
                localStorage.setItem('payment_status_description', data.payment_status_description);
                setDescription(data.description);
                setMessage(data.message);
                setCurrency(data.currency);
                await addTransaction(data);
                return data; // Return status for final decision
            } else {
                console.error('Transaction status failed:', response.data.message);
                return null;
            }
        } catch (error) {
            console.error('Error getting transaction status:', error);
            return null;
        }
    };
    

    const addToAiosell = async (data) => {
        try {
          const requestData = {
            action: 'book',
            hotelCode: data.propertyid,
            channel: "Goingo",
            bookingId: data.bookingid,
            cmBookingId: "SKYSTAY",
            bookedOn: getCurrentDateTime(),
            checkin: data.checkin_date,
            checkout: data.checkout_date,
            segment: "OTA",
            specialRequests: data.request,
            pah: false,
            amount: {
              amountAfterTax: data.total_price,
              amountBeforeTax: 0,
              tax: 129.0,
              currency: "INR",
            },
            guest: {
              firstName: data.guest_firstname,
              lastName: data.guest_lastname,
              email: data.guest_email,
              phone: data.guest_phone,
              address: {
                line1: 'N/A',
                city: 'N/A',
                state: 'N/A',
                country: 'N/A',
                zipCode: 'N/A',
              },
            },
            rooms: [
                {
                  roomCode: "EXECUTIVE",
                  rateplanCode: "EXECUTIVE-S-101",
                  guestName: `${data.guest_firstname} ${data.guest_lastname}`,
                  occupancy: {
                    adults: 1,
                    children: 0,
                  },
                  prices: [
                    {
                      date: "2024-10-22",
                      sellRate: 537.5,
                    },
                    {
                      date: "2024-10-30",
                      sellRate: 537.5,
                    },
                  ],
                },
            ],
          };
      
          const response = await fetch("https://live.aiosell.com/api/v2/cm/push/sample-ota", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData), // Sending the dynamically generated request data
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const result = await response.json();
          console.log("Response from Aiosell API:", result);
          return result;
        } catch (error) {
          console.error("Error posting to Aiosell API:", error);
          throw error;
        }
    };

    const contextData = {
        token,
        getPesapalToken,
        orderRequest,
        getTransactionStatus,
        redirect_url,
        addToAiosell,
        order_tracking_id,
        // Transaction Status
        payment_method,
        amount,
        payment_status_description,
        description,
        message,
        currency
    }

  return (
    <PesapalContext.Provider value={contextData}>
      {children}
    </PesapalContext.Provider>
  )
}
