import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  useTheme,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Client {
  name: string;
  details: string;
  lastActivity: string;
  dateAdded: string;
}

interface TabContent {
  title: string;
  description: string;
  imageUrl: string;
  details: {
    label: string;
    value: string;
  }[];
}

interface ClientsPageProps {
  clients: Client[];
  tabData: {
    [key: string]: TabContent;
  };
}

const clients: Client[] = [
    {
        name: 'John Doe',
        details: 'CEO at Company XYZ',
        lastActivity: '12/10/2021',
        dateAdded: '10/10/2021',
    },
    {
        name: 'Jane Doe',
        details: 'CTO at Company ABC',
        lastActivity: '11/10/2021',
        dateAdded: '09/10/2021',
    },
    {
        name: 'Alice',
        details: 'Developer at Company PQR',
        lastActivity: '',
        dateAdded: '08/10/2021',
    },
    {
        name: 'Bob',
        details: 'Designer at Company LMN',
        lastActivity: '',
        dateAdded: '07/10/2021',
    },
    ];

const tabData: { [key: string]: TabContent } = {
    'All Clients': {
        title: 'All Clients',
        description: 'View all clients in the list',
        imageUrl: 'https://via.placeholder.com/150',
        details: [
            { label: 'Total Clients', value: '4' },
            { label: 'Active Clients', value: '2' },
            { label: 'Inactive Clients', value: '2' },
        ],
    },
    'Uncontacted': {
        title: 'Uncontacted Clients',
        description: 'Clients who have not been contacted yet',
        imageUrl: 'https://via.placeholder.com/150',
        details: [
            { label: 'Total Clients', value: '2' },
        ],
    },
    'Follow Ups': {
        title: 'Follow Up Clients',
        description: 'Clients who need follow-up',
        imageUrl: 'https://via.placeholder.com/150',
        details: [
            { label: 'Total Clients', value: '2' },
        ],
    },
    'Recently Viewed': {
        title: 'Recently Viewed Clients',
        description: 'Clients viewed recently',
        imageUrl: 'https://via.placeholder.com/150',
        details: [
            { label: 'Total Clients', value: '4' },
        ],
    },
};



const Clients = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<string>('All Clients');
  const [filteredClients, setFilteredClients] = React.useState<Client[]>(clients);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Tab change handler
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    // Apply filtering logic based on tab selected
    if (newValue === 'All Clients') {
      setFilteredClients(clients);
    } else if (newValue === 'Uncontacted') {
      setFilteredClients(clients.filter((client) => client.lastActivity === ''));
    } else if (newValue === 'Follow Ups') {
      setFilteredClients(clients.filter((client) => client.lastActivity !== ''));
    } else if (newValue === 'Recently Viewed') {
      setFilteredClients(clients.slice().reverse());
    }
  };

    // Route change handler
    const Routechange = (route: string) => {
        navigate(route);
    }

  // Search clients handler
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filtered clients based on search term
  const searchResults = filteredClients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 }, py: 1,  }}>
    <Container maxWidth="md" sx={{backgroundColor: '#ffffff', px: 4}}>
        <Box sx={{ my: 4, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="Clients Plan Tabs"
                    sx={{
                    '& .MuiTabs-flexContainer': {
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: theme.palette.primary.main,
                        marginBottom: '7px',
                    },
                    '& .MuiTab-root': {
                        color: '#00000057',
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
                        <Tab key={"All Clients"} label={"All Clients"} value={"All Clients"} onClick={() => Routechange('/clients')} />
                        <Tab key={"Uncontacted"} label={"Uncontacted"} value={"Uncontacted"} onClick={() => Routechange('/clients/uncontacted')} />
                        <Tab key={"Follow Ups"} label={"Follow Ups"} value={"Follow Ups"} onClick={() => Routechange('/clients/follow-ups')} />
                        <Tab key={"Recently Viewed"} label={"Recently Viewed"} value={"Recently Viewed"} onClick={() => Routechange('/clients/recently-viewed')} />
                </Tabs>
                <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'primary.main', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
                    <IconButton  onClick={() => navigate('/clients/new')}>
                        <AddIcon sx={{color:"white", fontSize: 20, marginRight: 1, fontWeight: 600}} />
                    </IconButton>
                    <Typography variant="body2" color="white" onClick={() => navigate('/clients/new')}>
                        Add New Client
                    </Typography>
                </Box>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Search Clients"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>

        {/* Clients List */}
        <Grid container spacing={4}>
          {searchResults.map((client, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {client.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {client.details}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Last Activity: {client.lastActivity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date Added: {client.dateAdded}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/clients/${client.name.toLowerCase().replace(/\s/g, '-')}`)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};


export default Clients;