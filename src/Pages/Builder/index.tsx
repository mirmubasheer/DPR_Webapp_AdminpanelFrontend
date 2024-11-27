import React from 'react';
import NoBuilders from './NoBuilders';
import Builders from './Builders';
import { getBuilders } from '../../api/services';
import { useQuery } from 'react-query';

const BuildersPage: React.FC = () => {
    const { data:builderData, isLoading, error } = useQuery('getBuilders', getBuilders);
    

    const BuildersData = builderData?.data;

    
    console.log(BuildersData);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Something went wrong</div>;
    }

    // return BuildersData.length === 0 ? <NoBuilders /> : <Builders buildersData={BuildersData} />;
    return (BuildersData === undefined || BuildersData.length === 0)  ? <NoBuilders /> : <Builders buildersData={BuildersData} />;
};

export default BuildersPage;
