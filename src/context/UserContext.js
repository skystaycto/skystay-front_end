import { createContext,  useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/sweetalert-custom.css'
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [allusers, setAllusers] = useState([]);


    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) return;

            try {
                const response = await axios.get('https://skystayserver-n8xf.onrender.com/authenticated_user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Auth Check Error: ", error.response?.data);
                if (error.response?.status === 401) {
                    await refreshToken();
                }
            }
        };

        checkAuthStatus();
    }, []);


    const loginUser = async (userdata) => {
        try {
            const response = await axios.post('https://skystayserver-n8xf.onrender.com/login', userdata);
            localStorage.setItem('access_token', response.data.access_token);
            if (response.data.refresh_token) {
                localStorage.setItem('refresh_token', response.data.refresh_token);
            }
            const userResponse = await axios.get('https://skystayserver-n8xf.onrender.com/authenticated_user', {
                headers: { Authorization: `Bearer ${response.data.access_token}` }
            });
            setUser(userResponse.data);
            console.log(userResponse.data);
            toast.success('Login successful!', {
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
        } catch (error) {
            console.error("Login Error: ", error.response?.data);
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : "Login failed!";
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Login Error',
                text: errorMessage,
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        }
    };

    const logoutUser = async () => {
        try {
            await axios.post('https://skystayserver-n8xf.onrender.com/logout', {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setUser(null);
            toast.success('Logout successful!', {
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
        } catch (error) {
            console.error("Logout Error: ", error.response?.data);
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : "Logout failed!";
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Logout Error',
                text: errorMessage,
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        }
    };

    const forgotPassword = async (email) => {
        try {
            const response = await axios.post('https://skystayserver-n8xf.onrender.com/forgot_password', { email });
            toast.success('Verification code sent to your email!', {
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
        } catch (error) {
            console.error("Forgot Password Error: ", error.response?.data);
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : "Failed to send verification code!";
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Forgot Password Error',
                text: errorMessage,
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        }
    };

    const resetPassword = async (data) => {
        try {
            const response = await axios.post('https://skystayserver-n8xf.onrender.com/reset_password', data);
            toast.success('Password reset successful!', {
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
        } catch (error) {
            console.error("Reset Password Error: ", error.response?.data);
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : "Failed to reset password!";
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Reset Password Error',
                text: errorMessage,
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        }
    };

    const refreshToken = async () => {
        try {
            const response = await axios.post('https://skystayserver-n8xf.onrender.com/refresh', {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('refresh_token')}` }
            });
            localStorage.setItem('access_token', response.data.access_token);
        } catch (error) {
            console.error("Refresh Token Error: ", error.response?.data);
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : "Failed to refresh token!";
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Refresh Token Error',
                text: errorMessage,
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
            logoutUser();
        }
    };

    const registerUser = async (userdata) => {
        try {
            const response = await axios.post('https://skystayserver-n8xf.onrender.com/register', userdata);
            console.log(response.data);
            toast.success('Registration successful! Please check your email for verification.', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                closeButton: false,
            });
            navigate('/verification', { state: { email: userdata.email } });
        } catch (error) {
            console.error("Registration Error: ", error.response?.data);
            const errorMessage = error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : "Registration failed!";
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Registration Error',
                text: errorMessage,
                showConfirmButton: false,
                timer: 5000,
                iconColor: '#FF385C',
            });
        }
    };

    const verifyUser = async (userdata) => {
        try {
            const response = await axios.post('https://skystayserver-n8xf.onrender.com/verify', userdata);
            console.log(response.data);
            toast.success('Verification successful!', {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                closeButton: false,
            });
            navigate('/'); // or wherever you want to navigate on successful verification
        } catch (error) {
            console.error("Verification Error: ", error.response?.data);
            const errorMessage = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Verification failed!";
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Verification Error',
                text: errorMessage,
                showConfirmButton: false,
                timer: 3000,
                iconColor: '#FF385C',
            });
        }
    };

    const getallusers = useCallback(async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('No token found, please log in.');
            return;
        }
    
        try {
            const response = await axios.get('https://skystayserver-n8xf.onrender.com/allusers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Get all users response :", response.data);
            setAllusers(response.data); // Update the state
        } catch (error) {
            console.error("Error fetching users: ", error.response?.data);
            if (error.response?.status === 401) {
                toast.error('Unauthorized access, please log in again.');
                navigate('/dashboard');
            } else {
                toast.error('Failed to fetch users.');
            }
        }
    }, []); // Dependency array should be empty if this function doesn't rely on external variables
    
    const updateUser = async (userData) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('No token found, please log in.');
            return;
        }
    
        try {
            // Make PUT request to update user profile
            const response = await axios.put('https://skystayserver-n8xf.onrender.com/user', userData, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // After successful update, fetch updated user data from backend
            const getUserResponse = await axios.get('https://skystayserver-n8xf.onrender.com/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // Update local user state with fetched updated user data
            setUser(getUserResponse.data.user);
    
            toast.success('User profile updated successfully!',{
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
        } catch (error) {
            console.error("Error updating user: ", error.response?.data);
            if (error.response?.status === 401) {
                toast.error('Unauthorized access, please log in again.');
                navigate('/dashboard');
            } else {
                toast.error('Failed to update user profile.');
            }
        }
    };

    const updateUserStatus = async (userId, status) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('No token found, please log in.');
            return;
        }
    
        try {
            // Make PUT request to update user status
            const response = await axios.put(`https://skystayserver-n8xf.onrender.com/user/${userId}/status`, { account_status: status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // After successful update, fetch updated user data from backend
            const getUserResponse = await axios.get('https://skystayserver-n8xf.onrender.com/allusers', {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // Update local user state with fetched updated user data
            setAllusers(getUserResponse.data);
    
            toast.success('User status updated successfully!',{
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
        } catch (error) {
            console.error("Error updating user status: ", error.response?.data);
            if (error.response?.status === 401) {
                toast.error('Unauthorized access, please log in again.');
                navigate('/dashboard');
            } else {
                toast.error('Failed to update user status.');
            }
        }
    };

    const updateUserRole = async (userId, role) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('No token found, please log in.');
            return;
        }
    
        try {
            // Make PUT request to update user role
            const response = await axios.put(`https://skystayserver-n8xf.onrender.com/user/${userId}/role`, { role }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // After successful update, fetch updated user data from backend
            const getUserResponse = await axios.get('/allusers', {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // Update local user state with fetched updated user data
            setAllusers(getUserResponse.data);
    
            toast.success('User role updated successfully!',{
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
        } catch (error) {
            console.error("Error updating user role: ", error.response?.data);
            if (error.response?.status === 401) {
                toast.error('Unauthorized access, please log in again.');
                navigate('/dashboard');
            } else {
                toast.error('Failed to update user role.');
            }
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
          const credential = credentialResponse.credential;
          const decoded = jwtDecode(credential);
    
          // Send the Google credential to your backend
          const response = await axios.post('https://skystayserver-n8xf.onrender.com/google-login', {
            credential,
          });
    
          // Handle the response from the backend
          if (response.status === 200 || response.status === 201) {
            // Assuming the response contains the user data
            const user = response.data;
            // Update the user context
            setUser(user);
            // Store tokens in localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('access_token', response.data.access_token);
            if (response.data.refresh_token) {
                localStorage.setItem('refresh_token', response.data.refresh_token);
            }
            toast.success('Google Login successful!', {
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
            navigate('/'); // Adjust the route as necessary
            window.location.reload();
          } else {
            console.error('Google login failed', response);
          }
        } catch (error) {
          console.error('Google login error', error);
        }
    };

    const contextData = {
        user,
        setUser,
        allusers,
        getallusers,
        updateUser,
        updateUserStatus,
        updateUserRole,
        loginUser,
        logoutUser,
        forgotPassword,
        resetPassword,
        refreshToken,
        registerUser,
        verifyUser,
        handleGoogleSuccess,
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
            <ToastContainer />
        </UserContext.Provider>
    );
}
