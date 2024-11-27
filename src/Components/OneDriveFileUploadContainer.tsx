// src/components/OneDriveFileUploadContainer.tsx
import React, { FC, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { uploadImageToOneDrive } from '../api/onedriveService';

interface OneDriveFileUploadContainerProps {
  onFileUpload: (url: string) => void;
}

const OneDriveFileUploadContainer: FC<OneDriveFileUploadContainerProps> = ({ onFileUpload }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/gif': [],
      'image/svg+xml': [],
    },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setLoading(true);
      setError(null);

      try {
        const fileUrl = await uploadImageToOneDrive(file);
        onFileUpload(fileUrl);
      } catch (err) {
        console.error('Error uploading image:', err);
        setError('Failed to upload image');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        height: '110px',
        border: '2px dashed #24272C',
        borderRadius: '10px',
        opacity: 0.2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        flexDirection: 'column',
      }}
    >
      <input {...getInputProps()} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Typography>Drag & Drop or Click to Upload</Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default OneDriveFileUploadContainer;
