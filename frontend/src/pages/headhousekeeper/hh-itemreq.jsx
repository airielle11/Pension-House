import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  ListItemText,
  CircularProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import Swal from 'sweetalert2'; // Import SweetAlert2
import AttachItemsTable from '../dashboard/AttachItemsTable'; // Import the AttachItemsTable component

function ProductRequisitionTable() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  const [attachedItems, setAttachedItems] = useState([]);
  const [loadingAttachedItems, setLoadingAttachedItems] = useState(false);
  const [productRequisitions, setProductRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAttachItems, setShowAttachItems] = useState(false); // State to show AttachItemsTable

  // Fetch product requisitions on component mount
  useEffect(() => {
    if (productRequisitions.length === 0) {
      fetchRequisitions();
    }
  }, [productRequisitions]);

  const fetchRequisitions = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/get-item-requisitions`)
      .then((response) => {
        const requisitions = response.data.requisition || [];
        setProductRequisitions(requisitions);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Fetch Data',
          text: 'Unable to fetch requisition data. Please try again later.',
        });
        setError('Failed to fetch requisition data.');
        setLoading(false);
      });
  };

  const fetchAttachedItems = (itemRequisitionId) => {
    setAttachedItems([]); // Reset the previous data
    setLoadingAttachedItems(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/get-attached-items/`, {
        params: { item_requisition_id: itemRequisitionId },
      })
      .then((response) => {
        const items = response.data.data || [];
        if (items.length > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Attached Items Found',
            text: `Fetched ${items.length} attached items.`,
          });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'No Attached Items',
            text: 'This requisition has no attached items.',
          });
        }
        setAttachedItems(items);
        setViewDetails(true);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch attached items. Please try again later.',
        });
      })
      .finally(() => {
        setLoadingAttachedItems(false);
      });
  };

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct({ ...product, id: product.ID }); // Map `ID` to `id`
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAttachItemsClick = () => {
    setShowAttachItems(true); // Open AttachItemsTable
    handleCloseMenu();
  };

  const handleBackToTable = () => {
    setViewDetails(false);
    setShowAttachItems(false); // Hide AttachItemsTable
    setAttachedItems([]); // Reset attached items
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      {!viewDetails && !showAttachItems ? (
        <Box sx={{ p: 3, borderRadius: 5 }}>
          <Typography variant="h6" gutterBottom>
            Item Requisitions
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image Name</TableCell>
                <TableCell>Created by</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Room No.</TableCell>
                <TableCell>Room Type</TableCell>
                <TableCell>Priority Level</TableCell>
                <TableCell>Item Attachment by</TableCell>
                <TableCell>Approved by</TableCell>
                <TableCell>Accepted by</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productRequisitions.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.ID}</TableCell>
                  <TableCell>{product['Image name'] || 'N/A'}</TableCell>
                  <TableCell>{product['Created by']}</TableCell>
                  <TableCell>{product.Date}</TableCell>
                  <TableCell>{product['Room No.']}</TableCell>
                  <TableCell>{product['Room Type']}</TableCell>
                  <TableCell>{product['Priority Level']}</TableCell>
                  <TableCell>{product['Item attachment by'] || 'N/A'}</TableCell>
                  <TableCell>{product['Approved by'] || 'N/A'}</TableCell>
                  <TableCell>{product['Accepted by'] || 'N/A'}</TableCell>
                  <TableCell>{product.Status}</TableCell>
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
                    >
                      <MenuItem onClick={handleAttachItemsClick}>
                        <ListItemIcon>
                          <AttachFileIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Attach Items to Requisition</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => fetchAttachedItems(product.ID)}>
                        <ListItemIcon>
                          <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>View Attached Items</ListItemText>
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ) : showAttachItems ? (
        <AttachItemsTable onBack={handleBackToTable} selectedProduct={selectedProduct} />
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            Attached Items
          </Typography>
          <Button variant="contained" onClick={handleBackToTable}>
            Back
          </Button>
          {loadingAttachedItems ? (
            <CircularProgress />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Supplier</TableCell>
                  <TableCell>Pieces</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attachedItems.length > 0 ? (
                  attachedItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.ID}</TableCell>
                      <TableCell>{item['Item name']}</TableCell>
                      <TableCell>{item.SKU}</TableCell>
                      <TableCell>{item.Category}</TableCell>
                      <TableCell>{item.Brand}</TableCell>
                      <TableCell>{item.Supplier}</TableCell>
                      <TableCell>{item.Pieces}</TableCell>
                      <TableCell>{item.Status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No Attached Items Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ProductRequisitionTable;
