// ImageUploadComponent.tsx
import React, { useState } from 'react';
import AWS from 'aws-sdk';
import FileUploadContainer from '../../Components/FileUploadContainer';

interface ImageUploadComponentProps {
  onImageUpload: (url: string) => void;
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({ onImageUpload }) => {
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadImageToWasabi = async (file: File) => {
    const s3 = new AWS.S3({
      endpoint: 'https://s3.wasabisys.com',
      accessKeyId: 'JM9E72Y6OHG0OSN66HJI',
      secretAccessKey: 'S47F2KkobPeWJYXSWDhHAIjebTVBfXeUlFjMyT8n',
      region: 'us-east-1', // Specify your region
    });

    const params = {
      Bucket: 'realtyyardsimages',
      Key: `${Date.now()}_${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read', 
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImageToWasabi(file);
      onImageUpload(url); // Pass the URL to the parent component
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {/* <FileUploadContainer onFileUpload={handleFileUpload} /> */}
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUploadComponent;  