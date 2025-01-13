import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Material-UI components
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Swal from 'sweetalert2';


function JobRequisitionTable() {
  // State variables
  const [productRequisitions, setProductRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');

  // Fetch job requisitions on component mount
  useEffect(() => {
    fetchJobRequisitions();
  }, []);

  // Function to fetch job requisitions
  const fetchJobRequisitions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-job-requisitions/`
      );
      const requisitions = response.data.requisition || [];
      setProductRequisitions(requisitions);
    } catch (err) {
      console.error('Error fetching job requisitions:', err);
      setError('Job requisition is empty.');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptJob = async () => {
    if (!selectedJob?.ID) {
      Swal.fire({
        icon: 'warning',
        title: 'No Job Selected',
        text: 'Please select a job to accept.',
      });
      return;
    }
  
    Swal.fire({
      title: 'Confirm Action',
      text: `Are you sure you want to accept Job Requisition ID ${selectedJob.ID}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/accept-job/`,
            {
              job_requisition_id: selectedJob.ID, // Pass the job ID
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          if (response.data.status === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Job Accepted',
              text: 'The job requisition has been accepted successfully.',
            });
            fetchJobRequisitions(); // Refresh data
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Failed to Accept Job',
              text: response.data.message || 'An error occurred.',
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'An unexpected error occurred.',
          });
        }
      }
    });
  
    handleCloseMenu();
  };
  

  // Menu handlers
  const handleOpenMenu = (event, job) => {
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };

  // Modal handlers
  const handleOpenAttachModal = (job) => {
    if (!job) {
      console.error('Job is undefined or null');
      Swal.fire({
        icon: 'warning',
        title: 'No Job Selected',
        text: 'Please select a job to attach.',
      });
      return;
    }
    setSelectedJob(job);
    setJobDescription(''); // Clear the description field
    setIsAttachModalOpen(true);
  };
  

  const handleCloseAttachModal = () => {
    setIsAttachModalOpen(false);
    setJobDescription('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to view attached job
  const handleViewAttachedJob = async () => {
    if (!selectedJob?.ID) {
      alert('No job selected!');
      return;
    }
  
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-attached-job/`,
        {
          params: { job_requisition_id: selectedJob.ID },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('API Response:', response.data);
  
      if (response.data.data) {
        setJobDescription(response.data.data);
      } else {
        setJobDescription('No attached job found.');
      }
  
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching attached job:', error.response || error);
      setJobDescription(
        error.response?.data?.message || 'Failed to fetch the attached job.'
      );
      setIsModalOpen(true);
    }
  
    handleCloseMenu();
  };
  
  
  const handleAttachJob = async () => {
    if (!selectedJob?.ID) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No job selected. Please try again.',
      });
      return;
    }
  
    if (selectedJob['Job attachment by']) {
      // Close the modal before showing the alert
      handleCloseAttachModal();
      Swal.fire({
        icon: 'warning',
        title: 'Job Already Attached',
        text: 'This job requisition already has an attached job. Please remove it first to attach a new one.',
      });
      return;
    }
  
    if (jobDescription.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Description',
        text: 'Please enter a job description.',
      });
      return;
    }
  
    const payload = {
      job_requisition_id: Number(selectedJob.ID),
      job_description: jobDescription.trim(),
    };
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/requisitions-attach-job/`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Job Attached',
          text: response.data.message,
        });
        setIsAttachModalOpen(false);
        setJobDescription('');
        setSelectedJob(null);
        fetchJobRequisitions(); // Refresh the data after attaching the job
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Attach Job',
          text: response.data.message || 'An error occurred.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'An error occurred.',
      });
    }
  };
  
  
  

  // Function to approve job requisition
  const handleApproveJobRequisition = async () => {
    if (!selectedJob || !selectedJob.ID) {
      alert('Invalid job selection!');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/approve-decline-job/`,
        {
          action_type: 1, // ApproveA
          job_requisition_id: selectedJob.ID,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Job requisition approved successfully.');
        fetchJobRequisitions(); // Refresh data
      } else {
        alert(response.data.message || 'Failed to approve job requisition.');
      }
    } catch (error) {
      console.error('Error approving job requisition:', error);
      alert('An error occurred while approving the job requisition.');
    }

    handleCloseMenu();
  };

  // Function to decline job requisition
  const handleDeclineJobRequisition = async () => {
    if (!selectedJob) {
      Swal.fire({
        icon: 'warning',
        title: 'No Job Selected',
        text: 'Please select a job to decline.',
      });
      return;
    }
  
    const { value: rejectionNote } = await Swal.fire({
      title: 'Decline Job Requisition',
      input: 'textarea',
      inputLabel: 'Reason for Declining (optional)',
      inputPlaceholder: 'Type your reason here...',
      showCancelButton: true,
    });
  
    if (rejectionNote === null) return; // User canceled
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/approve-decline-job/`,
        {
          action_type: 2, // Decline
          job_requisition_id: selectedJob.ID,
          p_rejection_note: rejectionNote,
        }
      );
  
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Job Requisition Declined',
          text: 'The job requisition has been declined successfully.',
        });
        fetchJobRequisitions();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Decline Failed',
          text: response.data.message || 'Failed to decline the job requisition.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while declining the job requisition.',
      });
    }
  };
  

  // Conditional rendering based on loading and error state
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Job Requisitions</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Created by</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Room No.</TableCell>
            <TableCell>Room Type</TableCell>
            <TableCell>Priority Level</TableCell>
            <TableCell>Job attachment by</TableCell>
            <TableCell>Approved by</TableCell>
            <TableCell>Accepted by</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productRequisitions.length > 0 ? (
            productRequisitions.map((product, index) => (
              <TableRow key={index}>
              <TableCell>{product.ID}</TableCell>
              <TableCell>{product['Created by']}</TableCell>
              <TableCell>{product.Date}</TableCell>
              <TableCell>{product['Room No.']}</TableCell>
              <TableCell>{product['Room Type']}</TableCell>
              <TableCell>{product['Priority Level']}</TableCell>
              <TableCell>{product['Job attachment by']}</TableCell>
              <TableCell>{product['Approved by']}</TableCell>
              <TableCell>{product['Accepted by']}</TableCell>
              <TableCell>
                <Typography
                  sx={{
                    color:
                      product.status === 'Accepted'
                        ? 'green'
                        : product.status === 'Declined'
                        ? 'red'
                        : 'orange',
                  }}
                >
                  {product.status}
                </Typography>
              </TableCell>
              <TableCell>
                <Button
                  variant="text"
                  color="primary"
                  onClick={(event) => handleOpenMenu(event, product)} // Set selectedJob here
                >
                  View More
                </Button>
              </TableCell>
            </TableRow>
            
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} align="center">
                No Job Requisitions Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Action Menu */}
      <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleCloseMenu}
>
  <MenuItem onClick={() => handleOpenAttachModal(selectedJob)}>
    <IconButton color="primary">
      <EditIcon />
    </IconButton>
    Attach Job
  </MenuItem>
  <MenuItem onClick={handleViewAttachedJob}>
    <IconButton color="primary">
      <EditIcon />
    </IconButton>
    View Attached Job
  </MenuItem>
  <MenuItem onClick={handleApproveJobRequisition}>
    <IconButton color="secondary">
      <CheckCircleIcon />
    </IconButton>
    Approve Job Requisition
  </MenuItem>
  <MenuItem onClick={handleDeclineJobRequisition}>
    <IconButton color="error">
      <CheckCircleIcon />
    </IconButton>
    Decline Job Requisition
  </MenuItem>
  <MenuItem onClick={handleAcceptJob}>
  <IconButton color="success">
    <CheckCircleIcon />
  </IconButton>
  Accept Job
</MenuItem>

</Menu>

      {/* Dialog for viewing job description */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth>
        <DialogTitle>Job Description</DialogTitle>
        <DialogContent>
          <Typography>
            {jobDescription || 'No description available.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for attaching a job */}
      <Dialog
        open={isAttachModalOpen}
        onClose={handleCloseAttachModal}
        fullWidth
      >
        <DialogTitle>Attach Job</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAttachModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAttachJob} color="primary">
            Attach
          </Button>
        </DialogActions>
        
      </Dialog>
    </Box>
  );
}

export default JobRequisitionTable;
