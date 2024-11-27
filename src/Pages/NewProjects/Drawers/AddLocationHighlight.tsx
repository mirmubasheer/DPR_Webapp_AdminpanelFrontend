import React, { FC } from 'react';
import {
  Drawer, Box, Typography, Button, IconButton, FormControl, InputLabel, FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import CustomInput from '../../../Components/Inputs/CustomInput';
import { toast } from 'react-toastify';
import { addLocationHighlight } from '../../../api/services'; // Update path as needed

interface AddLocationHighlightProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  refetch: () => void;
}

interface FormValues {
  distance: number;
  icon: string;
  locationName: string;
  locationType: string;
  time: number;
}

const AddLocationHighlight: FC<AddLocationHighlightProps> = ({ open, onClose, projectId, refetch }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (formData: FormValues) => addLocationHighlight(projectId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('project');
        toast.success('Location highlight added successfully');
        onClose();
        reset();
      },
      onError: (error: any) => {
        console.error('Error adding location highlight:', error);
        toast.error('Failed to add location highlight');
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
          Add Location Highlight
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Distance Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="distance-input">Distance (km)</InputLabel>
            <Controller
              name="distance"
              control={control}
              rules={{ required: 'Distance is required' }}
              render={({ field }) => (
                <CustomInput
                  id="distance-input"
                  placeholder="Enter distance..."
                  type="number"
                  {...field}
                  error={!!errors.distance}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <FormHelperText error={!!errors.distance}>{errors.distance?.message}</FormHelperText>
          </FormControl>

          {/* Icon Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="icon-input">Icon</InputLabel>
            <Controller
              name="icon"
              control={control}
              rules={{ required: 'Icon is required' }}
              render={({ field }) => (
                <CustomInput
                  id="icon-input"
                  placeholder="Enter icon name (e.g., school_icon.png)..."
                  {...field}
                  error={!!errors.icon}
                />
              )}
            />
            <FormHelperText error={!!errors.icon}>{errors.icon?.message}</FormHelperText>
          </FormControl>

          {/* Location Name Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="location-name-input">Location Name</InputLabel>
            <Controller
              name="locationName"
              control={control}
              rules={{ required: 'Location name is required' }}
              render={({ field }) => (
                <CustomInput
                  id="location-name-input"
                  placeholder="Enter location name..."
                  {...field}
                  error={!!errors.locationName}
                />
              )}
            />
            <FormHelperText error={!!errors.locationName}>{errors.locationName?.message}</FormHelperText>
          </FormControl>

          {/* Location Type Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="location-type-input">Location Type</InputLabel>
            <Controller
              name="locationType"
              control={control}
              rules={{ required: 'Location type is required' }}
              render={({ field }) => (
                <CustomInput
                  id="location-type-input"
                  placeholder="Enter location type (e.g., School)..."
                  {...field}
                  error={!!errors.locationType}
                />
              )}
            />
            <FormHelperText error={!!errors.locationType}>{errors.locationType?.message}</FormHelperText>
          </FormControl>

          {/* Time Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="time-input">Time (minutes)</InputLabel>
            <Controller
              name="time"
              control={control}
              rules={{ required: 'Time is required' }}
              render={({ field }) => (
                <CustomInput
                  id="time-input"
                  placeholder="Enter time..."
                  type="number"
                  {...field}
                  error={!!errors.time}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <FormHelperText error={!!errors.time}>{errors.time?.message}</FormHelperText>
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
            {mutation.isLoading ? 'Adding...' : 'Add Location Highlight'}
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddLocationHighlight;
