import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
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
            const response = await axios.get('https://skystayserver-n8xf.onrender.com/requests');
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

            const response = await axios.post('https://skystayserver-n8xf.onrender.com/requests', formattedRequest);
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
            await axios.patch(`https://skystayserver-n8xf.onrender.com/requests/${requestId}`, { status });
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
            await axios.delete(`https://skystayserver-n8xf.onrender.com/requests/${requestId}`);
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

            const response = await axios.get('https://skystayserver-n8xf.onrender.com/myrequests', {
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