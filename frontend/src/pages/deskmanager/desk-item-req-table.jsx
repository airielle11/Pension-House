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
  ListItemIcon,
  IconButton,
  Paper,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function ProductRequisitionTable({ productRequisitions, hideGoBackButton = false }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleApproveItemRequisition = () => {
    alert(`Approved Requisition for: ${selectedProduct?.requestedBy}`);
    handleCloseMenu();
  };

  const handleDeclineItemRequisition = () => {
    alert(`Declined Requisition for: ${selectedProduct?.requestedBy}`);
    handleCloseMenu();
  };

  const handleBackToTable = () => {
    setViewDetails(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {!viewDetails ? (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Item Requisitions
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Requested by</TableCell>
                <TableCell>Pre-approved by</TableCell>
                <TableCell>Post-approved by</TableCell>
                <TableCell>Accepted by</TableCell>
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
                    <TableCell>{product.preApprovedBy}</TableCell>
                    <TableCell>{product.postApprovedBy}</TableCell>
                    <TableCell>{product.acceptedBy}</TableCell>
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
                        <MenuItem onClick={handleApproveItemRequisition}>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" />
                          </ListItemIcon>
                          Approve Item Requisition
                        </MenuItem>
                        <MenuItem onClick={handleDeclineItemRequisition}>
                          <ListItemIcon>
                            <CancelIcon color="error" />
                          </ListItemIcon>
                          Decline Item Requisition
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
      ) : (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Requested Item Details
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SKU</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Net Vol./Qty</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedProduct?.requestedItems?.length > 0 ? (
                selectedProduct.requestedItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.productName}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    </TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.netVolume}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Requested Items Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!hideGoBackButton && (
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleBackToTable}>
                Back to Table
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
}

export default function App() {
  const sampleData = [
    {
      requestedBy: 'John Doe',
      preApprovedBy: 'Jane Smith',
      postApprovedBy: 'Michael Smith',
      acceptedBy: 'Robert Johnson',
      date: '2024-12-01',
      status: 'Accepted',
      requestedItems: [
        {
          sku: '12345',
          image: 'https://via.placeholder.com/50',
          productName: 'Product A',
          brand: 'Brand X',
          netVolume: '500ml',
          quantity: 2,
        },
        {
          sku: '67890',
          image: 'https://via.placeholder.com/50',
          productName: 'Product B',
          brand: 'Brand Y',
          netVolume: '1L',
          quantity: 1,
        },
      ],
    },
    {
      requestedBy: 'Alice Green',
      preApprovedBy: 'Michael Brown',
      postApprovedBy: 'Sarah Connor',
      acceptedBy: 'Sarah White',
      date: '2024-12-02',
      status: 'Pending',
      requestedItems: [
        {
          sku: '11223',
          image: 'https://via.placeholder.com/50',
          productName: 'Product C',
          brand: 'Brand Z',
          netVolume: '250ml',
          quantity: 5,
        },
      ],
    },
  ];

  return <ProductRequisitionTable productRequisitions={sampleData} hideGoBackButton />;
}