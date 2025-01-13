import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Search from '../../components/Search';

export default function PurchaseOrderList() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Fetch purchase orders
  useEffect(() => { 
    fetch(`${import.meta.env.VITE_API_URL}/purchase_orders/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPurchaseOrders(data.data);
        } else {
          console.error("Failed to fetch purchase orders");
        }
      })
      .catch((err) => console.error("Error fetching purchase orders:", err));
  }, []);

  // Fetch purchase items for a specific order
  const fetchPurchaseItems = (orderId) => {
    fetch(`${import.meta.env.VITE_API_URL}/purchase_items?order_id=${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSelectedOrderItems(data.data);
        } else {
          console.error("Failed to fetch purchase items");
        }
      })
      .catch((err) => console.error("Error fetching purchase items:", err));
  };

  const handleViewItems = (orderId) => {
    setSelectedOrderId(orderId);
    fetchPurchaseItems(orderId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrderId(null);
    setSelectedOrderItems([]);
  };

  const filteredOrders = purchaseOrders.filter((order) =>
    Object.values(order).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Purchase Orders
      </Typography>
      <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
  
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.created_by}</TableCell>
                <TableCell>{order.created_date}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewItems(order.id)}
                  >
                    View Items
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 

      {/* Modal for displaying purchase items */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Purchase Items for Order ID: {selectedOrderId}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>SKU</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrderItems.length > 0 ? (
                  selectedOrderItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item["unit price"] || "N/A"}</TableCell>
                      <TableCell>{item.total || "N/A"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No items available for this purchase order.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={3} textAlign="right">
            <Button variant="contained" color="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
