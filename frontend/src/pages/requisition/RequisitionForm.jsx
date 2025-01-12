import React, { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
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

  const renderContent = () => {
    if (requisitionType === "Job Requisition") {
      return null; // No content for Job Requisition
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
    </Grid>
  );
};

export default RequisitionForm;
