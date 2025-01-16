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
  const [userRole, setUserRole] = useState(null);

useEffect(() => {
  const fetchUserRole = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/identify-view-more/`);
      if (response.data.status === 'success') {
        setUserRole(response.data.data); // Store the role as an integer
      } else {
        console.error('Failed to fetch user role:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  fetchUserRole();
}, []);



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


  const handleMarkAsComplete = async () => {
    if (!selectedJob?.ID) {
      Swal.fire({
        icon: 'warning',
        title: 'No Job Selected',
        text: 'Please select a job to mark as complete.',
      });
      return;
    }
  
    Swal.fire({
      title: 'Confirm Action',
      text: `Are you sure you want to mark Job Requisition ID ${selectedJob.ID} as complete?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Mark as Complete',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/mark-job-as-completed/`,
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
              title: 'Job Marked as Complete',
              text: 'The job requisition has been marked as complete successfully.',
            });
            fetchJobRequisitions(); // Refresh data
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Success in Marking Requisition',
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
              icon: 'success',
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
  
    if (typeof selectedJob['Job attachment by'] === 'string' && selectedJob['Job attachment by'].trim() !== '') {
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
      job_requisition_id: Number(selectedJob.ID), // Ensure this is correct
      job_description: jobDescription.trim(),    // Ensure this is not empty
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
    
      if (response.data.success || response.data.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Job Attached Successfully',
          text: response.data.message,
        });
        setIsAttachModalOpen(false);
        setJobDescription('');
        setSelectedJob(null);
        fetchJobRequisitions(); // Refresh the data
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Attach Job',
          text: response.data.message || 'An error occurred while attaching the job.',
        });
      }
    } catch (error) {
      // Log error details for debugging
      console.error("API Error:", error);
    
      // Handle error gracefully
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: error.response?.data?.message || 'An unexpected error occurred.',
      });
    }
  }    
  
  
  
  

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
// Function to decline job requisition
const handleDeclineJobRequisition = async () => {
  if (!selectedJob) {
    console.warn('No job selected. Please select a job to decline.');
    return;
  }

  const rejectionNote = prompt('Reason for Declining (optional):', 'Type your reason here...');
  
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
      console.log('The job requisition has been declined successfully.');
      fetchJobRequisitions();
    } else {
      console.error(response.data.message || 'Failed to decline the job requisition.');
    }
  } catch (error) {
    console.error('An error occurred while declining the job requisition.');
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
                    product['Status:'] === 'Accepted'
                        ? 'green'
                        : product['Status:'] === 'Declined'
                        ? 'red'
                        : 'orange',
                  }}
                >
                  {product['Status:']}
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
  {/* Role 1: View Attach Job, Approve Job */}
  {userRole === 1 && [
    <MenuItem key="view-attached-job" onClick={handleViewAttachedJob}>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
      View Attached Job
    </MenuItem>,
    <MenuItem key="approve-job-requisition" onClick={handleApproveJobRequisition}>
      <IconButton color="secondary">
        <CheckCircleIcon />
      </IconButton>
      Approve Job Requisition
    </MenuItem>,
  ]}

  {/* Role 2: Attach Job, View Attach Job */}
  {userRole === 2 && [
    <MenuItem key="attach-job" onClick={() => handleOpenAttachModal(selectedJob)}>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
      Attach Job
    </MenuItem>,
    <MenuItem key="view-attached-job" onClick={handleViewAttachedJob}>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
      View Attached Job
    </MenuItem>,
  ]}

  {/* Role 3: View Attach Job, Accept Job, Mark as Complete */}
  {userRole === 3 && [
    <MenuItem key="view-attached-job" onClick={handleViewAttachedJob}>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
      View Attached Job
    </MenuItem>,
    <MenuItem key="accept-job" onClick={handleAcceptJob}>
      <IconButton color="success">
        <CheckCircleIcon />
      </IconButton>
      Accept Job
    </MenuItem>,
    <MenuItem key="mark-complete" onClick={handleMarkAsComplete}>
      <IconButton color="primary">
        <CheckCircleIcon />
      </IconButton>
      Mark as Complete
    </MenuItem>,
  ]}

  {/* Role 6: Attach Job, View Attach Job, Approve Job */}
  {userRole === 6 && [
    <MenuItem key="attach-job" onClick={() => handleOpenAttachModal(selectedJob)}>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
      Attach Job
    </MenuItem>,
    <MenuItem key="view-attached-job" onClick={handleViewAttachedJob}>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
      View Attached Job
    </MenuItem>,
    <MenuItem key="approve-job-requisition" onClick={handleApproveJobRequisition}>
      <IconButton color="secondary">
        <CheckCircleIcon />
      </IconButton>
      Approve Job Requisition
    </MenuItem>,
  ]}
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