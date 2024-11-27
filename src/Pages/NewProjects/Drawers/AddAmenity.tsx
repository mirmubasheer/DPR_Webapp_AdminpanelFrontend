import React, { FC } from 'react';
import {
  Drawer, Box, Typography, Button, IconButton, FormControl, InputLabel, FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import CustomInput from '../../../Components/Inputs/CustomInput';
import { toast } from 'react-toastify';
import { addAmenity } from '../../../api/services'; // Update path as needed

interface AddAmenityProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  refetch: () => void;
}

interface FormValues {
  name: string;
  iconName: string;
}

const AddAmenity: FC<AddAmenityProps> = ({ open, onClose, projectId, refetch }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const queryClient = useQueryClient();

  // Mutation to add a new amenity
  const mutation = useMutation(
    (formData: FormValues) => addAmenity(projectId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAmenities');
        toast.success('Amenity added successfully');
        onClose();
        reset();
      },
      onError: (error: any) => {
        console.error('Error adding amenity:', error);
        toast.error('Failed to add amenity');
      },
    }
  );

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    mutation.mutate(data);
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
          Add New Amenity
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Amenity Name Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="name-input">Amenity Name</InputLabel>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Amenity name is required' }}
              render={({ field }) => (
                <CustomInput
                  id="name-input"
                  placeholder="Enter amenity name..."
                  {...field}
                  error={!!errors.name}
                />
              )}
            />
            <FormHelperText error={!!errors.name}>{errors.name?.message}</FormHelperText>
          </FormControl>

          {/* Icon Name Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="icon-name-input">Icon Name</InputLabel>
            <Controller
              name="iconName"
              control={control}
              rules={{ required: 'Icon name is required' }}
              render={({ field }) => (
                <CustomInput
                  id="icon-name-input"
                  placeholder="Enter icon name..."
                  {...field}
                  error={!!errors.iconName}
                />
              )}
            />
            <FormHelperText error={!!errors.iconName}>{errors.iconName?.message}</FormHelperText>
          </FormControl>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Adding...' : 'Add Amenity'}
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddAmenity;
