import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import AnalyticsInventory component
import AnalyticsInventory from './AnalyticsInventory'; // Make sure the path is correct

// Example analytics data
const analyticsData = [
  {
    title: 'Categories',
    count: '10',
    percentage: 5,
    isLoss: false,
    extra: '$2000',
  },
  {
    title: 'Total Defective Items',
    count: '1500',
    percentage: 10,
    isLoss: false,
    extra: '$2000',
  },
  {
    title: 'Total Suppliers',
    count: '5',
    percentage: -8,
    isLoss: true,
    extra: '$1000',
  },
];

const rows = [
  {
    id: 1,
    image: '/path/to/image1.jpg',
    product: 'Product A',
    sku: 'SKU001',
    category: 'Category 1',
    brand: 'Brand X',
    addedBy: 'Admin',
    dateAdded: '2024-11-30',
    netVolQty: '1L',
    quantity: 20,
    supplier: 'Supplier A',
    status: 'Pending',
    moreDetails: 'This is a more detailed description of Product A.',
  },
  {
    id: 2,
    image: '/path/to/image2.jpg',
    product: 'Product B',
    sku: 'SKU002',
    category: 'Category 2',
    brand: 'Brand Y',
    addedBy: 'Manager',
    dateAdded: '2024-11-29',
    netVolQty: '500ml',
    quantity: 2,
    supplier: 'Supplier B',
    status: 'Returned',
    moreDetails: 'This is a more detailed description of Product B.',
  },
  {
    id: 3,
    image: '/path/to/image3.jpg',
    product: 'Product C',
    sku: 'SKU003',
    category: 'Category 3',
    brand: 'Brand Z',
    addedBy: 'User',
    dateAdded: '2024-11-28',
    netVolQty: '250ml',
    quantity: 0,
    supplier: 'Supplier C',
    status: 'Pending',
    moreDetails: 'This is a more detailed description of Product C.',
  },
  // Add more rows as needed
];

export default function StocksListTable() {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleAddDefectiveItemClick = () => {
    // Navigate to the AddDefectiveItem page when the button is clicked
    navigate('/add-defective-item');
  };

  // Function to determine the status color based on product status
  const getStatusColor = (status) => {
    if (status === 'Returned') {
      return '#ED3237'; // Red for "Returned"
    } else if (status === 'Pending') {
      return '#F29425'; // Orange for "Pending"
    } else {
      return '#10A142'; // Green for "Approved"
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Container for Analytics section */}
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

      {/* Container for the Update Defective Items Table section */}
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
        <Typography variant="h6">Update Defective Items Table</Typography>
        <Button
          variant="contained"
          onClick={handleAddDefectiveItemClick}
          sx={{
            background: 'linear-gradient(to right, #14ADD6, #384295)',
            color: 'white', // Text color
            '&:hover': {
              background: 'linear-gradient(to right, #14ADD6, #384295)', // Ensure gradient on hover
            },
          }}
        >
          Add New Defective Item
        </Button>
      </Box>

      {/* Container for the Stock List and Table */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: 3,
          border: '1px solid #D1D1D6', // Gray outline
        }}
      >
        <Typography variant="h4" gutterBottom>
          Stock List
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="stocks list table" className="table-hover">
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Added By</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell>Net Vol/Qty</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <Avatar alt={row.product} src={row.image} />
                  </TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.sku}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.brand}</TableCell>
                  <TableCell>{row.addedBy}</TableCell>
                  <TableCell>{row.dateAdded}</TableCell>
                  <TableCell>{row.netVolQty}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.supplier}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: getStatusColor(row.status), // Use the function to set the color based on the status
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
