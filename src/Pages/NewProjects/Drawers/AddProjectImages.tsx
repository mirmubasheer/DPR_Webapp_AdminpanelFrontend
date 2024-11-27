import React, { FC } from 'react';
import { Drawer, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { updateProject } from '../../../api/services';
import FileUploadContainer from '../../../Components/FileUploadContainer';

interface AddProjectImagesProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  refetch: () => void;
  existingProjectImages: string[]; // Array of URLs of existing project images
}

interface FormValues {
  projectImages: string[]; // Holds URLs of images
}

const AddProjectImages: FC<AddProjectImagesProps> = ({
  open, onClose, projectId, refetch, existingProjectImages
}) => {
  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      projectImages: existingProjectImages || [], // Initialize with existing images
    }
  });

  const queryClient = useQueryClient();

  // Mutation to update project images
  const mutation = useMutation(
    (formData: FormValues) => updateProject(projectId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('project');
        toast.success('Project images updated successfully');
        onClose();
        refetch();
      },
      onError: (error: any) => {
        console.error('Error updating project images:', error);
        toast.error('Failed to update project images');
      },
    }
  );

  // Get the current project images array
  const projectImages = watch('projectImages');

  // Handler to add a new image URL to the projectImages array
  const handleImageAdd = (url: string | null, index: number) => {
    if (url) {
      const updatedImages = [...projectImages];
      updatedImages[index] = url;
      setValue('projectImages', updatedImages);
    }
  };

  // Handler to remove an image from the projectImages array
  const handleDeleteImage = (index: number) => {
    setValue('projectImages', projectImages.filter((_, i) => i !== index));
  };

  // Handler to add a new empty slot for an image
  const addNewImageSlot = () => {
    setValue('projectImages', [...projectImages, '']);
  };

  // Submit handler to update the images on the server
  const onSubmit = (data: FormValues) => {
    mutation.mutate(data); // Send the images array to the backend
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
          overflowX: 'hidden',
        },
      }}
    >
      {/* Header */}
      <Box sx={{
        width: '100%',
        height: '60px',
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <Typography variant="body1" sx={{ color: '#fff', fontWeight: 550 }}>
          Add Project Images
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Display each image with a delete option */}
          {projectImages.map((image, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <FileUploadContainer
                onFileSelect={(url) => handleImageAdd(url, index)}
                foldername="projectImages"
                existingImage={image}
                onDelete={() => handleDeleteImage(index)}
              />
            </Box>
          ))}

          {/* Button to add a new image slot */}
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addNewImageSlot} // Adds a new empty slot to display FileUploadContainer
            >
              Add New Image
            </Button>
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Updating...' : 'Update Project Images'}
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddProjectImages;
