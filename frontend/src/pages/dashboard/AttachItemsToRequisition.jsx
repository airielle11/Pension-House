import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Component to display the item details of the requisition
const RequestedItem = ({ product, onBack }) => {
  const styles = {
    container: {
      width: '90%',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'left',
      margin: '20px 0',
    },
    table: {
      border: '1px solid #ddd',
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '10px',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid #eee',
    },
    cell: {
      flex: 1,
      textAlign: 'left',
    },
    image: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '5px',
    },
    button: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Requested Product Details</h2>
      {product ? (
        <div style={styles.table}>
          <div style={styles.row}>
            <div style={styles.cell}>Item Name:</div>
            <div style={styles.cell}>{product["Item name"]}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>SKU:</div>
            <div style={styles.cell}>{product.SKU}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>Category:</div>
            <div style={styles.cell}>{product.Category}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>Brand:</div>
            <div style={styles.cell}>{product.Brand}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>Net Vol/Qty.:</div>
            <div style={styles.cell}>{product["Net Vol/Qty."]}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>Supplier:</div>
            <div style={styles.cell}>{product.Supplier}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>Status:</div>
            <div style={styles.cell}>{product.Status}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>Pieces:</div>
            <div style={styles.cell}>{product.Pieces}</div>
          </div>
          <div style={styles.row}>
            <div style={styles.cell}>Image:</div>
            <div style={styles.cell}>
              <img
                src={product.Image}
                alt={product["Item name"]}
                style={styles.image}
              />
            </div>
          </div>
          <button style={styles.button} onClick={onBack}>
            Back to Requisitions
          </button>
        </div>
      ) : (
        <h4>No Product Details Available</h4>
      )}
    </div>
  );
};

// Main component that displays requisitions and allows item details to be viewed
const ProductRequisitionTable = () => {
  const [productRequisitions, setProductRequisitions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { itemRequisitionId } = useParams();
  const navigate = useNavigate(); // Hook for navigation



  useEffect(() => {
    if (!itemRequisitionId) {
      setError("Invalid item requisition ID.");
      setLoading(false);
      return;
    }
  
    axios
    .get(`${import.meta.env.VITE_API_URL}/get-attached-items/`, {
      params: { item_requisition_id: itemRequisitionId },
    })
    .then((response) => {
      console.log('API Response:', response.data.data); // Check if this is []
      setAttachedItems(response.data.data || []);
      setLoadingAttachedItems(false);
      setViewDetails(true);
    })
    .catch((err) => {
      console.error('Error fetching attached items:', err);
      setLoadingAttachedItems(false);
    });
  }, [itemRequisitionId]);

  console.log("itemRequisitionId:", itemRequisitionId);


  const handleBackToRequisitions = () => {
    setSelectedProduct(null);
  };

  const handleGoBack = () => {
    navigate('/requisitions'); // Navigate specifically to ItemRequisition.jsx route
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* "Go Back" Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        style={{ marginBottom: '20px' }}
      >
        Go Back
      </Button>

      {!selectedProduct ? (
        <div>
          <h1>Product Requisitions</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Created by</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Room No.</TableCell>
                <TableCell>Room Type</TableCell>
                <TableCell>Priority Level</TableCell>
                <TableCell>Item attachment by</TableCell>
                <TableCell>Approved by</TableCell>
                <TableCell>Accepted by</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productRequisitions.length > 0 ? (
                productRequisitions.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.ID}</TableCell>
                    <TableCell>{product["Created by"]}</TableCell>
                    <TableCell>{product.Date}</TableCell>
                    <TableCell>{product["Room No."]}</TableCell>
                    <TableCell>{product["Room Type"]}</TableCell>
                    <TableCell>{product["Priority Level"]}</TableCell>
                    <TableCell>{product["Item attachment by"]}</TableCell>
                    <TableCell>{product["Approved by"]}</TableCell>
                    <TableCell>{product["Accepted by"]}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color:
                            product.Status === 'Accepted'
                              ? 'green'
                              : product.Status === 'Deferred'
                              ? 'orange'
                              : 'gray',
                        }}
                      >
                        {product.Status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleViewRequestedItems(product.ID)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11}>No requisitions found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <RequestedItem product={selectedProduct} onBack={handleBackToRequisitions} />
      )}
    </div>
  );
};

export default ProductRequisitionTable;
