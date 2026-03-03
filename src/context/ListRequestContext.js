import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import API_ENDPOINTS from '../config/api';
import Swal from 'sweetalert2';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/sweetalert-custom.css'

export const ListRequestContext = createContext()

export default function ListRequestProvider({ children }) {

    const [requests, setRequests] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    
    const fetchRequests = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.CUSTOM.REQUESTS);
            setRequests(response.data);
        } catch (err) {
            setError(err);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch requests',
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        } 
    };

    const addRequest = async (newRequest) => {
        try {

            // Format the date to match the backend's expected format
            const formattedRequest = {
                ...newRequest,
                date_submitted: newRequest.date_submitted.toISOString().split('T')[0], // Format date to YYYY-MM-DD
            };

            const response = await axios.post(API_ENDPOINTS.CUSTOM.REQUESTS, formattedRequest);
            setRequests([...requests, response.data]);
            toast.success('Request Added!', {
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
            navigate('/');
        } catch (err) {
            setError(err);
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

    const editRequestStatus = async (requestId, status) => {
        try {
            await axios.patch(API_ENDPOINTS.CUSTOM.REQUEST_DETAIL(requestId), { status });
            setRequests(requests.map(req => req.id === requestId ? { ...req, status } : req));
            toast.success('Status Updated!', {
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
        } catch (err) {
            setError(err);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Failed to update status',
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        }
    };

    const deleteRequest = async (requestId) => {
        try {
            await axios.delete(API_ENDPOINTS.CUSTOM.REQUEST_DETAIL(requestId));
            setRequests(requests.filter(req => req.id !== requestId));
            toast.success('Request Deleted!', {
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
            navigate('/');
        } catch (err) {
            setError(err);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete request',
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        }
    };

    const getMyRequests = async () => {
        try {
            // Simulate loading
            toast.info('Loading your requests...', {
                position: "top-left",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                closeButton: false,
            });

            const response = await axios.get(API_ENDPOINTS.CUSTOM.MY_REQUESTS, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMyRequests(response.data);
            toast.dismiss(); // Dismiss the loading toast on success
        } catch (err) {
            setError(err);
            toast.dismiss(); // Dismiss the loading toast on error
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch your requests',
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        }
    };

    const contextData = {
        requests,
        myRequests,
        error,
        fetchRequests,
        addRequest,
        editRequestStatus,
        deleteRequest,
        getMyRequests
    };

    return (
        <ListRequestContext.Provider value={ contextData }>
            {children}
        </ListRequestContext.Provider>
    )
}