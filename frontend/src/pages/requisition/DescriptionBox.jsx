import React, { useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import Dropdown from "./Dropdown";

const RequisitionForm = () => {
  const [quantities, setQuantities] = useState({
    safeguard: 0,
    tissue: 0,
    bedsheets: 0,
    pillows: 0,
  });

  const handleQuantityChange = (product, change) => {
    setQuantities((prev) => ({
      ...prev,
      [product]: Math.max(0, prev[product] + change),
    }));
  };

  const [requisitionType, setRequisitionType] = useState("");
  const [description, setDescription] = useState("");

  const handleTypeChange = (event) => {
    setRequisitionType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (requisitionType === "Item Requisition") {
      const productDetails = Object.entries(quantities)
        .map(([product, quantity]) => `${product}: ${quantity}`)
        .join("\n");

      alert(`Requisition: ${requisitionType}\nProducts:\n${productDetails}`);
    } else if (requisitionType === "Job Requisition") {
      alert(`Requisition: ${requisitionType}\nDescription: ${description}`);
    } else {
      alert("Please select a requisition type!");
    }
  };

  const renderContent = () => {
    if (requisitionType === "Job Requisition") {
      return (
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Description for Job Requisition
            </Typography>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter job requisition description"
              style={{ width: "100%", height: "100px" }}
            />
          </Box>
        </Grid>
      );
    }
    return null;
  };

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      <Grid item xs={12} md={6}>
        <Dropdown
          requisitionType={requisitionType}
          handleTypeChange={handleTypeChange}
        />
      </Grid>

      {renderContent()}

      {requisitionType && (
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default RequisitionForm;
