import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { Stack } from "@mui/system";
import styles from "../PurchaseOrder.module.css";

import { Tooltip } from "@mui/material";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; 
import { faFileExcel, faFilePdf } from "@fortawesome/free-regular-svg-icons"; 

export default function PurchaseOrderForm() {
  const [open, setOpen] = useState(false);

  // Functions to handle modal visibility
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
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

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Tooltip title="Excel">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00A65A",  
                color: "white",
                "&:hover": { backgroundColor: "#007a45" }, 
                minWidth: "auto",
                minHeight: "30px",
                padding: "4px 12px",
              }}
              startIcon={<FontAwesomeIcon icon={faFileExcel} />}
            />
          </Tooltip>
          <Tooltip title="PDF">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#DD4B39",  
                color: "white",
                "&:hover": { backgroundColor: "#a33a2a" },  
                minWidth: "auto",
                minHeight: "30px",
                padding: "4px 12px",
              }}
              startIcon={<FontAwesomeIcon icon={faFilePdf} />}
            />
          </Tooltip>
        </Stack>
      </Stack>

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
              <TextField
                className={styles.TextField}
                label="PO Number"
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
              <TextField
                className={styles.TextField}
                label="Terms of Payment (TOP)"
                variant="outlined"
              />
              <TextField
                className={styles.TextField}
                label="PO Date"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                className={styles.TextField}
                label="Delivery Date"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
              <TextField className={styles.TextField} label="Vendor ID" select>
                <MenuItem value="Aux joyeux ecclésiastiques">
                  Aux joyeux ecclésiastiques
                </MenuItem>
              </TextField>
              <TextField className={styles.TextField} label="PO Status" select>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="For Delivery">For Delivery</MenuItem>
              </TextField>
              <TextField fullWidth label="Description" variant="outlined" />
            </div>

            {/* Modal Footer */}
            <Box mt={3}>
              <Button variant="contained" color="primary">
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
    </div>
  );
}
