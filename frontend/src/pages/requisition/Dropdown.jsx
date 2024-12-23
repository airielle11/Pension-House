import React from "react";
import { FormControl, Select, MenuItem, Typography, Box } from "@mui/material";

// Dropdown component to select Requisition Type
const Dropdown = ({ requisitionType, handleTypeChange }) => {
  return (
    <Box sx={containerStyle}>

      {/* Dropdown for selecting Requisition Type */}
      <FormControl variant="outlined" fullWidth sx={formControlStyle}>
        <Select
          value={requisitionType}
          onChange={handleTypeChange}
          displayEmpty
          inputProps={{ "aria-label": "Requisition Type" }}
          sx={selectStyle}
        >
          {/* Menu items for selecting requisition type */}
          <MenuItem value="" disabled>
            Job Requisition/ Item Requisition
          </MenuItem>
          <MenuItem value="Item Requisition">Item Requisition</MenuItem>
          <MenuItem value="Job Requisition">Job Requisition</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

// Styles for the container Box
const containerStyle = {
  width: "100%",
  maxWidth: { xs: "100%", sm: "80%", md: "60%" },
  margin: "0 auto", // Centering the component
  padding: { xs: 2, sm: 0 },
};

// Styles for Typography (the label)
const typographyStyle = {
  fontSize: { xs: "0.9rem", sm: "1rem" },
};

// Styles for the FormControl component
const formControlStyle = {
  width: "100%",
  borderRadius: "4px",
};

// Styles for the Select component
const selectStyle = {
  padding: "8px 16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  fontSize: { xs: "14px", sm: "16px" },
};

export default Dropdown;
