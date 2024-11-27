// src/components/Tabs.tsx
import React from 'react';
import { Box, Tab, Tabs as MuiTabs, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { TabsIcons } from '../../assets'; // Import icons from assets
import Cookies from 'js-cookie'; // To get user type from cookies

// Define tab properties for both user types
interface TabPanelProps {
  icon: string;
  label: string;
  route: string;
}

// Tabs for admin users
const adminTabs: TabPanelProps[] = [
  { icon: TabsIcons.DashboardIcon, label: 'Dashboard', route: '/dashboard' },
  { icon: TabsIcons.BuildersIcon, label: 'Builders', route: '/builders' },
  { icon: TabsIcons.ProjectsIcon, label: 'Projects', route: '/projects' },
  { icon: TabsIcons.LeadsIcon, label: 'Leads', route: '/leads' },
  { icon: TabsIcons.ChannelPartnersIcon, label: 'Channel Partners', route: '/channelpartner' },
  { icon: TabsIcons.UsersIcon, label: 'Users', route: '/users' },
];

// Tabs for channel partner users
const channelPartnerTabs: TabPanelProps[] = [
  { icon: TabsIcons.DashboardIcon, label: 'Dashboard', route: '/dashboard' },
  { icon: TabsIcons.BuildersIcon, label: 'Builders', route: '/builders' },
  { icon: TabsIcons.ProjectsIcon, label: 'Projects', route: '/projects' },
  { icon: TabsIcons.LeadsIcon, label: 'Leads', route: '/leads' },
];

interface TabsProps {
  selectedTab: string;
  onTabChange: (route: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ selectedTab, onTabChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = Cookies.get('user_type'); // Determine if the user is admin or channel partner
  const tabs = userType === 'admin' ? adminTabs : channelPartnerTabs;

  // Handle tab change navigation
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    navigate(newValue);
    onTabChange(newValue); // Notify parent about tab change
  };

  // Determine the currently selected tab
  const currentTab = selectedTab; // Use the prop directly

  return (
    <Box
      sx={{
        width: '230px',
        height: 'calc(100vh - 64px)',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
        position: 'fixed',
        top: '64px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.13)',
      }}
    >
      <MuiTabs
        orientation="vertical"
        value={currentTab}
        onChange={handleChange}
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            value={tab.route}
            icon={
              <img
                src={tab.icon}
                alt={tab.label}
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '8px',
                  filter: currentTab.startsWith(tab.route) ? 'invert(1)' : 'invert(0)',
                  transition: 'filter 0.3s',
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{ color: currentTab.startsWith(tab.route) ? '#fff' : '#000' }}
              >
                {tab.label}
              </Typography>
            }
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: currentTab.startsWith(tab.route) ? '#30779d' : '#f1f1f1',
              opacity: currentTab.startsWith(tab.route) ? 1 : 0.6,
              color: currentTab.startsWith(tab.route) ? '#fff' : '#000',
              borderRadius: '8px',
              height: '30px',
              ml: '20px',
              mr: '20px',
              mb: '4px',
              transition: 'background-color 0.3s, opacity 0.3s, color 0.3s',
              '&:hover': {
                backgroundColor: '#30779d',
                color: '#fff',
                opacity: 1,
              },
            }}
            iconPosition="start" 
          />
        ))}
      </MuiTabs>
    </Box>
  );
};

export default Tabs;
