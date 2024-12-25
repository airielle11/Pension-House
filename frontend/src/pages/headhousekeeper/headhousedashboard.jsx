import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import RRTable from './headhouse-rr-table'; // Importing the RRTable component
import ItemRequisitionTable from '../dashboard/ItemRequisitionTable'; // Import Product Requisition Table
import JobRequisitionTable from '../dashboard/JobRequisitionTable'; // Import Job Requisition Table

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
            <>
              {/* Conditionally render the analytics cards */}
              {!hideAnalytics && (
                <Grid container item xs={12} spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <AnalyticCard
                      title="Total number of staff"
                      count="250"
                      percentage={12}
                      extra="more than last quarter"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <AnalyticCard
                      title="Pending Requests"
                      count="100"
                      percentage={-0.2}
                      extra="lower than last quarter"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <AnalyticCard
                      title="Accepted Requests"
                      count="10"
                      percentage={2}
                      extra="more than last quarter"
                    />
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
