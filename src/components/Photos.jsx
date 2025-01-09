import React from 'react';
import { usePhoto } from '../service/context/PhotosContext';

const Photos = () => {
    const { images } = usePhoto(); // API'dan olingan rasm ma'lumotlari

    const handleDownload = (imageId, imageUrl, imageName) => {
        // imageId'ni dinamik tarzda olish
        const link = document.createElement("a");
        link.href = imageUrl; // API orqali olingan rasm URL manzili
        link.download = imageName; // Yuklab olishdagi fayl nomi
        link.click(); // Yuklab olishni boshlash
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {images.map((img) => (
                <div key={img.id} style={{ textAlign: 'center' }}>
                    <img
                        src={img.image} // API'dan olingan rasm URL manzili
                        className="projects-img"
                        alt="Yuklangan rasm"
                    />
                    <button
                        onClick={() => handleDownload(img.id, img.image, `sticker-${img.id}.png`)} // Bosilgan rasmning id sini uzatamiz
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Install
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Photos;
