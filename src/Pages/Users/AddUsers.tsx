import React, { FC, useEffect, useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../Components/Inputs/CustomInput';
import { useMutation, useQueryClient } from 'react-query';
import { addUser, updateUser } from '../../api/services';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import FileUploadContainer from '../../Components/FileUploadContainer';

interface AddUsersProps {
  open: boolean;
  onClose: () => void;
  initialValues?: FormValues;
  userId?: string; 
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  usertype: string;
  phonenumber: string;
  userimage?: string | null; // Allowing userimage to be string or null
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  usertype: yup.string().required('User type is required'),
  phonenumber: yup.string().required('Phone number is required')
    .matches(/^\d{10}$/, 'Must be exactly 10 digits')
    .transform((value) => value.replace(/\D/g, '')), // Only allow numbers
  userimage: yup.string().nullable().optional() // This line allows for undefined or null
});

const AddUsers: FC<AddUsersProps> = ({ open, onClose, initialValues, userId }) => {
  const queryClient = useQueryClient();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues || {
      name: '',
      email: '',
      password: '',
      usertype: Cookies.get('user_type') || 'admin',
      phonenumber: '',
      userimage: null 
    }
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
      setImageUploaded(!!initialValues.userimage); // Check if there's an existing image
    } else {
      reset({
        name: '',
        email: '',
        password: '',
        usertype: Cookies.get('user_type') || 'admin',
        phonenumber: '',
        userimage: null // Initialize as null
      });
    }
  }, [initialValues, reset]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const addMutation = useMutation((data: FormValues) => addUser(data), {
    onSuccess: () => {
      toast.success('User added successfully!');
      queryClient.invalidateQueries('getUsers');
      reset(); // Reset the form fields after successful submission
      onClose();
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.message}`);
    }
  });

  const updateMutation = useMutation((data: FormValues) => {
    if (userId !== undefined) {
      return updateUser(userId, data); 
    }
    return Promise.reject(new Error('User ID is undefined'));
  }, {
    onSuccess: () => {
      toast.success('User updated successfully!');
      queryClient.invalidateQueries('getUsers');
      reset(); // Reset the form fields after successful submission
      onClose();
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.message}`);
    }
  });

  const onSubmit = (data: FormValues) => { 
    if (userId) {
      updateMutation.mutate(data);
    } else {
      const updatedData = { ...data, usertype: 'admin' };
      addMutation.mutate(updatedData);
    }
  };

  const handleImageDelete = () => {
    setValue('userimage', null);
    setImageUploaded(false);
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
          background: '#FFFFFF',
          opacity: 1,
          borderRadius: '0px',
          border: 'none',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '60px',
          backgroundColor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          justifyContent: 'space-between',
          padding: '0 16px',
        }}
      >
        <Typography variant="h6" sx={{ color:'white', fontWeight: '600' }}>
          {initialValues ? 'Edit User' : 'Add User'}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white', mr:2 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="name-input">Name</InputLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="name-input"
                  placeholder="Enter name..."
                  {...field}
                  error={!!errors.name}
                />
              )}
            />
            <FormHelperText error>{errors.name && errors.name.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="email-input">Email Address</InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="email-input"
                  placeholder="Enter email address..."
                  {...field}
                  error={!!errors.email}
                />
              )}
            />
            <FormHelperText error>{errors.email && errors.email.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="password-input">Password</InputLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password..."
                  {...field}
                  error={!!errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            <FormHelperText error>{errors.password && errors.password.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="phonenumber-input">Phone Number</InputLabel>
            <Controller
              name="phonenumber"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="phonenumber-input"
                  placeholder="Enter phone number..."
                  {...field}
                  error={!!errors.phonenumber}
                  inputProps={{
                    maxLength: 10, // Limit input to 10 digits
                    onKeyDown: (e) => {
                      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                        e.preventDefault(); // Prevent non-numeric input
                      }
                    },
                  }}
                />
              )}
            />
            <FormHelperText error>{errors.phonenumber && errors.phonenumber.message}</FormHelperText>
          </FormControl>

          <Controller
            name="userimage"
            control={control}
            render={({ field }) => (
              <FileUploadContainer
                onFileSelect={(url) => {
                  setValue('userimage', url || null);
                  setImageUploaded(!!url); 
                }}
                foldername="users"
                existingImage={initialValues?.userimage} // Pass the existing image if available
                onDelete={handleImageDelete} // Pass delete handler
              />
            )}
          />
          <FormHelperText error={!!errors.userimage}>{errors.userimage?.message}</FormHelperText>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              {initialValues ? 'Update' : 'Add User'}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddUsers;
