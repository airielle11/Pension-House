import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

const StockList = ({ handleAddNewItem }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [stockList, setStockList] = useState([]);

  // Fetch stock data from the backend on initial load
  useEffect(() => {
    fetchStockList();
  }, []);

  const fetchStockList = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/stocks`)
      .then((response) => {
        console.log('Stock list fetched:', response.data);
        if (response.data.stocks) {
          setStockList(response.data.stocks);  // Assuming the response has a 'stocks' key
        } else {
          console.error('Stocks data not found in response');
        }
      })
      .catch((error) => {
        console.error('Error fetching stocks:', error);
      });
  };

  const handleViewMoreClick = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
    setQuantity('');
  };

  const handleRestock = () => {
    if (quantity && selectedItem) {
      // Remove non-numeric characters from the quantity
      const cleanedQuantity = quantity.replace(/[^\d]/g, ''); // Remove anything that's not a digit
      const parsedQuantity = parseInt(cleanedQuantity, 10);
      
      if (parsedQuantity > 0) {
        const updatedStock = {
          item_id: selectedItem.id,
          new_stock: parsedQuantity,  // Correctly calculate new stock
        };
  
        console.log('Sending data to backend:', updatedStock);
  
        // Send updated stock data to the backend
        axios.post(`${import.meta.env.VITE_API_URL}/update-stock/`, updatedStock, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.data.success) {
              console.log('Stock updated successfully:', response.data);
  
              // Update the stock list locally without page refresh
              setStockList(prevStockList =>
                prevStockList.map(item =>
                  item.id === selectedItem.id
                    ? { ...item, in_stock: item.in_stock + parsedQuantity }  // Update the stock quantity locally
                    : item
                )
              );
  
              // Close the modal and reset state
              setOpenModal(false);
              setSelectedItem(null);
              setQuantity('');
            } else {
              alert(response.data.message || 'Failed to update stock.');
            }
          })
          .catch((error) => {
            if (error.response) {
              console.error('Response Data:', error.response.data);
              console.error('Status Code:', error.response.status);
              console.error('Response Headers:', error.response.headers);
            } else {
              console.error('Error Message:', error.message);
            }
            alert('An error occurred while updating the stock.');
          });
      } else {
        alert('Please enter a valid positive quantity.');
      }
    } else {
      alert('Please enter a quantity to restock.');
    }
  };
  
  
  
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value)) {
      setQuantity(value);
    } else {
      alert('Please enter a valid positive integer.');
    }
  };

  return (
    <div>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: '8px', padding: 2, mb: 3, border: '1px solid #D1D1D6' }}>
          <Typography variant="h6">Update Stock List</Typography>
          <Button 
            variant="contained" 
            onClick={handleAddNewItem} 
            sx={{
              background: 'linear-gradient(to right, #14ADD6, #384295)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(to right, #14ADD6, #384295)',
              }
            }}
          >
            Add New Item
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Added By</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell>Net Vol Qty</TableCell>
                <TableCell>In Stock</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockList.length > 0 ? stockList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar alt={item.item_name} src={item.image || 'https://via.placeholder.com/100'} />
                  </TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.added_by || 'N/A'}</TableCell>
                  <TableCell>{item.added_at || 'N/A'}</TableCell>
                  <TableCell>{item.net_vol_qty || 'N/A'}</TableCell>
                  <TableCell>{item.in_stock}</TableCell>
                  <TableCell>{item.supplier || 'N/A'}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: item.status === 'Out of Stock' ? '#ED3237' : item.status === 'Low in Stock' ? '#F29425' : '#10A142',
                      }}
                    >
                      {item.status === 'Out of Stock' ? 'Out of Stock' : item.status === 'Low in Stock' ? 'Low in Stock' : 'In Stock'}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Button variant="outlined" onClick={() => handleViewMoreClick(item)}>
                      View More
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={13} align="center">No stock data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal for Restocking */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Restock Item: Edit Stock</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={handleQuantityChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRestock} color="primary">
            Restock
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

StockList.propTypes = {
  handleAddNewItem: PropTypes.func.isRequired,
};

export default StockList;