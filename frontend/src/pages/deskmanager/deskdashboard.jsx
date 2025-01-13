import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RRTable from './desk-rr-table'; // Importing the RRTable component
import Dropdown from '../dashboard/Dropdown';
import ItemRequisitionTable from './desk-item-req-table'; // Import Product Requisition Table
import JobRequisitionTable from './desk-job-req-table'; // Import Job Requisition Table

// Main Dashboard Component
export default function DashboardDefault() {
  const [showGenerateIRF, setShowGenerateIRF] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Sample data for table
  const requests = [
    {
      id: 1,
      roomNo: 101,
      roomType: 'Family',
      floorNo: 'John DoEe',
      requestedBy: 'Otor John Stephen',
      date: '21/11/2022',
      status: 'Pending',
    },
    {
      id: 2,
      roomNo: 203,
      roomType: 'Family',
      floorNo: 'Melisa Mores',
      requestedBy: 'Otor John Stephen',
      date: '21/11/2022',
      status: 'Pending',
    },
    {
      id: 3,
      roomNo: 302,
      roomType: 'Twin',
      floorNo: '360,000.00',
      requestedBy: 'Otor John Stephen',
      date: '21/11/2022',
      status: 'Accepted',
    },
  ];

  const handleGenerateInitial = () => {
    setOpenModal(true); // Open confirmation modal
  };

  const handleModalClose = () => {
    setOpenModal(false); // Close the modal
  };

  const handleModalConfirm = () => {
    setOpenModal(false); // Close modal
    setShowGenerateIRF(true); // Show IRF generation form
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Grid container spacing={4}>
            <Dialog open={openModal} onClose={handleModalClose}>
              <DialogTitle>Confirm Request</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to proceed with generating a request?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleModalConfirm} variant="contained" color="primary">
                  Yes, Proceed
                </Button>
              </DialogActions>
            </Dialog>

            {showGenerateIRF ? (
              <Dropdown setShowDashboard={setShowGenerateIRF} />
            ) : (
              <>
                <Grid item xs={12}>
                  <RRTable
                    requests={requests}
                  />
                </Grid>
              </>
            )}
          </Grid>
        }
      />

      {/* Other Routes */}
      <Route
        path="/product-requisition"
        element={
          <Grid item xs={12}>
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>
              <Link to="/" style={{ color: 'white' }}>Go Back</Link>
            </Button>
            <ItemRequisitionTable /> {/* Display the ItemRequisitionTable */}
          </Grid>
        }
      />

      <Route
        path="/job-requisition"
        element={
          <Grid item xs={12}>
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>
              <Link to="/" style={{ color: 'white' }}>Go Back</Link>
            </Button>
            <JobRequisitionTable /> {/* Display the JobRequisitionTable */}
          </Grid>
        }
      />
    </Routes>
  );
}
