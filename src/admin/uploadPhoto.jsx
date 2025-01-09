import React, { useState } from "react";
import { usePhoto } from "../service/context/PhotosContext";

const UploadPhoto = () => {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const { createPhoto, deletePhoto, loading, error, images } = usePhoto()

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                setImage(reader.result);

            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = async (imageId) => {
        try {
            await deletePhoto(imageId);
            // window.location.reload();
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Iltimos, rasm tanlang!");
        } else {
            await createPhoto(image);
            console.log(image);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Rasm yuklash</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && (
                <div style={{ margin: "20px 0" }}>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        style={{ width: "200px", borderRadius: "10px" }}
                    />
                </div>
            )}
            <button
                onClick={handleUpload}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",

                }}
            >
                {loading ? "Loading..." : "Yuklash"}
            </button>

            {
                images.map((img) => (
                    <div key={img.id}>
                        <img src={img.image} className='projects-img' alt="dsd" />
                        <button onClick={() => handleDelete(img.id)}>Delete</button>
                    </div>
                ))
            }
        </div>
    );
};

export default UploadPhoto;
