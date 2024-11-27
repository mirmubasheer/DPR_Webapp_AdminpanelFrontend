import React, { useState } from 'react';
import {
  Box, TextField, IconButton, InputAdornment, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Pagination, Typography, Select, MenuItem, FormControl, InputLabel,
  Checkbox, ListItemText, SelectChangeEvent
} from '@mui/material';
import { Search as SearchIcon, Add as PlusIcon, ArrowDropDown } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
// import AddProjectsNew from './AddProjectsNew';
import Sample from './Sample';
import { More } from '../../assets';

interface NewProjectData {
  _id: string;
  projectName: string;
  propertyType: string;
  projectLocation: string;
  projectdescription: string;
  homearea: number;
  rooms: number;
  baths: number;
  yearbuilt: number;
  dimensions: string;
  beds: number;
  price: number;
  status: string;
//   amenities?: string[];
  locationiframe: string;
//   reviews?: string[];
  builderid: number;
  builderName: string;
//   projectBHK?: number[];
  unitsApartments?: string;
  approvals?: string;
  createdAt?: string;
  updatedAt?: string;
}

const rowsPerPage = 25;

const Projects = ({ ProjectsData }: { ProjectsData: NewProjectData[] }) => {
  const theme = useTheme();
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<NewProjectData | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

  const handlePropertyTypeChange = (event: SelectChangeEvent<string[]>) => {
    setPropertyTypeFilter(event.target.value as string[]);
  };

  const AddNewProject = () => {
    setSelectedProject(null);
    setIsAddProjectOpen(true);
  };

  const handleEditProjectOpen = (row: NewProjectData) => {
    setSelectedProject(row);
    setIsAddProjectOpen(true);
  };

  const handleAddProjectClose = () => {
    setSelectedProject(null);
    setIsAddProjectOpen(false);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => setCurrentPage(newPage);

  // Convert projectImages from string[] to File[] (if needed)
  const transformImages = (images: string[] | undefined): File[] => {
    return (images || []).map(img => new File([], img)); // Placeholder implementation
  };

  // Filter projects based on search text and property type
  const filteredProjects = ProjectsData.filter((project) =>
    (project.projectName.toLowerCase().includes(searchText.toLowerCase()) ||
      project.builderName.toLowerCase().includes(searchText.toLowerCase()) ||
      project.projectLocation.toLowerCase().includes(searchText.toLowerCase())) &&
    (propertyTypeFilter.length > 0 ? propertyTypeFilter.includes(project.propertyType) : true)
  );

  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);
  const paginatedRows = filteredProjects.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Extract unique property types for the select options
  const propertyTypes = Array.from(new Set(ProjectsData.map((project) => project.propertyType)));

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search for Projects..."
            variant="outlined"
            size="small"
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: '300px' }}
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150, ml: 1.5 }}>
            <Select
              multiple
              value={propertyTypeFilter}
              onChange={handlePropertyTypeChange}
              IconComponent={ArrowDropDown}
              displayEmpty
              renderValue={(selected) =>
                selected.length > 0 ? (
                  <Box display="flex" alignItems="center">
                    Property Types
                    <Box
                      component="span"
                      borderRadius="50%"
                      fontSize="10px"
                      marginLeft="5px"
                      width="15px"
                      height="15px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        color: '#FFFFFF',
                      }}
                    >
                      {selected.length}
                    </Box>
                  </Box>
                ) : (
                  'Property Types'
                )
              }
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid #1212121A",
                borderRadius: "10px",
                opacity: 0.6,
                boxShadow: "0px 6px 14px #36408D08",
                fontSize: "14px",
                color: "#1D1D1D",
                textAlign: 'left',
              }}
              inputProps={{
                style: {
                  fontFamily: "Mundial, sans-serif",
                  fontSize: "14px",
                },
              }}
              SelectDisplayProps={{
                style: {
                  fontFamily: "Mundial, sans-serif",
                  fontSize: "14px",
                },
              }}
            >
              {propertyTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={propertyTypeFilter.indexOf(option) > -1} sx={{ color: '#1D1D1D', fontSize: "14px" }} />
                  <Typography variant="caption" sx={{ fontWeight: 500, color: '#1D1D1D' }}>
                    {option}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<img src={More} alt="Add Builderss" style={{ width: '20px', filter: 'invert(100%)' }} />}
          onClick={AddNewProject}
        >
          Add New Project
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ border: '1px solid #1212121A', borderRadius: '10px' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#30779d50' }}>
            <TableRow>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ fontWeight: '600' }}>S.No</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ fontWeight: '600' }}>Project Name</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ fontWeight: '600' }}>Builder Name</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ fontWeight: '600' }}>Project Location</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ fontWeight: '600' }}>Created At</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ fontWeight: '600' }}>Property Type</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ fontWeight: '600' }}>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row: NewProjectData, index: number) => (
              <TableRow key={row._id} onClick={() => handleEditProjectOpen(row)}>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="overline" sx={{ marginLeft: "20px", fontWeight: '600'
                   }}>{(currentPage - 1) * rowsPerPage + index + 1}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' ,
                // hover underline effect
                '&&:hover': {
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: theme.palette.primary.main,
                  transition: '0.3s',
                }
              }}>
                  <Typography variant="overline" >{row.projectName}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="overline" >{row.builderName}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="overline" >{row.projectLocation}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="overline" >
                    {/* Format date */}
                    {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : ''}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="overline" >{row.propertyType}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <IconButton  onClick={() => handleEditProjectOpen(row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      {isAddProjectOpen && (
        <Sample
          open={isAddProjectOpen}
          onClose={handleAddProjectClose}
          initialValues={selectedProject || undefined}
          projectId={selectedProject?._id}
        />
      )}
    </Box>
  );
};

export default Projects;