import React from 'react';
import NoLeads from './NoLeads';
import Leads from './Leads';
import { useQuery } from 'react-query';
import { getLeads, getChannelPartners } from '../../api/services'; // Add API call for channel partners
import { LinearProgress } from '@mui/material';

const LeadsPage: React.FC = () => {
    // Fetch Leads data
    const { data: LeadsData, isLoading: isLoadingLeads, error: LeadsError, refetch: refetchLeads } = useQuery('getLeads', getLeads);

    const combinedData = [
        ...(LeadsData?.data || []), 
    ];

    if (isLoadingLeads ) {
        return <LinearProgress />;
    }

    if (LeadsError ) {
        return <div>Something went wrong</div>;
    }

    if (combinedData.length === 0) {
        return <NoLeads />;
    }

    return <Leads LeadsData={combinedData}  />;
};

export default LeadsPage;
