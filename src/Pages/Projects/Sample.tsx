import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { addProject, updateProject } from '../../api/services';
import { Box, Button, Drawer, FormControl, FormHelperText, IconButton, InputLabel, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomInput from '../../Components/Inputs/CustomInput';
import FileUploadContainerMultiple from '../../Components/Files/FileUploadContainerMultiple';

interface SampleProps {
  open: boolean;
  onClose: () => void;
  initialValues?: FormValues;
  projectId: string | undefined;
}

interface FormValues {
  projectName: string;
  propertyType: string;
  projectLocation: string;
  projectdescription: string;
  homearea: number;
  rooms: number;
  baths: number;
  yearbuilt: number;
  dimensions: string;
  beds: number;
  price: number;
  status: string;
  amenities: string[];
  locationiframe: string;
  builderid: number;
  builderName: string;
  projectBHK: (number | null)[];
  unitsApartments: string;
  approvals: string;
  projectImages?: File[];
}

const Sample = ({ open, onClose, initialValues, projectId }:any) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: initialValues || {
      projectName: '',
      propertyType: '',
      projectLocation: '',
      projectdescription: '',
      homearea: 0,
      rooms: 0,
      baths: 0,
      yearbuilt: 0,
      dimensions: '',
      beds: 0,
      price: 0,
      status: '',
      amenities: [],
      locationiframe: '',
      builderid: 0,
      builderName: '',
      projectBHK: [],
      unitsApartments: '',
      approvals: '',
      projectImages: []
    },
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  useEffect(() => {
    if (initialValues?.projectImages) {
      setSelectedImages(initialValues.projectImages);
    }
    reset(initialValues || {});
  }, [initialValues, reset]);

  const addMutation = useMutation((data: FormData) => addProject(data), {
    onSuccess: () => {
      toast.success('Project added successfully!');
      queryClient.invalidateQueries('getProjects');
      onClose();
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.message}`);
    }
  });

  const updateMutation = useMutation((data: FormData) => {
    if (projectId !== undefined) {
      return updateProject(projectId, data);
    }
    return Promise.reject(new Error('Project ID is undefined'));
  }, {
    onSuccess: () => {
      toast.success('Project updated successfully!');
      queryClient.invalidateQueries('getProjects');
      onClose();
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.message}`);
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();

    // Append project images to formData
    selectedImages.forEach(file => formData.append('projectImages', file));

    // Add other form fields to formData
    Object.keys(data).forEach((key: string) => {
      const value = data[key as keyof FormValues];

      if (Array.isArray(value)) {
        value.forEach(item => {
          if (typeof item === 'string') {
            formData.append(key, item as string);
          } else if ((item as any) instanceof File) {
            formData.append(key, item as any);
          } else {
            console.error(`Unexpected item type: ${typeof item}`);
          }
        });
      } else {
        if (value !== undefined) {
          if (typeof value === 'string' || typeof value === 'number') {
            formData.append(key, value.toString());
          } else if ((value as any) instanceof File) {
            formData.append(key, value);
          } else {
            console.error(`Unexpected value type: ${typeof value}`);
          }
        }
      }
    });

    if (projectId !== undefined) {
      updateMutation.mutate(formData);
    } else {
      addMutation.mutate(formData);
    }
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
        <Typography variant="h6" sx={{ color: 'white', fontWeight: '600' }}>
          {initialValues ? 'Update Project' : 'Add Project'}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {['projectName', 'propertyType', 'projectLocation', 'projectdescription', 'homearea', 'rooms', 'baths', 'yearbuilt', 'dimensions', 'beds', 'price', 'status', 'locationiframe', 'builderid', 'builderName', 'unitsApartments', 'approvals'].map(field => (
            <FormControl fullWidth sx={{ marginBottom: 2 }} key={field}>
              <InputLabel shrink sx={{ ml: -1.4 }} htmlFor={`${field}-input`}>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</InputLabel>
              <Controller
                name={field as keyof FormValues}
                control={control}
                render={({ field }) => (
                  <CustomInput
                    id={`${field}-input`}
                    placeholder={`Enter ${field}...`}
                    type={['homearea', 'rooms', 'baths', 'yearbuilt', 'beds', 'price', 'builderid'].includes(field as any) ? 'number' : 'text'}
                    {...field}
                    // error={!!errors[field as keyof FormValues]}
                  />
                )}
              />
              <FormHelperText error>{errors[field as keyof FormValues]?.message}</FormHelperText>
            </FormControl>
          ))}

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="amenities-input">Amenities</InputLabel>
            <Controller
              name="amenities"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="amenities-input"
                  placeholder="Enter amenities..."
                  {...field}
                  error={!!errors.amenities}
                />
              )}
            />
            <FormHelperText error>{errors.amenities && errors.amenities.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="projectBHK-input">Project BHK</InputLabel>
            <Controller
              name="projectBHK"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="projectBHK-input"
                  placeholder="Enter project BHK..."
                  {...field}
                  error={!!errors.projectBHK}
                />
              )}
            />
            <FormHelperText error>{errors.projectBHK && errors.projectBHK.message}</FormHelperText>
          </FormControl>

          {/* File Upload Component for Multiple Images */}
          <FileUploadContainerMultiple
            images={selectedImages}
            setImages={setSelectedImages}
            existingImageUrls={initialValues?.projectImages?.map((img:string) => `http://localhost:5000/uploads/${img}`)}
          />

          <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
            {initialValues ? 'Update' : 'Submit'}
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default Sample;