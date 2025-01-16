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
import Swal from 'sweetalert2'; // Import SweetAlert2

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
    axios.get(`${import.meta.env.VITE_API_URL}/defective-items`)
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

  // Function to handle marking an item as "Returned and Refunded"
  const handleMarkAsReturnedRefunded = (itemId) => {
    setDefectiveItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, status: 'Returned' } : item
      )
    );

    axios.post(`${import.meta.env.VITE_API_URL}/mark-defect-as-returned-refunded/`, {
      defect_item_id: itemId,
    })
      .then((response) => {
        console.log('Full Response Data:', response.data);

        // Show the response message in a SweetAlert modal
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        });

        return response.data; // Returning the success response data
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error response:', error.response.data);

          // Show error message in SweetAlert modal
          Swal.fire({
            title: 'Error!',
            text: error.response.data.message || 'Something went wrong!',
            icon: 'error',
            confirmButtonText: 'OK',
          });

          return error.response.data;
        } else {
          console.error('Network or unknown error:', error.message);
          Swal.fire({
            title: 'Error!',
            text: error.message || 'Network error occurred!',
            icon: 'error',
            confirmButtonText: 'OK',
          });

          return { success: false, error: error.message };
        }
      })
      .finally(() => {
        // Optionally, handle any cleanup if necessary
      });
  };

  // Function to handle marking an item as "Returned and Replaced"
  const handleMarkAsReturnedReplaced = (itemId) => {
    setDefectiveItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, status: 'Returned' } : item
      )
    );

    axios.post(`${import.meta.env.VITE_API_URL}/mark-defect-as-returned-replaced/`, {
      defect_item_id: itemId,
    })
      .then((response) => {
        console.log('Item marked as returned and replaced:', response.data.success);

        // Show success message in SweetAlert modal
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        });

        return response.data; // Returning the success response data
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error response:', error.response.data);

          // Show error message in SweetAlert modal
          Swal.fire({
            title: 'Error!',
            text: error.response.data.message || 'Something went wrong!',
            icon: 'error',
            confirmButtonText: 'OK',
          });

          return error.response.data;
        } else {
          console.error('Network or unknown error:', error.message);
          Swal.fire({
            title: 'Error!',
            text: error.message || 'Network error occurred!',
            icon: 'error',
            confirmButtonText: 'OK',
          });

          return { success: false, error: error.message };
        }
      })
      .finally(() => {
        // Optionally, handle any cleanup if necessary
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
                  {/* Action Buttons */}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleMarkAsReturnedRefunded(row.id)}
                    disabled={row.status === 'Returned'}
                  >
                    Mark as Returned and Refunded
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleMarkAsReturnedReplaced(row.id)}
                    disabled={row.status === 'Returned'}
                  >
                    Mark as Returned and Replaced
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

export default DefectiveTable;
