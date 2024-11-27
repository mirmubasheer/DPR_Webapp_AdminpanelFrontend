// import React, { FC, useEffect, useState } from 'react';
// import {
//   Drawer,
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   FormControl,
//   InputLabel,
//   FormHelperText,
//   InputAdornment,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   TextField,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { Controller, useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import CustomInput from '../../Components/Inputs/CustomInput';
// import FileUploadContainer from '../../Components/FileUploadContainer'; // Assuming this is the component for handling file uploads
// import { useMutation, useQueryClient } from 'react-query';
// import { toast } from 'react-toastify';
// import { addProject, updateProject, getBuilderOptions } from '../../api/services'; 

// interface AddProjectsProps {
//   open: boolean;
//   onClose: () => void;
//   initialValues?: FormValues;
// }

// interface FormValues {
//   projectName: string;
//   projectLocation: string;
//   projectImages: string[];
//   projectDescription: string;
//   propertyType: string;
//   likes: number;
//   amenities: string[];
//   locationIframe: string;
//   reviews: any[]; // Adjust as needed
//   builderId: number;
//   builderName: string;
//   builderImage: string;
//   builderOccupation: string;
//   builderDescription: string;
//   projectBHK: number[];
//   unitsApartments: string;
//   approvals: string;
//   category: string;
//   locationHighlights: string;
//   floorPlans: string[];
//   projectImagesNew: string[];
// }

// const schema = yup.object().shape({
//   projectName: yup.string().required('Project Name is required'),
//   projectLocation: yup.string().required('Project Location is required'),
//   projectDescription: yup.string().required('Project Description is required'),
//   propertyType: yup.string().required('Property Type is required'),
//   builderName: yup.string().required('Builder Name is required'),
//   builderImage: yup.string().required('Builder Image URL is required'),
//   builderOccupation: yup.string().required('Builder Occupation is required'),
//   builderDescription: yup.string().required('Builder Description is required'),
//   unitsApartments: yup.string().required('Units/Apartments is required'),
//   approvals: yup.string().required('Approvals are required'),
//   category: yup.string().required('Category is required'),
//   locationHighlights: yup.string().required('Location Highlights are required'),
//   // Optional fields with defaults
//   likes: yup.number().default(0),
//   amenities: yup.array().of(yup.string()).default([]),
//   locationIframe: yup.string().default(''),
//   floorPlans: yup.array().of(yup.string()).default([]),
//   projectImagesNew: yup.array().of(yup.string()).default([]),
//   projectBHK: yup.array().of(yup.number()).default([]),
//   reviews: yup.array().default([]),
// });

// const propertyTypes = ["Apartments", "Villas", "Commercial", "Land"];
// const categories = ["Residential", "Commercial", "Mixed Use"];

// const AddProjects: FC<AddProjectsProps> = ({ open, onClose, initialValues }) => {
//   const queryClient = useQueryClient();
//   const [builders, setBuilders] = useState<any[]>([]); // Adjust type as needed
//   const [projectImagesCount, setProjectImagesCount] = useState<number>(0);
//   const [floorPlansCount, setFloorPlansCount] = useState<number>(0);
//   const [amenitiesCount, setAmenitiesCount] = useState<number>(0);

//   const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
//     resolver: yupResolver(schema),
//     defaultValues: initialValues || {
//       projectName: '',
//       projectLocation: '',
//       projectImages: [],
//       projectDescription: '',
//       propertyType: '',
//       likes: 0,
//       amenities: [],
//       locationIframe: '',
//       reviews: [],
//       builderId: 0,
//       builderName: '',
//       builderImage: '',
//       builderOccupation: '',
//       builderDescription: '',
//       projectBHK: [],
//       unitsApartments: '',
//       approvals: '',
//       category: '',
//       locationHighlights: '',
//       floorPlans: [],
//       projectImagesNew: [],
//     }
//   });

//   useEffect(() => {
//     if (initialValues) {
//       reset(initialValues);
//     } else {
//       reset({
//         projectName: '',
//         projectLocation: '',
//         projectImages: [],
//         projectDescription: '',
//         propertyType: '',
//         likes: 0,
//         amenities: [],
//         locationIframe: '',
//         reviews: [],
//         builderId: 0,
//         builderName: '',
//         builderImage: '',
//         builderOccupation: '',
//         builderDescription: '',
//         projectBHK: [],
//         unitsApartments: '',
//         approvals: '',
//         category: '',
//         locationHighlights: '',
//         floorPlans: [],
//         projectImagesNew: [],
//       });
//     }
//   }, [initialValues, reset]);

//   useEffect(() => {
//     const fetchBuilders = async () => {
//       try {
//         const response = await getBuilderOptions(); // Fetch builder options
//         setBuilders(response.data);
//       } catch (error) {
//         toast.error('Failed to fetch builders');
//       }
//     };
//     fetchBuilders();
//   }, []);

//   const addMutation = useMutation((data: FormValues) => addProject(data), {
//     onSuccess: () => {
//       toast.success('Project added successfully!');
//       queryClient.invalidateQueries('getProjects');
//       onClose();
//     },
//     onError: (error: any) => {
//       toast.error(`${error.response?.data?.message || 'Error adding project'}`);
//     }
//   });

//   const updateMutation = useMutation((data: FormValues) => {
//     if (initialValues && initialValues.id) {
//       return updateProject(initialValues.id, data);
//     }
//     return Promise.reject(new Error('Project ID is undefined'));
//   }, {
//     onSuccess: () => {
//       toast.success('Project updated successfully!');
//       queryClient.invalidateQueries('getProjects');
//       onClose();
//     },
//     onError: (error: any) => {
//       toast.error(`${error.response?.data?.message || 'Error updating project'}`);
//     }
//   });

//   const onSubmit = (data: FormValues) => {
//     if (initialValues && initialValues.id) {
//       updateMutation.mutate(data);
//     } else {
//       addMutation.mutate(data);
//     }
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: '100%',
//           maxWidth: '360px',
//           background: '#FFFFFF',
//           opacity: 1,
//           borderRadius: '0px',
//           border: 'none',
//         },
//       }}
//     >
//       <Box
//         sx={{
//           width: '100%',
//           height: '60px',
//           background: '#6563FF29',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent:           'space-between',
//           padding: '0px 16px',
//         }}
//       >
//         <Typography variant="h4" sx={{ color: '#121212', fontFamily: 'Poppins, SemiBold' }}>
//           {initialValues ? 'Edit Project' : 'Add Project'}
//         </Typography>
//         <IconButton onClick={onClose} sx={{ color: 'white' }}>
//           <CloseIcon />
//         </IconButton>
//       </Box>
//       <Box sx={{ padding: '20px' }}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="projectName-input">Project Name</InputLabel>
//             <Controller
//               name="projectName"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="projectName-input"
//                   placeholder="Enter project name..."
//                   {...field}
//                   error={!!errors.projectName}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.projectName?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="projectLocation-input">Project Location</InputLabel>
//             <Controller
//               name="projectLocation"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="projectLocation-input"
//                   placeholder="Enter project location..."
//                   {...field}
//                   error={!!errors.projectLocation}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.projectLocation?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="projectDescription-input">Project Description</InputLabel>
//             <Controller
//               name="projectDescription"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="projectDescription-input"
//                   placeholder="Enter project description..."
//                   {...field}
//                   error={!!errors.projectDescription}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.projectDescription?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="propertyType-select">Property Type</InputLabel>
//             <Controller
//               name="propertyType"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   id="propertyType-select"
//                   {...field}
//                   error={!!errors.propertyType}
//                 >
//                   {propertyTypes.map((type) => (
//                     <MenuItem key={type} value={type}>{type}</MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//             <FormHelperText error>{errors.propertyType?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="builderName-select">Builder Name</InputLabel>
//             <Controller
//               name="builderId"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   id="builderName-select"
//                   {...field}
//                   error={!!errors.builderId}
//                 >
//                   {builders.map((builder) => (
//                     <MenuItem key={builder.id} value={builder.id}>{builder.name}</MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//             <FormHelperText error>{errors.builderId?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="builderImage-input">Builder Image URL</InputLabel>
//             <Controller
//               name="builderImage"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="builderImage-input"
//                   placeholder="Enter builder image URL..."
//                   {...field}
//                   error={!!errors.builderImage}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.builderImage?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="builderOccupation-input">Builder Occupation</InputLabel>
//             <Controller
//               name="builderOccupation"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="builderOccupation-input"
//                   placeholder="Enter builder occupation..."
//                   {...field}
//                   error={!!errors.builderOccupation}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.builderOccupation?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="builderDescription-input">Builder Description</InputLabel>
//             <Controller
//               name="builderDescription"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="builderDescription-input"
//                   placeholder="Enter builder description..."
//                   {...field}
//                   error={!!errors.builderDescription}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.builderDescription?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="unitsApartments-input">Units/Apartments</InputLabel>
//             <Controller
//               name="unitsApartments"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="unitsApartments-input"
//                   placeholder="Enter units/apartments..."
//                   {...field}
//                   error={!!errors.unitsApartments}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.unitsApartments?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="approvals-input">Approvals</InputLabel>
//             <Controller
//               name="approvals"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="approvals-input"
//                   placeholder="Enter approvals..."
//                   {...field}
//                   error={!!errors.approvals}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.approvals?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="category-select">Category</InputLabel>
//             <Controller
//               name="category"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   id="category-select"
//                   {...field}
//                   error={!!errors.category}
//                 >
//                   {categories.map((category) => (
//                     <MenuItem key={category} value={category}>{category}</MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//             <FormHelperText error>{errors.category?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="locationHighlights-input">Location Highlights</InputLabel>
//             <Controller
//               name="locationHighlights"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="locationHighlights-input"
//                   placeholder="Enter location highlights..."
//                   {...field}
//                   error={!!errors.locationHighlights}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.locationHighlights?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="floorPlans-input">Floor Plans</InputLabel>
//             <TextField
//               id="floorPlans-input"
//               type="number"
//               value={floorPlansCount}
//               onChange={(e) => setFloorPlansCount(Number(e.target.value))}
//               placeholder="Enter number of floor plans"
//               fullWidth
//               variant="outlined"
//               margin="normal"
//             />
//             <FileUploadContainer
//               count={floorPlansCount}
//               onChange={(files) => control.setValue('floorPlans', files)}
//               initialFiles={initialValues?.floorPlans}
//             />
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="projectImagesNew-input">Project Images</InputLabel>
//             <TextField
//               id="projectImagesNew-input"
//               type="number"
//               value={projectImagesCount}
//               onChange={(e) => setProjectImagesCount(Number(e.target.value))}
//               placeholder="Enter number of project images"
//               fullWidth
//               variant="outlined"
//               margin="normal"
//             />
//             <FileUploadContainer
//               count={projectImagesCount}
//               onChange={(files) => control.setValue('projectImagesNew', files)}
//               initialFiles={initialValues?.projectImagesNew}
//             />
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="amenities-input">Amenities</InputLabel>
//             <TextField
//               id="amenities-input"
//               type="number"
//               value={amenitiesCount}
//               onChange={(e) => setAmenitiesCount(Number(e.target.value))}
//               placeholder="Enter number of amenities"
//               fullWidth
//               variant="outlined"
//               margin="normal"
//             />
//             <Controller
//               name="amenities"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   placeholder="Enter amenities (comma-separated)..."
//                   {...field}
//                   error={!!errors.amenities}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.amenities?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="locationiframe-input">Location Iframe</InputLabel>
//             <Controller
//               name="locationiframe"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="locationiframe-input"
//                   placeholder="Enter location iframe URL..."
//                   {...field}
//                   error={!!errors.locationiframe}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.locationiframe?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="projectBHK-input">Project BHK</InputLabel>
//             <Controller
//               name="projectBHK"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="projectBHK-input"
//                   placeholder="Enter BHK numbers (comma-separated)..."
//                   {...field}
//                   error={!!errors.projectBHK}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.projectBHK?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="createdDate-input">Created Date</InputLabel>
//             <Controller
//               name="createdAt"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="createdDate-input"
//                   placeholder="Enter created date..."
//                   type="date"
//                   {...field}
//                   error={!!errors.createdAt}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.createdAt?.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink htmlFor="updatedAt-input">Updated Date</InputLabel>
//             <Controller
//               name="updatedAt"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="updatedAt-input"
//                   placeholder="Enter updated date..."
//                   type="date"
//                   {...field}
//                   error={!!errors.updatedAt}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.updatedAt?.message}</FormHelperText>
//           </FormControl>

//           <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
//             {initialValues ? 'Update' : 'Submit'}
//           </Button>
//         </form>
//       </Box>
//     </Drawer>
//   );
// };

// export default AddProjects;





























// import React, { FC, useEffect, useState } from 'react';
// import {
//   Drawer,
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   FormControl,
//   InputLabel,
//   FormHelperText,
//   InputAdornment,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { Controller, useForm, UseFormSetValue } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import CustomInput from '../../Components/Inputs/CustomInput';
// import FileUploadContainer from '../../Components/FileUploadContainer';
// import { useMutation, useQueryClient } from 'react-query';
// import { addProject, updateProject } from '../../api/services';
// import { toast } from 'react-toastify';

// interface AddProjectsProps {
//   open: boolean;
//   onClose: () => void;
//   initialValues?: FormValues;
//   ProjectId?: number; // Ensure ProjectId is optional and passed if editing
// }

// interface PropertyDetails {
//   Properyid: number;
//   homearea: number;
//   rooms: number;
//   baths: number;
//   yearbuilt: number;
//   dimensions: string;
//   beds: number;
//   price: number;
//   status: string;
// }

// interface Reviews {
//   id: number;
//   rating: number;
//   message: string;
//   createdAt: string;
//   updatedAt: string;
//   name: string;
//   email: string;
// }

// interface builderProjectsDetails {
//   id: number;
//   projectName: string;
//   projectLocation: string;
//   projectImages: string[];
//   projectdescription: string;
// }

// interface NewProjectData {
//   id: number;
//   propertyType: string;
//   createdAt: string;
//   updatedAt: string;
//   likes: number;
//   projectName: string;
//   projectLocation: string;
//   projectImages: string[];
//   projectdescription: string;
//   propertydetails: PropertyDetails;
//   ProjectImagesNew: string[];
//   amenities: string[];
//   locationiframe: string;
//   reviews: Reviews[];
//   builderid: number;
//   builderName: string;
//   builderImage: string;
//   builderOccupation: string;
//   builderDescription: string;
//   builderProjects: builderProjectsDetails[];
//   projectBHK: number[];
//   unitsApartments: string;
//   approvals: string;
//   category: string;
//   locationHighlights: string;
//   floorPlans: string[];
// }

// interface FormValues extends Omit<NewProjectData, 'propertydetails' | 'reviews' | 'builderProjects' | 'projectBHK'> {
//   propertydetails: PropertyDetails;
//   reviews: Reviews[];
//   builderProjects: builderProjectsDetails[];
//   projectBHK: number[];
// }

// const schema = yup.object().shape({
//   projectName: yup.string().required('Project Name is required'),
//   projectLocation: yup.string().required('Project Location is required'),
//   projectdescription: yup.string().required('Project Description is required'),
//   propertyType: yup.string().required('Property Type is required'),
//   builderName: yup.string().required('Builder Name is required'),
//   builderImage: yup.string().required('Builder Image URL is required'),
//   builderOccupation: yup.string().required('Builder Occupation is required'),
//   builderDescription: yup.string().required('Builder Description is required'),
//   unitsApartments: yup.string().required('Units/Apartments is required'),
//   approvals: yup.string().required('Approvals are required'),
//   category: yup.string().required('Category is required'),
//   locationHighlights: yup.string().required('Location Highlights are required'),
//   floorPlans: yup.array().of(yup.string()).default([]),
//   propertydetails: yup.object().shape({
//     Properyid: yup.number().required(),
//     homearea: yup.number().required(),
//     rooms: yup.number().required(),
//     baths: yup.number().required(),
//     yearbuilt: yup.number().required(),
//     dimensions: yup.string().required(),
//     beds: yup.number().required(),
//     price: yup.number().required(),
//     status: yup.string().required(),
//   }).required(),
//   reviews: yup.array().of(yup.object().shape({
//     id: yup.number().required(),
//     rating: yup.number().required(),
//     message: yup.string().required(),
//     createdAt: yup.string().required(),
//     updatedAt: yup.string().required(),
//     name: yup.string().required(),
//     email: yup.string().required(),
//   })).default([]),
//   builderProjects: yup.array().of(yup.object().shape({
//     id: yup.number().required(),
//     projectName: yup.string().required(),
//     projectLocation: yup.string().required(),
//     projectImages: yup.array().of(yup.string()).required(),
//     projectdescription: yup.string().required(),
//   })).default([]),
//   projectBHK: yup.array().of(yup.number()).default([]),
// });

// const AddProjects: FC<AddProjectsProps> = ({ open, onClose, initialValues, ProjectId }) => {
//   const queryClient = useQueryClient();
//   const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormValues>({
//     resolver: yupResolver(schema),
//     defaultValues: initialValues || {
//       projectName: '',
//       projectLocation: '',
//       projectImages: [],
//       projectdescription: '',
//       propertyType: '',
//       likes: 0,
//       amenities: [],
//       locationiframe: '',
//       builderName: '',
//       builderImage: '',
//       builderOccupation: '',
//       builderDescription: '',
//       unitsApartments: '',
//       approvals: '',
//       category: '',
//       locationHighlights: '',
//       floorPlans: [],
//       propertydetails: {
//         Properyid: 0,
//         homearea: 0,
//         rooms: 0,
//         baths: 0,
//         yearbuilt: 0,
//         dimensions: '',
//         beds: 0,
//         price: 0,
//         status: '',
//       },
//       reviews: [],
//       builderProjects: [],
//       projectBHK: [],
//     }
//   });

//   useEffect(() => {
//     if (initialValues) {
//       reset(initialValues);
//     } else {
//       reset({
//         projectName: '',
//         projectLocation: '',
//         projectImages: [],
//         projectdescription: '',
//         propertyType: '',
//         likes: 0,
//         amenities: [],
//         locationiframe: '',
//         builderName: '',
//         builderImage: '',
//         builderOccupation: '',
//         builderDescription: '',
//         unitsApartments: '',
//         approvals: '',
//         category: '',
//         locationHighlights: '',
//         floorPlans: [],
//         propertydetails: {
//           Properyid: 0,
//           homearea: 0,
//           rooms: 0,
//           baths: 0,
//           yearbuilt: 0,
//           dimensions: '',
//           beds: 0,
//           price: 0,
//           status: '',
//         },
//         reviews: [],
//         builderProjects: [],
//         projectBHK: [],
//       });
//     }
//   }, [initialValues, reset]);

//   const addMutation = useMutation((data: FormValues) => addProject(data), {
//     onSuccess: () => {
//       toast.success('Project added successfully!');
//       queryClient.invalidateQueries('getProjects');
//       onClose();
//     },
//     onError: (error: any) => {
//       toast.error(`${error.response.data.message}`);
//     }
//   });

//   const updateMutation = useMutation((data: FormValues) => {
//     if (ProjectId !== undefined) {
//       return updateProject(ProjectId, data);
//     }
//     return Promise.reject(new Error('Project ID is undefined'));
//   }, {
//     onSuccess: () => {
//       toast.success('Project updated successfully!');
//       queryClient.invalidateQueries('getProjects');
//       onClose();
//     },
//     onError: (error: any) => {
//       toast.error(`${error.response.data.message}`);
//     }
//   });

//   const onSubmit = (data: FormValues) => {
//     if (ProjectId) {
//       updateMutation.mutate(data);
//     } else {
//       addMutation.mutate(data);
//     }
//   };

//   const handleFileUpload = (filelink: string[]) => {
//     setValue('projectImages', filelink, { shouldValidate: true });
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: '100%',
//           maxWidth: '360px',
//           background: '#FFFFFF',
//           opacity: 1,
//           borderRadius: '0px',
//           border: 'none',
//         },
//       }}
//     >
//       <Box
//         sx={{
//           width: '100%',
//           height: '60px',
//           background: '#6563FF29',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '0px 16px',
//         }}
//       >
//         <Typography variant="h4" sx={{ color: '#121212', fontFamily: 'Poppins, SemiBold' }}>
//           {initialValues ? 'Edit Project' : 'Add Project'}
//         </Typography>
//         <IconButton onClick={onClose} sx={{ color: 'white' }}>
//           <CloseIcon />
//         </IconButton>
//       </Box>
//       <Box sx={{ padding: '20px' }}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="projectName-input">Project Name</InputLabel>
//             <Controller
//               name="projectName"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="projectName-input"
//                   placeholder="Enter project name..."
//                   {...field}
//                   error={!!errors.projectName}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.projectName && errors.projectName.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="projectLocation-input">Project Location</InputLabel>
//             <Controller
//               name="projectLocation"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="projectLocation-input"
//                   placeholder="Enter project location..."
//                   {...field}
//                   error={!!errors.projectLocation}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.projectLocation && errors.projectLocation.message}</FormHelperText>
//           </FormControl>


//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="projectdescription-input">Project Description</InputLabel>
//             <Controller
//               name="projectdescription"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="projectdescription-input"
//                   placeholder="Enter project description..."
//                   {...field}
//                   error={!!errors.projectdescription}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.projectdescription && errors.projectdescription.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="propertyType-input">Property Type</InputLabel>
//             <Controller
//               name="propertyType"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="propertyType-input"
//                   placeholder="Enter property type..."
//                   {...field}
//                   error={!!errors.propertyType}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.propertyType && errors.propertyType.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="builderName-input">Builder Name</InputLabel>
//             <Controller
//               name="builderName"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="builderName-input"
//                   placeholder="Enter builder name..."
//                   {...field}
//                   error={!!errors.builderName}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.builderName && errors.builderName.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="builderImage-input">Builder Image</InputLabel>
//             <Controller
//               name="builderImage"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="builderImage-input"
//                   placeholder="Enter builder image URL..."
//                   {...field}
//                   error={!!errors.builderImage}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.builderImage && errors.builderImage.message}</FormHelperText>
//           </FormControl>


//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="builderOccupation-input">Builder Occupation</InputLabel>
//             <Controller
//               name="builderOccupation"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="builderOccupation-input"
//                   placeholder="Enter builder occupation..."
//                   {...field}
//                   error={!!errors.builderOccupation}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.builderOccupation && errors.builderOccupation.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="builderDescription-input">Builder Description</InputLabel>
//             <Controller
//               name="builderDescription"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="builderDescription-input"
//                   placeholder="Enter builder description..."
//                   {...field}
//                   error={!!errors.builderDescription}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.builderDescription && errors.builderDescription.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="unitsApartments-input">Units/Apartments</InputLabel>
//             <Controller
//               name="unitsApartments"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="unitsApartments-input"
//                   placeholder="Enter units/apartments..."
//                   {...field}
//                   error={!!errors.unitsApartments}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.unitsApartments && errors.unitsApartments.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="approvals-input">Approvals</InputLabel>
//             <Controller
//               name="approvals"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="approvals-input"
//                   placeholder="Enter approvals..."
//                   {...field}
//                   error={!!errors.approvals}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.approvals && errors.approvals.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="category-input">Category</InputLabel>
//             <Controller
//               name="category"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="category-input"
//                   placeholder="Enter category..."
//                   {...field}
//                   error={!!errors.category}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.category && errors.category.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="locationHighlights-input">Location Highlights</InputLabel>
//             <Controller
//               name="locationHighlights"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="locationHighlights-input"
//                   placeholder="Enter location highlights..."
//                   {...field}
//                   error={!!errors.locationHighlights}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.locationHighlights && errors.locationHighlights.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="floorPlans-input">Floor Plans</InputLabel>
//             <Controller
//               name="floorPlans"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="floorPlans-input"
//                   placeholder="Enter floor plans..."
//                   {...field}
//                   error={!!errors.floorPlans}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.floorPlans && errors.floorPlans.message}</FormHelperText> 
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="propertydetails.Properyid-input">Property ID</InputLabel>
//             <Controller
//               name="propertydetails.Properyid"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="propertydetails.Properyid-input"
//                   placeholder="Enter property ID..."
//                   {...field}
//                   error={!!errors.propertydetails?.Properyid}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.propertydetails?.Properyid && errors.propertydetails?.Properyid.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="propertydetails.homearea-input">Home Area</InputLabel>
//             <Controller
//               name="propertydetails.homearea"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="propertydetails.homearea-input"
//                   placeholder="Enter home area..."
//                   {...field}
//                   error={!!errors.propertydetails?.homearea}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.propertydetails?.homearea && errors.propertydetails?.homearea.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="propertydetails.rooms-input">Rooms</InputLabel>
//             <Controller
//               name="propertydetails.rooms"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="propertydetails.rooms-input"
//                   placeholder="Enter rooms..."
//                   {...field}
//                   error={!!errors.propertydetails?.rooms}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.propertydetails?.rooms && errors.propertydetails?.rooms.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="propertydetails.baths-input">Baths</InputLabel>
//             <Controller
//               name="propertydetails.baths"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="propertydetails.baths-input"
//                   placeholder="Enter baths..."
//                   {...field}
//                   error={!!errors.propertydetails?.baths}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.propertydetails?.baths && errors.propertydetails?.baths.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="propertydetails.yearbuilt-input">Year Built</InputLabel>
//             <Controller
//               name="propertydetails.yearbuilt"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="propertydetails.yearbuilt-input"
//                   placeholder="Enter year built..."
//                   {...field}
//                   error={!!errors.propertydetails?.yearbuilt}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.propertydetails?.yearbuilt && errors.propertydetails?.yearbuilt.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="propertydetails.dimensions-input">Dimensions</InputLabel>
//             <Controller
//               name="propertydetails.dimensions"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="propertydetails.dimensions-input"
//                   placeholder="Enter dimensions..."
//                   {...field}
//                   error={!!errors.propertydetails?.dimensions}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.propertydetails?.dimensions && errors.propertydetails?.dimensions.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="propertydetails.beds-input">Beds</InputLabel>
//             <Controller
//               name="propertydetails.beds"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="propertydetails.beds-input"
//                   placeholder="Enter beds..."
//                   {...field}
//                   error={!!errors.propertydetails?.beds}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.propertydetails?.beds && errors.propertydetails?.beds.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="propertydetails.price-input">Price</InputLabel>
//             <Controller
//               name="propertydetails.price"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="propertydetails.price-input"
//                   placeholder="Enter price..."
//                   {...field}
//                   error={!!errors.propertydetails?.price}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.propertydetails?.price && errors.propertydetails?.price.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="propertydetails.status-input">Status</InputLabel>
//             <Controller
//               name="propertydetails.status"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="propertydetails.status-input"
//                   placeholder="Enter status..."
//                   {...field}
//                   error={!!errors.propertydetails?.status}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.propertydetails?.status && errors.propertydetails?.status.message}</FormHelperText>
//           </FormControl>

          

//           {/* Add similar FormControl blocks for all other fields here */}

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="projectImages-input">Project Images</InputLabel>
//             <Controller
//               name="projectImages"
//               control={control}
//               render={({ field }) => (
//                 <FileUploadContainer
//                   onFileUpload={(filelink) => {
//                     field.onChange(filelink);
//                     handleFileUpload(filelink);
//                   }}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.projectImages && errors.projectImages.message}</FormHelperText>
//           </FormControl>

//           {/* Add FileUploadContainer for other file fields if needed */}

//           <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
//             {initialValues ? 'Update' : 'Submit'}
//           </Button>
//         </form>
//       </Box>
//     </Drawer>
//   );
// };

// export default AddProjects;


// import React, { useState } from 'react';
// import {
//   Drawer, Box, Button, TextField, Typography, FormControl, InputLabel, MenuItem, Select, Chip, OutlinedInput,
//   Checkbox, ListItemText, IconButton
// } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import { AddCircle, RemoveCircle } from '@mui/icons-material';
// import axios from 'axios';

// // Constants for Property Types and Amenities
// const propertyTypes = ['Apartments', 'Villas', 'Plots'];
// const amenitiesList = ['Gym', 'Swimming Pool', 'Playground', 'Clubhouse'];

// const AddProject = ({ open, onClose }) => {
//   const { control, handleSubmit, setValue, watch, reset } = useForm({
//     defaultValues: {
//       propertyType: '',
//       projectName: '',
//       projectLocation: '',
//       projectDescription: '',
//       propertyDetails: {
//         homearea: '',
//         rooms: '',
//         baths: '',
//         yearbuilt: '',
//         dimensions: '',
//         beds: '',
//         price: '',
//         status: '',
//       },
//       builderid: '',
//       builderName: '',
//       projectBHK: [],
//       unitsApartments: '',
//       amenities: [],
//       locationiframe: '',
//       approvals: '',
//       likes: 0,
//       projectImage: null,
//       projectImages: [],
//       projectImagesNew: [],
//     },
//   });

//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e, fieldName) => {
//     setValue(fieldName, e.target.files);
//   };

//   const onSubmit = async (data) => {
//     const formData = new FormData();

//     formData.append('propertyType', data.propertyType);
//     formData.append('projectName', data.projectName);
//     formData.append('projectLocation', data.projectLocation);
//     formData.append('projectdescription', data.projectDescription);
//     formData.append('builderid', data.builderid);
//     formData.append('builderName', data.builderName);
//     formData.append('unitsApartments', data.unitsApartments);
//     formData.append('locationiframe', data.locationiframe || '');
//     formData.append('approvals', data.approvals || '');
//     formData.append('likes', data.likes);

//     // Append property details
//     for (const key in data.propertyDetails) {
//       formData.append(`propertydetails[${key}]`, data.propertyDetails[key]);
//     }

//     // Append project BHK as array
//     data.projectBHK.forEach((bhk) => {
//       formData.append('projectBHK[]', bhk);
//     });

//     // Append amenities as array
//     data.amenities.forEach((amenity) => {
//       formData.append('amenities[]', amenity);
//     });

//     // Append images
//     if (data.projectImage) {
//       formData.append('projectImage', data.projectImage[0]);
//     }

//     if (data.projectImages.length > 0) {
//       Array.from(data.projectImages).forEach((file) => {
//         formData.append('projectImages', file);
//       });
//     }

//     if (data.projectImagesNew.length > 0) {
//       Array.from(data.projectImagesNew).forEach((file) => {
//         formData.append('projectImagesNew', file);
//       });
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post('/api/projects', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//       reset(); // Reset form on success
//       onClose(); // Close drawer on success
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box sx={{ width: 500, p: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           Add New Project
//         </Typography>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Property Type */}
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Property Type</InputLabel>
//             <Controller
//               name="propertyType"
//               control={control}
//               render={({ field }) => (
//                 <Select {...field} label="Property Type">
//                   {propertyTypes.map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//           </FormControl>

//           {/* Project Name */}
//           <Controller
//             name="projectName"
//             control={control}
//             render={({ field }) => (
//               <TextField {...field} label="Project Name" fullWidth margin="normal" />
//             )}
//           />

//           {/* Project Location */}
//           <Controller
//             name="projectLocation"
//             control={control}
//             render={({ field }) => (
//               <TextField {...field} label="Project Location" fullWidth margin="normal" />
//             )}
//           />

//           {/* Project Description */}
//           <Controller
//             name="projectDescription"
//             control={control}
//             render={({ field }) => (
//               <TextField {...field} label="Project Description" fullWidth margin="normal" multiline rows={4} />
//             )}
//           />

//           {/* Property Details */}
//           <Typography variant="subtitle1" gutterBottom>
//             Property Details
//           </Typography>
//           <Box display="flex" gap={2}>
//             <Controller
//               name="propertyDetails.homearea"
//               control={control}
//               render={({ field }) => (
//                 <TextField {...field} label="Home Area" fullWidth margin="normal" />
//               )}
//             />
//             <Controller
//               name="propertyDetails.rooms"
//               control={control}
//               render={({ field }) => (
//                 <TextField {...field} label="Rooms" fullWidth margin="normal" />
//               )}
//             />
//           </Box>

//           {/* Add other property details here similarly (baths, yearbuilt, dimensions, etc.) */}

//           {/* Builder ID */}
//           <Controller
//             name="builderid"
//             control={control}
//             render={({ field }) => (
//               <TextField {...field} label="Builder ID" fullWidth margin="normal" type="number" />
//             )}
//           />

//           {/* Builder Name */}
//           <Controller
//             name="builderName"
//             control={control}
//             render={({ field }) => (
//               <TextField {...field} label="Builder Name" fullWidth margin="normal" />
//             )}
//           />

//           {/* BHK */}
//           <Controller
//             name="projectBHK"
//             control={control}
//             render={({ field }) => (
//               <TextField {...field} label="BHK" fullWidth margin="normal" placeholder="Enter BHK (comma separated)" />
//             )}
//           />

//           {/* File Uploads */}
//           <Typography variant="subtitle1" gutterBottom>
//             Upload Images
//           </Typography>
//           <input type="file" onChange={(e) => handleFileChange(e, 'projectImage')} accept="image/*" />
//           <input type="file" multiple onChange={(e) => handleFileChange(e, 'projectImages')} accept="image/*" />
//           <input type="file" multiple onChange={(e) => handleFileChange(e, 'projectImagesNew')} accept="image/*" />

//           <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
//             {loading ? 'Saving...' : 'Save Project'}
//           </Button>
//         </form>
//       </Box>
//     </Drawer>
//   );
// };

// export default AddProject;


import React from 'react';

const AddProjects = () => {
  return (
    <div>
      Add Projects
    </div>
  );
}

export default AddProjects;