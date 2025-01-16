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
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import style from "../../users/Styles.module.css";

export default function PurchaseOrderForm() {
  const [open, setOpen] = useState(false);
  const [stocks, setStocks] = useState([]); // All stocks
  const [filteredStocks, setFilteredStocks] = useState([]); // Filtered stocks
  const [selectedStocks, setSelectedStocks] = useState([]); // Selected stocks
  const [selectedSupplier, setSelectedSupplier] = useState(""); // Selected supplier for filtering
  const [successMessage, setSuccessMessage] = useState(null);
  const [userRole, setUserRole] = useState(""); // User's role
  const [loadingStocks, setLoadingStocks] = useState(false); // Loading state

  // Modal visibility handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch stocks from the backend
  useEffect(() => {
    async function fetchStocks() {
      setLoadingStocks(true); // Start loading
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/stocks_for_po/`
        );
        if (response.data.success) {
          setStocks(response.data.data); // Set stocks from backend
          setFilteredStocks(response.data.data); // Set initial filtered stocks
        } else {
          console.error("Failed to fetch stocks:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoadingStocks(false); // Stop loading
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
    const existingStock = selectedStocks.find((s) => s.id === stock.id);

    if (existingStock) {
      // Remove stock from selection if already selected
      setSelectedStocks(selectedStocks.filter((s) => s.id !== stock.id));
    } else {
      // Add stock to selection with default quantity of 1
      setSelectedStocks([...selectedStocks, { ...stock, qty: 1 }]);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (stockId, quantity) => {
    setSelectedStocks((prevSelected) =>
      prevSelected.map((s) =>
        s.id === stockId ? { ...s, qty: parseInt(quantity, 10) || 1 } : s
      )
    );
  };

  // Submit purchase order
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create_purchase_order/`,
        {
          items: selectedStocks.map((stock) => ({
            item_id: stock.id,
            qty: stock.qty || 1,
          })), // Default quantity to 1 if not specified
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: "Success",
          text: response.data.message || "Successfully added purchase order.",
          icon: "success",
          customClass: {
            container: style.swalContainer,
          },
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleClose();
          }
        });

        setSelectedStocks([]); // Reset selections
        handleClose(); // Close modal
      } else {
        Swal.fire({
          title: "Error",
          text:
            response.data.message ||
            "An error has occurred. Try to check if items are from the same supplier.",
          icon: "error",
          customClass: {
            container: style.swalContainer,
          },
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error creating purchase order:",
        icon: "error",
        customClass: {
          container: style.swalContainer,
        },
        confirmButtonText: "OK",
      });
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
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
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
            maxHeight: "80vh", // Limit height to make it scrollable
            overflowY: "auto", // Enable scrolling when content overflows
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
            Select Items...
          </Typography>

          {/* Display Loading Indicator */}
          {loadingStocks ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px", // Adjust height as needed
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
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
                        <TableCell>Quantity</TableCell>{" "}
                        {/* New Quantity Column */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredStocks.map((stock) => (
                        <TableRow key={stock.id}>
                          <TableCell>
                            <Checkbox
                              checked={
                                selectedStocks.find(
                                  (s) => s.id === stock.id
                                ) !== undefined
                              }
                              onChange={() => handleCheckboxChange(stock)}
                            />
                          </TableCell>
                          <TableCell>
                            <img
                              src={`data:image/png;base64,${stock["image_data"]}`}
                              alt="Stock"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                          </TableCell>
                          <TableCell>{stock["Item name"]}</TableCell>
                          <TableCell>{stock.sku}</TableCell>
                          <TableCell>{stock.Category}</TableCell>
                          <TableCell>{stock.brand}</TableCell>
                          <TableCell>{stock["Net Vol/Qty."]}</TableCell>
                          <TableCell>{stock.supplier}</TableCell>
                          <TableCell>
                            {/* Quantity Input Field */}
                            <input
                              type="number"
                              min="1"
                              value={
                                selectedStocks.find((s) => s.id === stock.id)
                                  ?.qty || 1
                              }
                              onChange={(e) => {
                                const qty = parseInt(e.target.value, 10) || 1;
                                setSelectedStocks((prev) =>
                                  prev.map((s) =>
                                    s.id === stock.id ? { ...s, qty } : s
                                  )
                                );
                              }}
                              style={{ width: "60px" }}
                            />
                          </TableCell>
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
            </>
          )}
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
