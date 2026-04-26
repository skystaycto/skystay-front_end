import { createContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { toast, Slide } from 'react-toastify';
import API_ENDPOINTS from '../config/api';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';

export const CommentContext = createContext()

export default function CommentProvider({children}){


    const deleteComment = async (comment_id) => {
        try {
            const confirmation = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            });
            if (confirmation.isConfirmed) {
                const response = await axios.delete(API_ENDPOINTS.SOCIAL.COMMENT(comment_id));
                toast.success('Comment deleted successfully!', {
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
                return response.data;
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }); 
        }
    };


    return (
        <CommentContext.Provider value={{ deleteComment }}>
            {children}
        </CommentContext.Provider>
    )

}