import React, { useState } from "react";
import { Modal, Box, Button, Typography, TextField, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function PurchaseOrderForm() {
  const [open, setOpen] = useState(false);

  // Functions to handle modal visibility
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Button to Open Modal */}
      <Button
        variant="contained"
        sx={{
          borderRadius: "8px"
        }}
        startIcon={<FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />}
        onClick={handleOpen} // Opens the modal
      >
        Create Purchase Order
      </Button>

      {/* Modal */}
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
          {/* Modal Content */}
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
            Create Purchase Order
          </Typography>

          <form>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {/* Example Input Fields */}
              <TextField 
                label="PO Number"
                variant="outlined"
                defaultValue="20241127CE7E8#PO"
                InputProps={{ readOnly: true }}
              />
              <TextField 
                label="Terms of Payment (TOP)"
                variant="outlined"
                defaultValue="D10"
              />
              <TextField 
                label="Branch ID"
                variant="outlined"
                defaultValue="HQ"
              />
              <TextField 
                label="PO Date"
                variant="outlined"
                type="date"
                defaultValue="2024-11-27"
                InputLabelProps={{ shrink: true }}
              />
              <TextField 
                label="Delivery Date"
                variant="outlined"
                type="date"
                defaultValue="2024-12-02"
                InputLabelProps={{ shrink: true }}
              />
              <TextField 
                fullWidth
                label="Vendor ID"
                select
                defaultValue="Aux joyeux ecclésiastiques"
              >
                <MenuItem value="Aux joyeux ecclésiastiques">Aux joyeux ecclésiastiques</MenuItem>
                {/* Add other options here */}
              </TextField>
              <TextField 
                fullWidth
                label="PO Status"
                select
                defaultValue="Processing"
              >
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="For Delivery">For Delivery</MenuItem> 
              </TextField>
            </div>

            {/* Modal Footer */}
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary">
                Create
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Back to List
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
