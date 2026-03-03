import { createContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast, Slide } from 'react-toastify';
import API_ENDPOINTS from '../config/api';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';

export const PromoCodesContext = createContext();

const CACHE_TIMEOUT = 15 * 60 * 1000; // 15 minutes

let promocodesCache = {
    data: null,
    timestamp: null,
};

export default function PromoCodesProvider({ children }) {

    const [allpromocodes, setAllpromocodes] = useState([]);
    const [allfeatures, setAllFeatures] = useState([]);

    const fetchAllPromocodes = async () => {
        const now = new Date().getTime();

        // Check if we have cached data and if it's still valid
        if (promocodesCache.data && (now - promocodesCache.timestamp < CACHE_TIMEOUT)) {
            setAllpromocodes(promocodesCache.data);
            return;
        }

        try {
            const response = await axios.get(API_ENDPOINTS.PROMO.LIST);
            if (response.status === 200) {
                setAllpromocodes(response.data);

                // Update cache
                promocodesCache = {
                    data: response.data,
                    timestamp: now,
                };
            }
        } catch (error) {
            handleAxiosError(error);
        }
    };


    // Fetch promocodes without cache
    const fetchAllPromocodesWithoutCache = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.PROMO.LIST);
            if (response.status === 200) {
                setAllpromocodes(response.data);
            }
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const addPromocode = async (promocodeData) => {
        try {
            const response = await axios.post(API_ENDPOINTS.PROMO.CREATE, promocodeData);
            if (response.status === 201) {
                await fetchAllPromocodesWithoutCache();
                showToast('Promocode created successfully!');
                return response.data.id;
            }
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const deletePromocode = async (promocode_id) => {
        try {
            const response = await axios.delete(API_ENDPOINTS.PROMO.DETAIL(promocode_id));
            if (response.status === 200) {
                await fetchAllPromocodesWithoutCache();
                showToast('Promocode deleted successfully!');
                return response.data.id;
            }
        } catch (error) {
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

    const fetchAllFeatures = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.FEATURES.LIST);
            setAllFeatures(response.data);
        } catch (error) {
            console.error('Error fetching all features:', error);
        }
    };

    const addFeature = async (featureData) => {
        try {
            const response = await axios.post(API_ENDPOINTS.FEATURES.CREATE, featureData);
            if (response.status === 201) {
                await fetchAllFeatures();
                showToast('Feature added successfully!');
                return response.data.id;
            }
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const deleteFeature = async (feature_id) => {
        try {
            const response = await axios.delete(API_ENDPOINTS.FEATURES.DELETE(feature_id));
            if (response.status === 200) {
                await fetchAllFeatures();
                showToast('Feature deleted successfully!');
                return response.data.id;
            }
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const contextData = {
        allpromocodes,
        allfeatures,
        fetchAllFeatures,
        fetchAllPromocodes,
        fetchAllPromocodesWithoutCache,
        addPromocode,
        addFeature,
        deletePromocode,
        deleteFeature
    };

    return (
        <PromoCodesContext.Provider value={contextData}>
            {children}
        </PromoCodesContext.Provider>
    );
}
