import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Admin/Header';
import Tabs from './Admin/Tabs';
import HeaderNew from './ChannelPartner/Header';
import './Layout.css';
import Cookies from 'js-cookie'; // Ensure this package is installed
import { Box } from '@mui/material';

const Layout = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState('');
  const userType = Cookies.get('user_type'); // Get user_type from cookies

  useEffect(() => {
    // Sync selectedTab state with the current route
    const path = location.pathname.split('/')[1]; // Get the first segment of the path
    setSelectedTab(`/${path}`);
  }, [location]);

  // Choose Header component based on user type
  const HeaderComponent = userType === 'admin' ? Header : HeaderNew;

  return (
    <div className="layout-container">
      {userType === 'admin' && (
        <>
          <Header selectedTab={selectedTab} />
          <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
        </>
      )}
      {userType === 'channelpartner' && (
        <>
          <HeaderNew selectedTab={selectedTab} onTabChange={setSelectedTab} />
        </>
      )}
      <div className="content-container" style={{ marginLeft: userType === 'admin' ? '230px' : '0' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;