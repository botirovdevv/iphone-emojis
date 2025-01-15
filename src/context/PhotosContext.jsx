import React, { createContext, useContext, useState, useEffect } from 'react';
import photosApi from '../service/api/photos.api.service';
import { api } from '../service/api';

const PhotosContext = createContext();

export const usePhoto = () => useContext(PhotosContext);

export const PhotosProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const clearError = () => setError(null);
    const clearSuccess = () => setSuccess(false);

    const getAllPhotos = async () => {
        setLoading(true);
        try {
            const response = await api.get('/images');
            setImages(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const createPhoto = async (image) => {
        setLoading(true);
        clearError();
        clearSuccess();
        try {
            await photosApi.createPhoto({ image }).then(async (res) => {
                if (res.data) {
                    setSuccess(true)
                    setSuccess(true);
                    await getAllPhotos();
                }
            })

        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const deletePhoto = async (imageId) => {
        setLoading(true);
        clearError();
        try {
            await photosApi.deletePhoto(imageId);
            await getAllPhotos();
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const updatePhoto = async (id, image) => {
        setLoading(true);
        clearError();
        clearSuccess();
        try {
            await photosApi.updatePhoto(id, { image });
            setSuccess(true);
            await getAllPhotos();
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllPhotos();
    }, []);

    return (
        <PhotosContext.Provider value={{
            images,
            loading,
            error,
            success,
            createPhoto,
            getAllPhotos,
            deletePhoto,
            updatePhoto,
            clearError,
            setImages,
            clearSuccess
        }}>
            {children}
        </PhotosContext.Provider>
    );
};