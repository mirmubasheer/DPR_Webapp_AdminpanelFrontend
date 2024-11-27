import React, { FC, useState } from 'react';
import {
  Drawer, Box, Typography, Button, IconButton, FormControl, InputLabel, FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import CustomInput from '../../../Components/Inputs/CustomInput';
import FileUploadContainer from '../../../Components/FileUploadContainer';
import { toast } from 'react-toastify';
import { addFloorPlan } from '../../../api/services';

interface AddFloorPlanProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  refetch: () => void;
}

interface FormValues {
  floorImage?: string | null;
  floorNumber: number;
  fullPrice: number;
  size: number;
}

const AddFloorPlan: FC<AddFloorPlanProps> = ({ open, onClose, projectId, refetch }) => {
  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormValues>();
  const queryClient = useQueryClient();
  const [imageUploaded, setImageUploaded] = useState(false);

  // Mutation to handle the creation of a new floor plan
  const mutation = useMutation(
    (formData: FormValues) => addFloorPlan(projectId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('project');
        toast.success('Floor plan added successfully');
        onClose();
        reset();
      },
      onError: (error: any) => {
        console.error('Error adding floor plan:', error);
        toast.error('Failed to add floor plan');
      },
    }
  );

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
          Add Floor Plan
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Floor Image Upload Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="floor-image-input">Floor Image</InputLabel>
            <Controller
              name="floorImage"
              control={control}
              rules={{ required: 'Floor image is required' }}
              render={({ field }) => (
                <FileUploadContainer
                  onFileSelect={(url: string | null) => {
                    setValue('floorImage', url);
                    setImageUploaded(!!url);
                  }}
                  foldername="floorplanImages"
                  existingImage={field.value || ""}
                  onDelete={() => {
                    setValue('floorImage', null);
                    setImageUploaded(false);
                  }}
                />
              )}
            />
            <FormHelperText error={!!errors.floorImage}>{errors.floorImage && 'Floor image is required'}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="floor-number-input">Floor Number</InputLabel>
            <Controller
              name="floorNumber"
              control={control}
              rules={{ required: 'Floor number is required' }}
              render={({ field }) => (
                <CustomInput
                  id="floor-number-input"
                  placeholder="Enter floor number..."
                  type="number"
                  {...field}
                  error={!!errors.floorNumber}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <FormHelperText error={!!errors.floorNumber}>{errors.floorNumber?.message}</FormHelperText>
          </FormControl>

          {/* Full Price Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="full-price-input">Full Price</InputLabel>
            <Controller
              name="fullPrice"
              control={control}
              rules={{ required: 'Full price is required' }}
              render={({ field }) => (
                <CustomInput
                  id="full-price-input"
                  placeholder="Enter full price..."
                  type="number"
                  {...field}
                  error={!!errors.fullPrice}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <FormHelperText error={!!errors.fullPrice}>{errors.fullPrice?.message}</FormHelperText>
          </FormControl>

          {/* Size Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="size-input">Size</InputLabel>
            <Controller
              name="size"
              control={control}
              rules={{ required: 'Size is required' }}
              render={({ field }) => (
                <CustomInput
                  id="size-input"
                  placeholder="Enter size..."
                  type="number"
                  {...field}
                  error={!!errors.size}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <FormHelperText error={!!errors.size}>{errors.size?.message}</FormHelperText>
          </FormControl>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={!imageUploaded || mutation.isLoading}
          >
            {mutation.isLoading ? 'Adding...' : 'Add Floor Plan'}
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddFloorPlan;
