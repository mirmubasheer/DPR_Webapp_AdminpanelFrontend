// src/components/ImageUpload.tsx
import React, { useState, useEffect } from 'react';

interface ImageUploadProps {
  label: string;
  onImageChange: (image: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onImageChange }) => {
  const [image, setImage] = useState<{ file: File; preview: string } | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageObj = {
        file,
        preview: URL.createObjectURL(file),
      };
      setImage(imageObj);
      onImageChange(imageObj.file); // Pass image up to parent
    }
  };

  const handleRemoveImage = () => {
    if (image) {
      URL.revokeObjectURL(image.preview); // Clean up the URL
      setImage(null);
      onImageChange(null); // Notify parent to clear image
    }
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

  return (
    <div className="image-uploader">
      <label htmlFor="ImageUploadLabel" className="image-uploader__label">
        <span className="d-none">{label}</span>
      </label>
      <input
        type="file"
        className="image-uploader__input"
        id="ImageUploadLabel"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;
