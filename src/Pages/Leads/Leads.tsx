import React, { useState } from 'react';
import {
  Box, TextField, InputAdornment, Button, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Typography, Select, MenuItem, ListSubheader, Checkbox, FormControl
} from '@mui/material';
import { Search as SearchIcon, Add as Plus, ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import LeadModal from './LeadModal';  // Import the modal component

interface Lead {
  _id: string;
  source: string;
  type: string;
  name: string;
  email: string;
  phoneNumber: string;
  iAgree: boolean;
  homeLoan: boolean;
  createdAt: Date;
}

const rowsPerPage = 25;

interface LeadsProps {
  LeadsData: Lead[];
}

const Leads: React.FC<LeadsProps> = ({ LeadsData }) => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);  // State to control the modal visibility
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);  // To hold the selected lead
  const [type, setType] = useState<string>(''); // For 'Type' select
  const [selectedSources, setSelectedSources] = useState<string[]>([]); // For 'Source' select
  const [showSourceSelect, setShowSourceSelect] = useState(false); // Toggle for showing the second select

  // Get unique source options from LeadsData
  const sourceOptions = LeadsData.map((lead) => lead.source).filter((value, index, self) => self.indexOf(value) === index);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);  // Set the selected lead when a row is clicked
    setOpenModal(true);  // Open the modal
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedLead(null);  // Clear the selected lead when closing the modal
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleTypeChange = (event: any) => {
    setType(event.target.value);
    if (event.target.value === 'project') {
      setShowSourceSelect(true); // Show the source select if "Project" is selected
    } else {
      setShowSourceSelect(false); // Hide it if another type is selected
    }
  };

  const handleSourceChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedSources(typeof value === 'string' ? value.split(',') : value);
  };

  // Filter leads based on search, type, and sources
  const filteredLeads = LeadsData.filter(lead => {
    // Filter based on search text
    const matchesSearchText =
      lead.name.toLowerCase().includes(searchText.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchText.toLowerCase()) ||
      lead.phoneNumber.includes(searchText);

    // Filter based on type and source (if type is "Project")
    const matchesType = !type || lead.type.toLowerCase() === type.toLowerCase();
    const matchesSource = selectedSources.length === 0 || selectedSources.includes(lead.source);

    return matchesSearchText && matchesType && matchesSource;
  });

  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);
  const paginatedRows = filteredLeads.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <Box>
      <Box sx={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' ,justifyContent: 'left', gap: '10px' }}>
          <TextField
            placeholder="Search for Leads..."
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
          />

          <FormControl sx={{ minWidth: 'auto',mr: 1 }}>
            <Select
              value={type}
              onChange={handleTypeChange}
              displayEmpty
              sx={{
                width: '100%',
                height: "40px",
                border: "1px solid #1212121A",
                borderRadius: "20px",
                opacity: 1,
                boxShadow: "0px 6px 14px #36408D08",
                fontSize: "12px",
                color: "#1D1D1D",
                textAlign: 'left',
              }}
            >
              <MenuItem value="">
                <Typography variant='caption' sx={{ color: '#1D1D1D', opacity: 0.6, fontWeight: 450 }}>
                  Type
                </Typography>
              </MenuItem>
              <MenuItem value="project">
                <Typography variant='caption' sx={{  color: '#1D1D1D' , fontWeight: 450 }}>
                  Project
                </Typography>
              </MenuItem>
              <MenuItem value="individual">
                <Typography variant='caption' sx={{ color: '#1D1D1D' , fontWeight: 450 }}>
                  Contact Us
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>

          {/* Conditionally render Source Select if type is "Project" */}
          {showSourceSelect && (
            <FormControl sx={{ minWidth: 'auto',mr: 1 }}>
              <Select
                multiple
                value={selectedSources}
                onChange={handleSourceChange}
                IconComponent={ArrowDropDownIcon}
                displayEmpty
                renderValue={(selected) => (
                  <Box display="flex" alignItems="center">
                    {selected.length > 0 ? (
                      <>
                        <Typography variant='caption' sx={{ fontSize: '10px', color: '#1D1D1D', opacity: 0.6 }}>Sources</Typography>
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
                          sx={{
                            backgroundColor: '#30779d',
                            color: '#FFFFFF',
                          }}
                        >
                          {selected.length}
                        </Box>
                      </>
                    ) : (
                      <Typography variant='caption' sx={{ fontSize: '10px', color: '#1D1D1D', opacity: 0.6 }}>Select Sources</Typography>
                    )}
                  </Box>
                )}
                sx={{
                  width: '100%',
                  height: "40px",
                  border: "1px solid #1212121A",
                  borderRadius: "20px",
                  opacity: 1,
                  boxShadow: "0px 6px 14px #36408D08",
                  fontSize: "12px",
                  color: "#1D1D1D",
                  textAlign: 'left',
                }}
              >
                <ListSubheader sx={{ background: 'transparent' }}>
                  <Typography variant="caption" sx={{ fontWeight: 500, color: '#1D1D1D' }}>
                    Sources
                  </Typography>
                </ListSubheader>

                {sourceOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox
                      checked={selectedSources.indexOf(option) > -1}
                      sx={{ color: '#1D1D1D', fontSize: "10px" }}
                      size="small"
                    />
                    <Typography variant="caption" sx={{ fontWeight: 500, color: '#1D1D1D' }}>
                      {option}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' , justifyContent: 'right' }}>
          {/* <Button
            variant="contained"
            color="primary"
            startIcon={<Plus />}
            sx={{ mt: 1, marginLeft: '10px' }}
          >
            Add New Lead
          </Button> */}
        </Box>
      </Box>


      <TableContainer component={Paper} sx={{ border: '1px solid #1212121A', borderRadius: '10px', opacity: 1 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#30779d40' }}>
          <TableRow>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>S.No</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Source</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Type</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Name</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Email</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Phone Number</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Created At</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedRows.map((lead: Lead, index: number) => (
              <TableRow
                key={lead._id}
                hover
                onClick={() => handleRowClick(lead)}  // Open modal when row is clicked
                sx={{ cursor: 'pointer' }}
              >
                 <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" , fontWeight: 400 }}>{(currentPage - 1) * rowsPerPage + index + 1}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" , fontWeight: 400 }}>{lead.source}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" , fontWeight: 400 }}>{lead.type}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" , fontWeight: 400 }}>{lead.name}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" , fontWeight: 400 }}>{lead.email}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" , fontWeight: 400 }}>{lead.phoneNumber}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" , fontWeight: 400 }}>{new Date(lead.createdAt).toLocaleDateString()}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" my={3}>
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
          }}
        />
      </Box>

      </Box>

      {/* Modal for showing lead details */}
      {selectedLead && (
        <LeadModal
            lead={selectedLead}
            open={openModal}
            handleClose={handleModalClose} 
        />
        )}
          
    </Box>
  );
};

export default Leads;
