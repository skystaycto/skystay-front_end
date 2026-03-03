import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';
import { toast, Slide } from 'react-toastify';
import API_ENDPOINTS from '../config/api';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';

export const BlogsContext = createContext()

export default function BlogsProvider({ children }) { 

    const navigate = useNavigate();

    const [allblogs, setAllBlogs] = useState([]);

    useEffect(() => {
        getallblogs();
      }, []);
    
    const getallblogs = async () => {   
        try {
            const response = await axios.get(API_ENDPOINTS.BLOG.LIST);
            setAllBlogs(response.data)
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    }

    const getsingleblog = async (id) => {
        try {
            const response = await axios.get(API_ENDPOINTS.BLOG.DETAIL(id));
            return response.data
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    }  

    const addBlog = async (newBlog) => {
        try {
            const response = await axios.post(API_ENDPOINTS.BLOG.CREATE, newBlog);
            if (response.status === 201) {
                showToast('Blog added successfully!');
                navigate('/blog'); // Redirect to the property detail page or another appropriate page
            }
        } catch (error) {
            console.error('Error adding blog:', error);
            handleAxiosError(error);    
        }
    };

    const updateBlog = async (id, updatedBlog) => {
        try {
            await axios.put(API_ENDPOINTS.BLOG.UPDATE(id), updatedBlog);
            showToast('Blog updated successfully!');
            navigate('/blog');
        } catch (error) {
            console.error('Error updating blog:', error);
            handleAxiosError(error);
        }
    };  

    const deleteBlog = async (id) => {
        try {
            await axios.delete(API_ENDPOINTS.BLOG.DELETE(id));
            setAllBlogs(allblogs.filter(blog => blog.id !== id));
            showToast('Blog deleted successfully!');
        } catch (error) {
            console.error('Error deleting blog:', error);
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
        allblogs,
        getallblogs,
        addBlog,
        updateBlog,
        deleteBlog,
        getsingleblog,
    }

    return (
        <BlogsContext.Provider value={contextData}>
            {children}
        </BlogsContext.Provider>
    )
}