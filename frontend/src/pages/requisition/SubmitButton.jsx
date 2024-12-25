import React from "react";
import { Button } from "@mui/material";

// SubmitButton component for generating requests
const SubmitButton = ({ handleSubmit }) => {
  return (
    <Button
      variant="contained"
      onClick={handleSubmit}
      sx={buttonStyle} // Apply the button style using sx prop
    >
      Generate Initial Request
    </Button> 
  );
};

// Styles for the SubmitButton component
const buttonStyle = {
  background: "linear-gradient(to right, #14ADD6, #384295)",
  color: "#fff",
  marginTop: "16px",
  width: { xs: "80%", sm: "60%", md: "20%" }, // Responsive width based on screen size
  textTransform: "none",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "8px 16px", // Consistent padding
};

export default SubmitButton;
