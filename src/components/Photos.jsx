import React from 'react';
import { usePhoto } from '../service/context/PhotosContext';
import { FaDownload } from 'react-icons/fa'; // Install tugmasi uchun ikonka

const Photos = () => {
    const { images } = usePhoto(); // API'dan olingan rasm ma'lumotlari
    const reversedArray = [...images].reverse();

    const handleDownload = (imageId, imageUrl, imageName) => {
        const link = document.createElement("a");
        link.href = imageUrl; // API orqali olingan rasm URL manzili
        link.download = imageName; // Yuklab olishdagi fayl nomi
        link.click(); // Yuklab olishni boshlash
    };

    return (
        <div className="photos-container">
            {reversedArray.map((img) => (
                <div key={img.id} className="photo-card">
                    <img
                        src={img.image} // API'dan olingan rasm URL manzili
                        alt="Yuklangan rasm"
                    />
                    <button onClick={() => handleDownload(img.id, img.image, `sticker-${img.id}.png`)}>
                        <FaDownload />
                    </button>
                
                </div>
            ))}
        </div>
    );
};

export default Photos;
