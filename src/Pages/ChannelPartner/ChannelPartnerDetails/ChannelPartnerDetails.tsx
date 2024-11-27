import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  Card,
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  ApprovalchannelPartner,
  getChannelPartner,
} from '../../../api/services';
import { AxiosResponse } from 'axios';

// Define the Lead interface for channel partner details
interface Lead {
  _id: string;
  usertype: string;
  approval: string;
  name: string;
  email: string;
  phoneNumber: string;
  organization: string;
  address: string;
  dateOfBirth: string;
  gstNumber: string;
  aadharNumber: string;
  panNumber: string;
  AadharCard: string; // URL to ID Card
  image: string;  // URL to profile image
}

// Define the error type for useQuery
interface QueryError {
  message: string;
}

const ChannelPartnerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const channelid = id ?? '';

  const { data: channelPartnerData, isLoading, error } = useQuery<
    AxiosResponse<Lead>,
    QueryError
  >(['getChannelPartner', channelid], () => getChannelPartner(channelid));

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  const channelPartner = channelPartnerData?.data;

  // Handle Approve
  async function handleApprove(id: string | undefined) {
    if (id) {
      try {
        const data = { status: 'approved' };
        await ApprovalchannelPartner(id, data);
        alert('Channel Partner approved successfully!');
      } catch (err) {
        console.error(err);
        alert('Error approving Channel Partner');
      }
    }
  }

  // Handle Decline
  async function handleDecline(id: string | undefined) {
    if (id) {
      try {
        const data = { status: 'declined' };
        await ApprovalchannelPartner(id, data);
        alert('Channel Partner declined successfully!');
      } catch (err) {
        console.error(err);
        alert('Error declining Channel Partner');
      }
    }
  }

  return (
    <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ padding: '20px', width: '100%', maxWidth: '1200px' }}>
        {/* Main Heading */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: '600', color: 'primary.main', mb: 2, textAlign: 'left' }}
        >
          Channel Partner Details
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        {/* Main Details Section */}
        <Grid container spacing={2}>
          {/* Left side: Main Details */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h6"
              sx={{ fontWeight: '600', mb: 2, textAlign: 'left' }}
            >
              Main Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '80px', mr:1}}>Name:</Typography>
                  <Typography variant="caption" sx={{ textAlign: 'left' }}>{channelPartner?.name}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '80px', mr:1}}>Phone:</Typography>
                  <Typography variant="caption" sx={{ textAlign: 'left' }}>{channelPartner?.phoneNumber}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '80px', mr:1}}>Email:</Typography>
                  <Typography variant="caption" sx={{ textAlign: 'left' }}>{channelPartner?.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '80px', mr:1}}>Date of Birth:</Typography>
                  <Typography variant="caption" sx={{ textAlign: 'left' }}>
                    {channelPartner?.dateOfBirth ? new Date(channelPartner.dateOfBirth).toLocaleDateString() : 'N/A'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '80px', mr:1}}>Address:</Typography>
                  <Typography variant="caption" sx={{ textAlign: 'left' }}>{channelPartner?.address}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Right side: Image */}
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center">
              <img
                src={`${process.env.NEXT_PUBLIC_STORAGE_DN_URL || "https://dprstorage.b-cdn.net"}${channelPartner?.image}`}
                alt={channelPartner?.name}
                style={{ width: '100%', maxWidth: '200px', borderRadius: '10px' }}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 2 }} />

        {/* Personal Details Section */}
        <Typography
          variant="h6"
          sx={{ fontWeight: '600', mb: 2, textAlign: 'left' }}
        >
          Personal Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '80px', mr:1}}>Aadhar (No):</Typography>
              <Typography variant="caption" sx={{ textAlign: 'left' }}>
                {channelPartner?.aadharNumber || 'N/A'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '80px', mr:1}}>PAN Number:</Typography>
              <Typography variant="caption" sx={{ textAlign: 'left' }}>{channelPartner?.panNumber || 'N/A'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '80px', mr:1}}>Aadhar (Id):</Typography>
              <Typography variant="caption" sx={{ textAlign: 'left', cursor:'pointer' }}>
                <a href={`${process.env.NEXT_PUBLIC_STORAGE_DN_URL || "https://dprstorage.b-cdn.net"}${channelPartner?.AadharCard}`} target="_blank" rel="noopener noreferrer">
                  View ID Card
                </a>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '80px', mr:1}}>PAN (Id):</Typography>
              <Typography variant="caption" sx={{ textAlign: 'left' }}>
                <a href={'#'} target="_blank" rel="noopener noreferrer">
                  View ID Card
                </a>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 2 }} />

        {/* Organization Details Section */}
        <Typography
          variant="h6"
          sx={{ fontWeight: '600', mb: 2, textAlign: 'left' }}
        >
          Organization Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '80px', mr:1}}>Organization:</Typography>
              <Typography variant="caption" sx={{ textAlign: 'left' }}>{channelPartner?.organization || 'N/A'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ fontWeight: '600', minWidth: '80px', mr:1}}>GST Number:</Typography>
              <Typography variant="caption" sx={{ textAlign: 'left' }}>{channelPartner?.gstNumber || 'N/A'}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 3 }} />

        {/* Approval/Decline Section */}
        {channelPartner?.approval === 'declined' && (
          <Box textAlign="right" mt={4}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDecline(channelPartner?._id)}
              sx={{ marginRight: 2 }}
            >
              Decline
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ marginRight: 2 }}
              onClick={() => handleApprove(channelPartner?._id)}
            >
              Approve
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default ChannelPartnerDetails;
