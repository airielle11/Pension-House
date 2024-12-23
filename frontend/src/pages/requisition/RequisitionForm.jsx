import React, { useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import Dropdown from "./Dropdown";
import DescriptionBox from "./DescriptionBox";
import SubmitButton from "./SubmitButton";

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
    if (requisitionType === "Item Requisition") {
      return (
        <Grid item xs={12}>
          <Box className="card" sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Requested Products
            </Typography>
            <Box
              sx={{
                overflowX: "auto",
                maxWidth: "100%",
                borderRadius: 2,
                border: "1px solid #ccc",
              }}
            >
              <table className="table table-hover" style={{ minWidth: "600px" }}>
  <thead>
    <tr>
      <th>Image</th> {/* New column for image */}
      <th>Item Name</th>
      <th>In Stock</th>
      <th>Quantity</th>

    </tr>
  </thead>
  
  <tbody>
    {["safeguard", "tissue", "bedsheets", "pillows"].map((item) => (
      <tr key={item}>
          <td>
          {/* Image added here */}
          <img
            src={`/images/${item}.jpg`}
            alt={item}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        </td>
        <td>{item.charAt(0).toUpperCase() + item.slice(1)}</td>
        <td>{quantities[item]}</td>
        <td className="d-flex align-items-center">
          <Button
            size="small"
            variant="outlined"
            sx={{ mx: 1 }}
            onClick={() => handleQuantityChange(item, -1)}
          >
            -
          </Button>
          <Typography>{quantities[item]}</Typography>
          <Button
            size="small"
            variant="contained"
            sx={{ mx: 1 }}
            onClick={() => handleQuantityChange(item, 1)}
          >
            +
          </Button>
        </td>

      </tr>
    ))}
  </tbody>
</table>

            </Box>
          </Box>
        </Grid>
      );
    } else if (requisitionType === "Job Requisition") {
      return (
        <Grid item xs={12} md={6}>
          <DescriptionBox
            requisitionType={requisitionType}
            description={description}
            handleDescriptionChange={handleDescriptionChange}
          />
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
          <SubmitButton handleSubmit={handleSubmit} />
        </Grid>
      )}
    </Grid>
  );
};

export default RequisitionForm;
