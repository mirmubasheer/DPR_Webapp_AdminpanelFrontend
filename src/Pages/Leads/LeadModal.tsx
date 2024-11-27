import React from 'react';
import { Modal, Box, Typography, Button, Grid } from '@mui/material';

interface Lead {
  source: string;
  type: string;
  name: string;
  email: string;
  phoneNumber: string;
  iAgree: boolean;
  homeLoan: boolean;
  createdAt: Date;
}

interface LeadModalProps {
  open: boolean;
  handleClose: () => void;
  lead: Lead;
}

const LeadModal: React.FC<LeadModalProps> = ({ open, handleClose, lead }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="lead-modal-title"
      aria-describedby="lead-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          bgcolor: 'background.paper',
          borderRadius: '10px',
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}
      >
        {/* Conditional Title for Project Type */}
        <Typography
          id="lead-modal-title"
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: '#1976d2',
          }}
        >
          {lead.type === 'project'
            ? `Project Lead Details (Source: ${lead.source})`
            : 'Lead Details'}
        </Typography>

        {/* Personal Information */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Personal Information:
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Name:</strong> {lead.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Email:</strong> {lead.email}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Phone Number:</strong> {lead.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Created At:</strong> {new Date(lead.createdAt).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>

        {/* Project Info for "Project" Type */}
        {lead.type === 'project' && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Project Information:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Project Source:</strong> {lead.source}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Home Loan and Consent */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Additional Information:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Home Loan:</strong> {lead.homeLoan ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>I Agree:</strong> {lead.iAgree
                ? 'Yes, I agree to be contacted by Housing and agents via WhatsApp, SMS, phone, email, etc.'
                : 'No'}
            </Typography>
          </Grid>
        </Grid>

        {/* Close Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LeadModal;
