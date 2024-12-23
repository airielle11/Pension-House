import React from "react";
import { TextField, Typography, Box } from "@mui/material";

const DescriptionBox = ({ requisitionType, description, handleDescriptionChange }) => {
  const isJobRequisition = requisitionType === "Job Requisition";
  const descriptionLabel = isJobRequisition ? "Job Description" : "Product Description";

  return (
    <Box
      sx={{
        width: "200%",
        maxWidth: { xs: "200%", sm: "80%", md: "60%" }, // Responsive width
        margin: "0 auto", // Center alignment
      }}
    >
      <Typography 
        variant="body2" 
        gutterBottom 
        sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }} // Responsive font size
      >
        {descriptionLabel}
      </Typography>
      <TextField
        placeholder={`Enter Job Description`}
        fullWidth
        multiline
        rows={2}
        value={description}
        onChange={handleDescriptionChange}
        sx={{
          "& .MuiInputBase-root": { fontSize: { xs: "0.9rem", sm: "1rem" } }, // Input text size
        }}
      />
    </Box>
  );
};

export default DescriptionBox;
