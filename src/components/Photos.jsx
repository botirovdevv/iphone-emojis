import React, { useState, useMemo } from "react";
import { usePhoto } from "../context/PhotosContext";
import { FaDownload } from "react-icons/fa";
import Skeleton from "@mui/joy/Skeleton";

const Photos = () => {
    const { images } = usePhoto();
    const reversedArray = useMemo(() => [...images].reverse(), [images]);

    const [loaded, setLoaded] = useState({});

    const handleDownload = async (imageId, imageUrl, imageName) => {
        try {
            // Telegram ichida ochish o'rniga brauzerga yo'naltirish
            openInBrowser(imageUrl);
        } catch (error) {
            console.error("Error opening image in browser:", error);
        }
    };

    const openInBrowser = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleImageLoad = (id) => {
        setLoaded((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div className="photos-container">
            {reversedArray.map((img) => (
                <div key={img.id} className="photo-card">
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
                        title="Open in browser"
                    >
                        <FaDownload fontSize={14} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Photos;