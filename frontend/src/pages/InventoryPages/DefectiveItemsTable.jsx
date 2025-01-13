import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation
import AnalyticsInventory from './AnalyticsInventory'; // Assuming you already have this component
import DefectiveTable from './DefectiveTable'; // Your table component
import axios from 'axios'; // Import axios for API requests

export default function DefectiveItemsTable() {
  const navigate = useNavigate();

  // State to store defective item data and loading state
  const [defectiveItems, setDefectiveItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for API request
  const [error, setError] = useState(null); // Error state for API request

  // Static analytics data
  const [analyticsData, setAnalyticsData] = useState([
    {
      title: 'Total Defective Items',
      count: '50',
      percentage: 10,
      isLoss: true,
      extra: '$3000',
    },
    {
      title: 'Defective Items Last Month',
      count: '40',
      percentage: -5,
      isLoss: true,
      extra: '$1000',
    },
    {
      title: 'Total Suppliers',
      count: '10',
      percentage: 8,
      isLoss: false,
      extra: '$1500',
    },
  ]);

  // Fetch defective items data from backend
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/defective-items`) // Replace with the correct backend URL for fetching defective items
      .then((response) => {
        const items = response.data?.items || []; // Use optional chaining and fallback to empty array
        setDefectiveItems(items); // Store defective items in state
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch defective items.');
        setLoading(false);
        console.error('Error fetching defective items:', error);
      });
  }, []);

  // Function to handle the redirect when Add New Defective Item is clicked
  const handleAddDefectiveItemClick = () => {
    navigate('/add-defective-item'); // Navigate to the Add Defective Item page
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Analytics Section */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          {analyticsData.map((data, index) => (
            <Grid item xs={12} sm={4} key={index}>
              {/* Integrate AnalyticsInventory Component */}
              <AnalyticsInventory
                title={data.title}
                count={data.count}
                percentage={data.percentage}
                isLoss={data.isLoss}
                extra={data.extra}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Container for Defective Items Section */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: 2,
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #D1D1D6', // Gray outline
        }}
      >
        <Typography variant="h6">Defective Items Table</Typography>
        <Button
          variant="contained"
          onClick={handleAddDefectiveItemClick}
          sx={{
            background: 'linear-gradient(to right, #14ADD6, #384295)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(to right, #14ADD6, #384295)', // Ensure gradient on hover
            },
          }}
        >
          Add New Defective Item
        </Button>
      </Box>

      {/* Defective Items Table */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: 3,
          border: '1px solid #D1D1D6', // Gray outline
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <Typography variant="h6" color="error">{error}</Typography>
          </Box>
        ) : (
          <DefectiveTable rows={defectiveItems} />
        )}
      </Box>
    </Box>
  );
}
