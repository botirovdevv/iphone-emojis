import { api } from "../api";

const photosApi = {
    getAllPhotos: async () => {
        try {
            const response = await api.get('/images');
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createPhoto: async (data) => {
        try {
            const response = await api.post('/images', data);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deletePhoto: async (imageId) => {
        try {
            const response = await api.delete(`/images/${imageId}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;    
        }
    },

    updatePhoto: async (id, data) => {
        try {
            const response = await api.put(`/images/${id}`, data);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
};

export default photosApi;