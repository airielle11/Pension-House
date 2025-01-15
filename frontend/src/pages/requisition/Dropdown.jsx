import React from "react";
import { FormControl, Select, MenuItem, Box } from "@mui/material";
import ItemRequisitionTable from "../dashboard/ItemRequisitionTable"; // Import the ItemRequisitionTable
import JobRequisitionTable from "../dashboard/JobRequisitionTable"; // Import the JobRequisitionTable

// Dropdown component to select Requisition Type
const Dropdown = ({ requisitionType, handleTypeChange }) => {
  return (
    <Box
      sx={{
        width: "205%", // Full width
        padding: 2,
        maxWidth: "16000px", // Set max width for larger screens
        margin: "0 auto", // Center content horizontally
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
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

      {/* Conditionally render the tables based on the selected requisition type */}
      <Box
        sx={{
          marginTop: 3,
          width: "100%", // Full width
          overflowX: "auto", // Enable horizontal scrolling for smaller screens
        }}
      >
        {requisitionType === "Item Requisition" && (
          <Box sx={{ minWidth: "800px" /* Minimum width for the table */ }}>
            <ItemRequisitionTable />
          </Box>
        )}
        {requisitionType === "Job Requisition" && (
          <Box sx={{ minWidth: "800px" /* Minimum width for the table */ }}>
            <JobRequisitionTable />
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Styles for the FormControl component
const formControlStyle = {
  width: "100%", // Full width for the dropdown
  borderRadius: "4px",
  marginBottom: 2, // Add margin for spacing below the dropdown
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

