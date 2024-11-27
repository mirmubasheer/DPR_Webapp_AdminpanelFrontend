import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Card,
  Button,
  Drawer,
  IconButton,
} from '@mui/material';
import CustomInput from '../../Components/Inputs/CustomInput';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface Highlight {
  locationType: string;
  locationName: string;
  distance: number;
  time: number;
}

interface FloorPlan {
  floorImage: string;
  size: number;
  fullPrice: number;
  emiPrice: number;
  floorNumber: number;
}
interface Amenity {
  iconName: string;
  name: string;
}

interface BankOffer {
  offerName: string;
  description: string;
}

const sampleProjectsData = [
  {
    _id: '1',
    name: 'The Twins By DSR',
    description: 'A beautiful residential project with modern amenities.',
    highlights: [
      { locationType: 'School', locationName: 'ABC High School', time: 5, distance: 1.5 },
      { locationType: 'Hospital', locationName: 'Rainbow Childrens Hospital', time: 10, distance: 4.5 },
    ],
    floorPlans: [
      { floorImage: 'img', size: 1200, fullPrice: 5000000, emiPrice: 50000, floorNumber: 1 },
      { floorImage: 'img', size: 1500, fullPrice: 6000000, emiPrice: 60000, floorNumber: 2 },
    ],
    amenity: [
      { iconName: 'Pool', name: 'Swimming Pool' },
      { iconName: 'Gym', name: 'Gymnasium' },
    ],
    bankOffers: [
      { offerName: 'Low Interest Loan', description: 'Get a home loan at a low-interest rate of 6.5%' },
      { offerName: 'No EMI for 1 Year', description: 'Pay no EMI for the first year on selected banks' },
    ],
  },
];

const Projects: React.FC = () => {
  const [highlightsDrawerOpen, setHighlightsDrawerOpen] = useState(false);
  const [floorPlanDrawerOpen, setFloorPlanDrawerOpen] = useState(false);
  const [amenityDrawerOpen, setAmenityDrawerOpen] = useState(false);
  const [bankOffersDrawerOpen, setBankOffersDrawerOpen] = useState(false);

  const [editedHighlights, setEditedHighlights] = useState(sampleProjectsData[0].highlights);
  const [editedFloorPlans, setEditedFloorPlans] = useState(sampleProjectsData[0].floorPlans);
  const [editedAmenity, setEditedAmenity] = useState(sampleProjectsData[0].amenity);
  
  const [editedBankOffers, setEditedBankOffers] = useState(sampleProjectsData[0].bankOffers);

  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<FloorPlan | null>(null);
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [selectedBankOffer, setSelectedBankOffer] = useState<BankOffer | null>(null);

  const handleOpenDrawer = (item: any, type: string) => {
    switch (type) {
      case 'highlight':
        setSelectedHighlight(item);
        setHighlightsDrawerOpen(true);
        break;
      case 'floorPlan':
        setSelectedFloorPlan(item);
        setFloorPlanDrawerOpen(true);
        break;
        case 'amenity':
          setSelectedAmenity(item);
          setAmenityDrawerOpen(true);
          break;
      case 'bankOffer':
        setSelectedBankOffer(item);
        setBankOffersDrawerOpen(true);
        break;
      default:
        break;
    }
  };

  const handleCloseDrawer = (type: string) => {
    switch (type) {
      case 'highlight':
        setHighlightsDrawerOpen(false);
        setSelectedHighlight(null);
        break;
      case 'floorPlan':
        setFloorPlanDrawerOpen(false);
        setSelectedFloorPlan(null);
        break;
        case 'amenity':
        setAmenityDrawerOpen(false);
        setSelectedAmenity(null);
        break;
      case 'bankOffer':
        setBankOffersDrawerOpen(false);
        setSelectedBankOffer(null);
        break;
      default:
        break;
    }
  };

  const handleAddHighlight = () => {
    setSelectedHighlight({ locationType: '', locationName: '', distance: 0, time: 0 });
    setHighlightsDrawerOpen(true);
  };

  const handleAddFloorPlan = () => {
    setSelectedFloorPlan({ floorImage: '', size: 0, fullPrice: 0, emiPrice: 0, floorNumber: 0 });
    setFloorPlanDrawerOpen(true);
  };
  const handleAddAmenity = () => {
    setSelectedAmenity({ iconName: '', name: '' });
    setAmenityDrawerOpen(true);
  };

  const handleAddBankOffer = () => {
    setSelectedBankOffer({ offerName: '', description: '' });
    setBankOffersDrawerOpen(true);
  };

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {sampleProjectsData.map((project) => (
        <Card key={project._id} sx={{ marginBottom: '20px', padding: '20px' }}>
          <Typography variant="h5" sx={{ fontWeight: '600', color: 'primary.main', mb: 2 }}>
            {project.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {project.description}
          </Typography>
          <Divider sx={{ marginY: 2 }} />

          {/* Highlights Section */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: '600', mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Location Highlights
              <Button onClick={handleAddHighlight} color="primary" startIcon={<AddIcon />}>
                Add Highlight
              </Button>
            </Typography>
            <Grid container spacing={2}>
              {project.highlights.map((highlight, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ flexGrow: 1, textAlign: 'start', display: 'flex', alignItems: 'start', gap: 3, padding: '0' }}>
                    <Box>
                      <Typography variant="body2"><strong>Type:</strong> {highlight.locationType}</Typography>
                      <Typography variant="body2"><strong>Name:</strong> {highlight.locationName}</Typography>
                      <Typography variant="body2"><strong>Distance:</strong> {highlight.distance} km</Typography>
                      <Typography variant="body2"><strong>Time:</strong> {highlight.time} mins</Typography>
                    </Box>
                    <IconButton onClick={() => handleOpenDrawer(highlight, 'highlight')} color="primary" sx={{ padding: '0' }}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Floor Plans Section */}
          <Divider sx={{ marginY: 2 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: '600', mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Floor Plans
              <Button onClick={handleAddFloorPlan} color="primary" startIcon={<AddIcon />}>
                Add Floor Plan
              </Button>
            </Typography>
            <Grid container spacing={2}>
              {project.floorPlans.map((floorPlan, index) => (
                <Grid item xs={12} sm={6} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap: 3, padding: '0' }}>
                    <Box sx={{ flexGrow: 1, textAlign: 'start' }}>
                      <Typography variant="body2"><strong>Floor Number:</strong> {floorPlan.floorNumber}</Typography>
                      <Typography variant="body2"><strong>Size:</strong> {floorPlan.size} sq ft</Typography>
                      <Typography variant="body2"><strong>Full Price:</strong> ₹{floorPlan.fullPrice}</Typography>
                      <Typography variant="body2"><strong>EMI Price:</strong> ₹{floorPlan.emiPrice}</Typography>
                    </Box>
                    <IconButton onClick={() => handleOpenDrawer(floorPlan, 'floorPlan')} color="primary" sx={{ padding: '0' }}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ marginY: 2 }} />


          {/* aminities drawer */}
             
          <Box>
            <Typography variant="h6" sx={{ fontWeight: '600', mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Amenities
              <Button onClick={handleAddAmenity} color="primary" startIcon={<AddIcon />}>
                Add Amenity
              </Button>
            </Typography>
            <Grid container spacing={2}>
              {project.amenity.map((amenity, index) => (
                <Grid item xs={12} sm={6} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap:3, padding: '0' }}>
                    <Box  sx={{ flexGrow: 1, textAlign: 'start' }}>
                      <Typography variant="body2"><strong>Type:</strong> {amenity.iconName}</Typography>
                      <Typography variant="body2"><strong>Name:</strong> {amenity.name}</Typography>
                    </Box>
                    <IconButton onClick={() => handleOpenDrawer(amenity, 'amenity')} color="primary"  sx={{ padding: '0' }}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Bank Offers Section */}
          <Divider sx={{ marginY: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: '600', mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Bank Offers
                <Button onClick={handleAddBankOffer} color="primary" startIcon={<AddIcon />}>
                  Add Bank Offer
                </Button>
              </Typography>
              <Grid container spacing={2}>
                {project.bankOffers.map((offer, index) => (
                  <Grid item xs={12} sm={6} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'start', gap: 3, padding: '0' }}>
                      <Box sx={{ textAlign: 'start' }}>
                        <Typography variant="body2"><strong>Offer:</strong> {offer.offerName}</Typography>
                        <Typography variant="body2"><strong>Description:</strong> {offer.description}</Typography>
                      </Box>
                      <IconButton onClick={() => handleOpenDrawer(offer, 'bankOffer')} color="primary" sx={{ padding: '0' }}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
        </Card>
      ))}

      {/* Highlights Drawer */}
      <Drawer anchor="right" open={highlightsDrawerOpen} onClose={() => handleCloseDrawer('highlight')}>
        <Box sx={{width: '100%',
          maxWidth: '360px', }}>
            <Box
            sx={{
              width: '100%',
            height: '60px',
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            justifyContent: 'space-between',
            padding: '0 20px',
            }}
          >
            <Typography variant="h6"  sx={{ color:'white', fontWeight: '600' }}>
              {selectedHighlight ? 'Edit Highlight' : 'Add Highlight'}
            </Typography>
            <IconButton 
                onClick={() => handleCloseDrawer('highlight')} 
                sx={{ float: '', paddingRight:'40px', color: 'white',}}
                >
                <CloseIcon />
              </IconButton>
            </Box>
      
          <Box sx={{display:'flex',flexDirection:'column', padding:'20px', gap:2}}>

            <CustomInput name="Location Type" value={selectedHighlight?.locationType} />
            <CustomInput name="Location Name" value={selectedHighlight?.locationName} />
            <CustomInput name="Distance (km)" value={selectedHighlight?.distance} type="number" />
            <CustomInput name="Time (mins)" value={selectedHighlight?.time} type="number" />
            <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>
              {selectedHighlight ? 'Save' : 'Add'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Floor Plans Drawer */}
      <Drawer anchor="right" open={floorPlanDrawerOpen} onClose={() => handleCloseDrawer('floorPlan')}>
        <Box sx={{ width: '100%',
          maxWidth: '360px',  }}>
            <Box
            sx={{
              width: '100%',
            height: '60px',
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            justifyContent: 'space-between',
            padding: '0 20px',
            }}
          >
            <Typography variant="h6"  sx={{ color:'white', fontWeight: '600' }}>
            {selectedFloorPlan ? 'Edit Floor Plan' : 'Add Floor Plan'}
            </Typography>
            <IconButton 
                onClick={() => handleCloseDrawer('floorPlan')} 
                sx={{ float: '', paddingRight:'40px', color: 'white',}}
                >
                <CloseIcon />
              </IconButton>
            </Box>
          
          <Box sx={{display:'flex',flexDirection:'column',gap:2,padding:'20px',}}>

          
            <CustomInput name="Floor Image" value={selectedFloorPlan?.floorImage} />
            <CustomInput name="Size (sq ft)" value={selectedFloorPlan?.size} type="number" />
            <CustomInput name="Full Price" value={selectedFloorPlan?.fullPrice} type="number" />
            <CustomInput name="EMI Price" value={selectedFloorPlan?.emiPrice} type="number" />
            <CustomInput name="Floor Number" value={selectedFloorPlan?.floorNumber} type="number" />
            <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>
              {selectedFloorPlan ? 'Save' : 'Add'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* amenity drawer */}
      <Drawer anchor="right" open={amenityDrawerOpen} onClose={() => handleCloseDrawer('amenity')}>

      
        <Box sx={{ width: '100%',
          maxWidth: '360px', }}>
            <Box
            sx={{
              width: '100%',
            height: '60px',
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            justifyContent: 'space-between',
            padding: '0 20px',
            }}
          >
            <Typography variant="h6"  sx={{ color:'white', fontWeight: '600' }}>
            {selectedFloorPlan ? 'Edit Floor Plan' : 'Add Floor Plan'}
            </Typography>
            <IconButton 
                onClick={() => handleCloseDrawer('amenity')} 
                sx={{ float: '', paddingRight:'40px', color: 'white',}}
                >
                <CloseIcon />
              </IconButton>
            </Box>
          
          <Box sx={{display:'flex',flexDirection:'column',gap:2,padding:'20px',}}>

          
            <CustomInput name="iconName" value={selectedAmenity?.iconName} />
            <CustomInput name="name" value={selectedAmenity?.name}  />

            <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>
              {selectedAmenity ? 'Save' : 'Add'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Bank Offers Drawer */}
      <Drawer anchor="right" open={bankOffersDrawerOpen} onClose={() => handleCloseDrawer('bankOffer')}>
        <Box sx={{width: '100%',
          maxWidth: '360px',}}>
        <Box
            sx={{
              width: '100%',
            height: '60px',
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            justifyContent: 'space-between',
            padding: '0 20px',
            }}
          >
            <Typography variant="h6"  sx={{ color:'white', fontWeight: '600' }}>
             {selectedBankOffer ? 'Edit Bank Offer' : 'Add Bank Offer'}
            </Typography>
            <IconButton 
                onClick={() => handleCloseDrawer('bankOffer')} 
                sx={{ float: '', paddingRight:'40px', color: 'white',}}
                >
                <CloseIcon />
              </IconButton>
            </Box>
          
          <Box sx={{display:'flex',flexDirection:'column',gap:2,padding:'20px',}}>


            <CustomInput name="Offer Name" value={selectedBankOffer?.offerName} />
            <CustomInput name="Description" value={selectedBankOffer?.description} />
            <Button variant="contained" color="primary" sx={{ marginTop: '20px' }}>
              {selectedBankOffer ? 'Save' : 'Add'}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Projects;
