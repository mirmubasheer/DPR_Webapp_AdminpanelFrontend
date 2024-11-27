// ImageGalleryComponent.tsx
import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import { Box, Grid, CircularProgress, Typography, Card, CardMedia } from '@mui/material';

const ImageGalleryComponent: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Configure AWS S3
  const s3 = new AWS.S3({
    endpoint: 'https://s3.wasabisys.com',
    accessKeyId: 'JM9E72Y6OHG0OSN66HJI', // Your access key
    secretAccessKey: 'S47F2KkobPeWJYXSWDhHAIjebTVBfXeUlFjMyT8n', 
    region: 'us-east-1',
  });

  // Fetch images from Wasabi S3 bucket
  const fetchImages = async () => {
    setLoading(true);
    const params = {
      Bucket: 'realtyyardsimages', 
    };

    try {
      const data = await s3.listObjectsV2(params).promise();
      const imageUrls = data.Contents?.map((item) => {
        return `https://realtyyardsimages.s3.wasabisys.com/${item.Key}`;
      }) || [];
      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to load images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 4 }}>
        Image Gallery
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {images.length > 0 ? (
            images.map((url, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    image={url}
                    alt={`Uploaded Image ${index + 1}`}
                    sx={{ height: 200, objectFit: 'cover' }}
                  />
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
              No images found.
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default ImageGalleryComponent;
