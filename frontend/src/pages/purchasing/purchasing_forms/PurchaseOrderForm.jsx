import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Tooltip,
  Stack,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import styles from "../PurchaseOrder.module.css";
import axios from "axios";

export default function PurchaseOrderForm({ userRole }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([{ item_id: "", qty: "" }]); // Array of items
  const [successMessage, setSuccessMessage] = useState(null);

  // Modal visibility handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Update item input fields dynamically
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  // Add new item row
  const addItemRow = () => {
    setItems([...items, { item_id: "", qty: "" }]);
  };

  // Remove item row
  const removeItemRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Submit purchase order
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", items);  

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/create_purchase_order/`, {
        items: items.map((item) => ({
          item_id: parseInt(item.item_id, 10),
          qty: parseInt(item.qty, 10),
        })),
      });
      console.log("API Response:", response.data);


      if (response.data.success) {
        setSuccessMessage(`Purchase Order Created! ID: ${response.data.data[0].id}`);
        setItems([{ item_id: "", qty: "" }]); // Reset form
        handleClose(); // Close modal
      }
    } catch (error) {
      console.error("Error creating purchase order:", error);
      alert("Failed to create purchase order. Please try again.");
    }
  };

     // State and handlers...
  
    return (
      <div>
        {userRole === "Top Management" || userRole === "Top Management (Head)" ? (
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: "8px",
              }}
              startIcon={<FontAwesomeIcon icon={faPlus} />}
              onClick={handleOpen}
            >
              Create Purchase Order
            </Button>
          </Stack>
        ) : null}
  
        {/* Modal and other UI components */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: "8px",
              p: 4,
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2" mb={2}>
              Create Purchase Order
            </Typography>
  
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {items.map((item, index) => (
                  <div key={index} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <TextField
                      className={styles.TextField}
                      label="Item ID"
                      variant="outlined"
                      value={item.item_id}
                      onChange={(e) => handleItemChange(index, "item_id", e.target.value)}
                    />
                    <TextField
                      className={styles.TextField}
                      label="Quantity"
                      variant="outlined"
                      value={item.qty}
                      onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                    />
                    {items.length > 1 && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeItemRow(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outlined"
                  onClick={addItemRow}
                  sx={{ alignSelf: "flex-start" }}
                >
                  Add Item
                </Button>
              </div>
  
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
                <Button
                  sx={{ marginLeft: "10px" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
  
        {successMessage && (
          <Typography color="green" mt={2}>
            {successMessage}
          </Typography>
        )}
      </div>
    );
  }
 
