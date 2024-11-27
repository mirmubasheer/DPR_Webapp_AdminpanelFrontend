import React, { FC, useState } from 'react';
import {
  Drawer, Box, Typography, Button, IconButton, FormControl, InputLabel, FormHelperText, InputAdornment,
  Select,
  MenuItem,
  Checkbox,
  ListItemText, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import CustomInput from '../../../Components/Inputs/CustomInput';
import FileUploadContainer from '../../../Components/FileUploadContainer';
import { toast } from 'react-toastify';
import { addBuilder, addProject } from '../../../api/services';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ArrowDropDown } from '@mui/icons-material';



// Define validation schema with Yup
const validationSchema = yup.object().shape({
  name: yup.string().required('Project name is required'),
  description: yup.string().required('Description is required'),
  establishedYear: yup.string().required('Established Year is required'),
  sftPrice: yup.number().typeError('Price must be a number').required('Price is required'),
  builderName: yup.string().required('Builder name is required'),
  builderId: yup.string().required('Builder ID is required'),
  location: yup.string().required('Location is required'),
  zone: yup.string().required('Zone is required'),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  pincode: yup.string().required('Pincode is required'),
  status: yup.string().required('Status is required'),
  minSize: yup.number().typeError('Min size must be a number').required('Min size is required'),
  maxSize: yup.number().typeError('Max size must be a number').required('Max size is required'),
  buildings: yup.number().typeError('Buildings must be a number').required('Buildings is required'),
  launchDate: yup.string().required('Launch Date is required'),
  locationIframe: yup.string().required('Location iframe is required'),
  propertyType: yup.string().required('Property Type is required'),
  videoLink: yup.string().required('Video Link is required'),
  dimensions: yup.string().required('Dimensions is required'),
  parkingArea: yup.number().typeError('Parking Area must be a number').required('Parking Area is required'),
  reraId: yup.string().required('RERA ID is required'),
  projectBHK: yup.array().of(yup.number().required()).required('Project BHK is required'),

});

interface AddProjectProps {
  open: boolean;
  onClose: () => void;
}

interface LocationHighlight {
  locationType: string;
  locationName: string;
  icon: string;
  time: number;
  distance: number;
}

interface FloorPlan {
  floorImage: string;
  size: number;
  fullPrice: number;
  floorNumber: number;
}

interface Amenity {
  iconName: string;
  name: string;
}

interface BankOffer {
  bankIcon: string;
  bankName: string;
}

interface FormValues {
  name: string;
  description: string;
  establishedYear: string;
  sftPrice: number;
  builderName: string;
  builderId: string;
  location: string;
  zone: string;
  street: string;
  city : string;
  pincode: string;
  status: string;
  minSize: number;
  maxSize: number;
  buildings: number;
  launchDate: string;
  locationIframe: string;
  propertyType: string;
  videoLink: string;
  dimensions: string;
  parkingArea: number;
  reraId: string;
  projectBHK: number[];

}


const BHK_OPTIONS = [
  { value: 1, label: '1 BHK' },
  { value: 2, label: '2 BHK' },
  { value: 3, label: '3 BHK' },
  { value: 3.5, label: '3.5 BHK' },
  { value: 4, label: '4 BHK' },
  { value: 4.5, label: '4.5 BHK' },
  { value: 5, label: '5 BHK' },
];


const AddProject: FC<AddProjectProps> = ({ open, onClose }) => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      description: '',
      establishedYear: '',
      sftPrice: 0,
      builderName: '',
      builderId: '6720cd1e231cd6a705cbdb90',
      location : '',
      zone: '',
      street: '',
      city: '',
      pincode: '',
      status: 'Active',
      minSize: 0,
      maxSize: 0,
      buildings: 0,
      locationIframe: '',
      propertyType: '',
      videoLink: '',
      dimensions: '',
      parkingArea: 0,
      reraId: '',
      projectBHK: [],
    }
  });
  const [imageUploaded, setImageUploaded] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(addProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('getProjects');
      toast.success('Project added successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error('Error adding project');
    }
  });

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
          Add Project
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white', mr: 2 }}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      <Box sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-name-input">Project Name</InputLabel>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Project name is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-name-input"
                  placeholder="Enter Projects name..."
                  {...field}
                  error={!!errors.name}
                />
              )}
            />
            <FormHelperText error>{errors.name?.message}</FormHelperText>
          </FormControl>


          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-description-input">Description</InputLabel>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-description-input"
                  placeholder="Enter description..."
                  {...field}
                  multiline
                  rows={4}
                  error={!!errors.description}
                />
              )}
            />
            <FormHelperText error>{errors.description?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Controller
              name="establishedYear"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={['year']} // Set views to year only
                    label="Established Year" // Label for the input
                    value={field.value ? dayjs(field.value) : null} // Ensure value is Dayjs or null
                    onChange={(newValue: Dayjs | null) => {
                      // Check if newValue is not null and extract the year
                      const year = newValue ? newValue.year().toString() : null;
                      field.onChange(year); // Update the field value with the year as a string
                    }}
                  />
                </LocalizationProvider>
              )}
            />
            <FormHelperText error>{errors.establishedYear?.message}</FormHelperText>
          </FormControl>


          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            {/* <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-launch-date-input">Launch Date</InputLabel> */}
            <Controller
              name="launchDate"
              control={control}
              rules={{ required: 'Launch Date is required' }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={['year']} // Set views to year only
                    label="Launch Date" // Label for the input
                    value={field.value ? dayjs(field.value) : null} // Ensure value is Dayjs or null
                    onChange={(newValue: Dayjs | null) => {
                      // Check if newValue is not null and extract the year
                      const year = newValue ? newValue.year().toString() : null;
                      field.onChange(year); // Update the field value with the year as a string
                    }}
                  />
                </LocalizationProvider>
              )}
            />
            <FormHelperText error>{errors.launchDate?.message}</FormHelperText>
          </FormControl>


          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-sft-price-input">SFT Price</InputLabel>
            <Controller
              name="sftPrice"
              control={control}
              rules={{ required: 'Price is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-sft-price-input"
                  placeholder="Enter price..."
                  {...field}
                  error={!!errors.sftPrice}
                  onChange={(e) => {
                    // Allow only numeric values
                    const value = e.target.value.replace(/[^0-9.]/g, ''); // Keeps numbers and decimals
                    field.onChange(value);
                  }}
                />
              )}
            />
            <FormHelperText error>{errors.sftPrice?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-builder-name-input">Builder Name</InputLabel>
            <Controller
              name="builderName"
              control={control}
              rules={{ required: 'Builder name is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-builder-name-input"
                  placeholder="Enter builder name..."
                  {...field}
                  error={!!errors.builderName}
                />
              )}
            />
            <FormHelperText error>{errors.builderName?.message}</FormHelperText>
          </FormControl>

          {/* by default builderId is set to '6720cd1e231cd6a705cbdb90' and he can't change it */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-builder-id-input">Builder ID</InputLabel>
              <Controller
                name="builderId"
                control={control}
                defaultValue="6720cd1e231cd6a705cbdb90" // Set the default value for builderId
                rules={{ required: 'Builder ID is required' }} // Validation rule
                render={({ field }) => (
                  <CustomInput
                    id="builder-builder-id-input"
                    placeholder="Enter builder ID..."
                    {...field}
                    error={!!errors.builderId}
                    disabled // Disable the input to prevent changes
                  />
                )}
              />
              <FormHelperText error>{errors.builderId?.message}</FormHelperText>
            </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-location-input">Location</InputLabel>
            <Controller
              name="location"
              control={control}
              rules={{ required: 'Location is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-location-input"
                  placeholder="Enter location... Ex : Shaikpet"
                  {...field}
                  error={!!errors.location}
                />
              )}
            />
            <FormHelperText error>{errors.location?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-zone-input">Zone</InputLabel>
            <Controller
              name="zone"
              control={control}
              rules={{ required: 'Zone is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-zone-input"
                  placeholder="Enter zone... Ex : South"
                  {...field}
                  error={!!errors.zone}
                />
              )}
            />
            <FormHelperText error>{errors.zone?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-street-input">Street</InputLabel>
            <Controller
              name="street"
              control={control}
              rules={{ required: 'Street is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-street-input"
                  placeholder="Enter street... Ex : Road No 2"
                  {...field}
                  error={!!errors.street}
                />
              )}
            />
            <FormHelperText error>{errors.street?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-city-input">City</InputLabel>
            <Controller
              name="city"
              control={control}
              rules={{ required: 'City is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-city-input"
                  placeholder="Enter city... Ex : Hyderabad"
                  {...field}
                  error={!!errors.city}
                />
              )}
            />
            <FormHelperText error>{errors.city?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-pincode-input">Pincode</InputLabel>
            <Controller
              name="pincode"
              control={control}
              rules={{ required: 'Pincode is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-pincode-input"
                  placeholder="Enter pincode... Ex : 500008"
                  {...field}
                  error={!!errors.pincode}
                />
              )}
            />
            <FormHelperText error>{errors.pincode?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-status-input">Status</InputLabel>
            <Controller
              name="status"
              control={control}
              rules={{ required: 'Status is required' }}
              defaultValue="Active" 
              render={({ field }) => (
                <CustomInput
                  id="builder-status-input"
                  placeholder="Enter status... Ex : Active"
                  {...field}
                  error={!!errors.status}
                  disabled
                />
              )}
            />
            <FormHelperText error>{errors.status?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-min-size-input">Min Size (Sqft)</InputLabel>
            <Controller
              name="minSize"
              control={control}
              rules={{ required: 'Min size is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-min-size-input"
                  placeholder="Enter min size... Ex : 2500"
                  {...field}
                  error={!!errors.minSize}
                  onChange={(e) => {
                    // Allow only numeric values
                    const value = e.target.value.replace(/[^0-9.]/g, ''); // Keeps numbers and decimals
                    field.onChange(value);
                  }}
                />
              )}
            />
            <FormHelperText error>{errors.minSize?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-max-size-input">Max Size - (Sqft)</InputLabel>
            <Controller
              name="maxSize"
              control={control}
              rules={{ required: 'Max size is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-max-size-input"
                  placeholder="Enter max size... Ex : 5000"
                  {...field}
                  error={!!errors.maxSize}
                  onChange={(e) => {
                    // Allow only numeric values
                    const value = e.target.value.replace(/[^0-9.]/g, ''); // Keeps numbers and decimals
                    field.onChange(value);
                  }}
                />
              )}
            />
            <FormHelperText error>{errors.maxSize?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-buildings-input">Buildings</InputLabel>
            <Controller
              name="buildings"
              control={control}
              rules={{ required: 'Buildings is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-buildings-input"
                  placeholder="Enter buildings... Ex : 2"
                  {...field}
                  error={!!errors.buildings}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, ''); // Keeps numbers and decimals
                    field.onChange(value);
                  }}
                />
              )}
            />
            <FormHelperText error>{errors.buildings?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 4.5 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-location-iframe-input">Location Iframe</InputLabel>
            <Controller
              name="locationIframe"
              control={control}
              rules={{ required: 'Location iframe is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-location-iframe-input"
                  placeholder="Enter location iframe..."
                  {...field}
                  error={!!errors.locationIframe}
                />
              )}
            />
            <FormHelperText error>{errors.locationIframe?.message}</FormHelperText>
          </FormControl>


          {/* propertyType as select option instead of CustomInput */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1, mt:-2 }} htmlFor="builder-property-type-input">
              Property Type
            </InputLabel>
            <Controller
              name="propertyType"
              control={control}
              rules={{ required: 'Property Type is required' }}
              render={({ field }) => (
                <Select
                  id="builder-property-type-input"
                  displayEmpty
                  {...field}
                  error={!!errors.propertyType}
                  IconComponent={ArrowDropDown}
                  renderValue={(selected) =>
                    selected ? (
                      <Box display="flex" alignItems="center">
                        {selected}
                      </Box>
                    ) : (
                      'Property Types'
                    )
                  }
                  style={{
                    width: "100%",
                    height: "45px",
                    border: "1px solid #1212121A",
                    borderRadius: "10px",
                    opacity: 0.6,
                    boxShadow: "0px 6px 14px #36408D08",
                    fontSize: "14px",
                    color: "#1D1D1D",
                    textAlign: 'left',
                  }}
                  inputProps={{
                    style: {
                      fontFamily: "Mundial, sans-serif",
                      fontSize: "14px",
                    },
                  }}
                  SelectDisplayProps={{
                    style: {
                      fontFamily: "Mundial, sans-serif",
                      fontSize: "14px",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select property type...
                  </MenuItem>
                  <MenuItem value="Apartments">Apartments</MenuItem>
                  <MenuItem value="Villas">Villas</MenuItem>
                  <MenuItem value="Plots">Plots</MenuItem>
                  <MenuItem value="Commercial">Commercial</MenuItem>
                  <MenuItem value="Ultra Luxury">Ultra Luxury</MenuItem>
                </Select>
              )}
            />
            <FormHelperText error>{errors.propertyType?.message}</FormHelperText>
          </FormControl>

          {/* Video Link */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-video-link-input">Video Link</InputLabel>
            <Controller
              name="videoLink"
              control={control}
              rules={{ required: 'Video Link is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-video-link-input"
                  placeholder="Enter video link..."
                  {...field}
                  error={!!errors.videoLink}
                />
              )}
            />
            <FormHelperText error>{errors.videoLink?.message}</FormHelperText>
          </FormControl>

          {/* dimensions */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-dimensions-input">Dimensions</InputLabel>
            <Controller
              name="dimensions"
              control={control}
              rules={{ required: 'Dimensions is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-dimensions-input"
                  placeholder="Enter dimensions... Ex: 96 units"
                  {...field}
                  error={!!errors.dimensions}
                />
              )}
            />
            <FormHelperText error>{errors.dimensions?.message}</FormHelperText>
          </FormControl>

          {/* parkingArea */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-parking-area-input">Parking Area</InputLabel>
            <Controller
              name="parkingArea"
              control={control}
              rules={{ required: 'Parking Area is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-parking-area-input"
                  placeholder="Enter parking area... Ex: 2"
                  {...field}
                  error={!!errors.parkingArea}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, ''); // Keeps numbers and decimals
                    field.onChange(value);
                  }}
                />
              )}
            />
            <FormHelperText error>{errors.parkingArea?.message}</FormHelperText>
          </FormControl>

          {/* reraId */}
          <FormControl fullWidth sx={{ marginBottom: 4.5 }}>
            <InputLabel shrink sx={{ ml: -1 }} htmlFor="builder-rera-id-input">RERA ID</InputLabel>
            <Controller
              name="reraId"
              control={control}
              rules={{ required: 'RERA ID is required' }}
              render={({ field }) => (
                <CustomInput
                  id="builder-rera-id-input"
                  placeholder="Enter RERA ID..."
                  {...field}
                  error={!!errors.reraId}
                />
              )}
            />
            <FormHelperText error>{errors.reraId?.message}</FormHelperText>
          </FormControl>



          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <InputLabel shrink sx={{ ml: -1, mt:-2 }} htmlFor="builder-bhk-input">Project BHK</InputLabel>
            <Controller
              name="projectBHK"
              control={control}
              render={({ field }) => (
                <Select
                  id="builder-bhk-input"
                  multiple
                  {...field}
                  error={!!errors.projectBHK}
                  renderValue={(selected) =>
                    selected.length > 0
                      ? selected.join(', ')
                      : 'Select BHK'
                  }
                  displayEmpty
                  IconComponent={ArrowDropDown}
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "1px solid #1212121A",
                    borderRadius: "10px",
                    opacity: 0.6,
                    boxShadow: "0px 6px 14px #36408D08",
                    fontSize: "14px",
                    color: "#1D1D1D",
                    textAlign: 'left',
                  }}
                >
                  {BHK_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Checkbox checked={field.value.indexOf(option.value) > -1} />
                      <ListItemText primary={option.label} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText error>{errors.projectBHK?.message}</FormHelperText>
          </FormControl>







         
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 2 }}
            // disabled={!imageUploaded} // Disable button until image is uploaded
          >
            Add Project
          </Button>

          <Box sx={{ height: 4 }} />



           {/* File Upload Component */}
          {/* <Controller
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

          <FormHelperText error={!!errors.builderImage}>{errors.builderImage && 'Image is required'}</FormHelperText> */}

        </form>
      </Box>
    </Drawer>
  );
};

export default AddProject;
