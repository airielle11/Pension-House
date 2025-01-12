import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function AttachItemsTable({ onBack, selectedProduct }) {
  const [availableItems, setAvailableItems] = useState([]);
  const [loadingAvailableItems, setLoadingAvailableItems] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [attachingItemId, setAttachingItemId] = useState(null);
  const [attachedItems, setAttachedItems] = useState([]); // State for attached items

  // Ensure selectedProduct is valid
  useEffect(() => {
    if (!selectedProduct?.id) {
      console.warn("AttachItemsTable rendered without a valid 'selectedProduct'");
    } else {
      console.log("Selected Product:", selectedProduct);
    }
  }, [selectedProduct]);

  // Fetch available items when the component mounts
  useEffect(() => {
    fetchAvailableItems();
  }, []);

  // Function to fetch available items from the backend
  const fetchAvailableItems = () => {
    setLoadingAvailableItems(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/get-stocks/`)
      .then((response) => {
        if (response.data && response.data.stocks) {
          setAvailableItems(response.data.stocks);
        } else {
          setAvailableItems([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching available items:", err);
        alert("Failed to fetch available items. Please try again later.");
      })
      .finally(() => {
        setLoadingAvailableItems(false);
      });
  };

  // Function to handle attaching an item to the requisition
  const handleAttachItem = (item) => {
    if (!selectedProduct?.id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to attach item: Missing item requisition ID.",
      });
      return;
    }
  
    const qty = quantities[item.id] || 1;
  
    if (qty <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Quantity",
        text: "Please specify a valid quantity greater than zero.",
      });
      return;
    }
  
    const payload = {
      item_requisition_id: selectedProduct.id,
      items: [
        {
          item_id: item.id,
          item_name: item.item_name,
          qty: qty,
        },
      ],
    };
  
    console.log("Payload being sent:", payload);
  
    setAttachingItemId(item.id);
  
    axios
      .post(`${import.meta.env.VITE_API_URL}/requisitions-attach-items/`, payload)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Item attached successfully!",
        });
  
        // Reset attachingItemId to re-enable the button
        setAttachingItemId(null);

        // Clear the quantity for the attached item
        setQuantities((prev) => ({
          ...prev,
          [item.id]: "",
        }));
      })
      .catch((err) => {
        console.error("Error attaching item:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to attach item. Please try again later.",
        });
        setAttachingItemId(null);
      });
  };
  

  // Handle quantity input change
  const handleQuantityChange = (itemId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: parseInt(value, 10) || 0,
    }));
  };

  return (
    <Box>
      {/* Header with Back Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Attach Items to Requisition</Typography>
        <Button variant="contained" onClick={onBack}>
          Back
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loadingAvailableItems ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Net Vol/Qty.</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>In Stock</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availableItems.length > 0 ? (
              availableItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="Item"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.net_vol_qty}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>{item.in_stock}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={quantities[item.id] || ""}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      placeholder="Qty"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleAttachItem(item)}
                      disabled={attachingItemId === item.id}
                    >
                      {attachingItemId === item.id ? "Attaching..." : "Attach"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  No Items Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default AttachItemsTable;
