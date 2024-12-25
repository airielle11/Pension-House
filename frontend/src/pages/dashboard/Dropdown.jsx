import React, { useState } from 'react';
import { Select, MenuItem, Typography, TextField, Box, Grid } from '@mui/material';
import MainCard from '../../components/MainCard';
import Button from '@mui/material/Button';

// Reusable Dropdown Component
const Dropdown = ({ label, options, selectedValue, onChange }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h6"
        sx={{ fontSize: '14px', fontWeight: 500, color: 'gray', mb: 1 }}
      >
        {label}
      </Typography>
      <Select
        value={selectedValue}
        onChange={onChange}
        displayEmpty
        fullWidth
        sx={{
          height: '48px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        <MenuItem value="" disabled>
          Select {label.toLowerCase()}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

// Main Component
const RoomSelector = ({setShowDashboard}) => {
  const handleBackToDashboard = () => {
    setShowDashboard(false); // Navigate back to the dashboard
  };
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');

  const roomNumbers = ['101', '102', '103', '104'];
  const roomTypes = ['Single', 'Double', 'Suite'];

  const handleGenerateIRF = () => {
    alert(
      `Room Number: ${roomNumber || 'N/A'}\nRoom Type: ${roomType || 'N/A'}`
    );
  };


  return (
    <MainCard
      sx={{
        width: '1200px', // Use the full width of the screen
        maxWidth: '1200px', // Optional: Set a max width for larger screens
        padding: '24px', // Add padding for better spacing
        margin: '0 auto', // Center the card
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Optional styling
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
            Generate Initial Request
          </Typography>
        </Grid>

        {/* Room Number Dropdown */}
        <Grid item xs={12} sm={4}>
          <Dropdown
            label="Room Number"
            options={roomNumbers}
            selectedValue={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </Grid>

        {/* Room Type Dropdown */}
        <Grid item xs={12} sm={4}>
          <Dropdown
            label="Room Type"
            options={roomTypes}
            selectedValue={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          />
        </Grid>

        {/* Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateIRF}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Generate Initial Request
            </Button>
      <Button onClick={handleBackToDashboard} variant="outlined">
        Back to Dashboard
      </Button>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default RoomSelector;
