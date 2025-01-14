import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Button,
} from '@mui/material';
import axios from 'axios';

// Function to determine the status color based on product status
const getStatusColor = (status) => {
  const statusColors = {
    Returned: '#ED3237', // Red for "Returned"
    Pending: '#F29425',  // Orange for "Pending"
    Approved: '#10A142', // Green for "Approved"
  };

  return statusColors[status] || '#000'; // Default to black if status is unknown
};

const DefectiveTable = ({ handleViewMoreClick }) => {
  const [defectiveItems, setDefectiveItems] = useState([]); // State to store defective items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch defective items on initial load
  useEffect(() => {
    setLoading(true); // Set loading to true when the request is made
    axios.get(${import.meta.env.VITE_API_URL}/defective-items)
      .then((response) => {
        console.log('Full response:', response); // Log full response object
        console.log('Response data:', response.data); // Log only the response data

        // Directly access defective_items from the response data
        if (response.data && response.data.defective_items) {
          setDefectiveItems(response.data.defective_items); // Set the defective items if valid
          setError(null); // Reset error state if data is fetched successfully
        } else {
          setError('No defective items found or response is invalid'); // Set error message
          setDefectiveItems([]); // Fallback to empty array
        }
      })
      .catch((error) => {
        setError('Error fetching defective items.');
        setDefectiveItems([]); // Fallback to empty array
        console.error('Error fetching defective items:', error); // Log any error
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request is complete
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Function to handle marking an item as "Returned"
  const handleMarkAsReturned = (itemId) => {
    // Optimistically update the UI to mark the item as returned
    setDefectiveItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, status: 'Returned' } : item
      )
    );

    // Make an API call to your backend to mark the item as returned
    axios.post(${import.meta.env.VITE_API_URL}/mark-defect-as-returned/, {
      defect_item_id: itemId,  // Sending the defect item ID in the request body
    })
      .then((response) => {
        console.log('Item marked as returned:', response.data.success);
        // Optionally, you can show a message to the user here
      })
      .catch((error) => {
        setError('Error marking item as returned.');
        console.error('Error marking item as returned:', error);
        // If there's an error, revert the status change in the UI
        setDefectiveItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, status: 'Pending' } : item
          )
        );
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="defective items list table">
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Added By</TableCell>
            <TableCell>Net Vol/Qty</TableCell>
            <TableCell>Defect Quantity</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell> {/* New "Action" column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={12} align="center">
                Loading...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={12} align="center" style={{ color: 'red' }}>
                {error}
              </TableCell>
            </TableRow>
          ) : defectiveItems.length > 0 ? (
            defectiveItems.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <Avatar alt={row.item_name} src={row.image || '/default-image.png'} />
                </TableCell>
                <TableCell>{row.item_name || 'N/A'}</TableCell>
                <TableCell>{row.sku || 'N/A'}</TableCell>
                <TableCell>{row.category || 'N/A'}</TableCell>
                <TableCell>{row.brand || 'N/A'}</TableCell>
                <TableCell>{row.added_by || 'N/A'}</TableCell>
                <TableCell>{row.net_vol_qty || 'N/A'}</TableCell>
                <TableCell>{row.defect_quantity || 'N/A'}</TableCell>
                <TableCell>{row.supplier || 'N/A'}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: getStatusColor(row.status), // Use the function to set the color based on the status
                    }}
                  >
                    {row.status || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell>
                  {/* Action Button to mark as "Returned" */}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleMarkAsReturned(row.id)}
                    disabled={row.status === 'Returned'} // Disable button if already marked as returned
                  >
                    Mark as Returned
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={12} align="center">No defective items available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DefectiveTable;s