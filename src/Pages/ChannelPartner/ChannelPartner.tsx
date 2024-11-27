import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface Lead {
  _id: string;
  usertype: string;
  approval: string;
  name: string;
  email: string;
  phoneNumber: string;
  organization: string;
  address: string;
  dateOfBirth: Date;
}

const rowsPerPage = 25;

interface ChannelPartnerListProps {
  ChannelPartnerData: Lead[];
}

const ChannelPartnerList: React.FC<ChannelPartnerListProps> = ({ ChannelPartnerData }) => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [approvalStatus, setApprovalStatus] = useState<string>(''); // For approval status filter
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleApprovalChange = (event: any) => {
    setApprovalStatus(event.target.value);
  };

  const handleRowClick = (id: string) => {
    navigate(`/channelpartner/${id}`); // Navigate to the details page of the selected Channel Partner
  };

  // Filter ChannelPartners based on search text and approval status
  const filteredChannelPartners = ChannelPartnerData.filter(lead => {
    const matchesSearchText =
      lead.name.toLowerCase().includes(searchText.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchText.toLowerCase()) ||
      lead.phoneNumber.includes(searchText);

    const matchesApprovalStatus = !approvalStatus || lead.approval === approvalStatus;

    return matchesSearchText && matchesApprovalStatus;
  });

  const totalPages = Math.ceil(filteredChannelPartners.length / rowsPerPage);
  const paginatedRows = filteredChannelPartners.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TextField
            placeholder="Search for Channel Partner..."
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
          
          <FormControl sx={{ minWidth: '120px' }}>
            <Select
              value={approvalStatus}
              onChange={handleApprovalChange}
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
                  All Statuses
                </Typography>
              </MenuItem>
              <MenuItem value="approved">
                <Typography variant='caption' sx={{ color: '#1D1D1D', fontWeight: 450 }}>
                  Approved
                </Typography>
              </MenuItem>
              <MenuItem value="declined">
                <Typography variant='caption' sx={{ color: '#1D1D1D', fontWeight: 450 }}>
                  Declined
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>
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
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Name</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Email</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Phone Number</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Organization</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((lead, index) => (
              <TableRow key={lead._id} onClick={() => handleRowClick(lead._id)} sx={{ cursor: 'pointer' }}>
                <TableCell align="left" sx={{ padding: "12px" }}>
                  <Typography variant="caption" sx={{ marginLeft: "20px" }}>{(currentPage - 1) * rowsPerPage + index + 1}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ padding: "12px" }}>
                  <Typography variant="caption" sx={{ marginLeft: "20px" }}>{lead.name}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ padding: "12px" }}>
                  <Typography variant="caption" sx={{ marginLeft: "20px" }}>{lead.email}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ padding: "12px" }}>
                  <Typography variant="caption" sx={{ marginLeft: "20px" }}>{lead.phoneNumber}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ padding: "12px" }}>
                  <Typography variant="caption" sx={{ marginLeft: "20px" }}>{lead.organization}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ padding: "12px" }}>
                  <Typography variant="caption" sx={{ marginLeft: "20px", color: lead.approval === "approved" ? 'green' : 'red' }}>
                    {lead.approval}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" my={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, newPage) => setCurrentPage(newPage)}
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
  );
};

export default ChannelPartnerList;
