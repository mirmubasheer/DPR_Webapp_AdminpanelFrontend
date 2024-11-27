import React, { FC } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  FormControl,
  TextField,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addProject } from '../../../api/services';
import * as Yup from 'yup';
import CustomInput from '../../../Components/Inputs/CustomInput';
import FileUploadContainer from '../../../Components/FileUploadContainer';
import { Project } from './ProjectInterface';

// Define the properties for the AddProjects component
interface AddProjectsProps {
  open: boolean;
  onClose: () => void;
}

// Define the Yup validation schema
const schema = Yup.object().shape({
  name: Yup.string().required('Project name is required'),
  description: Yup.string().required('Description is required'),
  establishedYear: Yup.string().required('Established year is required'),
  sftPrice: Yup.number().required('SFT Price is required'),
  emiPrice: Yup.number().required('EMI Price is required'),
  builderName: Yup.string().required('Builder name is required'),
  location: Yup.string().required('Location is required'),
  city: Yup.string().required('City is required'),
  pincode: Yup.string().required('Pincode is required'),
  whyThisProject: Yup.array().of(Yup.string()).required(),
  projectBHK: Yup.array().of(Yup.number()).required(),
  status: Yup.string().required(),
  minSize: Yup.number().required(),
  maxSize: Yup.number().required(),
  buildings: Yup.number().required(),
  launchDate: Yup.string().required(),
  locationIframe: Yup.string().notRequired(),
  propertyType: Yup.string().required(),
  videoLink: Yup.string().notRequired(),
  dimensions: Yup.string().notRequired(),
  parkingArea: Yup.number().required(),
  reraId: Yup.string().notRequired(),
  approvals: Yup.string().notRequired(),
  visits: Yup.number().required(),
  projectImages: Yup.array().of(Yup.string()).notRequired(),
  bankOffers: Yup.array().of(
    Yup.object().shape({
      bankIcon: Yup.string().required(),
      bankName: Yup.string().required(),
    })
  ).notRequired(),
  amenities: Yup.array().of(
    Yup.object().shape({
      iconName: Yup.string().required(),
      name: Yup.string().required(),
    })
  ).notRequired(),
  floorPlans: Yup.array().of(
    Yup.object().shape({
      floorImage: Yup.string().required(),
      size: Yup.number().required(),
      fullPrice: Yup.number().required(),
      emiPrice: Yup.number().required(),
      floorNumber: Yup.number().required(),
    })
  ).notRequired(),
  locationHighlights: Yup.array().of(
    Yup.object().shape({
      locationType: Yup.string().required(),
      locationName: Yup.string().required(),
      icon: Yup.string().required(),
      time: Yup.number().required(),
      distance: Yup.number().required(),
    })
  ).notRequired(),
});

// Define the functional component
const AddProjects: FC<AddProjectsProps> = ({ open, onClose }) => {
  const queryClient = useQueryClient();

  // Initialize form control
  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<Project>();
  

  // UseFieldArray hooks for nested fields
  const { fields: bankOfferFields, append: appendBankOffer, remove: removeBankOffer } = useFieldArray({ control, name: 'bankOffers' });
  const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({ control, name: 'amenities' });
  const { fields: floorPlanFields, append: appendFloorPlan, remove: removeFloorPlan } = useFieldArray({ control, name: 'floorPlans' });
  const { fields: locationHighlightFields, append: appendLocationHighlight, remove: removeLocationHighlight } = useFieldArray({ control, name: 'locationHighlights' });

  const addMutation = useMutation((data: Project) => addProject(data), {
    onSuccess: () => {
      toast.success('Project added successfully!');
      queryClient.invalidateQueries('getProjects');
      reset();
      onClose();
    },
    onError: (error: any) => {
      toast.error(`${error.response?.data?.message || 'Failed to add project.'}`);
    }
  });

  const onSubmit = (data: Project) => {
    console.log('Data:', data);
    addMutation.mutate(data);
  };

  const handleImageDelete = () => {
    setValue('projectImages', []);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: '100%', maxWidth: '360px', background: '#FFFFFF' }}}
    >
      <Box sx={{ width: '100%', height: '60px', backgroundColor: 'primary.main', display: 'flex', alignItems: 'center', color: 'white', justifyContent: 'space-between', padding: '0 16px' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: '600' }}>Add Project</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white', mr: 2 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="name-input">Project Name</InputLabel>
            <Controller 
              name="name" 
              control={control} 
              render={({ field }) => (
                <CustomInput 
                  id="name-input" 
                  placeholder="Enter project name..." 
                  {...field} 
                  error={!!errors.name}
                />
              )} 
            />
            {errors.name && <Typography color="error">{errors.name.message}</Typography>}
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="description-input">Description</InputLabel>
            <Controller 
              name="description" 
              control={control} 
              render={({ field }) => (
                <CustomInput 
                  id="description-input" 
                  placeholder="Enter description..." 
                  {...field} 
                  error={!!errors.description}
                />
              )} 
            />
            {errors.description && <Typography color="error">{errors.description.message}</Typography>}
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="establishedYear-input">Established Year</InputLabel>
            <Controller 
              name="establishedYear" 
              control={control} 
              render={({ field }) => (
                <CustomInput 
                  id="establishedYear-input" 
                  placeholder="Enter established year..." 
                  {...field} 
                  error={!!errors.establishedYear}
                />
              )} 
            />
            {errors.establishedYear && <Typography color="error">{errors.establishedYear.message}</Typography>}
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="sftPrice-input">Price per SFT</InputLabel>
            <Controller 
              name="sftPrice" 
              control={control} 
              render={({ field }) => (
                <CustomInput 
                  id="sftPrice-input" 
                  placeholder="Enter price per SFT..." 
                  type="number"
                  {...field} 
                  error={!!errors.sftPrice}
                />
              )} 
            />
            {errors.sftPrice && <Typography color="error">{errors.sftPrice.message}</Typography>}
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="emiPrice-input">EMI Price</InputLabel>
            <Controller 
              name="emiPrice" 
              control={control} 
              render={({ field }) => (
                <CustomInput 
                  id="emiPrice-input" 
                  placeholder="Enter EMI Price..." 
                  type="number"
                  {...field} 
                  error={!!errors.emiPrice}
                />
              )} 
            />
            {errors.emiPrice && <Typography color="error">{errors.emiPrice.message}</Typography>}
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="builderName-input">Builder Name</InputLabel>
            <Controller 
            name="builderName" 
            control={control} 
            render={({ field }) => (
              <CustomInput 
                id="builderName-input" 
                placeholder="Enter builder name..." 
                {...field} 
                error={!!errors.builderName}
                />
            )} />
            {/* <FormHelperText error>{errors.builderName?.message}</FormHelperText> */}
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="location-input">Location</InputLabel>
            <Controller 
            name="location" 
            control={control} 
            render={({ field }) => (
              <CustomInput 
                id="location-input" 
                placeholder="Enter location..." 
                {...field} 
                error={!!errors.location}
                />
            )} />
            {/* <FormHelperText error>{errors.location?.message}</FormHelperText> */}
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="city-input">City</InputLabel>
            <Controller 
            name="city" 
            control={control} 
            render={({ field }) => (
              <CustomInput 
                id="city-input" 
                placeholder="Enter city..." 
                {...field} 
                error={!!errors.city}
                />
            )} />
            {/* <FormHelperText error>{errors.city?.message}</FormHelperText> */}
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="pincode-input">Pincode</InputLabel>
            <Controller 
            name="pincode" 
            control={control} 
            render={({ field }) => (
              <CustomInput 
                id="pincode-input" 
                placeholder="Enter pincode..." 
                {...field} 
                error={!!errors.pincode}
                />
            )} />
            {/* <FormHelperText error>{errors.pincode?.message}</FormHelperText> */}
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="whyThisProject-input">Why this project?</InputLabel>
            <Controller 
            name="whyThisProject" 
            control={control} 
            render={({ field }) => (
              <CustomInput 
                id="whyThisProject-input" 
                placeholder="Enter why this project..." 
                {...field} 
                />
            )} />
          </FormControl>

            {/* comma seperated values like 1,2,3,4,4.5,5 */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="projectBHK-input">Project BHK</InputLabel>
            <Controller
              name="projectBHK"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="projectBHK-input"
                  placeholder="Enter project BHK..."
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="status-input">Status</InputLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="status-input"
                  placeholder="Enter status..."
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="minSize-input">Minimum Size</InputLabel>
            <Controller
              name="minSize"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="minSize-input"
                  placeholder="Enter minimum size..."
                  type="number"
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="maxSize-input">Maximum Size</InputLabel>
            <Controller
              name="maxSize"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="maxSize-input"
                  placeholder="Enter maximum size..."
                  type="number"
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="buildings-input">Buildings</InputLabel>
            <Controller
              name="buildings"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="buildings-input"
                  placeholder="Enter buildings..."
                  type="number"
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="launchDate-input">Launch Date</InputLabel>
            <Controller
              name="launchDate"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="launchDate-input"
                  placeholder="Enter launch date..."
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="propertyType-input">Property Type</InputLabel>
            <Controller
              name="propertyType"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="propertyType-input"
                  placeholder="Enter property type..."
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="visits-input">Visits</InputLabel>
            <Controller
              name="visits"
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="visits-input"
                  placeholder="Enter visits..."
                  type="number"
                  {...field}
                />
              )}
            />
          </FormControl>


          {/* Add other sections for reviews, bankOffers, amenities, floorPlans, and locationHighlights similarly... */}
          {/* <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="reviews-input">Reviews</InputLabel>
            {reviewFields.map((item, index) => (
              <Box key={item.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 1 }}>
                <Controller
                  name={`reviews.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Reviewer Name" {...field} />
                  )}
                />
                <Controller
                  name={`reviews.${index}.email`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Reviewer Email" {...field} />
                  )}
                />
                <Controller
                  name={`reviews.${index}.rating`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Rating" type="number" {...field} />
                  )}
                />
                <Controller
                  name={`reviews.${index}.message`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Message" {...field} />
                  )}
                />
                <Button onClick={() => removeReview(index)}>Remove Review</Button>
              </Box>
            ))}
            <Button onClick={() => appendReview({ _id: '', name: '', email: '', rating: 0, message: '' })}>Add Review</Button>
          </FormControl> */}

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="bankOffers-input">Bank Offers</InputLabel>
            {bankOfferFields.map((item, index) => (
              <Box key={item.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 1 }}>
                <Controller
                  name={`bankOffers.${index}.bankIcon`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Bank Icon URL" {...field} />
                  )}
                />
                <Controller
                  name={`bankOffers.${index}.bankName`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Bank Name" {...field} />
                  )}
                />
                <Button onClick={() => removeBankOffer(index)}>Remove Bank Offer</Button>
              </Box>
            ))}
            <Button onClick={() => appendBankOffer({  bankIcon: '', bankName: '' })}>Add Bank Offer</Button>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="amenities-input">Amenities</InputLabel>
            {amenityFields.map((item, index) => (
              <Box key={item.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 1 }}>
                <Controller
                  name={`amenities.${index}.iconName`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Icon Name" {...field} />
                  )}
                />
                <Controller
                  name={`amenities.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Amenity Name" {...field} />
                  )}
                />
                <Button onClick={() => removeAmenity(index)}>Remove Amenity</Button>
              </Box>
            ))}
            <Button onClick={() => appendAmenity({ iconName: '', name: '' })}>Add Amenity</Button>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="floorPlans-input">Floor Plans</InputLabel>
            {floorPlanFields.map((item, index) => (
              <Box key={item.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 1 }}>
                <Controller
                  name={`floorPlans.${index}.floorImage`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Floor Image URL" {...field} />
                  )}
                />
                <Controller
                  name={`floorPlans.${index}.size`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Size" type="number" {...field} />
                  )}
                />
                <Controller
                  name={`floorPlans.${index}.fullPrice`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Full Price" type="number" {...field} />
                  )}
                />
                <Controller
                  name={`floorPlans.${index}.emiPrice`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="EMI Price" type="number" {...field} />
                  )}
                />
                <Controller
                  name={`floorPlans.${index}.floorNumber`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Floor Number" type="number" {...field} />
                  )}
                />
                <Button onClick={() => removeFloorPlan(index)}>Remove Floor Plan</Button>
              </Box>
            ))}
            <Button onClick={() => appendFloorPlan({ floorImage: '', size: 0, fullPrice: 0, emiPrice: 0, floorNumber: 0 })}>Add Floor Plan</Button>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="locationHighlights-input">Location Highlights</InputLabel>
            {locationHighlightFields.map((item, index) => (
              <Box key={item.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 1 }}>
                <Controller
                  name={`locationHighlights.${index}.locationType`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Location Type" {...field} />
                  )}
                />
                <Controller
                  name={`locationHighlights.${index}.locationName`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Location Name" {...field} />
                  )}
                />
                <Controller
                  name={`locationHighlights.${index}.icon`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Icon" {...field} />
                  )}
                />
                <Controller
                  name={`locationHighlights.${index}.time`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Time" type="number" {...field} />
                  )}
                />
                <Controller
                  name={`locationHighlights.${index}.distance`}
                  control={control}
                  render={({ field }) => (
                    <CustomInput placeholder="Distance" type="number" {...field} />
                  )}
                />
                <Button onClick={() => removeLocationHighlight(index)}>Remove Location Highlight</Button>
              </Box>
            ))}
            <Button onClick={() => appendLocationHighlight({ locationType: '', locationName: '', icon: '', time: 0, distance: 0 })}>Add Location Highlight</Button>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="projectImages-input">Project Images</InputLabel>
            <FileUploadContainer
            onFileSelect={(url: string | null) => {
                if (url) {
                setValue('projectImages', [url]); // Assuming `projectImages` is an array, but handling a single URL at a time
                } else {
                setValue('projectImages', []); // Clear images if null
                }
            }}
            foldername="projects" // Change folder name as needed
            // existingImage={initialValues?.projectImages[0] || ''} // Show the first image if available
            onDelete={() => handleImageDelete()} // Define the handleImageDelete function in component logic
            />
          </FormControl>

          

          

          {/* Add other sections for bankOffers, amenities, floorPlans, and locationHighlights similarly... */}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} disabled={addMutation.isLoading} onSubmit={handleSubmit(onSubmit)}>
            Add Project
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddProjects;































































































// import React, { FC, useEffect } from 'react';
// import {
//   Drawer,
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   FormControl,
//   InputLabel,
//   FormHelperText,
//   TextField,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { Controller, useForm, useFieldArray } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import CustomInput from '../../../Components/Inputs/CustomInput';
// import { useMutation, useQueryClient } from 'react-query';
// import { addProject, updateProject } from '../../../api/services';
// import { toast } from 'react-toastify';
// import FileUploadContainer from '../../../Components/FileUploadContainer';
// import { Project } from '../ProjectInterface';
// import * as Yup from 'yup';



// interface AddProjectsProps {
//   open: boolean;
//   onClose: () => void;
//   initialValues?: Project;
//   projectId?: string;
// }



// const schema = Yup.object().shape({
//     _id: Yup.string().optional(), 
//     projectId: Yup.string().optional(),
//     builderId: Yup.string().optional(),
//     zone: Yup.string().optional(),
//     street: Yup.string().optional(),
//     name: Yup.string().required('Project name is required'),
//     description: Yup.string().required('Description is required'),
//     establishedYear: Yup.string().required('Established year is required'),
//     sftPrice: Yup.number().required('SFT Price is required'),
//     emiPrice: Yup.number().required('EMI Price is required'),
//     builderName: Yup.string().required('Builder name is required'),
//     location: Yup.string().required('Location is required'),
//     city: Yup.string().required('City is required'),
//     pincode: Yup.string().required('Pincode is required'),
//     whyThisProject: Yup.array().of(Yup.string()).required(),
//     projectBHK: Yup.array().of(Yup.number()).required(),
//     status: Yup.string().required(),
//     minSize: Yup.number().required(),
//     maxSize: Yup.number().required(),
//     buildings: Yup.number().required(),
//     launchDate: Yup.string().required(),
//     locationIframe: Yup.string().notRequired(),
//     propertyType: Yup.string().required(),
//     videoLink: Yup.string().notRequired(),
//     dimensions: Yup.string().notRequired(),
//     parkingArea: Yup.number().required(),
//     reraId: Yup.string().notRequired(),
//     approvals: Yup.string().notRequired(),
//     visits: Yup.number().required(),
//     projectImages: Yup.array().of(Yup.string()).notRequired(),
//     reviews: Yup.array().of(
//       Yup.object().shape({
//         _id: Yup.string().required(),
//         name: Yup.string().required(),
//         email: Yup.string().email().required(),
//         rating: Yup.number().required(),
//         message: Yup.string().required(),
//       })
//     ).notRequired(),
//     bankOffers: Yup.array().of(
//       Yup.object().shape({
//         _id: Yup.string().required(),
//         bankIcon: Yup.string().required(),
//         bankName: Yup.string().required(),
//       })
//     ).notRequired(),
//     amenities: Yup.array().of(
//       Yup.object().shape({
//         _id: Yup.string().required(),
//         iconName: Yup.string().required(),
//         name: Yup.string().required(),
//       })
//     ).notRequired(),
//     floorPlans: Yup.array().of(
//       Yup.object().shape({
//         _id: Yup.string().required(),
//         floorImage: Yup.string().required(),
//         size: Yup.number().required(),
//         fullPrice: Yup.number().required(),
//         emiPrice: Yup.number().required(),
//         floorNumber: Yup.number().required(),
//       })
//     ).notRequired(),
//     locationHighlights: Yup.array().of(
//       Yup.object().shape({
//         _id: Yup.string().required(),
//         locationType: Yup.string().required(),
//         locationName: Yup.string().required(),
//         icon: Yup.string().required(),
//         time: Yup.number().required(),
//         distance: Yup.number().required(),
//       })
//     ).notRequired(),
//   });
  


//     const AddProjects: FC<AddProjectsProps> = ({ open, onClose, initialValues, projectId }) => {
//     const queryClient = useQueryClient();
//     const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm<Project>({
//         resolver: yupResolver(schema),
//         defaultValues: initialValues || {
//         name: '',
//         description: '',
//         establishedYear: '',
//         sftPrice: 0,
//         emiPrice: 0,
//         builderName: '',
//         location: '',
//         city: '',
//         zone: '',
//         street: '',
//         pincode: '',
//         whyThisProject: [],
//         projectBHK: [],
//         status: '',
//         minSize: 0,
//         maxSize: 0,
//         buildings: 0,
//         launchDate: '',
//         locationIframe: '',
//         propertyType: '',
//         videoLink: '',
//         dimensions: '',
//         parkingArea: 0,
//         reraId: '',
//         approvals: '',
//         visits: 0,
//         reviews: [],
//         bankOffers: [],
//         amenities: [],
//         floorPlans: [],
//         locationHighlights: [],
//         projectImages: [],
//         },
//     });

//   // UseFieldArray hooks for nested fields
//   const { fields: reviewFields, append: appendReview, remove: removeReview } = useFieldArray({
//     control,
//     name: 'reviews',
//   });

//   const { fields: bankOfferFields, append: appendBankOffer, remove: removeBankOffer } = useFieldArray({
//     control,
//     name: 'bankOffers',
//   });

//   const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({
//     control,
//     name: 'amenities',
//   });

//   const { fields: floorPlanFields, append: appendFloorPlan, remove: removeFloorPlan } = useFieldArray({
//     control,
//     name: 'floorPlans',
//   });

//   const { fields: locationHighlightFields, append: appendLocationHighlight, remove: removeLocationHighlight } = useFieldArray({
//     control,
//     name: 'locationHighlights',
//   });

//   // Reset form on initialValues change
//   useEffect(() => {
//     if (initialValues) reset(initialValues);
//     else reset();
//   }, [initialValues, reset]);

  // const addMutation = useMutation((data: Project) => addProject(data), {
  //   onSuccess: () => {
  //     toast.success('Project added successfully!');
  //     queryClient.invalidateQueries('getProjects');
  //     reset();
  //     onClose();
  //   },
  //   onError: (error: any) => {
  //     toast.error(`${error.response.data.message}`);
  //   }
  // });

//   const updateMutation = useMutation((data: Project) => {
//     if (projectId !== undefined) return updateProject(projectId, data);
//     return Promise.reject(new Error('Project ID is undefined'));
//   }, {
//     onSuccess: () => {
//       toast.success('Project updated successfully!');
//       queryClient.invalidateQueries('getProjects');
//       reset();
//       onClose();
//     },
//     onError: (error: any) => {
//       toast.error(`${error.response.data.message}`);
//     }
//   });

//   const onSubmit = (data: Project) => {
//     if (projectId) updateMutation.mutate(data);
//     else addMutation.mutate(data);
//   };

//   // Handle Image Upload
//   const handleImageDelete = () => {
//     setValue('projectImages', []);
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{ sx: { width: '100%', maxWidth: '360px', background: '#FFFFFF', opacity: 1 }}}
//     >
//       <Box sx={{ width: '100%', height: '60px', backgroundColor: 'primary.main', display: 'flex', alignItems: 'center', color: 'white', justifyContent: 'space-between', padding: '0 16px' }}>
//         <Typography variant="h6" sx={{ color: 'white', fontWeight: '600' }}>{initialValues ? 'Edit Project' : 'Add Project'}</Typography>
//         <IconButton onClick={onClose} sx={{ color: 'white', mr: 2 }}>
//           <CloseIcon />
//         </IconButton>
//       </Box>
//       <Box sx={{ padding: '20px' }}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="name-input">Project Name</InputLabel>
//             <Controller name="name" control={control} render={({ field }) => (
//               <CustomInput id="name-input" placeholder="Enter project name..." {...field} error={!!errors.name} />
//             )} />
//             <FormHelperText error>{errors.name?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="description-input">Description</InputLabel>
//             <Controller name="description" control={control} render={({ field }) => (
//               <CustomInput id="description-input" placeholder="Enter description..." {...field} error={!!errors.description} />
//             )} />
//             <FormHelperText error>{errors.description?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="establishedYear-input">Established Year</InputLabel>
//             <Controller name="establishedYear" control={control} render={({ field }) => (
//               <CustomInput id="establishedYear-input" placeholder="Enter established year..." {...field} error={!!errors.establishedYear} />
//             )} />
//             <FormHelperText error>{errors.establishedYear?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="sftPrice-input">Price per SFT</InputLabel>
//             <Controller name="sftPrice" control={control} render={({ field }) => (
//               <CustomInput id="sftPrice-input" placeholder="Enter price per SFT..." type="number" {...field} error={!!errors.sftPrice} />
//             )} />
//             <FormHelperText error>{errors.sftPrice?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="emiPrice-input">EMI Price</InputLabel>
//             <Controller name="emiPrice" control={control} render={({ field }) => (
//               <CustomInput id="emiPrice-input" placeholder="Enter EMI price..." type="number" {...field} error={!!errors.emiPrice} />
//             )} />
//             <FormHelperText error>{errors.emiPrice?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="builderName-input">Builder Name</InputLabel>
//             <Controller name="builderName" control={control} render={({ field }) => (
//               <CustomInput id="builderName-input" placeholder="Enter builder name..." {...field} error={!!errors.builderName} />
//             )} />
//             <FormHelperText error>{errors.builderName?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="location-input">Location</InputLabel>
//             <Controller name="location" control={control} render={({ field }) => (
//               <CustomInput id="location-input" placeholder="Enter location..." {...field} error={!!errors.location} />
//             )} />
//             <FormHelperText error>{errors.location?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="city-input">City</InputLabel>
//             <Controller name="city" control={control} render={({ field }) => (
//               <CustomInput id="city-input" placeholder="Enter city..." {...field} error={!!errors.city} />
//             )} />
//             <FormHelperText error>{errors.city?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="zone-input">Zone</InputLabel>
//             <Controller name="zone" control={control} render={({ field }) => (
//               <CustomInput id="zone-input" placeholder="Enter zone..." {...field} />
//             )} />
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="street-input">Street</InputLabel>
//             <Controller name="street" control={control} render={({ field }) => (
//               <CustomInput id="street-input" placeholder="Enter street..." {...field} />
//             )} />
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="pincode-input">Pincode</InputLabel>
//             <Controller name="pincode" control={control} render={({ field }) => (
//               <CustomInput id="pincode-input" placeholder="Enter pincode..." {...field} error={!!errors.pincode} />
//             )} />
//             <FormHelperText error>{errors.pincode?.message}</FormHelperText>
//           </FormControl>

//           {/* Add sections for nested fields */}
//           <Typography variant="h6" sx={{ marginBottom: 1 }}>Reviews</Typography>
//           {reviewFields.map((item, index) => (
//             <Box key={item.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 1 }}>
//               <Controller name={`reviews.${index}.name`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Reviewer Name" {...field} />
//               )} />
//               <Controller name={`reviews.${index}.email`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Reviewer Email" {...field} />
//               )} />
//               <Controller name={`reviews.${index}.rating`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Rating" type="number" {...field} />
//               )} />
//               <Controller name={`reviews.${index}.message`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Message" {...field} />
//               )} />
//               <Button onClick={() => removeReview(index)}>Remove Review</Button>
//             </Box>
//           ))}
//           <Button onClick={() => appendReview({ _id: '', name: '', email: '', rating: 0, message: '' })}>Add Review</Button>

//           <Typography variant="h6" sx={{ marginBottom: 1 }}>Bank Offers</Typography>
//           {bankOfferFields.map((item, index) => (
//             <Box key={item.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 1 }}>
//               <Controller name={`bankOffers.${index}.bankIcon`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Bank Icon URL" {...field} />
//               )} />
//               <Controller name={`bankOffers.${index}.bankName`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Bank Name" {...field} />
//               )} />
//               <Button onClick={() => removeBankOffer(index)}>Remove Bank Offer</Button>
//             </Box>
//           ))}
//           <Button onClick={() => appendBankOffer({ _id: '', bankIcon: '', bankName: '' })}>Add Bank Offer</Button>

//           <Typography variant="h6" sx={{ marginBottom: 1 }}>Amenities</Typography>
//           {amenityFields.map((item, index) => (
//             <Box key={item.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 1 }}>
//               <Controller name={`amenities.${index}.iconName`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Amenity Icon Name" {...field} />
//               )} />
//               <Controller name={`amenities.${index}.name`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Amenity Name" {...field} />
//               )} />
//               <Button onClick={() => removeAmenity(index)}>Remove Amenity</Button>
//             </Box>
//           ))}
//           <Button onClick={() => appendAmenity({ _id: '', iconName: '', name: '' })}>Add Amenity</Button>

//           <Typography variant="h6" sx={{ marginBottom: 1 }}>Floor Plans</Typography>
//           {floorPlanFields.map((item, index) => (
//             <Box key={item.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 1 }}>
//               <Controller name={`floorPlans.${index}.floorImage`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Floor Plan Image URL" {...field} />
//               )} />
//               <Controller name={`floorPlans.${index}.size`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Size" type="number" {...field} />
//               )} />
//               <Controller name={`floorPlans.${index}.fullPrice`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Full Price" type="number" {...field} />
//               )} />
//               <Controller name={`floorPlans.${index}.emiPrice`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="EMI Price" type="number" {...field} />
//               )} />
//               <Controller name={`floorPlans.${index}.floorNumber`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Floor Number" type="number" {...field} />
//               )} />
//               <Button onClick={() => removeFloorPlan(index)}>Remove Floor Plan</Button>
//             </Box>
//           ))}
//           <Button onClick={() => appendFloorPlan({ _id: '', floorImage: '', size: 0, fullPrice: 0, emiPrice: 0, floorNumber: 0 })}>Add Floor Plan</Button>

//           <Typography variant="h6" sx={{ marginBottom: 1 }}>Location Highlights</Typography>
//           {locationHighlightFields.map((item, index) => (
//             <Box key={item.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 1 }}>
//               <Controller name={`locationHighlights.${index}.locationType`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Location Type" {...field} />
//               )} />
//               <Controller name={`locationHighlights.${index}.locationName`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Location Name" {...field} />
//               )} />
//               <Controller name={`locationHighlights.${index}.icon`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Icon URL" {...field} />
//               )} />
//               <Controller name={`locationHighlights.${index}.time`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Time (mins)" type="number" {...field} />
//               )} />
//               <Controller name={`locationHighlights.${index}.distance`} control={control} render={({ field }) => (
//                 <CustomInput placeholder="Distance (km)" type="number" {...field} />
//               )} />
//               <Button onClick={() => removeLocationHighlight(index)}>Remove Location Highlight</Button>
//             </Box>
//           ))}
//           <Button onClick={() => appendLocationHighlight({ _id: '', locationType: '', locationName: '', icon: '', time: 0, distance: 0 })}>Add Location Highlight</Button>

//           <FileUploadContainer
//             onFileSelect={(url: string | null) => {
//                 if (url) {
//                 setValue('projectImages', [url]); // Assuming `projectImages` is an array, but handling a single URL at a time
//                 } else {
//                 setValue('projectImages', []); // Clear images if null
//                 }
//             }}
//             foldername="projects" // Change folder name as needed
//             existingImage={initialValues?.projectImages[0] || ''} // Show the first image if available
//             onDelete={() => handleImageDelete()} // Define the handleImageDelete function in component logic
//             />

//           <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
//             {initialValues ? 'Update Project' : 'Add Project'}
//           </Button>
//         </form>
//       </Box>
//     </Drawer>
//   );
// };

// export default AddProjects;
