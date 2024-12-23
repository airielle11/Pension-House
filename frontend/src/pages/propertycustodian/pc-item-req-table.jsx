import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Paper,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import UploadAcknowledgement from '../dashboard/upload-acknowledgement'; // import the UploadAcknowledgement component
import DownloadReceipt from '../dashboard/download-receipt'; // import the DownloadReceipt component

function ProductRequisitionTable({ productRequisitions, hideGoBackButton = false }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleOpenModal = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setModalContent(null);
    setOpenModal(false);
  };

  const handleMarkAsUnavailable = () => {
    alert(`Marked Requisition for ${selectedProduct?.requestedBy} as Unavailable`);
    handleCloseMenu();
  };

  const handleMarkAsAvailable = () => {
    alert(`Marked Requisition for ${selectedProduct?.requestedBy} as Available`);
    handleCloseMenu();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Item Requisitions
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Requested by</TableCell>
              <TableCell>Pre-approved by (Head Housekeeper)</TableCell>
              <TableCell>Post-approved by (Desk Management)</TableCell>
              <TableCell>Accepted by (Property Management)</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(productRequisitions) && productRequisitions.length > 0 ? (
              productRequisitions.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.requestedBy}</TableCell>
                  <TableCell>{product.preApprovedBy || 'N/A'}</TableCell>
                  <TableCell>{product.postApprovedBy || 'N/A'}</TableCell>
                  <TableCell>{product.acceptedBy || 'N/A'}</TableCell>
                  <TableCell>{product.date}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: product.status === 'Accepted' ? 'green' : 'orange',
                      }}
                    >
                      {product.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={(event) => handleMenuClick(event, product)}
                    >
                      View more
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleCloseMenu();
                          handleOpenModal(<UploadAcknowledgement />);
                        }}
                      >
                        <IconButton color="primary">
                          <UploadFileIcon />
                        </IconButton>
                        Upload Acknowledgement Receipt
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleCloseMenu();
                          handleOpenModal(<DownloadReceipt />);
                        }}
                      >
                        <IconButton color="primary">
                          <FileDownloadIcon />
                        </IconButton>
                        Download Acknowledgement Receipt Template
                      </MenuItem>
                      <MenuItem>
                      <IconButton color="primary">
                          <VisibilityIcon />
                        </IconButton>
                        View Acknowledgement Receipt
                      </MenuItem>
                      <MenuItem onClick={handleMarkAsAvailable}>
                        <IconButton color="success">
                          <CheckCircleIcon />
                        </IconButton>
                        Mark as Available
                      </MenuItem>
                      <MenuItem onClick={handleMarkAsUnavailable}>
                        <IconButton color="error">
                          <CancelIcon />
                        </IconButton>
                        Mark as Unavailable
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Product Requisitions Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Modal for dynamic content */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            {modalContent}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default function App() {
  const sampleData = [
    {
      requestedBy: 'John Doe',
      preApprovedBy: 'N/A',
      postApprovedBy: 'Jane Smith',
      acceptedBy: 'Robert Johnson',
      date: '2024-12-01',
      status: 'Accepted',
    },
    {
      requestedBy: 'Alice Green',
      preApprovedBy: 'N/A',
      postApprovedBy: 'Michael Brown',
      acceptedBy: 'Sarah White',
      date: '2024-12-02',
      status: 'Pending',
    },
  ];

  return <ProductRequisitionTable productRequisitions={sampleData} hideGoBackButton />;
}
