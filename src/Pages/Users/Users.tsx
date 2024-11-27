import React, { useState } from 'react';
import {
  Box, TextField, IconButton, InputAdornment, Button, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Typography
} from '@mui/material';
import { Search as SearchIcon, Add as Plus } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import AddUsers from './AddUsers';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteChannelPartner, deleteUser } from '../../api/services';
import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';
import ImageGalleryComponent from './ImageGalleryComponent';

interface User {
  _id: string;
  name: string;
  email: string;
  usertype: string;
  phonenumber: string;
  userimage?: string;
}

const rowsPerPage = 25;

interface UsersProps {
  usersData: User[];
  onDelete: () => void;
}

const Users: React.FC<UsersProps> = ({ usersData, onDelete }) => {
  const theme = useTheme();

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const AddNewUser = () => {
    setSelectedUser(null);
    setIsAddUserOpen(true);
  };

  const handleEditUserOpen = (row: User) => {
    setSelectedUser(row);
    setIsAddUserOpen(true);
  };

  const handleDeleteUser = async (userId: string, userType: string) => {
    if (userType === 'admin') {
     await deleteUser(userId);
      toast.success('Admin deleted successfully');
      onDelete();
    }
    else 
      await deleteChannelPartner(userId);
      toast.success('Channel Partner deleted successfully');
      onDelete();
  } 

  const handleAddUserClose = () => {
    setSelectedUser(null);
    setIsAddUserOpen(false);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedRows = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          placeholder="Search for Users..."
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
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus />}
          sx={{ mt: 1, marginLeft: '10px' }}
          onClick={AddNewUser}
        >
          Add New User
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
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Email Address</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>User Type</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Password</Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: "12px" }}>
                <Typography variant="caption" sx={{ marginLeft: "20px", fontWeight: '600' }}>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row: User, index: number) => (
              <TableRow key={row._id}>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" }}>{(currentPage - 1) * rowsPerPage + index + 1}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" }}>{row.name}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" }}>{row.email}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" }}>{row.usertype}</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <Typography variant="caption" sx={{ marginLeft: "25px" }}>**********</Typography>
                </TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <IconButton sx={{ marginLeft: "15px" }} onClick={() => handleEditUserOpen(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ marginLeft: "10px" }} onClick={() => handleDeleteUser(row._id, row.usertype)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <ImageGalleryComponent /> */}
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
      <AddUsers
        open={isAddUserOpen}
        onClose={handleAddUserClose}
        initialValues={selectedUser ? {
          name: selectedUser.name,
          email: selectedUser.email,
          password: '', 
          usertype: selectedUser.usertype,
          phonenumber: selectedUser.phonenumber,
          userimage: selectedUser.userimage
        } : undefined}
        userId={selectedUser?._id}
      />
    </Box>
  );
};

export default Users;
