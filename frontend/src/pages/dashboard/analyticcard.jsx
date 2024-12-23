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
import Dropdown from './Dropdown';
import ItemRequisitionTable from './ItemRequisitionTable'; // Import Product Requisition Table
import JobRequisitionTable from './JobRequisitionTable'; // Import Job Requisition Table

// Reusable Analytics Card Component
function AnalyticCard({ title, count, percentage, extra, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        p: 0,
        textAlign: 'center',
        width: '100%',
        backgroundColor: 'white',
        boxShadow: 1,
        borderRadius: 2,
        '&:hover': { boxShadow: 3 },
      }}
    >
      <Card sx={{ width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h4">{count}</Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: percentage > 0 ? 'green' : 'red' }}
          >
            {percentage > 0 ? '↑' : '↓'} {Math.abs(percentage)}% {extra}
          </Typography>
        </CardContent>
      </Card>
    </Button>
  );
}

// Main Dashboard Component
export default function DashboardDefault() {
  const [showGenerateIRF, setShowGenerateIRF] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hideAnalytics, setHideAnalytics] = useState(false);

  // Sample data for table
  const requests = [
    {
      id: 1,
      roomNo: 101,
      roomType: 'Family',
      floorNo: 'John Doe',
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
            {/* Dialog Modal */}
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

            {/* Render Dropdown or Analytics */}
            {showGenerateIRF ? (
              <Dropdown setShowDashboard={setShowGenerateIRF} />
            ) : (
              <>
                {!hideAnalytics && (
                  <Grid container item xs={12} spacing={4}>
                    <Grid item xs={10} sm={3}>
                      <AnalyticCard
                        title="Total number of staff"
                        count="250"
                        percentage={12}
                        extra="more than last quarter"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <AnalyticCard
                        title="Pending Requests"
                        count="100"
                        percentage={-0.2}
                        extra="lower than last quarter"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <AnalyticCard
                        title="Accepted Requests"
                        count="10"
                        percentage={2}
                        extra="more than last quarter"
                      />
                    </Grid>
                    <Grid item xs={13} sm={3}>
                      <Button
                        onClick={handleGenerateInitial}
                        sx={{
                          p: 0,
                          textAlign: 'center',
                          width: '100%',
                          backgroundColor: 'white',
                          boxShadow: 1,
                          borderRadius: 2,
                          '&:hover': { boxShadow: 3 },
                        }}
                      >
                        <Card sx={{ width: '100%', p: 2 }}>
                          <CardContent>
                            <Typography variant="h6">Generate Initial Request</Typography>
                            <Typography variant="h5"></Typography>
                            <Typography variant="subtitle2" sx={{ color: 'gray', mt: 1 }}>
                              Click to Generate IR
                            </Typography>
                          </CardContent>
                        </Card>
                      </Button>
                    </Grid>
                  </Grid>
                )}

                {/* Render Table */}

              </>
            )}
          </Grid>
        }
      />

      {/* Product Requisition Route */}
      <Route
        path="/product-requisition"
        element={
          <Grid item xs={12}>
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>
              <Link to="/" style={{ color: 'white' }}>Go Back</Link>
            </Button>
            <ItemRequisitionTable />
          </Grid>
        }
      />

      {/* Job Requisition Route */}
      <Route
        path="/job-requisition"
        element={
          <Grid item xs={12}>
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>
              <Link to="/" style={{ color: 'white' }}>Go Back</Link>
            </Button>
            <JobRequisitionTable />
          </Grid>
        }
      />
    </Routes>
  );
}
