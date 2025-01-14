import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import axios from 'axios';

export default function AddDefectiveItem() {
  const [rows, setRows] = useState([]); // State for table rows
  const [category, setCategory] = useState('');
  const [sku, setSku] = useState('');
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch stock data from backend
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/stocks`) // Replace with the correct backend URL for fetching stock data
      .then((response) => {
        const stocksWithValidQuantity = response.data.stocks.map((stock) => ({
          ...stock,
          quantity: Number(stock.quantity) || 0, // Ensure quantity is a number (default to 0 if invalid)
        }));
        setRows(stocksWithValidQuantity);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch stock data.');
        setLoading(false);
        console.error('Error fetching stock data:', error);
      });
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle category search
  const handleCategorySearch = (e) => {
    setCategory(e.target.value);
  };

  // Handle SKU search
  const handleSkuSearch = (e) => {
    setSku(e.target.value);
  };

  // Handle quantity change
  const handleQuantityChange = (id, change) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              quantity: Math.max(Number(row.quantity) + change, 0), // Ensure quantity is treated as a number
            }
          : row
      )
    );
  };

  // Handle the save button click
  const handleSaveChanges = () => {
    // Filter the rows that have modified quantities (greater than 0)
    const defectiveItems = rows
      .filter((row) => row.quantity > 0) // Only include items with quantity > 0
      .map((row) => ({ item_id: row.id, qty: row.quantity }));
  
    // If no defective items were selected, show alert and return
    if (defectiveItems.length === 0) {
      alert('No defective items selected');
      return;
    }
  
    // Validate the data before sending
    if (defectiveItems.some((item) => item.qty <= 0)) {
      alert('Invalid quantity, please check the quantity for defective items.');
      return;
    }
  
    // Log the defective items data to the console before sending the request
    console.log('Sending the following data:', defectiveItems);
  
    // Send the data as a list (array) of defective items directly
    axios
      .post(`${import.meta.env.VITE_API_URL}/add-defective-items/`, defectiveItems)  // Send the array directly
      .then((response) => {

        if (response.data.message) {
          // Success case: Show the success message
          alert(response.data.message);
        } 
        /*
        if (response.data.success) {
          alert('Defectives items added successfully!');
        } else {
          alert('Failed to add defective items.');
        }
          */
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error response:', error.response);
          alert(`Error: ${error.response.data.message || 'An error occurred while adding defective items.'}`);
        } else {
          console.error('Error:', error);
          alert('An error occurred while adding defective items.');
        }
      });
  };

  // Loading or Error handling
  if (loading) {
    return <Typography variant="h6">Loading stock data...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Heading */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Defective Item
      </Typography>

      {/* Category and SKU Search */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {/* Category Search */}
        <TextField
          label="Search Category"
          value={category}
          onChange={handleCategorySearch}
          fullWidth
        />

        {/* SKU Search */}
        <TextField
          label="Search SKU"
          value={sku}
          onChange={handleSkuSearch}
          fullWidth
        />
      </Box>

      {/* Requested Items Table */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Requested Items
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="requested items table">
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Net Vol/Qty</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter((row) => {
                // Filter by category and SKU search inputs
                const categoryMatch = category
                  ? row.category.toLowerCase().includes(category.toLowerCase())
                  : true;
                const skuMatch = sku
                  ? row.sku.toLowerCase().includes(sku.toLowerCase())
                  : true;
                return categoryMatch && skuMatch;
              })
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell> {/* S/N Column */}
                  <TableCell>
                    <Avatar alt={row.item_name} src={row.image} />
                  </TableCell>
                  <TableCell>{row.item_name}</TableCell>
                  <TableCell>{row.sku}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.brand}</TableCell>
                  <TableCell>{row.net_vol_qty}</TableCell>
                  <TableCell>{row.supplier}</TableCell> {/* Supplier Column */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* Decrement Button */}
                      <Button
                        variant="outlined"
                        sx={{
                          color: '#ED3237',
                          borderColor: '#ED3237',
                          '&:hover': {
                            backgroundColor: '#ED3237',
                            color: '#fff',
                          },
                        }}
                        onClick={() => handleQuantityChange(row.id, -1)}
                        disabled={row.quantity <= 0}
                      >
                        -
                      </Button>
                      <Typography variant="body1" sx={{ mx: 2 }}>
                        {row.quantity}
                      </Typography>
                      {/* Increment Button */}
                      <Button
                        variant="outlined"
                        sx={{
                          color: '#14ADD6',
                          borderColor: '#14ADD6',
                          '&:hover': {
                            backgroundColor: '#14ADD6',
                            color: '#fff',
                          },
                        }}
                        onClick={() => handleQuantityChange(row.id, 1)}
                      >
                        +
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Defective Item Button */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(to right, #14ADD6, #384295)',
            color: '#fff',
            '&:hover': {
              background: 'linear-gradient(to right, #14ADD6, #384295)',
              opacity: 0.9,
            },
          }}
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}