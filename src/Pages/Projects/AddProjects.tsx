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
// import { Controller, useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useMutation, useQueryClient } from 'react-query';
// import { toast } from 'react-toastify';
// import { addProject, updateProject } from '../../api/services'; // Adjust the path accordingly
// import CustomInput from '../../Components/Inputs/CustomInput';
// import FileUploadContainer from '../../Components/FileUploadContainer'; // File upload component
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';

// interface AddProjectsProps {
//   open: boolean;
//   onClose: () => void;
//   initialValues?: FormValues;
//   projectId?: string;
// }

// interface FormValues {
//   projectName: string;
//   propertyType: string;
//   projectLocation: string;
//   projectdescription: string;
//   homearea: number;
//   rooms: number;
//   baths: number;
//   yearbuilt: number;
//   dimensions: string;
//   beds: number;
//   price: number;
//   status: string;
//   locationiframe: string;
//   builderid: number;
//   amenities :  string[];
//   builderName: string;
//   projectBHK: number[];
//   unitsApartments: string;
//   approvals: string;
//   projectImages?: File[];
//   projectImagesNew?: File[];
// }

// const schema = yup.object().shape({
//   projectName: yup.string().required('Project Name is required'),
//   propertyType: yup.string().required('Property Type is required'),
//   projectLocation: yup.string().required('Project Location is required'),
//   projectdescription: yup.string().required('Project Description is required'),
//   homearea: yup.number().required('Home Area is required'),
//   rooms: yup.number().required('Rooms is required'),
//   baths: yup.number().required('Baths is required'),
//   yearbuilt: yup.number().required('Year Built is required'),
//   dimensions: yup.string().required('Dimensions is required'),
//   beds: yup.number().required('Beds is required'),
//   price: yup.number().required('Price is required'),
//   status: yup.string().required('Status is required'),
//   locationiframe: yup.string().required('Location Iframe is required'),
//   builderid: yup.number().required('Builder ID is required'),
//   builderName: yup.string().required('Builder Name is required'),
//   projectBHK: yup.array().of(yup.number()).required('Project BHK is required'),
//   unitsApartments: yup.string().required('Units/Apartments is required'),
//   approvals: yup.string().required('Approvals is required'),
// });

// const AddProjects: FC<AddProjectsProps> = ({ open, onClose, initialValues, projectId }) => {
//   const queryClient = useQueryClient();
//   const [images, setImages] = useState<File[]>(initialValues?.projectImages || []);
//   const [additionalImages, setAdditionalImages] = useState<File[]>(initialValues?.projectImagesNew || []);

//   const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
//     resolver: yupResolver(schema),
//     defaultValues: initialValues || {
//       projectName: '',
//       propertyType: '',
//       projectLocation: '',
//       projectdescription: '',
//       homearea: 0,
//       rooms: 0,
//       baths: 0,
//       yearbuilt: 0,
//       dimensions: '',
//       beds: 0,
//       price: 0,
//       status: '',
//       locationiframe: '',
//       builderid: 0,
//       builderName: '',
//       amenities: [],
//       projectBHK: [],
//       unitsApartments: '',
//       approvals: '',
//       projectImages: [],
//       projectImagesNew: []
//     },
//   });

//   useEffect(() => {
//     if (initialValues) {
//       reset(initialValues);
//       setImages(initialValues.projectImages || []);
//       setAdditionalImages(initialValues.projectImagesNew || []);
//     }
//   }, [initialValues, reset]);

//   const addMutation = useMutation((data: FormValues) => addProject(data), {
//     onSuccess: () => {
//       toast.success('Project added successfully!');
//       queryClient.invalidateQueries('getProjects');
//       onClose();
//     },
//     onError: (error: any) => {
//       toast.error(`Error: ${error.response?.data?.message || 'Something went wrong'}`);
//     },
//   });

//   const updateMutation = useMutation((data: FormValues) => updateProject(projectId!, data), {
//     onSuccess: () => {
//       toast.success('Project updated successfully!');
//       queryClient.invalidateQueries('getProjects');
//       onClose();
//     },
//     onError: (error: any) => {
//       toast.error(`Error: ${error.response?.data?.message || 'Something went wrong'}`);
//     },
//   });

//   const onSubmit = (data: FormValues) => {
//     const formData = new FormData();
//     formData.append('projectName', data.projectName);
//     formData.append('propertyType', data.propertyType);
//     formData.append('projectLocation', data.projectLocation);
//     formData.append('projectdescription', data.projectdescription);
//     formData.append('homearea', data.homearea.toString());
//     formData.append('rooms', data.rooms.toString());
//     formData.append('baths', data.baths.toString());
//     formData.append('yearbuilt', data.yearbuilt.toString());
//     formData.append('dimensions', data.dimensions);
//     formData.append('beds', data.beds.toString());
//     formData.append('price', data.price.toString());
//     formData.append('status', data.status);
//     formData.append('locationiframe', data.locationiframe);
//     formData.append('builderid', data.builderid.toString());
//     formData.append('amenities', JSON.stringify(data.amenities));
//     formData.append('builderName', data.builderName);
//     formData.append('projectBHK', JSON.stringify(data.projectBHK));
//     formData.append('unitsApartments', data.unitsApartments);
//     formData.append('approvals', data.approvals);

//     images.forEach((image) => formData.append('projectImages', image));
//     additionalImages.forEach((image) => formData.append('projectImagesNew', image));

//     if (projectId) {
//       updateMutation.mutate(formData as any);
//     } else {
//       addMutation.mutate(formData as any);
//     }
//   };

//   const handleAddImage = () => {
//     setImages([...images, {} as File]);
//   };

//   const handleRemoveImage = (index: number) => {
//     const newImages = [...images];
//     newImages.splice(index, 1);
//     setImages(newImages);
//   };

//   const handleAddAdditionalImage = () => {
//     setAdditionalImages([...additionalImages, {} as File]);
//   };

//   const handleRemoveAdditionalImage = (index: number) => {
//     const newImages = [...additionalImages];
//     newImages.splice(index, 1);
//     setAdditionalImages(newImages);
//   };

//   return (
//     <Drawer
//     anchor="right"
//     open={open}
//     onClose={onClose}
//     PaperProps={{
//       sx: {
//         width: '100%',
//         maxWidth: '360px',
//         background: '#FFFFFF',
//         opacity: 1,
//         borderRadius: '0px',
//         border: 'none',
//       },
//     }}
//   >
//     <Box
//       sx={{
//         width: '100%',
//       height: '60px',
//       backgroundColor: 'primary.main',
//       display: 'flex',
//       alignItems: 'center',
//       color: 'white',
//       justifyContent: 'space-between',
//       padding: '0 16px',
//       }}
//     >
//          <Typography variant="h6" sx={{ color:'white', fontWeight: '600' }}>
//           {initialValues ? 'Edit Project' : 'Add Project'}
//           </Typography>
//           <IconButton onClick={onClose} sx={{ color: 'white', mr:2 }}>
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

//           {/* Add more form fields as required */}


//           {/* Project Images */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             {images.map((_, index) => (
//               <Box key={index}>
//                 <FileUploadContainer
//                   onFileUpload={(file: File) => {
//                     const newImages = [...images];
//                     newImages[index] = file;
//                     setImages(newImages);
//                   }}
//                 />
//                 <IconButton onClick={() => handleRemoveImage(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             ))}
//             <IconButton onClick={handleAddImage}>
//               <AddIcon />
//             </IconButton>
//           </Box>

//           {/* Additional Images */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
//             {additionalImages.map((_, index) => (
//               <Box key={index}>
//                 <FileUploadContainer
//                   onFileUpload={(file: File) => {
//                     const newImages = [...additionalImages];
//                     newImages[index] = file;
//                     setAdditionalImages(newImages);
//                   }}
//                 />
//                 <IconButton onClick={() => handleRemoveAdditionalImage(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             ))}
//             <IconButton onClick={handleAddAdditionalImage}>
//               <AddIcon />
//             </IconButton>
//           </Box>

//           <Box sx={{ marginTop: 3 }}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               {projectId ? 'Update Project' : 'Add Project'}
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Drawer>
//   );
// };

// export default AddProjects;



import { Box, Drawer, IconButton, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';


const AddProjects = ({ open, onClose, initialValues, projectId }:any) => {
    console.log(initialValues, projectId);
    return (
        <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: '100%', maxWidth: '360px', background: '#FFFFFF', opacity: 1, borderRadius: '0px', border: 'none', }, }}>
            <Box sx={{ width: '100%', height: '60px', backgroundColor: 'primary.main', display: 'flex', alignItems: 'center', color: 'white', justifyContent: 'space-between', padding: '0 16px', }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: '600' }}>
                    {initialValues ? 'Edit Project' : 'Add Project'}
                </Typography>
                <IconButton onClick={onClose} sx={{ color: 'white', mr: 2 }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{ padding: '20px' }}>
                <form>
                    {/* Add your form fields here */}
                    Temp data here
                </form>
            </Box>
        </Drawer>
    )
} 

export default AddProjects;