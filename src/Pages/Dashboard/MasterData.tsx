import React from 'react';
import { Box, Card, Typography, Alert, LinearProgress } from '@mui/material';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie'; // For accessing cookies
import { getBuilders, getProjects, getUsers, getLeads, getChannelPartners } from '../../api/services';
import { TabsIcons } from '../../assets';

interface DataResponse {
  length: number;
}

const MasterData: React.FC = () => {
  // Get the user type from cookies
  const userType = Cookies.get('user_type'); // Assuming 'user_type' is stored in the cookie

  // API calls based on user type
  const { data: Builderdata, isLoading: isBuildersLoading, isError: isBuildersError } = useQuery('getBuilders', getBuilders);
  const { data: ProjectsData, isLoading: isProjectsLoading, isError: isProjectsError } = useQuery('getProjects', getProjects);
  const { data: LeadsData, isLoading: isLeadsLoading, isError: isLeadsError } = useQuery('getLeads', getLeads);
  
  const { data: ChannelPartnersData, isLoading: isChannelPartnersLoading, isError: isChannelPartnersError } = useQuery(
    'getChannelPartners',
    getChannelPartners,
    {
      enabled: userType === 'admin', // Only fetch Channel Partners data if the user is an admin
    }
  );
  const { data: UsersData, isLoading: isUsersLoading, isError: isUsersError } = useQuery(
    'getUsers',
    getUsers,
    {
      enabled: userType === 'admin', // Only fetch Users data if the user is an admin
    }
  );

  // Loading and error handling
  if (isBuildersLoading || isProjectsLoading || isLeadsLoading || isChannelPartnersLoading || isUsersLoading) {
    return (
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LinearProgress />
      </Box>
    );
  }

  if (isBuildersError || isProjectsError || isLeadsError || isChannelPartnersError || isUsersError) {
    return (
      <Box sx={{ padding: 2 }}>
        <Alert severity="error">An error occurred while fetching data.</Alert>
      </Box>
    );
  }

  // Prepare items for display based on user type
  const items = [
    { text: 'Number of Builders', number: Builderdata?.data.length, image: TabsIcons.BuildersIcon },
    { text: 'Number of Projects', number: ProjectsData?.data.length, image: TabsIcons.ProjectsIcon },
    { text: 'Number of Leads', number: LeadsData?.data.length, image: TabsIcons.LeadsIcon },
  ];

  if (userType === 'admin') {
    items.push(
      { text: 'Number of Channel Partners', number: ChannelPartnersData?.data.length, image: TabsIcons.ChannelPartnersIcon },
      { text: 'Number of Users', number: UsersData?.data.length, image: TabsIcons.UsersIcon }
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 3,
        }}
      >
        <Box
          sx={{
            background: '#30779d',
            borderRadius: '15px',
            width: '4px',
            height: '25px',
            marginRight: 1,
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Master Data
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'flex-start',
        }}
      >
        {items.map((item, index) => (
          <Card
            key={index}
            sx={{
              width: '280px',
              height: '120px',
              background: '#FFFFFF',
              boxShadow: '0px 6px 16px #0A0A0A29',
              display: 'flex',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'left',
                  flexDirection: 'column',
                  ml: 1,
                  mr: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <img src={item.image} alt="Icon" style={{ height: '30px' }} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: '500', color: '#888888' }}>
                  {item.text}
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ mr: 2, fontWeight: 'bold' }}>
                {item.number}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MasterData;
