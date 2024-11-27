import React, { useState } from 'react';
import {
  Box, TextField, IconButton, InputAdornment, Button, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Typography,
  Tooltip
} from '@mui/material';
import { Search as SearchIcon, Add as Plus } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProject } from '../../api/services';
import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Project } from './ProjectInterface';
import { useNavigate } from 'react-router-dom'; // For navigation
import AddProject from './Drawers/AddProject';
// import AddProjects from './Drawers/AddProjects';


const rowsPerPage = 25;

interface ProjectsProps {
  ProjectsData: Project[];
  onDelete: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ ProjectsData, onDelete }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddProjectsOpen, setIsAddProjectsOpen] = useState(false);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };



  const openAddProjectsDrawer = () => {
    setIsAddProjectsOpen(true);
  };

  // Function to close the drawer
  const closeAddProjectsDrawer = () => {
    setIsAddProjectsOpen(false);
  };



  const AddNewProject = () => {
    setSelectedProject(null);
    setIsAddProjectOpen(true);
  };

  const handleEditProjectOpen = (row: Project) => {
    setSelectedProject(row);
    setIsAddProjectOpen(true);
  };

  const handleDeleteProject = async (ProjectId: string) => {
    await deleteProject(ProjectId);
    toast.success('Project deleted successfully');
    onDelete();
  }

  const handleAddProjectClose = () => {
    setSelectedProject(null);
    setIsAddProjectOpen(false);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const filteredProjects = ProjectsData.filter(Project =>
    Project.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);
  const paginatedRows = filteredProjects.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          placeholder="Search for Projects..."
          variant="outlined"
          size="small"
          sx={{ width: '300px' }}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus />}
          sx={{ mt: 1, marginLeft: '10px' }}
          onClick={openAddProjectsDrawer}
        >
          Add New Project
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ border: '1px solid #1212121A', borderRadius: '10px', opacity: 1 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#30779d40' }}>
            <TableRow>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>S.No</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Name</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Property Type</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Location</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>SFT Price</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Project BHK</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Visitors</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedRows.map((row: Project, index: number) => {
                const hasPendingStatus = 
                !row.bankOffers.length || 
                !row.locationHighlights.length || 
                !row.floorPlans.length || 
                !row.amenities.length || 
                !row.projectImages.length;
      
              const status = hasPendingStatus 
                ? { text: 'Pending', color: 'red', boxcolor: '#FF000090' } 
                : { text: 'Completed', color: 'green', boxcolor: '#00800040' };
      
                return (
                  <TableRow
                    key={row._id}
                    onClick={() => handleRowClick(row.projectId)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      }
                    }}
                  >
                    <TableCell sx={{ padding: '8px' }}>
                      <Typography variant="caption" sx={{ marginLeft: "25px" }}>
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Typography variant="caption" sx={{ marginLeft: "25px" }}>{row.name}</Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Typography variant="caption" sx={{ marginLeft: "25px" }}>{row.propertyType}</Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Typography variant="caption" sx={{ marginLeft: "25px" }}>{row.location}</Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Typography variant="caption" sx={{ marginLeft: "25px" }}>{row.sftPrice}</Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Typography variant="caption" sx={{ marginLeft: "25px" }}>{row.projectBHK.join(', ')}</Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Typography variant="caption" sx={{ marginLeft: "25px" }}>{row.visits}</Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }}>
                      <Tooltip title={status.text} arrow>
                        <Box sx={{ display: 'flex', alignItems: 'center' , backgroundColor: status.boxcolor, padding: '5px', borderRadius: '20px', opacity : 1 }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              marginLeft: "25px", 
                              color: status.color 
                            }}
                          >
                            {status.text}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <AddProject
        open={isAddProjectsOpen}
        onClose={closeAddProjectsDrawer}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: theme.palette.primary.main,
              height: "27px",
              minWidth: "27px",
              fontSize: "14px",
              fontWeight: "bold",
              margin: "0 4px",
              backgroundColor: "#EFEFEF",
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
            "& .MuiPaginationItem-page.Mui-selected:hover": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
            "& .Mui-selected": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Projects;
