import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Paper,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ProductRequisitionTable({ productRequisitions, hideGoBackButton = false, onGoBack }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleMarkAsUnavailable = () => {
    alert(`Marked Requisition for ${selectedProduct?.requestedBy} as Unavailable`);
    handleCloseMenu();
  };

  const handleMarkAsAvailable = () => {
    alert(`Marked Requisition for ${selectedProduct?.requestedBy} as Available`);
    handleCloseMenu();
  };

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Item Requisitions</Typography>
          {!hideGoBackButton && (
            <Button variant="outlined" onClick={onGoBack}>
              Go Back
            </Button>
          )}
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Requested by</TableCell>
              <TableCell>Pre-approved by (Head Housekeeper)</TableCell>
              <TableCell>Post-approved by (Desk Management)</TableCell>
              <TableCell>Accepted by (Property Management)</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(productRequisitions) && productRequisitions.length > 0 ? (
              productRequisitions.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.requestedBy}</TableCell>
                  <TableCell>{product.preApprovedBy || 'N/A'}</TableCell>
                  <TableCell>{product.postApprovedBy || 'N/A'}</TableCell>
                  <TableCell>{product.acceptedBy || 'N/A'}</TableCell>
                  <TableCell>{product.date}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: product.status === 'Accepted' ? 'green' : 'orange',
                      }}
                    >
                      {product.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={(event) => handleMenuClick(event, product)}
                    >
                      View more
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem onClick={handleMarkAsAvailable}>
                        <IconButton color="success">
                          <CheckCircleIcon />
                        </IconButton>
                        Mark as Available
                      </MenuItem>
                      <MenuItem onClick={handleMarkAsUnavailable}>
                        <IconButton color="error">
                          <CancelIcon />
                        </IconButton>
                        Mark as Unavailable
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Product Requisitions Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default function ProductRequisitionPage() {
  const sampleData = [
    {
      requestedBy: 'John Doe',
      preApprovedBy: 'N/A',
      postApprovedBy: 'Jane Smith',
      acceptedBy: 'Robert Johnson',
      date: '2024-12-01',
      status: 'Accepted',
    },
    {
      requestedBy: 'Alice Green',
      preApprovedBy: 'N/A',
      postApprovedBy: 'Michael Brown',
      acceptedBy: 'Sarah White',
      date: '2024-12-02',
      status: 'Pending',
    },
  ];

  const handleGoBack = () => {
    alert('Navigating back...');
  };

  return (
    <Box>
      <Typography variant="h4" textAlign="center" sx={{ mt: 3, mb: 3 }}>
        Product Requisition Management
      </Typography>
      <ProductRequisitionTable
        productRequisitions={sampleData}
        hideGoBackButton={false}
        onGoBack={handleGoBack}
      />
    </Box>
  );
}
