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
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import style from "../../users/Styles.module.css";

export default function PurchaseOrderTable() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [selectedPurchaseOrderId, setSelectedPurchaseOrderId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [file, setFile] = useState(null);
  const [userRole, setUserRole] = useState(""); // State to store the user's role
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [poQuotationImages, setPoQuotationImages] = useState({}); // Store images

  const handleOpenImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
    setImageModalOpen(false);
  };

  // Fetch image URL for purchase order quotations
  const fetchPoQuotationsImage = async (quotation) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/quotations_image/?file_name=${quotation}`
      );

      if (response.ok) {
        const blob = await response.blob(); // Get binary data as a Blob
        const imageUrl = URL.createObjectURL(blob); // Convert Blob to a temporary URL
        return imageUrl;
      } else {
        console.error("Failed to fetch image, status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
    return null;
  };

  useEffect(() => {
    // Pre-fetch all images for purchase orders
    const fetchImages = async () => {
      const images = {};
      for (const order of purchaseOrders) {
        if (order["P.O w/ Price Quotations"]) {
          const imageUrl = await fetchPoQuotationsImage(
            order["P.O w/ Price Quotations"]
          );
          console.log('Order ID ${order.id} - Fetched image URL: ', imageUrl); // Log here
          if (imageUrl) images[order.id] = imageUrl;
        }
      }
      setPoQuotationImages(images);
    };

    fetchImages();
  }, [purchaseOrders]);

  // Fetch user role from localStorage once when the component mounts
  useEffect(() => {
    const role = localStorage.getItem("role") || "Unknown";
    setUserRole(role);
    console.log("User Role:", role); // This will print the role to the console
  }, []); // Empty array ensures this runs once when the component mounts

  // Fetch purchase orders data
  useEffect(() => {
    fetch('${import.meta.env.VITE_API_URL}/purchase_orders/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPurchaseOrders(data.data);
      })
      .catch((err) => console.error("Error fetching purchase orders:", err));
  }, []);

  const fetchPurchaseItems = (purchaseOrderId) => {
    fetch('${import.meta.env.VITE_API_URL}/purchase_items/${purchaseOrderId}/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSelectedOrderItems(data.data);
        } else {
          console.error("Error fetching items:", data.message);
        }
      })
      .catch((err) => console.error("Error fetching items:", err));
  };

  const handleViewItems = (purchaseOrderId) => {
    setSelectedPurchaseOrderId(purchaseOrderId);
    fetchPurchaseItems(purchaseOrderId);
    setModalOpen(true);
  };

  const handleUploadPriceQuotations = async () => {
    if (!file) {
      Swal.fire({
        title: "Error",
        text: "Please select a file before uploading.",
        icon: "error",
        customClass: {
          container: style.swalContainer,
        },
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("purchase_order_id", selectedPurchaseOrderId);
    formData.append("file_name", file);

    try {
      const response = await axios.post(
        '${import.meta.env.VITE_API_URL}/upload_po_with_quotations/',
        formData, // Send the form data with file and ID
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("response data: ", response.data);
        Swal.fire({
          title: "Success",
          text: response.data.message || "File uploaded successfully.",
          icon: "success",
          customClass: {
            container: style.swalContainer,
          },
          confirmButtonText: "OK",
        });
        setFile(null);
        setUploadModalOpen(false); // Close the upload modal
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message || "Failed to upload file.",
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
        text:
          error.response?.data?.message ||
          error.message ||
          "An error occurred.",
        icon: "error",
        customClass: {
          container: style.swalContainer,
        },
        confirmButtonText: "OK",
      });
    }
  };

  const handleOpenMenu = (event, purchaseOrderId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedPurchaseOrderId(purchaseOrderId);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrderItems([]);
  };

  const handleOpenUploadModal = () => {
    setUploadModalOpen(true); // Open the upload modal
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false); // Close the upload modal
  };

  return (
    <div>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>P.O w/ Price Quotations</TableCell>
              <TableCell>Delivery Receipt</TableCell>
              <TableCell>Receiving Memo</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Received by</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseOrders.length > 0 ? (
              purchaseOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order["Created by"]}</TableCell>
                  <TableCell>
                    {poQuotationImages[order.id] ? (
                      <img
                        src={poQuotationImages[order.id]}
                        alt={`P.O Quotation ${order.id}`}
                        style={{
                          width: 30,
                          height: 30,
                          objectFit: "contain",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleOpenImageModal(poQuotationImages[order.id])
                        }
                      />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>

                  <TableCell>{order["Delivery Receipt"] || "N/A"}</TableCell>
                  <TableCell>{order["Receiving Memo"] || "N/A"}</TableCell>
                  <TableCell>{order["Created at"]}</TableCell>
                  <TableCell>{order["Received by"] || "N/A"}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button onClick={(e) => handleOpenMenu(e, order.id)}>
                      More
                    </Button>
                    <Menu
                      anchorEl={menuAnchorEl}
                      open={
                        Boolean(menuAnchorEl) &&
                        selectedPurchaseOrderId === order.id
                      }
                      onClose={handleCloseMenu}
                    >
                      <MenuItem
                        onClick={() => {
                          handleCloseMenu();
                          handleViewItems(order.id);
                        }}
                      >
                        View Items
                      </MenuItem>

                      {userRole === "General Manager" && (
                        <MenuItem
                          onClick={() => {
                            handleCloseMenu();
                            handleOpenUploadModal(); // Open the upload modal
                          }}
                        >
                          Upload Price Quotations
                        </MenuItem>
                      )}
                      {userRole === "Property Custodian"   && (
                        <MenuItem
                          onClick={() => {
                            handleCloseMenu();
                            handleOpenUploadModal(); // Open the upload modal
                          }}
                        >
                          Upload Price Quotations
                        </MenuItem>
                      )}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No purchase orders currently available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for uploading price quotations */}
      <Modal open={uploadModalOpen} onClose={handleCloseUploadModal}>
        <Box sx={modalStyles}>
          <Typography variant="h6" component="h2">
            Upload Price Quotations
          </Typography>
          <Box sx={{ p: 2 }}>
            <Button variant="contained" component="label">
              Choose File
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
            {file && <Typography>{file.name}</Typography>}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCloseUploadModal} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleUploadPriceQuotations} variant="contained">
              Upload
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for enlarging images */}
      <Modal
        open={imageModalOpen}
        onClose={handleCloseImageModal}
        closeAfterTransition
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.😎",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
          onClick={handleCloseImageModal} // Close the modal when clicking outside
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Enlarged"
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            />
          )}
        </Box>
      </Modal>

      {/* Modal for viewing purchase items */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyles}>
          <Typography variant="h6" component="h2">
            Order ID: {selectedPurchaseOrderId}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SKU</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrderItems.length ? (
                selectedOrderItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item["unit price"] || "N/A"}</TableCell>
                    <TableCell>{item["total"] || "N/A"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No items available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleCloseModal} variant="contained">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  border: "1px solid #ccc",
  padding: "20px",
  boxShadow: 24,
};