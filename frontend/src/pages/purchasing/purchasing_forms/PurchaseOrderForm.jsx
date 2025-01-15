import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Tooltip,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function PurchaseOrderForm({ userRole }) {
  const [open, setOpen] = useState(false);
  const [stocks, setStocks] = useState([]); // All stocks
  const [filteredStocks, setFilteredStocks] = useState([]); // Filtered stocks
  const [selectedStocks, setSelectedStocks] = useState([]); // Selected stocks
  const [selectedSupplier, setSelectedSupplier] = useState(""); // Selected supplier for filtering
  const [successMessage, setSuccessMessage] = useState(null);
  const [userRole, setUserRole] = useState(""); // User's role

  // Modal visibility handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch stocks from the backend
  useEffect(() => {
    async function fetchStocks() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/stocks_for_po/`);
        if (response.data.success) {
          setStocks(response.data.data); // Set stocks from backend
          setFilteredStocks(response.data.data); // Set initial filtered stocks
        } else {
          console.error("Failed to fetch stocks:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    }
    fetchStocks();
  }, []);

  // Handle supplier filter change
  const handleSupplierChange = (event) => {
    const supplier = event.target.value;
    setSelectedSupplier(supplier);

    // Filter stocks by selected supplier
    if (supplier) {
      setFilteredStocks(stocks.filter((stock) => stock.supplier === supplier));
    } else {
      setFilteredStocks(stocks); // Show all stocks if no supplier is selected
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (stock) => {
    if (selectedStocks.find((s) => s.id === stock.id)) {
      // Remove stock from selection if already selected
      setSelectedStocks(selectedStocks.filter((s) => s.id !== stock.id));
    } else {
      // Add stock to selection
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  // Submit purchase order
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/create_purchase_order/`, {
        items: selectedStocks.map((stock) => ({ item_id: stock.id, qty: stock.qty || 1 })), // Default quantity to 1 if not specified
      });

      if (response.data.success) {
        setSuccessMessage(`Purchase Order Created! ID: ${response.data.data[0].id}`);
        setSelectedStocks([]); // Reset selections
        handleClose(); // Close modal
      }
    } catch (error) {
      console.error("Error creating purchase order:", error);
      alert("Failed to create purchase order. Please try again.");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role") || "Unknown";
    setUserRole(role);
  }, []);

  // Get unique suppliers for the dropdown
  const uniqueSuppliers = [...new Set(stocks.map((stock) => stock.supplier))];

  return (
    <div>
      {userRole === "Top Management" || userRole === "Top Management (Head)" ? (
        <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: "8px" }}
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleOpen}
          >
            Create Purchase Order
          </Button>
        </Stack>
      ) : null}

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
            width: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "8px",
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
            Select Items...
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
             <Select 
              value={selectedSupplier}
              onChange={handleSupplierChange}
              displayEmpty 
            >
              <MenuItem value="">All Suppliers</MenuItem>
              {uniqueSuppliers.map((supplier) => (
                <MenuItem key={supplier} value={supplier}>
                  {supplier}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <form onSubmit={handleSubmit}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Selected</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Net Vol/Qty.</TableCell>
                    <TableCell>Supplier</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStocks.map((stock) => (
                    <TableRow key={stock.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedStocks.find((s) => s.id === stock.id) !== undefined}
                          onChange={() => handleCheckboxChange(stock)}
                        />
                      </TableCell>
                      <TableCell> 
                        <img
                          src={`data:image/png;base64,${stock["image_data"]}`}
                          alt="Stock"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      </TableCell>
                      <TableCell>{stock["Item name"]}</TableCell>
                      <TableCell>{stock.sku}</TableCell>
                      <TableCell>{stock.Category}</TableCell>
                      <TableCell>{stock.brand}</TableCell>
                      <TableCell>{stock["Net Vol/Qty."]}</TableCell>
                      <TableCell>{stock.supplier}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box mt={3}>
              <Button type="submit" variant="contained" color="primary">
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

      {successMessage && (
        <Typography color="green" mt={2}>
          {successMessage}
        </Typography>
      )}
    </div>
  );
}
