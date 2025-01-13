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
import RRTable from './rr-table'; // Importing the RRTable component
import Dropdown from './Dropdown';
import ItemRequisitionTable from './ItemRequisitionTable'; // Import Product Requisition Table
import JobRequisitionTable from './JobRequisitionTable'; // Import Job Requisition Table

// Reusable Analytics Card Component
function AnalyticCard({ title, count, percentage, extra, onClick }) {
  return (
<<<<<<< Updated upstream
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
=======
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Default Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <UniqueVisitorCard />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <SaleReportCard />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
>>>>>>> Stashed changes
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
  const [hideAnalytics, setHideAnalytics] = useState(false); // New state to hide analytics

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

  // Handle hiding analytics
  const handleHideAnalytics = (shouldHide) => {
    setHideAnalytics(shouldHide);
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


                {/* Conditionally render the analytics cards */}
                {!hideAnalytics && (
                  <Grid container item xs={12} spacing={4}>
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
                            <Typography variant="h5"><br /></Typography>
                            <Typography variant="subtitle2" sx={{ color: 'gray', mt: 1 }}>
                              Click to Generate IR
                            </Typography>
                          </CardContent>
                        </Card>
                      </Button>
                    </Grid>
                  </Grid>
                )}

                {/* Initial Requests Section */}
                <Grid item xs={12}>
                  <RRTable
                    requests={requests}
                    setHideAnalytics={handleHideAnalytics} // Pass the function to hide analytics
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
