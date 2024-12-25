import React, { useState } from 'react';
import { Box, Button, Grid, TextField, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// Mock data for dropdowns
const categories = ['Category 1', 'Category 2', 'Category 3'];
const suppliers = ['Supplier 1', 'Supplier 2', 'Supplier 3'];
const brands = ['Brand 1', 'Brand 2', 'Brand 3'];
const containers = ['Container 1', 'Container 2', 'Container 3'];
const units = ['Unit 1', 'Unit 2', 'Unit 3'];

const AddNewItemForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // State for modal visibility
  const [openModal, setOpenModal] = useState(false);

  // Handle back button click
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Handle Add New Item click
  const handleAddItem = () => {
    // Add logic to save the new item (e.g., API call)
    setOpenModal(true); // Open the success modal
  };

  // Handle modal close
  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <Button
        variant="text"
        sx={{
          color: '#384295', // Blue text color
          textTransform: 'none', // Keep the text as is (not uppercase)
          fontWeight: 'normal',
          mb: 2, // Margin bottom to separate from the form
        }}
        onClick={handleBack} // Trigger back navigation
      >
        Back
      </Button>

      {/* Form Content */}
      <Grid container spacing={3}>
        {/* Upload Photo Container */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '85%',
            }}
          >
            {/* Upload Photo and Choose File */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" gutterBottom>
                Upload Photo
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1 }}>
                File size limit: 2MB
              </Typography>
              <Button variant="contained" component="label">
                Choose File
                <input type="file" hidden />
              </Button>
            </Box>
          </Box>

          {/* Add New Item Button below Upload Photo container */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(to right, #14ADD6, #384295)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(to right, #14ADD6, #384295)',
                },
                width: '100%',
                maxWidth: '400px',
                borderRadius: '8px',
              }}
              onClick={handleAddItem} // Trigger Add Item logic
            >
              Add New Item
            </Button>
          </Box>
        </Grid>

        {/* Item Details Form */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              p: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Item Name" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Item Description" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Category" fullWidth defaultValue="">
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Supplier" fullWidth defaultValue="">
                  {suppliers.map((supplier) => (
                    <MenuItem key={supplier} value={supplier}>
                      {supplier}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Brand" fullWidth defaultValue="">
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Container" fullWidth defaultValue="">
                  {containers.map((container) => (
                    <MenuItem key={container} value={container}>
                      {container}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Net Vol/Qty" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Unit" fullWidth defaultValue="">
                  {units.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Pieces" fullWidth />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Success Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body1">Item successfully added!</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddNewItemForm;
