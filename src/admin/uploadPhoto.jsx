import React, { useState } from "react";
import { usePhoto } from "../context/PhotosContext";
import { FaDownload } from "react-icons/fa";
import { Button, Typography, Sheet, Input, CircularProgress, Card, CardOverflow, IconButton } from "@mui/joy";

const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const { createPhoto, deletePhoto, loading, images } = usePhoto();

  const handleDownload = (imageUrl, imageName) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = imageName;
    link.click();
  };

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
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Iltimos, rasm tanlang!");
    } else {
      await createPhoto(image);
    }
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: "md",
        boxShadow: "sm",
        textAlign: "center",
      }}
    >
      <Typography level="h2" fontSize="lg" mb={2}>
        Rasm yuklash
      </Typography>

      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        sx={{ mb: 2 }}
      />

      {previewUrl && (
        <Card sx={{ width: 200, mx: "auto", mb: 2 }}>
          <CardOverflow>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </CardOverflow>
        </Card>
      )}

      <Button
        onClick={handleUpload}
        variant="solid"
        color="primary"
        sx={{ width: "100%", mb: 3 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size="sm" /> : "Yuklash"}
      </Button>

      {images.length > 0 && (
        <Typography level="h3" fontSize="md" mb={2}>
          Yuklangan rasmlar
        </Typography>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "16px",
        }}
      >
        {images.map((img) => (
          <Card key={img.id} variant="outlined" sx={{ position: "relative" }}>
            <CardOverflow>
              <img
                src={img.image}
                alt="Yuklangan rasm"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </CardOverflow>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <IconButton
                onClick={() =>
                  handleDownload(img.image, `sticker-${img.id}.png`)
                }
                color="neutral"
                variant="plain"
              >
                <FaDownload />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(img.id)}
                color="danger"
                variant="plain"
              >
                Delete
              </IconButton>
            </div>
          </Card>
        ))}
      </div>
    </Sheet>
  );
};

export default UploadPhoto;
