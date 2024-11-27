import React, { FC, useState } from 'react';
import {
  Drawer, Box, Typography, Button, IconButton, FormControl, InputLabel, FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import CustomInput from '../../Components/Inputs/CustomInput';
import FileUploadContainer from '../../Components/FileUploadContainer';
import { toast } from 'react-toastify';
import { addBuilder } from '../../api/services'; // Ensure this is the correct import for your addBuilder function

interface CreateBuilderProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  builderName: string;
  builderDescription: string;
  builderLocation: string;
  builderImage?: string | null; // URL of the uploaded image
}

const CreateBuilder: FC<CreateBuilderProps> = ({ open, onClose }) => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>();
  const queryClient = useQueryClient();
  const [imageUploaded, setImageUploaded] = useState(false); // Track image upload status

  const mutation = useMutation(addBuilder, {
    onSuccess: () => {
      queryClient.invalidateQueries('getBuilders');
      toast.success('Builder added successfully');
      onClose();
    },
    onError: (error: any) => {
      if (error.message === 'Request failed with status code 409') {
        toast.error('Builder already exists');
      } else {
        toast.error('Error adding builder');
      }
    }
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append('builderName', data.builderName);
    formData.append('builderDescription', data.builderDescription);
    formData.append('builderLocation', data.builderLocation);
    
    // Append the image URL to the form data
    if (data.builderImage) {
      formData.append('builderImage', data.builderImage); // Change this as needed for your API
    }

    mutation.mutate(formData); 
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '360px',
          backgroundColor: '#FFFFFF',
          borderRadius: '0px',
          border: 'none',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{
        width: '100%',
        height: '60px',
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <Typography variant="body1" sx={{ color: '#fff', fontWeight: '550' }}>
          Create Builder
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white', mr: 2 }}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      <Box sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-name-input">Builder Name</InputLabel>
            <Controller
              name="builderName"
              control={control}
              rules={{ required: 'Builder name is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-name-input"
                  placeholder="Enter builder name..."
                  {...field}
                  error={!!errors.builderName}
                />
              )}
            />
            <FormHelperText error>{errors.builderName?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-location-input">Location</InputLabel>
            <Controller
              name="builderLocation"
              control={control}
              rules={{ required: 'Location is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-location-input"
                  placeholder="Enter location..."
                  {...field}
                  error={!!errors.builderLocation}
                />
              )}
            />
            <FormHelperText error>{errors.builderLocation?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-description-input">Description</InputLabel>
            <Controller
              name="builderDescription"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-description-input"
                  placeholder="Enter description..."
                  {...field}
                  error={!!errors.builderDescription}
                />
              )}
            />
            <FormHelperText error>{errors.builderDescription?.message}</FormHelperText>
          </FormControl>

          {/* File Upload Component */}
          <Controller
              name="builderImage"
              control={control}
              render={({ field }) => (
                <FileUploadContainer
                  onFileSelect={(url: string | null) => {
                    setValue('builderImage', url);
                    setImageUploaded(!!url); // Update image upload status
                  }}
                  foldername="builders"
                  existingImage={""}
                  onDelete={() => {
                    setValue('builderImage', null); // Set builderImage to null on delete
                    setImageUploaded(false); // Update image upload status
                  }}
                />
              )}
            />

          <FormHelperText error={!!errors.builderImage}>{errors.builderImage && 'Image is required'}</FormHelperText>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 2 }}
            disabled={!imageUploaded} // Disable button until image is uploaded
          >
            Submit
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default CreateBuilder;
