import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';

// Sample rows for the table
const initialRows = [
  {
    id: 1,
    sku: 'SKU001',
    image: '/path/to/image1.jpg',
    product: 'Product A',
    category: 'Category 1',
    brand: 'Brand X',
    netVolQty: '1L',
    quantity: 1,
  },
  {
    id: 2,
    sku: 'SKU002',
    image: '/path/to/image2.jpg',
    product: 'Product B',
    category: 'Category 2',
    brand: 'Brand Y',
    netVolQty: '500ml',
    quantity: 1,
  },
  {
    id: 3,
    sku: 'SKU003',
    image: '/path/to/image3.jpg',
    product: 'Product C',
    category: 'Category 3',
    brand: 'Brand Z',
    netVolQty: '250ml',
    quantity: 1,
  },
  // Add more rows as needed
];

export default function AddDefectiveItem() {
  const [rows, setRows] = useState(initialRows); // State for table rows
  const [category, setCategory] = useState('');
  const [sku, setSku] = useState('');

  // Handle quantity change
  const handleQuantityChange = (id, change) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? { ...row, quantity: Math.max(row.quantity + change, 0) } // Ensure quantity is not less than 0
          : row
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Heading */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Defective Item
      </Typography>

      {/* Category and SKU Selection */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {/* Category Select */}
        <TextField
          select
          label="Select Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          {/* Replace these with actual category options */}
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </TextField>

        {/* SKU Select */}
        <TextField
          select
          label="Select SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          fullWidth
        >
          {/* Replace these with actual SKU options */}
          <option value="SKU001">SKU001</option>
          <option value="SKU002">SKU002</option>
          <option value="SKU003">SKU003</option>
        </TextField>
      </Box>

      {/* Requested Items Table */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Requested Items
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="requested items table">
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Net Vol/Qty</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.sku}</TableCell>
                <TableCell>
                  <Avatar alt={row.product} src={row.image} />
                </TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.netVolQty}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Decrement Button */}
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#ED3237', // Red color for the minus button
                        borderColor: '#ED3237', // Red border color
                        '&:hover': {
                          backgroundColor: '#ED3237', // Hover effect: Red background
                          color: '#fff', // Text turns white on hover
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
                        color: '#14ADD6', // Blue color for the plus button
                        borderColor: '#14ADD6', // Blue border color
                        '&:hover': {
                          backgroundColor: '#14ADD6', // Hover effect: Blue background
                          color: '#fff', // Text turns white on hover
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
        >
          Save Changes
    </Button>

      </Box>
    </Box>
  );
}
