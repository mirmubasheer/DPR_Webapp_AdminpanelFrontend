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
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { Controller, useForm, SubmitHandler } from 'react-hook-form';
// import * as yup from 'yup';
// import { object, string, number } from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import CustomInput from '../../Components/Inputs/CustomInput';
// import { useMutation, useQueryClient } from 'react-query';
// import { addProject, updateProject } from '../../api/services';
// import { toast } from 'react-toastify';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FileUploadContainerMultiple from '../../Components/FileUploadContainerMultiple';


// interface AddProjectsNewProps {
//   open: boolean;
//   onClose: () => void;
//   initialValues?: FormValues;
//   projectId: string | undefined;
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
// //   amenities?: string[];
//   locationiframe: string;
// //   reviews?: string[];
//   builderid: number;
//   builderName: string;
// //   projectBHK?: number[];
//   unitsApartments?: string;
//   approvals?: string;
// }

// const schema = object({
//     projectName: string().required(),
//     projectLocation: string().required(),
//     builderName: string().required(),
//     propertyType: string().required(),
//     price: number().required(),
//     beds: number().required(),
//     baths: number().required(),
//     homearea: number().required(),
//     yearbuilt: number().required(),
//     dimensions: string().required(),
//     status: string().required(),
//     projectdescription: string().required(),
//     locationiframe: string().required(),
//   });

// const AddProjectsNew: FC<AddProjectsNewProps> = ({ open, onClose, initialValues, projectId }) => {
//   const queryClient = useQueryClient();
//   const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormValues>({
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
//     //   amenities: [],
//       locationiframe: '',
//     //   reviews: [],
//       builderid: 0,
//       builderName: '',
//     //   projectBHK: [],
//       unitsApartments: '',
//       approvals: '',
//     },
//     });

//   useEffect(() => {
//     if (initialValues) {
//       reset(initialValues);
//     }
//   }, [initialValues, reset]);

//   const addMutation = useMutation((data: FormData) => addProject(data), {
//     onSuccess: () => {
//       toast.success('Project added successfully!');
//       queryClient.invalidateQueries('getProjects');
//       onClose();
//     },
//     onError: (error: any) => {
//       toast.error(`${error.response.data.message}`);
//     }
//   });

//   const updateMutation = useMutation((data: FormData) => {
//     if (projectId !== undefined) {
//       return updateProject(projectId, data);
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

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     const formData = new FormData();

//     // Append non-file form data
//     Object.keys(data).forEach((key) => {
//         const value = data[key as keyof FormValues];
//         if (Array.isArray(value)) {
//         value.forEach((item) => {
//             if (item instanceof File) {
//             formData.append(key, item);
//             }
//         });
//         } else {
//             formData.append(key, String(value));
//         }   
//       });
      

//     console.log('Form Data', formData); // For debugging

//     if (projectId !== undefined) {
//       updateMutation.mutate(formData); // Pass formData instead of the raw object
//     } else {
//       addMutation.mutate(formData);
//     }
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           transition : 'all 0.5s ease', 
//           width: '100%',
//           maxWidth: '380px',
//           background: '#FFFFFF',
//           opacity: 1,
//           borderRadius: '0px',
//           border: 'none',
//           overflowX: 'hidden',
//         },
//       }}
//     >
//       <Box
//         sx={{
//           width: '100%',
//           height: '60px',
//           backgroundColor: 'primary.main',
//           display: 'flex',
//           alignItems: 'center',
//           color: 'white',
//           justifyContent: 'space-between',
//           padding: '0 16px',
//         }}
//       >
//         <Typography variant="h6" sx={{ color: 'white', fontWeight: '600' }}>
//           {initialValues ? 'Edit Project' : 'Add Project'}
//         </Typography>
//         <IconButton onClick={onClose} sx={{ color: 'white', mr: 2 }}>
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

//               <InputLabel shrink sx={{  }} htmlFor="propertyType-input">Property Type</InputLabel>
//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <Controller
//               name="propertyType"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   id="propertyType-input"
//                   {...field}
//                   displayEmpty
//                   error={!!errors.propertyType}
//                   renderValue={(value) => (
//                     value ? (
//                         <Box display="flex" alignItems="center">
//                           {value}
//                       </Box> 
//                     ): (
//                         'Property Type'
//                       )
//                   )}
//                   style={{
//                     width: "100%",
//                     height: "40px",
//                     border: "1px solid #1212121A",
//                     borderRadius: "10px",
//                     opacity: 0.6,
//                     boxShadow: "0px 6px 14px #36408D08",
//                     fontSize: "14px",
//                     color: "#1D1D1D",
//                     textAlign :'left',
//                   }}
//                     inputProps={{
//                       style: {
//                         fontFamily: "Mundial, sans-serif",
//                         fontSize: "14px",
//                       },
//                     }}
//                     SelectDisplayProps={{
//                       style: {
//                         fontFamily: "Mundial, sans-serif",
//                         fontSize: "14px",
//                       },
//                     }}
//                 >
//                   <MenuItem value="" disabled>
//                   <Typography variant="caption" sx={{ fontWeight: 500 , color : '#1D1D1D' }}>
//                     Select property type
//                   </Typography>
//                   </MenuItem>
//                   <MenuItem value="Apartment">
//                     <Typography variant="caption" sx={{ fontWeight: 500 , color : '#1D1D1D' }}>
//                       Apartment
//                     </Typography>
//                   </MenuItem>
//                   <MenuItem value="Villa">
//                     <Typography variant="caption" sx={{ fontWeight: 500 , color : '#1D1D1D' }}>
//                       Villa
//                     </Typography>
//                   </MenuItem>
//                     <MenuItem value="Plots">
//                         <Typography variant="caption" sx={{ fontWeight: 500 , color : '#1D1D1D' }}>
//                         Plots
//                         </Typography>   
//                     </MenuItem>

//                 </Select>
//               )}
//             />
//             <FormHelperText error>{errors.propertyType && errors.propertyType.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="price-input">Price</InputLabel>
//             <Controller
//               name="price"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="price-input"
//                   placeholder="Enter price..."
//                   {...field}
//                   type="number"
//                   error={!!errors.price}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.price && errors.price.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="beds-input">Beds</InputLabel>
//             <Controller
//               name="beds"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="beds-input"
//                   placeholder="Enter number of beds..."
//                   type="number"
//                   {...field}
//                   error={!!errors.beds}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.beds && errors.beds.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="baths-input">Baths</InputLabel>
//             <Controller
//               name="baths"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="baths-input"
//                   placeholder="Enter number of baths..."
//                   type="number"
//                   {...field}
//                   error={!!errors.baths}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.baths && errors.baths.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="homearea-input">Home Area (sqft)</InputLabel>
//             <Controller
//               name="homearea"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="homearea-input"
//                   placeholder="Enter home area in sqft..."
//                   type="number"
//                   {...field}
//                   error={!!errors.homearea}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.homearea && errors.homearea.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="yearbuilt-input">Year Built</InputLabel>
//             <Controller
//               name="yearbuilt"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="yearbuilt-input"
//                   placeholder="Enter year built..."
//                   type="number"
//                   {...field}
//                   error={!!errors.yearbuilt}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.yearbuilt && errors.yearbuilt.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="dimensions-input">Dimensions</InputLabel>
//             <Controller
//               name="dimensions"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="dimensions-input"
//                   placeholder="Enter dimensions..."
//                   {...field}
//                   error={!!errors.dimensions}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.dimensions && errors.dimensions.message}</FormHelperText>
//           </FormControl>

//             <InputLabel shrink sx={{  }} htmlFor="status-input">Status</InputLabel>
//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <Controller
//               name="status"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   id="status-input"
//                   {...field}
//                   displayEmpty
//                   error={!!errors.status}
//                   renderValue={(value) => (
//                     value ? (
//                         <Box display="flex" alignItems="center">
//                           {value}
//                       </Box> 
//                     ): (
//                         'Status'
//                       )
//                   )}
//                   style={{
//                     width: "100%",
//                     height: "40px",
//                     border: "1px solid #1212121A",
//                     borderRadius: "10px",
//                     opacity: 0.6,
//                     boxShadow: "0px 6px 14px #36408D08",
//                     fontSize: "14px",
//                     color: "#1D1D1D",
//                     textAlign :'left',
//                   }}
//                     inputProps={{
//                       style: {
//                         fontFamily: "Mundial, sans-serif",
//                         fontSize: "14px",
//                       },
//                     }}
//                     SelectDisplayProps={{
//                       style: {
//                         fontFamily: "Mundial, sans-serif",
//                         fontSize: "14px",
//                       },
//                     }}
//                 >
//                     <MenuItem value="" disabled>
//                     <Typography variant="caption" sx={{ fontWeight: 500 , color : '#1D1D1D' }}>
//                         Select status
//                     </Typography>
//                     </MenuItem>
//                     <MenuItem value="Active">
//                     <Typography variant="caption" sx={{ fontWeight: 500 , color : '#1D1D1D' }}>
//                         Active
//                     </Typography>
//                     </MenuItem>
//                     <MenuItem value="Inactive">
//                     <Typography variant="caption" sx={{ fontWeight: 500 , color : '#1D1D1D' }}>
//                     Inactive
//                     </Typography>
//                     </MenuItem>
//                 </Select>
//               )}
//             />
//             <FormHelperText error>{errors.status && errors.status.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="projectdescription-input">Project Description</InputLabel>
//             <Controller
//               name="projectdescription"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="projectdescription-input"
//                     multiline
//                   placeholder="Enter project description..."
//                   {...field}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.projectdescription && errors.projectdescription.message}</FormHelperText>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="locationiframe-input">Location Iframe</InputLabel>
//             <Controller
//               name="locationiframe"
//               control={control}
//               render={({ field }) => (
//                 <CustomInput
//                   id="locationiframe-input"
//                   placeholder="Enter location iframe..."
//                   {...field}
//                   error={!!errors.locationiframe}
//                 />
//               )}
//             />
//             <FormHelperText error>{errors.locationiframe && errors.locationiframe.message}</FormHelperText>
//           </FormControl>

//           {/* ProjectImages */}
//           {/* 
//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="projectImages-input">Project Images</InputLabel>
//             <Controller
//               name="projectImages"
//               control={control}
//               render={({ field }) => (
//                 <FileUploadContainerMultiple
//                 images={field.value.map(file => ({ file, preview: URL.createObjectURL(file) })) || []}
//                 setImages={(images) => {
//                     setValue('projectImages', images.map(img => img.file));
//                   }}
                  
//                 />

//               )}
//             />
//             <FormHelperText error>{errors.projectImages && errors.projectImages.message}</FormHelperText>
//           </FormControl>

//            */}

//           <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
//             {initialValues ? 'Update Project' : 'Add Project'}
//           </Button>
//         </form>
//       </Box>
//     </Drawer>
//   );
// };

// export default AddProjectsNew;










































































/*  

 <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="locationiframe-input">Location Iframe</InputLabel>
                <Controller
                    name="locationiframe"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="locationiframe-input"
                        placeholder="Enter location iframe..."
                        {...field}
                        error={!!errors.locationiframe}
                    />
                    )}
                />
                <FormHelperText error>{errors.locationiframe && errors.locationiframe.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="builderid-input">Builder ID</InputLabel>
                <Controller
                    name="builderid"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="builderid-input"
                        placeholder="Enter builder ID..."
                        {...field}
                        error={!!errors.builderid}
                    />
                    )}
                />
                <FormHelperText error>{errors.builderid && errors.builderid.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="builderName-input">Builder Name</InputLabel>
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
                    )}
                />
                <FormHelperText error>{errors.builderName && errors.builderName.message}</FormHelperText>
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

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="unitsApartments-input">Units/Apartments</InputLabel>
                <Controller
                    name="unitsApartments"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="unitsApartments-input"
                        placeholder="Enter units/apartments..."
                        {...field}
                        error={!!errors.unitsApartments}
                    />
                    )}
                />
                <FormHelperText error>{errors.unitsApartments && errors.unitsApartments.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="approvals-input">Approvals</InputLabel>
                <Controller
                    name="approvals"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="approvals-input"
                        placeholder="Enter approvals..."
                        {...field}
                        error={!!errors.approvals}
                    />
                    )}
                />
                <FormHelperText error>{errors.approvals && errors.approvals.message}</FormHelperText>
            </FormControl>


            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="propertyType-input">Property Type</InputLabel>
                <Controller
                    name="propertyType"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="propertyType-input"
                        placeholder="Enter property type..."
                        {...field}
                        error={!!errors.propertyType}
                    />
                    )}
                />
                <FormHelperText error>{errors.propertyType && errors.propertyType.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="projectLocation-input">Project Location</InputLabel>
                <Controller
                    name="projectLocation"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="projectLocation-input"
                        placeholder="Enter project location..."
                        {...field}
                        error={!!errors.projectLocation}
                    />
                    )}
                />
                <FormHelperText error>{errors.projectLocation && errors.projectLocation.message}</FormHelperText>
            </FormControl>


            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="homearea-input">Home Area</InputLabel>
                <Controller
                    name="homearea"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="homearea-input"
                        placeholder="Enter home area..."
                        {...field}
                        error={!!errors.homearea}
                    />
                    )}
                />
                <FormHelperText error>{errors.homearea && errors.homearea.message}</FormHelperText>
            </FormControl>


            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="rooms-input">Rooms</InputLabel>
                <Controller
                    name="rooms"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="rooms-input"
                        placeholder="Enter rooms..."
                        {...field}
                        error={!!errors.rooms}
                    />
                    )}
                />
                <FormHelperText error>{errors.rooms && errors.rooms.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="baths-input">Baths</InputLabel>
                <Controller
                    name="baths"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="baths-input"
                        placeholder="Enter baths..."
                        {...field}
                        error={!!errors.baths}
                    />
                    )}
                />
                <FormHelperText error>{errors.baths && errors.baths.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="yearbuilt-input">Year Built</InputLabel>
                <Controller
                    name="yearbuilt"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="yearbuilt-input"
                        placeholder="Enter year built..."
                        {...field}
                        error={!!errors.yearbuilt}
                    />
                    )}
                />
                <FormHelperText error>{errors.yearbuilt && errors.yearbuilt.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="dimensions-input">Dimensions</InputLabel>
                <Controller
                    name="dimensions"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="dimensions-input"
                        placeholder="Enter dimensions..."
                        {...field}
                        error={!!errors.dimensions}
                    />
                    )}
                />
                <FormHelperText error>{errors.dimensions && errors.dimensions.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="beds-input">Beds</InputLabel>
                <Controller
                    name="beds"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="beds-input"
                        placeholder="Enter beds..."
                        {...field}
                        error={!!errors.beds}
                    />
                    )}
                />
                <FormHelperText error>{errors.beds && errors.beds.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="price-input">Price</InputLabel>
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="price-input"
                        placeholder="Enter price..."
                        {...field}
                        error={!!errors.price}
                    />
                    )}
                />
                <FormHelperText error>{errors.price && errors.price.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel shrink sx={{ ml: -1.4 }} htmlFor="status-input">Status</InputLabel>
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                    <CustomInput
                        id="status-input"
                        placeholder="Enter status..."
                        {...field}
                        error={!!errors.status}
                    />
                    )}
                />
                <FormHelperText error>{errors.status && errors.status.message}</FormHelperText>
            </FormControl>

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

           


            */


























            


import React, { FC, useEffect } from 'react';

const AddProjectsNew: FC = () => {
  return (
    <div>
      AddProjectsNew
    </div>
  );
}

export default AddProjectsNew;