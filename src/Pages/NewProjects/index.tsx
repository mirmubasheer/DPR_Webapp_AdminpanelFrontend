// ProjectsPage.tsx

import React from 'react';
import NoProjects from './NoProjects';
import Projects from './Projects';
import { useQuery, useQueryClient } from 'react-query';
import { LinearProgress } from '@mui/material';
import { getProjects } from '../../api/services';

const ProjectsPage: React.FC = () => {
  const queryClient = useQueryClient();

  // Fetch Projects data
  const { data: ProjectsData, isLoading, error } = useQuery('getProjects', getProjects);


  const handleDataRefresh = () => {
    queryClient.invalidateQueries('getProjects');
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return ProjectsData && ProjectsData?.data?.length > 0 ? (
    <Projects ProjectsData={ProjectsData.data} onDelete={handleDataRefresh} />
  ) : (
    <NoProjects />
  );

};

export default ProjectsPage;
