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
import { createBankOffer } from '../../../api/services'; // Make sure this path is correct

interface AddBankOfferProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  refetch: () => void; // Refetch project data on successful addition
}

interface FormValues {
  bankName: string;
  bankIcon?: string | null; // URL of the uploaded image
}

const AddBankOffer: FC<AddBankOfferProps> = ({ open, onClose, projectId, refetch }) => {
  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormValues>();
  const queryClient = useQueryClient();
  const [imageUploaded, setImageUploaded] = useState(false); // Track image upload status

  const mutation = useMutation(
    (formData: FormValues) => createBankOffer(projectId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('project');
        toast.success('Bank offer added successfully');
        onClose();
        reset();
      },
      onError: (error: any) => {
        console.error('Error adding bank offer:', error);
        toast.error('Failed to add bank offer');
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
          Create Bank Offer
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Bank Name Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="bank-name-input">Bank Name</InputLabel>
            <Controller
              name="bankName"
              control={control}
              rules={{ required: 'Bank name is required' }}
              render={({ field }) => (
                <CustomInput
                  id="bank-name-input"
                  placeholder="Enter bank name..."
                  {...field}
                  error={!!errors.bankName}
                />
              )}
            />
            <FormHelperText error={!!errors.bankName}>{errors.bankName?.message}</FormHelperText>
          </FormControl>

          {/* Bank Icon Upload Field */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="bank-icon-input">Bank Icon</InputLabel>
            <Controller
              name="bankIcon"
              control={control}
              rules={{ required: 'Bank icon is required' }}
              render={({ field }) => (
                <FileUploadContainer
                  onFileSelect={(url: string | null) => {
                    setValue('bankIcon', url);
                    setImageUploaded(!!url);
                  }}
                  foldername="bank-icons"
                  existingImage={field.value || ""}
                  onDelete={() => {
                    setValue('bankIcon', null);
                    setImageUploaded(false);
                  }}
                />
              )}
            />
            <FormHelperText error={!!errors.bankIcon}>{errors.bankIcon && 'Bank icon is required'}</FormHelperText>
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
            {mutation.isLoading ? 'Adding...' : 'Add Bank Offer'}
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddBankOffer;
