import React, { useState } from 'react';
import {
  Container,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { Search as SearchIcon, ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';

interface Client {
  id: number;
  name: string;
  details: string;
  lastActivity: string;
  dateAdded: string;
}

interface AllClientsProps {
  clients: Client[];
}

const AllClients: React.FC<AllClientsProps> = ({ clients }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedGroup, setSelectedGroup] = useState('All Groups');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGroupClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleGroupClose = (group: string) => {
    setAnchorEl(null);
    if (group) setSelectedGroup(group);
  };

  // Filter clients based on search term
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {/* Search Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 2 }}>
      <TextField
  fullWidth
  variant="outlined"
  placeholder="Search clients..."
  value={searchTerm}
  onChange={handleSearchChange}
  size="small"
  sx={{
    maxWidth: '300px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f0f0f0', 
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none', // No border
        boxShadow:"none",
      },
      '&:hover fieldset': {
        border: 'none', // No border on hover
        boxShadow:"none",

      },
      '&.Mui-focused fieldset': {
        border: 'none', // No border on focus
        boxShadow:"none",

      },
    },
    '& .MuiOutlinedInput-input': {
    //   backgroundColor: '#f0f0f0', // Light grey color inside the text field
      padding: '10px 16px', // Adjust padding as needed
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
/>


        <Button
          onClick={handleGroupClick}
          sx={{ ml: 2 }}
          endIcon={<ArrowDropDownIcon />}
        >
          {selectedGroup}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleGroupClose('')}
        >
          <MenuItem onClick={() => handleGroupClose('All Groups')}>All Groups</MenuItem>
          <MenuItem onClick={() => handleGroupClose('Group A')}>Group A</MenuItem>
          <MenuItem onClick={() => handleGroupClose('Group B')}>Group B</MenuItem>
        </Menu>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Last Activity</TableCell>
              <TableCell>Date Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.details}</TableCell>
                <TableCell>{client.lastActivity}</TableCell>
                <TableCell>{client.dateAdded}</TableCell>
              </TableRow>
            ))}
            {filteredClients.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>No clients found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllClients;
