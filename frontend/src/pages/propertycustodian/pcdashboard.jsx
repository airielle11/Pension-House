import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import RRTable from '../dashboard/rr-table'; // Importing the RRTable component
import Dropdown from '../dashboard/Dropdown';
import ItemRequisitionTable from '../dashboard/ItemRequisitionTable'; // Import Product Requisition Table
import JobRequisitionTable from '../dashboard/JobRequisitionTable'; // Import Job Requisition Table

// Reusable Analytics Card Component
function AnalyticCard({ title, count, percentage, extra }) {
  return (
    <Card sx={{ width: '100%', p: 2, backgroundColor: 'white', boxShadow: 1, borderRadius: 2, '&:hover': { boxShadow: 3 } }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{count}</Typography>
        <Typography
          variant="subtitle2"
          sx={{ color: percentage > 0 ? 'green' : 'red' }}
        >
          Details
        </Typography>
      </CardContent>
    </Card>
  );
}

// Main Dashboard Component
export default function DashboardDefault() {
  const [requests, setRequests] = useState([]); // State for requests data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [hideAnalytics, setHideAnalytics] = useState(false); // New state to hide analytics

  useEffect(() => {
    // Fetch data from backend
    axios
      .get(`${import.meta.env.VITE_API_URL}/get-rooms`) // Update to match your API endpoint
      .then((response) => {
        const items = response.data?.items || []; // Optional chaining and fallback
        setRequests(items); // Update requests state
        setLoading(false); // Data loading complete
      })
      .catch((err) => {
        setError('No Current Rooms Registered.');
        console.error('Error fetching rooms:', err);
        setLoading(false); // Ensure loading stops even on error
      });
  }, []);

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
            {/* Conditionally render the analytics cards */}
            {!hideAnalytics && (
              <Grid container item xs={12} spacing={4}>
                <Grid item xs={12} sm={4} md={3}>
                  <AnalyticCard
                    title="Total number of staff"
                    count="15"
                    percentage={12}
                    extra="more than last quarter"
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <AnalyticCard
                    title="Pending Requests"
                    count="3"
                    percentage={-0.2}
                    extra="lower than last quarter"
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <AnalyticCard
                    title="Accepted Requests"
                    count="1"
                    percentage={2}
                    extra="more than last quarter"
                  />
                </Grid>
              </Grid>
            )}

            {/* Initial Requests Section */}
            <Grid item xs={12}>
              {loading ? (
                <Typography variant="h6" textAlign="center">
                  Loading...
                </Typography>
              ) : error ? (
                <Typography variant="h6" textAlign="center" color="error">
                  {error}
                </Typography>
              ) : (
                <RRTable
                  requests={requests}
                  setHideAnalytics={handleHideAnalytics} // Pass the function to hide analytics
                />
              )}
            </Grid>
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
