import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { pastbookings } from '../constants/listings'
import axios from 'axios'
import Swal from 'sweetalert2';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';


export const LikesContext = createContext()

export default function LikesProvider({ children }) {

    const [likes, setLikes] = useState([]);

    useEffect(() => {
        fetchLikes();
    }, []);

    const fetchLikes = async () => {
        try {
            const response = await axios.get('https://skystayserver-n8xf.onrender.com/likes');
            setLikes(response.data);
        } catch (error) {
            console.error('Error fetching likes:', error);
            toast.error('Failed to fetch likes', {
                transition: Slide,
            });
        }
    };

    const addLike = async (likeData) => {
        try {
            const response = await axios.post('https://skystayserver-n8xf.onrender.com/likes', likeData);
            setLikes([...likes, { ...likeData, id: response.data.id }]);
            showToast('Added to Favorites');
        } catch (error) {
            console.error('Error adding like:', error);
            handleAxiosError(error);
        }
    };

    const deleteLike = async (userId, propertyId) => {
        try {
            await axios.delete(`https://skystayserver-n8xf.onrender.com/likes/${userId}/${propertyId}`);
            setLikes(likes.filter(like => !(like.user_id === userId && like.property_id === propertyId)));
            showToast('Removed from Favorites');
        } catch (error) {
            console.error('Error deleting like:', error);
            handleAxiosError(error);
        }
    };

    const showToast = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
            closeButton: false,
        });
    };

    const handleAxiosError = (error) => {
        console.error('Error: ', error);
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
    };

    const contextData = {
        likes,
        fetchLikes,
        addLike,
        deleteLike
    }
    return (
        <LikesContext.Provider value={contextData}>
            {children}
        </LikesContext.Provider>
    )
}
