import React from 'react';
import NoChannelPartner from './NoChannelPartner';
import ChannelPartner from './ChannelPartner';
import { useQuery } from 'react-query';
import { getChannelPartners } from '../../api/services'; // Add API call for channel partners
import { LinearProgress } from '@mui/material';

const ChannelPartnerPage: React.FC = () => {
    // Fetch ChannelPartner data
    const { data: ChannelPartnerData, isLoading: isLoadingChannelPartner, error: ChannelPartnerError, refetch: refetchChannelPartner } = useQuery('getChannelPartner', getChannelPartners);

    const combinedData = [
        ...(ChannelPartnerData?.data || []), 
    ];

    if (isLoadingChannelPartner ) {
        return <LinearProgress />;
    }

    if (ChannelPartnerError ) {
        return <div>Something went wrong</div>;
    }

    if (combinedData.length === 0) {
        return <NoChannelPartner />;
    }

    return <ChannelPartner ChannelPartnerData={combinedData}  />;
};

export default ChannelPartnerPage;
