// src/components/CreateBuilder.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';

interface CreateBuilderDto {
  builderName: string;
  builderDescription: string;
  builderLocation: string;
  builderImage?: string;
}

const CreateBuilder: React.FC = () => {
  const [builderName, setBuilderName] = useState<string>('');
  const [builderDescription, setBuilderDescription] = useState<string>('');
  const [builderLocation, setBuilderLocation] = useState<string>('');
  const [builderImage, setBuilderImage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const builderData: CreateBuilderDto = {
      builderName,
      builderDescription,
      builderLocation,
      builderImage: builderImage || undefined,
    };

    try {
      const response = await axios.post('http://localhost:5000/builders', builderData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error creating builder:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Create New Builder
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Builder Name"
              variant="outlined"
              value={builderName}
              onChange={(e) => setBuilderName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Builder Description"
              variant="outlined"
              multiline
              rows={4}
              value={builderDescription}
              onChange={(e) => setBuilderDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Builder Location"
              variant="outlined"
              value={builderLocation}
              onChange={(e) => setBuilderLocation(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Builder Image (optional)"
              variant="outlined"
              value={builderImage}
              onChange={(e) => setBuilderImage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateBuilder;
