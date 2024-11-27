import React, { useState } from 'react';
import {
  Box,
  Grid,
  Container,
  useMediaQuery,
  useTheme,
  LinearProgress,
  Card,
  Typography,
  Divider,
  IconButton,
  Alert,
  Button,
} from '@mui/material';
import { useQuery } from 'react-query';
import { getProjectDetails } from '../../../api/services';
import { useNavigate, useParams } from 'react-router-dom';
import { Project, LocationHighlight, FloorPlan, Amenity, BankOffer } from '../ProjectInterface';
import EditIcon from '@mui/icons-material/Edit';
import EditDrawer from '../Drawers/EditDrawer';
import AddAmenity from '../Drawers/AddAmenity';
import AddBankOffer from '../Drawers/AddBankOffer';
import AddFloorPlan from '../Drawers/AddFloorPlan';
import AddLocationHighlight from '../Drawers/AddLocationHighlight';
import MultiFileUploadContainer from '../../../Components/MultiFileUploadContainer';
import AddProjectImages from '../Drawers/AddProjectImages';

const ProjectDetails: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { id } = useParams<{ id: string }>();
  const [openAddAmenityDrawer, setOpenAddAmenityDrawer] = useState(false); 
  const [openAddBankOfferDrawer, setOpenAddBankOfferDrawer] = useState(false);
  const [openAddFloorPlanDrawer, setOpenAddFloorPlanDrawer] = useState(false);
  const [openAddLocationHighlightDrawer, setOpenAddLocationHighlightDrawer] = useState(false);
  // projectImages state
  const [openAddImagesDrawer, setOpenAddImagesDrawer] = useState(false);
  const navigate = useNavigate();
  const projectId = id ?? '';
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editType, setEditType] = useState<string>('');

  const {
    data: projectsData,
    isLoading: isProjectLoading,
    error: projectError,
    refetch, // Function to refetch project details after update
  } = useQuery(['project', projectId], () => getProjectDetails(projectId), {
    enabled: !!projectId,
  });

  const projectData: Project | undefined = projectsData?.data;

  if (projectError) {
    return <Alert severity="error">Failed to load project details. Please try again later.</Alert>;
  }

  if (isProjectLoading) {
    return <LinearProgress />;
  }

  const handleEdit = (item: any, type: string) => {
    setSelectedItem(item);
    setEditType(type);
    setOpenEditDrawer(true);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '20px' }}>
      <Card sx={{ padding: '20px', width: '100%', maxWidth: '1200px' }}>
        {/* Project Name Heading */}
        <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
          <Typography variant="h5" gutterBottom sx={{ fontWeight: '550', mb: 2, textAlign: 'left', mr: 1 }}>
            <b style={{ color: 'black' }}>Project Details :</b>
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: '600', mb: 2, textAlign: 'left', color: 'primary.main' }}>
            {projectData?.name} - {projectData?.projectId}
          </Typography>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Main Project Details */}
        <Card sx={{ padding: '20px', marginBottom: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
                  Main Details
                </Typography>
                <IconButton
                  onClick={() => handleEdit(projectData, 'mainDetails')}
                  aria-label="edit"
                  sx={{ color: 'primary.main' }}
                >
                  <EditIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      Name: <Typography variant="caption">{projectData?.name}</Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      Established Year: <Typography variant="caption">{projectData?.establishedYear}</Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      Builder Name: <Typography variant="caption">{projectData?.builderName}</Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      Visitors: <Typography variant="caption">{projectData?.visits}</Typography>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }} />
              <Typography variant="body2" sx={{ textAlign: 'justify' }}>{projectData?.description}</Typography>
            </Grid>
          </Grid>
        </Card>

        <Divider sx={{ marginY: 2 }} />

        {/* Location Details */}
        <Card sx={{ padding: '20px', marginBottom: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
                  Location Details
                </Typography>
                <IconButton
                  onClick={() => handleEdit(projectData, 'Address')}
                  aria-label="edit"
                  sx={{ color: 'primary.main' }}
                >
                  <EditIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      Location: <Typography variant="caption">{projectData?.location}</Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      City: <Typography variant="caption">{projectData?.city}</Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      Zone: <Typography variant="caption">{projectData?.zone}</Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      Street: <Typography variant="caption">{projectData?.street}</Typography>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>

        <Divider sx={{ marginY: 2 }} />

        {/* projectImages */}

        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: '600', textAlign: 'left' }}>
          Project Images
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenAddImagesDrawer(true)}>
          {projectData?.projectImages ? 'Edit Images' : 'Add Images'}
        </Button>
      </Box>


      {/* Image Display and Upload Section */}
      <Card sx={{ padding: '20px', marginBottom: '20px' }}>
        <Grid container spacing={2}>
          {projectData?.projectImages?.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <img
                src={`${process.env.NEXT_PUBLIC_STORAGE_DN_URL || "https://dprstorage.b-cdn.net"}${image}`}
                alt={`Project Image ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Card>

        <Divider sx={{ marginY: 2 }} />


      <Box  display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        {/* Location Highlights */}
        <Typography variant="h6" sx={{ fontWeight: '600', mb: 2, textAlign: 'left' }}>
          Location Highlights
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddLocationHighlightDrawer(true)}
          sx={{ textAlign: 'right' }}
        >
          Add Location Highlight
        </Button>

        </Box>



        <Grid container spacing={3}>
          {projectData?.locationHighlights.map((highlight: LocationHighlight) => (
            <Grid item xs={12} sm={6} md={4} key={highlight._id}>
              <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" flex="1">
                  <Typography variant="body1" sx={{ fontWeight: '500', mb: 1, textAlign:'left' }}>
                    {highlight.locationName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Distance: {highlight.distance} km, Time: {highlight.time} min
                  </Typography>
                </Box>

                <Box sx={{ flexShrink: 0, width: '40px', height: '40px', ml: 2, mr: 2 }}>
                  <img
                    src={'https://dprstorage.b-cdn.net/dprstorage/projects/school.svg'}
                    alt={highlight.locationName}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Box>

                <IconButton
                  onClick={() => handleEdit(highlight, 'locationHighlight')}
                  aria-label="edit"
                  size="small"
                  sx={{ position: 'absolute', top: 5, right: 5, color: 'primary.main' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ marginY: 2 }} />

        {/* Floor Plans */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: '600', mb: 2, textAlign: 'left' }}>
          Floor Plans
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddFloorPlanDrawer(true)}
          sx={{ textAlign: 'right' }}
        >
          Add Floor Plan
        </Button>
        </Box>

        <Grid container spacing={2}>
        {projectData?.floorPlans.map((floorPlan: FloorPlan) => (
          <Grid item xs={12} sm={6} md={4} key={floorPlan._id}>
            <Card sx={{ padding: '16px', display: 'flex', flexDirection: 'row', position: 'relative', height: 'auto' }}>
              <Box sx={{ flex: 1, paddingRight: '16px' }}>
              <IconButton
                  onClick={() => handleEdit(floorPlan, 'floorPlan')}
                  aria-label="edit"
                  size="small"
                  sx={{ position: 'absolute', top: 5, right: 5, color: 'primary.main' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <Typography variant="body2" sx={{ fontWeight: '600', mb: 1 }}>
                    Floor: {floorPlan.floorNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                    Size: {floorPlan.size} sqft
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                    Full Price: <b>${floorPlan.fullPrice}</b>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                    EMI Price: <b>${floorPlan.emiPrice}</b>
                    </Typography>
                </Box>
              </Box>
              <Box sx={{ flexShrink: 0, width: '40px', height: '40px', ml: 2, mr: 2 }}>
                  <img
                    src={'https://dprstorage.b-cdn.net/dprstorage/projects/school.svg'}
                    alt={floorPlan.floorImage}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

        <Divider sx={{ marginY: 2 }} />

        {/* Amenities */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          {/* Title */}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Amenities
          </Typography>

          {/* Button */}
          <Button 
            variant="contained" 
            color="primary"  
            onClick={() => setOpenAddAmenityDrawer(true)} 
                sx={{ textAlign: 'right' }}
          >
            Add Amenity
          </Button>
        </Box>

        <Grid container spacing={2}>
        {projectData?.amenities.map((amenity: Amenity) => (
          <Grid item xs={12} sm={6} md={4} key={amenity._id}>
            <Card sx={{ padding: '16px', display: 'flex', alignItems: 'center', position: 'relative', height: 'auto' }}>
            <IconButton
                  onClick={() => handleEdit(amenity, 'amenity')}
                  aria-label="edit"
                  size="small"
                  sx={{ position: 'absolute', top: 5, right: 5, color: 'primary.main' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              <img 
                // src={amenity.iconName} 
                src={'https://dprstorage.b-cdn.net/dprstorage/projects/school.svg'}
                alt={amenity.name} 
                style={{ width: '30px', marginRight: '10px' }} 
              />
              <Typography variant="body2">{amenity.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

        <Divider sx={{ marginY: 2 }} />

        {/* Bank Offers */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>

        <Typography variant="h6" sx={{ fontWeight: '600', mb: 2, textAlign: 'left' }}>
          Bank Offers
        </Typography>

        <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpenAddBankOfferDrawer(true)}
        sx={{ textAlign: 'right' }}
      >
        Add Bank Offer
      </Button>


        </Box>
        <Grid container spacing={2}>
        {projectData?.bankOffers.map((offer: BankOffer) => (
          <Grid item xs={12} sm={6} md={4} key={offer._id}>
            <Card sx={{ padding: '16px', display: 'flex', alignItems: 'center', position: 'relative', height: 'auto' }}>
                <IconButton
                  onClick={() => handleEdit(offer, 'bankOffer')}
                  aria-label="edit"
                  size="small"
                  sx={{ position: 'absolute', top: 5, right: 5, color: 'primary.main' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              <img 
                // src={offer.bankIcon} 
                src={'https://dprstorage.b-cdn.net/dprstorage/projects/school.svg'}
                alt={offer.bankName} 
                style={{ width: '30px', marginRight: '10px' }} 
              />
              <Typography variant="body2">{offer.bankName}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

        <Divider sx={{ marginY: 2 }} />


    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        {/* Extra Fields */}
        <Typography variant="h6" sx={{ fontWeight: '600', mb: 2, textAlign: 'left' }}>
          Other Details
        </Typography>


        <IconButton
          onClick={() => handleEdit(projectData, 'otherDetails')}
          aria-label="edit"
          size="small"
          sx={{  color: 'primary.main' }}
        >
          <EditIcon fontSize="small" />
        </IconButton>

        </Box>  

 


        <Grid container spacing={2}>


          <Grid item xs={12} md={3}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ fontWeight: '600' }}>
                Min Size: <Typography variant="caption">{projectData?.minSize}</Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ fontWeight: '600' }}>
                Max Size: <Typography variant="caption">{projectData?.maxSize}</Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ fontWeight: '600' }}>
                Total Buildings: <Typography variant="caption">{projectData?.buildings}</Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ fontWeight: '600' }}>
                Total Parking: <Typography variant="caption">{projectData?.parkingArea}</Typography>
              </Typography>
            </Box>
          </Grid>

        </Grid>
        



      </Card>

      {/* Edit Drawer Component */}
      <EditDrawer
        open={openEditDrawer}
        onClose={() => setOpenEditDrawer(false)}
        selectedItem={selectedItem}
        editType={editType}
        projectId={projectId}
        refetch={refetch}
      />

        <AddAmenity
          open={openAddAmenityDrawer}
          onClose={() => setOpenAddAmenityDrawer(false)}
          projectId={projectId}
          refetch={refetch}
        />

          <AddProjectImages
            open={openAddImagesDrawer}
            onClose={() => setOpenAddImagesDrawer(false)}
            projectId={projectId}
            refetch={refetch}
            existingProjectImages={projectData?.projectImages || []}
          />



        <AddBankOffer
          open={openAddBankOfferDrawer}
          onClose={() => setOpenAddBankOfferDrawer(false)}
          projectId={projectId}
          refetch={refetch} 
        />


        <AddFloorPlan
          open={openAddFloorPlanDrawer}
          onClose={() => setOpenAddFloorPlanDrawer(false)}
          projectId={projectId}
          refetch={refetch} 
        />




        <AddLocationHighlight
          open={openAddLocationHighlightDrawer}
          onClose={() => setOpenAddLocationHighlightDrawer(false)}
          projectId={projectId}
          refetch={refetch} 
        />







    </Container>
  );
};

export default ProjectDetails;
