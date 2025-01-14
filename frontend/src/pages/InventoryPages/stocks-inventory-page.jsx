import React, { useState, useEffect } from 'react';
import StockList from './StockList'; // Import StockList component
import AnalyticsInventory from './AnalyticsInventory'; // Import AnalyticsInventory component
import { useNavigate } from 'react-router-dom'; // For navigation
import { Grid, Box, CircularProgress, Typography, Button } from '@mui/material'; // For UI components
import axios from 'axios';

export default function StocksInventoryPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stockListData, setStockListData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch stock data on component load
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/stocks`) 
      .then((response) => {
        setStockListData(response.data.stocks);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch stock data.');
        setLoading(false);
      });
  }, []);

  // Function to navigate to Add New Item page
  const handleAddNewItem = () => {
    navigate('/add-new-item');  // Navigate to the Add New Item page
  };

  // Calculate the total count of items and percentage (based on the fetched data)
  const totalItems = stockListData.reduce((total, item) => total + item.pieces, 0);
  const percentageChange = 5; // You can calculate this dynamically as per your needs
  const extraRevenue = "$5000"; // Example static value

  // Additional example analytics data
  const analyticsData = [
    {
      title: 'Categories',
      count: totalItems.toString(),
      percentage: percentageChange,
      isLoss: false,
      extra: extraRevenue,
    },
    {
      title: 'Total Items',
      count: totalItems.toString(),
      percentage: 10, // Example static percentage change
      isLoss: false,
      extra: '$2000',
    },
    {
      title: 'Items Low in Stock',
      count: stockListData.filter(item => item.inStock <= 5).length.toString(),
      percentage: -8,
      isLoss: true,
      extra: '$1000',
    },
  ];

  return (
    <div>
      {/* Add New Item Button */}
      

      {/* Display loading spinner while fetching data */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Display Analytics section */}
          <Grid container spacing={2}>
            {analyticsData.map((data, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <AnalyticsInventory
                  title={data.title}
                  count={data.count}
                  percentage={data.percentage}
                  isLoss={data.isLoss}
                  extra={data.extra}
                  color="primary"
                />
              </Grid>
            ))}
          </Grid>

          {/* Add space below the AnalyticsInventory components */}
          <Box sx={{ mb: 4 }} />

          {/* Display StockList with error trapping inside the table */}
          <Box sx={{ position: 'relative' }}>
            <StockList 
              handleAddNewItem={handleAddNewItem} 
              stockList={stockListData} 
              error={error}  // Pass the error to StockList if it exists
            />
          </Box>
        </>
      )}

      {/* Display error message if there's an error and not loading */}
      {error && !loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
          <Typography variant="h6" color="error">{error}</Typography>
        </Box>
      )}
    </div>
  );
}