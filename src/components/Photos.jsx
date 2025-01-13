import React, { useState } from "react";
import { usePhoto } from "../service/context/PhotosContext";
import { FaDownload } from "react-icons/fa"; // Install tugmasi uchun ikonka
import Skeleton from "@mui/joy/Skeleton"; // Joy UI Skeleton komponenti

const Photos = () => {
    const { images } = usePhoto(); // API'dan olingan rasm ma'lumotlari
    const reversedArray = [...images].reverse();

    const [loaded, setLoaded] = useState({}); // Har bir rasm uchun yuklangan holat

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
                    {/* Skeleton yoki haqiqiy rasm */}
                    {!loaded[img.id] && (
                        <Skeleton 
                            variant="rectangular" 
                            width={50} 
                            height={50} 
                            sx={{ borderRadius: "4px" }} 
                        />
                    )}
                    <img
                        src={img.image}
                        alt="Yuklangan rasm"
                        width={50}
                        style={{ display: loaded[img.id] ? "block" : "none" }} // Skeleton tugashi uchun
                        onLoad={() => setLoaded((prev) => ({ ...prev, [img.id]: true }))}
                    />
                    <button onClick={() => handleDownload(img.id, img.image, `sticker-${img.id}.png`)}>
                        <FaDownload fontSize={13} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Photos;
