import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography, Avatar } from '@mui/material';
import PropTypes from 'prop-types';

const StockList = ({ stockList, handleAddNewItem }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');

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
      console.log(`Restocking ${selectedItem.name} with ${quantity} pieces`);
    }
    handleCloseModal();
  };

  return (
    <div>
      {/* Wrapper to ensure both containers have the same width */}
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Update Stock List Section */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: '8px', padding: 2, mb: 3, border: '1px solid #D1D1D6' }}>
          <Typography variant="h6">Update Stock List</Typography>
          <Button 
              variant="contained" 
              onClick={handleAddNewItem} 
              sx={{
                background: 'linear-gradient(to right, #14ADD6, #384295)',
                color: 'white', // Text color
                '&:hover': {
                  background: 'linear-gradient(to right, #14ADD6, #384295)', // Ensure the gradient is preserved on hover
                }
              }}
            >
              Add New Item
        </Button>

        </Box>

        {/* Stock Table */}
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
              {stockList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell> {/* Serial Number */}
                  <TableCell>
                    <Avatar alt={item.name} src={item.image} />
                  </TableCell> {/* Product Image */}
                  <TableCell>{item.name}</TableCell> {/* Product Name */}
                  <TableCell>{item.sku}</TableCell> {/* SKU */}
                  <TableCell>{item.category}</TableCell> {/* Category */}
                  <TableCell>{item.brand}</TableCell> {/* Brand */}
                  <TableCell>{item.addedBy}</TableCell> {/* Added By */}
                  <TableCell>{item.dateAdded}</TableCell> {/* Date Added */}
                  <TableCell>{item.netVolQty}</TableCell> {/* Net Vol Qty */}
                  <TableCell>{item.inStock}</TableCell> {/* In Stock */}
                  <TableCell>{item.supplier}</TableCell> {/* Supplier */}
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: item.inStock === 0 ? '#ED3237' : item.inStock <= 5 ? '#F29425' : '#10A142',
                      }}
                    >
                      {item.inStock === 0
                        ? 'Out of Stock'
                        : item.inStock <= 5
                        ? 'Low in Stock'
                        : 'In Stock'}
                    </Typography>
                  </TableCell> {/* Status */}
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleViewMoreClick(item)}>
                      View More
                    </Button>
                  </TableCell> {/* Action Button */}
                </TableRow>
              ))}
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
            onChange={(e) => setQuantity(e.target.value)}
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
  stockList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      addedBy: PropTypes.string.isRequired,
      dateAdded: PropTypes.string.isRequired,
      netVolQty: PropTypes.string.isRequired,
      inStock: PropTypes.number.isRequired,
      supplier: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired, // Image URL
    })
  ).isRequired,
  handleAddNewItem: PropTypes.func.isRequired, // Prop function for handling Add New Item button click
};

export default StockList;
