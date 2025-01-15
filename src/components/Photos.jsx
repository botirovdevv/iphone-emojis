import React, { useState, useMemo } from "react";
import { usePhoto } from "../context/PhotosContext";
import { FaDownload } from "react-icons/fa";
import Skeleton from "@mui/joy/Skeleton";

const Photos = () => {
    const { images } = usePhoto(); // API'dan rasm ma'lumotlari
    const reversedArray = useMemo(() => [...images].reverse(), [images]); // Reverse array faqat bir marta hisoblanadi

    const [loaded, setLoaded] = useState({}); // Har bir rasm uchun yuklangan holatni saqlash

    const handleDownload = (imageId, imageUrl, imageName) => {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = imageName;
        link.click();
    };

    const handleImageLoad = (id) => {
        setLoaded((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div className="photos-container">
            {reversedArray.map((img) => (
                <div key={img.id} className="photo-card">
                    {/* Skeleton yoki haqiqiy rasm */}
                    {!loaded[img.id] && (
                        <Skeleton 
                            variant="rectangular" 
                            width={100} 
                            height={100} 
                            sx={{ borderRadius: "8px" }} 
                        />
                    )}
                    <img
                        src={img.image}
                        alt={`Sticker ${img.id}`}
                        width={50}
                        style={{ display: loaded[img.id] ? "block" : "none" }}
                        onLoad={() => handleImageLoad(img.id)}
                        loading="lazy"
                    />
                    <button 
                        onClick={() => handleDownload(img.id, img.image, `sticker-${img.id}.png`)}
                        className="download-button"
                        title="Download image"
                    >
                        <FaDownload fontSize={14} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Photos;
