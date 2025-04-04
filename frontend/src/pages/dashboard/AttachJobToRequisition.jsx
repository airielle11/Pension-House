import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
} from '@mui/material';

function AttachJobToRequisition({ selectedProduct }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the available jobs that can be attached
    axios
      .get(`${import.meta.env.VITE_API_URL}/requisitions-attach-job`)
      .then((response) => {
        setJobs(response.data.jobs || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch jobs.');
        setLoading(false);
      });
  }, []);

  const handleAttachJob = (jobId) => {
    // Logic to attach the job to the requisition
    axios
      .post(`${import.meta.env.VITE_API_URL}/attach-job-to-requisition`, {
        requisitionId: selectedProduct.ID,
        jobId,
      })
      .then((response) => {
        alert('Job attached successfully!');
      })
      .catch((err) => {
        alert('Failed to attach job.');
      });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading jobs...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Attach Jobs to Requisition - {selectedProduct.ID}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Job Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <TableRow key={job.ID}>
                  <TableCell>{job.ID}</TableCell>
                  <TableCell>{job.name}</TableCell>
                  <TableCell>{job.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleAttachJob(job.ID)}
                    >
                      Attach Job
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No jobs available to attach.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default AttachJobToRequisition;
