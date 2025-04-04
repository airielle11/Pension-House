import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import style from "../users/Styles.module.css";

const MarkPOAsCompletedForm = () => {
  const [purchaseOrderId, setPurchaseOrderId] = useState("");
  const [receivingMemo, setReceivingMemo] = useState(null);
  const [deliveryReceipt, setDeliveryReceipt] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  const validatePurchaseOrderId = (value) => {
    const regex = /^\d+$/; // Matches only integers
    if (!regex.test(value)) {
      setErrorMessage("Purchase Order ID must be a valid integer.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async () => {
    if (!purchaseOrderId || !receivingMemo || !deliveryReceipt) {
      setErrorMessage("Please fill out all fields and upload both files.");
      return;
    }

    if (!validatePurchaseOrderId(purchaseOrderId)) {
      return;
    }

    const formData = new FormData();
    formData.append("purchase_order_id", purchaseOrderId);
    formData.append("receiving_memo", receivingMemo);
    formData.append("delivery_receipt", deliveryReceipt);

    try {
      const response = await axios.post(
        '${import.meta.env.VITE_API_URL}/mark_po_as_complete/',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        Swal.fire({
          title: "Success",
          text:
            response.data.message || "Purchase Order Completed Successfully!",
          icon: "success",
          customClass: {
            container: style.swalContainer,
          },
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleClose();
          }
        }) 

        setSuccessModal(true);
        setErrorMessage("");
      } else {
        Swal.fire({
          title: "Error",
          text:
            response.data.message || "Purchase Order ID not found.",
          icon: "error",
          customClass: {
            container: style.swalContainer,
          },
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleClose();
          }
        }) 
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          error.message ||
          "An error occurred.",
        icon: "error",
        customClass: {
          container: style.swalContainer,
        },
      });
    }
  };

  const handleCloseModal = () => {
    setSuccessModal(false);
    setPurchaseOrderId("");
    setReceivingMemo(null);
    setDeliveryReceipt(null);
    setErrorMessage("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Mark Purchase Order as Completed
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Purchase Order ID"
            fullWidth
            value={purchaseOrderId}
            onChange={(e) => {
              const value = e.target.value;
              if (validatePurchaseOrderId(value)) {
                setPurchaseOrderId(value);
              } else {
                setPurchaseOrderId(""); // Clear invalid input
              }
            }}
            error={!!errorMessage}
            helperText={errorMessage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" component="label" fullWidth>
            Upload Receiving Memo
            <input
              type="file"
              hidden
              accept="application/pdf,image/*"
              onChange={(e) => handleFileChange(e, setReceivingMemo)}
            />
          </Button>
          {receivingMemo && (
            <Typography variant="body2">{receivingMemo.name}</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" component="label" fullWidth>
            Upload Delivery Receipt
            <input
              type="file"
              hidden
              accept="application/pdf,image/*"
              onChange={(e) => handleFileChange(e, setDeliveryReceipt)}
            />
          </Button>
          {deliveryReceipt && (
            <Typography variant="body2">{deliveryReceipt.name}</Typography>
          )}
        </Grid>
        {errorMessage && (
          <Grid item xs={12}>
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              background: "linear-gradient(to right, #14ADD6, #384295)",
              color: "#fff",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      {/* Success Modal */}
      <Dialog open={successModal} onClose={handleCloseModal}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Purchase order marked as completed successfully!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MarkPOAsCompletedForm;