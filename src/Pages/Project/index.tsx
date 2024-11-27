import React from 'react'; 
import { useQuery } from 'react-query';
import { LinearProgress } from '@mui/material';
import NoProjects from './NoProjects';
import Projects from './Projects';
import { getProjects } from '../../api/services'; 

const ProjectsPage: React.FC = () => {
  const { data: ProjectData, isLoading, error } = useQuery('getProjects', getProjects);

  const projects = ProjectData?.data;

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (projects === undefined || projects.length === 0) ? (
    <NoProjects />
  ) : (
    <Projects /> // Pass the `projects` data as the `project` prop
  );
};

export default ProjectsPage;
