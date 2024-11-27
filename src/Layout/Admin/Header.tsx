// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { dprlogo } from '../../assets'; // Your DPR logo path
import AccountMenu from '../Menu';  // Menu for user profile/settings
import { TabsIcons } from '../../assets/index'; // Import icons from assets

interface HeaderProps {
  selectedTab: string; // Pass the selected tab route from parent
}

const Header: React.FC<HeaderProps> = ({ selectedTab }) => {
  // Define tab labels based on routes
  const tabLabels: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/builders': 'Builders',
    '/projects': 'Projects',
    '/users': 'Users',
  };

  // Get the current tab label, default to 'Dashboard' if route not found
  const currentTabLabel = tabLabels[selectedTab] || 'Dashboard';

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', width: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={dprlogo} alt="DPR Logo" style={{ marginRight:"30px", height: '55px', marginLeft: "30px" }} />
          <Typography variant="h6" sx={{ ml:2, color: '#30779d', fontWeight: 'bold' }}>
            {currentTabLabel}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large" edge="end" color="inherit" aria-label="settings" sx={{ color: '#30779d', marginRight: '10px' }}>
            <img src={TabsIcons.SettingsIcon} alt="Settings" style={{ width: 24, height: 24 }} />
          </IconButton>

          <IconButton size="large" edge="end" color="inherit" aria-label="notification" sx={{ color: '#30779d', marginRight: '10px' }}>
            <img src={TabsIcons.NotificationIcon} alt="Notifications" style={{ width: 24, height: 24 }} />
          </IconButton>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <AccountMenu />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
