import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Box, Tab, Tabs as MuiTabs } from '@mui/material';
import { dprlogo } from '../../assets'; // Path to your DPR logo
import AccountMenu from '../Menu'; // User profile/settings menu
import { TabsIcons } from '../../assets/index';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  selectedTab: string; // Current selected tab route
  onTabChange: (route: string) => void; // Callback to notify parent component of tab change
}

const HeaderNew: React.FC<HeaderProps> = ({ selectedTab, onTabChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(selectedTab);

  // Tabs data: icons, labels, routes
  const tabs = [
    { label: 'Clients', route: '/clients' },
    { label: 'Content', route: '/content' },
    { label: 'Team', route: '/team' },
    { label: 'Integrations', route: '/integrations' },
  ];

  useEffect(() => {
    // Sync the current tab with the current path on reload
    const path = location.pathname.split('/')[1]; // Get the first segment of the path
    const matchedTab = `/${path}`;
    setCurrentTab(matchedTab);
    onTabChange(matchedTab);
  }, [location, onTabChange]);

  // Handle tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    onTabChange(newValue); // Notify parent about tab change
    navigate(newValue); // Route to selected tab
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1300,
        paddingRight: '20px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={dprlogo}
            alt="DPR Logo"
            style={{ marginRight: '30px', height: '55px', marginLeft: '30px' }}
          />
        </Box>

        {/* Centered Tab Navigation */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <MuiTabs
            value={currentTab}
            onChange={handleTabChange}
            textColor="inherit"
            sx={{
              '& .MuiTab-root': {
                minWidth: '100px',
                color: '#000',
                fontSize: '16px',
                fontWeight: 500,
                transition: 'color 0.3s',
              },
              '& .Mui-selected': {
                color: '#30779d',
                fontWeight: 'bold',
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                value={tab.route}
                label={tab.label}
                iconPosition="start"
                sx={{
                  textTransform: 'none',
                  color: currentTab === tab.route ? '#30779d' : '#000',
                  fontWeight: currentTab === tab.route ? 'bold' : 'normal',
                }}
              />
            ))}
          </MuiTabs>
        </Box>

        {/* Settings, Notifications, and Account Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large" edge="end" color="inherit" sx={{ color: '#30779d', marginRight: '10px' }}>
            <img src={TabsIcons.SettingsIcon} alt="Settings" style={{ width: 24, height: 24 }} />
          </IconButton>

          <IconButton size="large" edge="end" color="inherit" sx={{ color: '#30779d', marginRight: '10px' }}>
            <img src={TabsIcons.NotificationIcon} alt="Notifications" style={{ width: 24, height: 24 }} />
          </IconButton>

          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderNew;
