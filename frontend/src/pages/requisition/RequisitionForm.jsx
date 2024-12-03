import React, { useState } from "react";
import { Grid } from "@mui/material";
import Dropdown from "./Dropdown";
import DescriptionBox from "./DescriptionBox";
import SubmitButton from "./SubmitButton";

const RequisitionForm = () => {
  const [requisitionType, setRequisitionType] = useState(""); // Tracks dropdown selection
  const [description, setDescription] = useState(""); // Tracks description text

  const handleTypeChange = (event) => {
    setRequisitionType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Requisition: ${requisitionType}\nDescription: ${description}`);
    // Add logic for form submission here (e.g., API call)
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Dropdown requisitionType={requisitionType} handleTypeChange={handleTypeChange} />
      </Grid>

      {requisitionType && (
        <Grid item xs={10} md={4} style={{ marginTop: "24px" }}>
          <DescriptionBox
            requisitionType={requisitionType}
            description={description}
            handleDescriptionChange={handleDescriptionChange}
          />
        </Grid>
      )}

      {requisitionType && (
        <Grid item xs={10}>
          <SubmitButton handleSubmit={handleSubmit} />
        </Grid>
      )}
    </Grid>
  );
};

export default RequisitionForm;
