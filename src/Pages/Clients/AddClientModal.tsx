import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CustomInput from '../../Components/Inputs/CustomInput';
import { SelectChangeEvent } from '@mui/material'; // <-- Import this here

// Hardcoded country list with flags and dial codes
const countryList = [
  { value: '+91', label: '🇮🇳 India', flag: '🇮🇳', dialCode: '+91' },
  { value: '+1', label: '🇺🇸 USA', flag: '🇺🇸', dialCode: '+1' },
  { value: '+44', label: '🇬🇧 UK', flag: '🇬🇧', dialCode: '+44' },
  { value: '+61', label: '🇦🇺 Australia', flag: '🇦🇺', dialCode: '+61' },
  { value: '+49', label: '🇩🇪 Germany', flag: '🇩🇪', dialCode: '+49' },
  // Add more countries as needed
];

const AddClientModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [newClientData, setNewClientData] = useState({
    clientName: '',
    displayName: '',
    phoneNumber: '',
    selectedCountry: countryList[0], // Default to India
    whatsappNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateNewClientField = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewClientData({ ...newClientData, [field]: event.target.value });
  };

  // Update the select field when a new country is selected
  const updateSelectField = (field: string) => (event: SelectChangeEvent<string>) => {
    const selectedCountry = countryList.find((country) => country.value === event.target.value);
    setNewClientData({ ...newClientData, [field]: selectedCountry });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!newClientData.clientName) newErrors.clientName = 'Client name is required';
    if (!newClientData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!newClientData.email) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitNewClient = () => {
    if (validateForm()) {
      console.log('New Client Data:', newClientData);
      onClose(); // Close modal after submission
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 500,
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
        }}
      >
        {/* Modal Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            Add New Client
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form Fields */}
        <Box component="form" noValidate autoComplete="off">
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="client-name-input">
              Client Name
            </InputLabel>
            <CustomInput
              id="client-name-input"
              placeholder="Enter client name..."
              value={newClientData.clientName}
              onChange={updateNewClientField('clientName')}
              error={!!errors.clientName}
            />
            <FormHelperText error>{errors.clientName}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="display-name-input">
              Display Name
            </InputLabel>
            <CustomInput
              id="display-name-input"
              placeholder="Enter display name..."
              value={newClientData.displayName}
              onChange={updateNewClientField('displayName')}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="phone-number-input"  sx={{ mb: -4 }}>
              Phone Number
            </InputLabel>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Select
                value={newClientData.selectedCountry.value}
                onChange={updateSelectField('selectedCountry')}
                displayEmpty
                sx={{
                    height: "40px",
                    border: "1px solid #1212121A",
                    borderRadius: "10px",
                    opacity: 1,
                    boxShadow: "0px 6px 14px #36408D08",
                    fontSize: "12px",
                    color: "#1D1D1D",
                    textAlign: 'left',
                    mr: 1,
                    minWidth: 80

                }}
              >
                {countryList.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    <span style={{ marginRight: '10px' }}>{country.flag}</span>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
              <CustomInput
                id="phone-number-input"
                placeholder="Enter phone number..."
                value={newClientData.phoneNumber}
                onChange={updateNewClientField('phoneNumber')}
                error={!!errors.phoneNumber}
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {newClientData.selectedCountry.dialCode}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <FormHelperText error>{errors.phoneNumber}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="whatsapp-number-input">
              WhatsApp Number
            </InputLabel>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Select
                value={newClientData.selectedCountry.value}
                onChange={updateSelectField('selectedCountry')}
                displayEmpty
                sx={{ 
                  mr: 1, 
                  minWidth: 80
                 }}
              >
                {countryList.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    <span style={{ marginRight: '10px' }}>{country.flag}</span>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
              <CustomInput
                id="whatsapp-number-input"
                placeholder="Enter WhatsApp number..."
                value={newClientData.whatsappNumber}
                onChange={updateNewClientField('whatsappNumber')}
              />
            </Box>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel shrink htmlFor="email-input">
              Email Address
            </InputLabel>
            <CustomInput
              id="email-input"
              placeholder="Enter email address..."
              value={newClientData.email}
              onChange={updateNewClientField('email')}
              error={!!errors.email}
              type="email"
            />
            <FormHelperText error>{errors.email}</FormHelperText>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            fullWidth
            sx={{
              py: 1.5,
              width: '100%',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
            onClick={submitNewClient}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddClientModal;
