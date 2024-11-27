import React, { useState } from 'react';
import { Container, Box, Typography, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Divider } from '@mui/material';
import { CalendarToday as CalendarIcon, Notifications as NotificationsIcon, Person as PersonIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';

interface FollowUp {
  id: number;
  clientName: string;
  followUpDate: string;
  followUpTime: string;
}

const FollowUps: React.FC = () => {
  // Example follow-up data
  const [followUps, setFollowUps] = useState<FollowUp[]>([
    { id: 1, clientName: 'John Doe', followUpDate: '2024-11-20', followUpTime: '10:00 AM' },
    { id: 2, clientName: 'Jane Smith', followUpDate: '2024-11-20', followUpTime: '02:00 PM' },
    { id: 3, clientName: 'Emily Davis', followUpDate: '2024-11-21', followUpTime: '11:30 AM' },
    { id: 4, clientName: 'Michael Brown', followUpDate: '2024-11-22', followUpTime: '01:00 PM' },
  ]);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<'clientName' | 'followUpDate' | 'followUpTime'>('followUpDate');

  // Sorting function
  const handleRequestSort = (property: 'clientName' | 'followUpDate' | 'followUpTime') => {
    const isAsc = orderBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortData = (data: FollowUp[]) => {
    return data.sort((a, b) => {
      if (orderBy === 'clientName') {
        return compare(a.clientName, b.clientName);
      } else if (orderBy === 'followUpDate') {
        return compare(a.followUpDate, b.followUpDate);
      } else {
        return compare(a.followUpTime, b.followUpTime);
      }
    });
  };

  const compare = (a: string, b: string) => {
    if (a < b) return sortOrder === 'asc' ? -1 : 1;
    if (a > b) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  };

  // Dew Today count
  const dewTodayCount = 0; // Example count
  const calendarCount = 0;
  const notificationCount = 2;
  const personCount = 3;

  return (
    <Container maxWidth="lg">
      {/* Dew Today Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1e90ff85',
          padding: '15px 40px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Dew Today</Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>{dewTodayCount}</Typography>
      </Box>

      {/* Icon Section */}
      <Grid container spacing={3} display="flex" justifyContent="space-between" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f0f4f8',
              padding: '10px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              justifyContent: 'space-between',
              width: "100px",
              '&:hover': {
                backgroundColor: '#e1e9f2',
              },
            }}
          >
            <IconButton >
              <CalendarIcon sx={{color: "red"}}/>
            </IconButton>
            <Typography variant="h6"  sx={{color: "red"}}>{calendarCount}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f0f4f8',
              padding: '10px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              justifyContent: 'space-between',
              width: "100px",

              '&:hover': {
                backgroundColor: '#e1e9f2',
              },
            }}
          >
            <IconButton color="primary">
              <NotificationsIcon />
            </IconButton>
            <Typography variant="h6">{notificationCount}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f0f4f8',
              padding: '10px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              justifyContent: 'space-between',
              width: "100px",

              '&:hover': {
                backgroundColor: '#e1e9f2',
              },
            }}
          >
            <IconButton color="primary">
              <PersonIcon />
            </IconButton>
            <Typography variant="h6">{personCount}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f0f4f8',
              padding: '10px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              justifyContent: 'space-between',
              width: "100px",

              '&:hover': {
                backgroundColor: '#e1e9f2',
              },
            }}
          >
            <IconButton color="primary">
              <TrendingUpIcon />
            </IconButton>
            <Typography variant="h6">2</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Table Section */}
      <Divider sx={{ mb: 4 }} />
      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'clientName'}
                  direction={orderBy === 'clientName' ? sortOrder : 'asc'}
                  onClick={() => handleRequestSort('clientName')}
                >
                  Client Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'followUpDate'}
                  direction={orderBy === 'followUpDate' ? sortOrder : 'asc'}
                  onClick={() => handleRequestSort('followUpDate')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'followUpTime'}
                  direction={orderBy === 'followUpTime' ? sortOrder : 'asc'}
                  onClick={() => handleRequestSort('followUpTime')}
                >
                  Time
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortData(followUps).map((followUp) => (
              <TableRow key={followUp.id}>
                <TableCell>{followUp.clientName}</TableCell>
                <TableCell>{followUp.followUpDate}</TableCell>
                <TableCell>{followUp.followUpTime}</TableCell>
              </TableRow>
            ))}
            {followUps.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography>No follow-ups found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FollowUps;
