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
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import Swal from 'sweetalert2'; // Import SweetAlert2
import AttachItemsTable from './AttachItemsTable'; // Import the AttachItemsTable component
import DownloadAcknowledgementReceipt from './download_acknowledgement';


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
  const [showDownloadReceipt, setShowDownloadReceipt] = useState(false);
  const [userRole, setUserRole] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch the role from the backend
  const fetchUserRole = async () => {
    try {
      const response = await fetch("http://localhost:8000/identify-view-more/"); // Replace with your actual backend URL
      if (!response.ok) {
        throw new Error("Failed to fetch user role");
      }
      const data = await response.json();
      if (data.status === "success") {
        setUserRole(data.data); // Assuming `data.data` contains the role
      } else {
        console.error(data.message || "Error fetching role");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false); // Loading complete
    }
  };

  useEffect(() => {
    fetchUserRole(); // Fetch role when the component mounts
  }, []);

  // Render loading state if still fetching
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
 // Replace `1` with the role for testing
  const handleMarkAsComplete = async () => {
    if (!selectedProduct) {
      Swal.fire({
        icon: "warning",
        title: "No Requisition Selected!",
        text: "Please select a requisition to mark as complete.",
      });
      return;
    }
  
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/png, image/jpeg";
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) {
        Swal.fire({
          icon: "warning",
          title: "No File Selected!",
          text: "Please select a file to upload.",
        });
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("item_requisition_id", selectedProduct.ID);
  
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/mark-item-as-completed/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Action Completed",
            text: "The item has been marked as complete.",
          });
          fetchRequisitions(); // Refresh the table
        } else if (response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: response.data.error || "Failed to mark the item as complete.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Unexpected Response",
            text: response.data.error || "An unexpected response was received.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.error || "An unexpected error occurred.",
        });
      }
    };
  
    fileInput.click(); // Trigger the file input
  };
  
  


  // Fetch product requisitions on component mount
  useEffect(() => {
    fetchRequisitions(); // Always fetch data when the component mounts
  }, []); // Empty dependency array ensures it runs only once
  

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
        setError('You are not Allowed to View the Item requisiton');
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

  const handleDownloadAcknowledgementReceipt = () => {
    setShowDownloadReceipt(true);
    setTimeout(() => setShowDownloadReceipt(false), 500); // Automatically hide after 500ms
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
  
    // Refresh the page
    window.location.reload();
  };
  


  const renderMenuItems = () => {
    if (userRole === null) return null;
    switch (userRole) {
      case 1: // Desk
        return (
          <>
            <MenuItem onClick={handleApproveRequisition}>
              <ListItemIcon>
                <CheckCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Approve Requisition</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => fetchAttachedItems(selectedProduct?.ID)}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Attached Items</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleViewAcknowledgementReceipt(selectedProduct)}>
              <ListItemIcon>
                <ReceiptLongIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Acknowledgement Receipt</ListItemText>
            </MenuItem>
          </>
        ); 
      case 2: // Regular and Head
        return (
          <>
            <MenuItem onClick={handleAttachItemsClick}>
              <ListItemIcon>
                <AttachFileIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Manage Items in Requisition</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => fetchAttachedItems(selectedProduct?.ID)}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Attached Items</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleViewAcknowledgementReceipt(selectedProduct)}>
              <ListItemIcon>
                <ReceiptLongIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Acknowledgement Receipt</ListItemText>
            </MenuItem>
          </>
        );
      case 4: // Property Management
        return (
          <>
            <MenuItem onClick={() => fetchAttachedItems(selectedProduct?.ID)}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Attached Items</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMarkAsUnavailable}>
              <ListItemIcon>
                <DoNotDisturbOnOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Mark as Unavailable</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMarkAsAvailable}>
              <ListItemIcon>
                <CheckCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Mark as Available</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleViewAcknowledgementReceipt(selectedProduct)}>
              <ListItemIcon>
                <ReceiptLongIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Acknowledgement Receipt</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDownloadAcknowledgementReceipt}>
              <ListItemIcon>
                <ReceiptLongIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Download Acknowledgement Receipt</ListItemText>
            </MenuItem>
          </>
        );
      case 3: // Maintenance Management
        // Define actions for Maintenance Management here if needed
        return null;
      case 5: // Top
        return (
          <>
            <MenuItem onClick={() => fetchAttachedItems(selectedProduct?.ID)}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Attached Items</ListItemText>
            </MenuItem>
          </>
        );
        case 6: // Admin
        return (
          <>
            <MenuItem onClick={handleAttachItemsClick}>
              <ListItemIcon>
                <AttachFileIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Manage Items in Requisition</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleApproveRequisition}>
              <ListItemIcon>
                <CheckCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Approve Requisition</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDeclineRequisition}>
              <ListItemIcon>
                <DoNotDisturbOnOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Decline Requisition</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => fetchAttachedItems(selectedProduct?.ID)}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Attached Items</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMarkAsUnavailable}>
              <ListItemIcon>
                <DoNotDisturbOnOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Mark as Unavailable</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMarkAsAvailable}>
              <ListItemIcon>
                <CheckCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Mark as Available</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleViewAcknowledgementReceipt(selectedProduct)}>
              <ListItemIcon>
                <ReceiptLongIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Acknowledgement Receipt</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMarkAsComplete}>
              <ListItemIcon>
                <ReceiptLongIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Mark as Complete</ListItemText>
            </MenuItem>
          </>
        );
      
      default:
        return null; // No actions for undefined roles
    }
  };
  

  const handleMarkAsAvailable = async () => {
    if (!selectedProduct) {
      Swal.fire({
        icon: "warning",
        title: "No Requisition Selected!",
        text: "Please select a requisition to mark as available.",
      });
      return;
    }
  
    Swal.fire({
      title: "Confirm Action",
      text: `Are you sure you want to mark requisition ID ${selectedProduct.ID} as available?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Mark as Available",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/accept-and-mark-item-available/`,
            { item_requisition_id: selectedProduct.ID }
          );
  
          if (response.data.status === "success") {
            Swal.fire({
              icon: "success",
              title: "Action Completed",
              text: "The item has been marked as available.",
            });
            fetchRequisitions(); // Refresh the table
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: response.data.message || "Failed to mark the item as available.",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.error || "An unexpected error occurred.",
          });
        }
      }
    });
  
    handleCloseMenu(); // Close the menu after the action
  };
  

  const handleMarkAsUnavailable = async () => {
    console.log("Mark as Unavailable triggered");
    if (!selectedProduct) {
      Swal.fire({
        icon: 'warning',
        title: 'No Requisition Selected!',
        text: 'Please select a requisition to mark as unavailable.',
      });
      return;
    }
  
    Swal.fire({
      title: 'Confirm Action',
      text: `Are you sure you want to mark requisition ID ${selectedProduct.ID} as unavailable?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Mark as Unavailable',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/accept-and-mark-item-unavailable/`,
            { item_requisition_id: selectedProduct.ID }
          );
  
          if (response.data.status === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Action Completed',
              text: 'The item has been marked as unavailable.',
            });
            fetchRequisitions(); // Refresh the table
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: response.data.message || 'Failed to mark the item as unavailable.',
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.error || 'An unexpected error occurred.',
          });
        }
      }
    });
  
    handleCloseMenu(); // Close the menu after the action
  };
  

  const handleApproveRequisition = async () => {
    if (!selectedProduct) {
      Swal.fire({
        icon: 'warning',
        title: 'No Requisition Selected!',
        text: 'Please select a requisition to approve.',
      });
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/approve-decline-item/`,
        {
          action_type: 1, // Action Type: Approve
          item_requisition_id: selectedProduct.ID, // Send the ID of the selected requisition
        }
      );
  
      // Check response body for errors or success
      if (response.data.message && response.data.message.includes("already approved")) {
        // Handle the case where the requisition was already approved
        Swal.fire({
          icon: 'warning',
          title: 'Action Failed',
          text: response.data.message, // Show the server response message
        });
      } else if (response.status === 200) {
        // Handle successful approval
        Swal.fire({
          icon: 'success',
          title: 'Requisition Approved',
          text: 'The requisition has been approved successfully.',
        });
        fetchRequisitions(); // Refresh the table
      } else {
        // Handle generic failure
        Swal.fire({
          icon: 'error',
          title: 'Approval Failed',
          text: response.data.message || 'Failed to approve requisition.',
        });
      }
    } catch (error) {
      console.error('Error approving requisition:', error);
  
      // Handle unexpected server errors
      if (error.response && error.response.data) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message || 'An error occurred while approving the requisition.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred. Please try again later.',
        });
      }
    }
    handleCloseMenu();
  };
  
  const handleViewAcknowledgementReceipt = (product) => {
    if (!product || !product['Image name']) {
      Swal.fire({
        icon: 'warning',
        title: 'No Image Found',
        text: 'This requisition does not have an associated acknowledgement receipt.',
      });
      return;
    }
  
    const fileName = product['Image name'];
  
    axios
      .get(`${import.meta.env.VITE_API_URL}/get-ar-image/`, {
        params: { file_name: fileName },
        responseType: 'blob', // Expecting a binary response (image)
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
  
        // Open the image in a new tab
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(
            `<img src="${url}" alt="Acknowledgement Receipt" style="max-width:100%;height:auto;"/>`
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Popup Blocked',
            text: 'Please allow popups for this action.',
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Retrieve Image',
          text: error.response?.data?.error || 'An error occurred while retrieving the receipt.',
        });
      });
  };
  

  const handleDeclineRequisition = async () => {
    if (!selectedProduct) {
      Swal.fire({
        icon: 'warning',
        title: 'No Requisition Selected!',
        text: 'Please select a requisition to decline.',
      });
      return;
    }

    const { value: rejectionNote } = await Swal.fire({
      title: 'Decline Requisition',
      input: 'textarea',
      inputLabel: 'Reason for Declining (optional)',
      inputPlaceholder: 'Type your reason here...',
      showCancelButton: true,
    });

    if (rejectionNote === null) {
      return; // User canceled the prompt
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/approve-decline-item/`,
        {
          action_type: 2, // Action Type: Decline
          item_requisition_id: selectedProduct.ID, // Send the ID of the selected requisition
          p_rejection_note: rejectionNote || '', // Optional rejection note
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Requisition Declined',
          text: 'The requisition has been declined successfully.',
        });
        fetchRequisitions(); // Refresh the table
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Decline Failed',
          text: response.data.message || 'Failed to decline requisition.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while declining the requisition.',
      });
    }
    handleCloseMenu();
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
                      {renderMenuItems()}
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
      {showDownloadReceipt && <DownloadAcknowledgementReceipt />}
    </Box>
  );
}

export default ProductRequisitionTable;
