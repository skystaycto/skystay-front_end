import { createContext,  useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import API_ENDPOINTS from '../config/api';
import Swal from 'sweetalert2';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/sweetalert-custom.css'


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
                const response = await axios.get(API_ENDPOINTS.CUSTOM.AUTHENTICATED_USER, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data?.data || response.data);
            } catch (error) {
                console.error("Auth Check Error: ", error.response?.data);
                if (error.response?.status === 401) {
                    await refreshToken();
                }
            }
        };

        checkAuthStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const loginUser = async (userdata) => {
        try {
            const response = await axios.post(API_ENDPOINTS.CUSTOM.LOGIN, userdata);
            const accessToken = response.data?.data?.token?.access_token || response.data?.access_token;
            const refreshTokenStr = response.data?.data?.token?.refresh_token || response.data?.refresh_token;

            localStorage.setItem('access_token', accessToken);
            if (refreshTokenStr) {
                localStorage.setItem('refresh_token', refreshTokenStr);
            }
            const userResponse = await axios.get(API_ENDPOINTS.CUSTOM.AUTHENTICATED_USER, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setUser(userResponse.data?.data || userResponse.data);
            console.log(userResponse.data?.data || userResponse.data);
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
            await axios.post(API_ENDPOINTS.CUSTOM.LOGOUT, {}, {
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
            await axios.post(API_ENDPOINTS.CUSTOM.FORGOT_PASSWORD, { email });
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
            await axios.post(API_ENDPOINTS.CUSTOM.RESET_PASSWORD, data);
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
            const response = await axios.post(API_ENDPOINTS.CUSTOM.REFRESH, {}, {
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
            const response = await axios.post(API_ENDPOINTS.CUSTOM.REGISTER, userdata);
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
            const response = await axios.post(API_ENDPOINTS.CUSTOM.VERIFY, userdata);
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
            const response = await axios.get(API_ENDPOINTS.CUSTOM.ALL_USERS, {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Dependency array should be empty if this function doesn't rely on external variables
    
    const updateUser = async (userData) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.error('No token found, please log in.');
            return;
        }
    
        try {
            // Make PUT request to update user profile
            await axios.put(API_ENDPOINTS.CUSTOM.UPDATE_USER, userData, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // After successful update, fetch updated user data from backend
            const getUserResponse = await axios.get(API_ENDPOINTS.CUSTOM.GET_USER, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // Update local user state with fetched updated user data
            setUser(getUserResponse.data?.data || getUserResponse.data?.user || getUserResponse.data);
    
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
            await axios.put(API_ENDPOINTS.CUSTOM.UPDATE_USER_STATUS(userId), { account_status: status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // After successful update, fetch updated user data from backend
            const getUserResponse = await axios.get(API_ENDPOINTS.CUSTOM.ALL_USERS, {
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
            await axios.put(API_ENDPOINTS.CUSTOM.UPDATE_USER_ROLE(userId), { role }, {
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
          // const decoded = jwtDecode(credential);
    
          // Send the Google credential to your backend
          const response = await axios.post(API_ENDPOINTS.CUSTOM.GOOGLE_LOGIN, {
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
