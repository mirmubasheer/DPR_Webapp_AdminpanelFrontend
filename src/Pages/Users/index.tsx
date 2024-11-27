import React from 'react';
import NoUsers from './NoUsers';
import Users from './Users';
import { useQuery } from 'react-query';
import { getUsers, getChannelPartners } from '../../api/services'; // Add API call for channel partners
import { LinearProgress } from '@mui/material';

const UsersPage: React.FC = () => {
    // Fetch users data
    const { data: usersData, isLoading: isLoadingUsers, error: usersError, refetch: refetchUsers } = useQuery('getUsers', getUsers);
    const { data: channelPartnersData, isLoading: isLoadingChannelPartners, error: channelPartnersError, refetch: refetchChannelPartners } = useQuery('getChannelPartners', getChannelPartners);

    const combinedData = [
        ...(usersData?.data || []), 
        ...(channelPartnersData?.data || [])
    ];

    if (isLoadingUsers || isLoadingChannelPartners) {
        return <LinearProgress />;
    }

    if (usersError || channelPartnersError) {
        return <div>Something went wrong</div>;
    }

    if (combinedData.length === 0) {
        return <NoUsers />;
    }

    return <Users usersData={combinedData} onDelete={() => { refetchUsers(); refetchChannelPartners(); }} />;
};

export default UsersPage;
