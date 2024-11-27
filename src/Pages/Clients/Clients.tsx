import React, { useState, useEffect } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  useTheme,
  IconButton,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AllClients from './AllClients';
import UnContacted from './UnContacted';
import AddIcon from '@mui/icons-material/Add';
import FollowUps from './FollowUps';
import RecentlyViewed from './RecentlyViewed';
import AddClientModal from './AddClientModal';

const Clients = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();

  const [activeTab, setActiveTab] = useState<string>('All Clients');
  const [isAddClientModalOpen, setAddClientModalOpen] = useState(false);

  const openAddClientModal = () => setAddClientModalOpen(true);
  const closeAddClientModal = () => setAddClientModalOpen(false);

  useEffect(() => {
    // Sync tab state with URL on initial load or route change
    switch (type) {
      case '':
        setActiveTab('All Clients');
        break;
      case 'uncontacted':
        setActiveTab('Uncontacted');
        break;
      case 'follow-ups':
        setActiveTab('Follow Ups');
        break;
      case 'recently-viewed':
        setActiveTab('Recently Viewed');
        break;
      default:
        setActiveTab('All Clients');
        navigate('/clients'); 
    }
  }, [type, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    const route = newValue.toLowerCase().replace(/\s/g, '-');
    navigate(`/clients/${route}`);
  };



  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 }, py: 1 }}>
        <Container maxWidth="md" sx={{ px: 4 }}>
            <Typography variant="h3" color="textPrimary" sx={{ mb: 2, fontWeight: 800 , textAlign: 'left'}}>
                Clients
            </Typography>
        </Container>

      <Container maxWidth="md" sx={{ px:4 }}>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',  }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Clients Plan Tabs"
                sx={{
                    backgroundColor: '#ffffff',
                    padding: '10px 15px',
                    '& .MuiTabs-flexContainer': {
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                    },
                    '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                    marginBottom: '7px',
                    },
                    '& .MuiTab-root': {
                    color: '#000000',
                    textTransform: 'none',
                    minWidth: 'auto',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginRight: '15px',
                    '&:hover': {
                        color: '#00000097',
                        transition: 'all 0.3s ease',
                    },
                    },
                    '& .Mui-selected': {
                    color: theme.palette.primary.main,
                    },
                }}
                >
                    <Tab key={"All Clients"} label={"All Clients"} value={"All Clients"} onClick={() => navigate('/clients')} />
                    <Tab key={"Uncontacted"} label={"Uncontacted"} value={"Uncontacted"} onClick={() => navigate('/clients/uncontacted')} />
                    <Tab key={"Follow Ups"} label={"Follow Ups"} value={"Follow Ups"} onClick={() => navigate('/clients/follow-ups')} />
                    <Tab key={"Recently Viewed"} label={"Recently Viewed"} value={"Recently Viewed"} onClick={() => navigate('/clients/recently-viewed')} />
                </Tabs>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'primary.main', borderRadius: '5px', padding: '2px 14px', cursor: 'pointer' }} onClick={openAddClientModal}>
              <IconButton onClick={() => navigate('/clients/new')}>
                <AddIcon sx={{ color: "white", fontSize: 20, fontWeight: 600 }} />
              </IconButton>
              <Typography variant="caption" color="white" sx={{ fontSize: '12px', fontWeight: 600,}} >
                Add New Client
              </Typography>
            </Box>
        </Box>
        <Box sx={{ backgroundColor: '#ffffff', px:1, py:4  }}>
          {activeTab === 'All Clients' && <AllClients clients={mockClients} />}
          {activeTab === 'Uncontacted' && <UnContacted clients={mockUncontactedClients} />}
          {activeTab === 'Follow Ups' && <FollowUps />}
        {activeTab === 'Recently Viewed' && <RecentlyViewed />}
        </Box>

        <AddClientModal open={isAddClientModalOpen} onClose={closeAddClientModal} />
      </Container>
    </Box>
  );
};

export default Clients;

// Mock data for example
const mockClients = [
  { id: 1, name: 'John Doe', details: 'CEO at XYZ', lastActivity: '12/10/2021', dateAdded: '10/10/2021' },
  { id: 2, name: 'Jane Smith', details: 'CTO at ABC', lastActivity: '11/10/2021', dateAdded: '09/10/2021' },
];

const mockUncontactedClients = [
  { id: 3, name: 'Alice Johnson', email: 'alice@pqr.com', phone: '123-456-7890' },
  { id: 4, name: 'Bob Brown', email: 'bob@lmn.com', phone: '098-765-4321' },
];
