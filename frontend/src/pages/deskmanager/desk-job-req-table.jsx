import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

function JobRequisitionTable() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);

  const handleOpenMenu = (event, job) => {
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };

  const handleOpenDescriptionModal = () => {
    setOpenDescriptionModal(true);
    handleCloseMenu(); // Close the menu when opening the modal
  };

  const handleCloseDescriptionModal = () => {
    setOpenDescriptionModal(false);
  };

  const handleApproveJobRequisition = () => {
    alert(`Approved Job Requisition for: ${selectedJob?.title}`);
    handleCloseMenu();
  };

  const handleDeclineJobRequisition = () => {
    alert(`Declined Job Requisition for: ${selectedJob?.title}`);
    handleCloseMenu();
  };

  const jobRequisitions = [
    {
      title: 'Software Engineer',
      department: 'IT',
      requestedBy: 'John Doe',
      preApprovedBy: 'Jane Smith',
      acceptedBy: 'Michael Johnson',
      date: '2024-12-08',
      status: 'Pending',
      description: 'Develop, test, and maintain software applications.',
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      requestedBy: 'Alice Brown',
      preApprovedBy: 'Chris Green',
      acceptedBy: 'Emma White',
      date: '2024-11-30',
      status: 'Accepted',
      description: 'Plan and execute marketing strategies to boost brand awareness.',
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Job Requisitions</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell>Requested by</TableCell>
            <TableCell>Pre-approved by</TableCell>
            <TableCell>Accepted by</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobRequisitions.length > 0 ? (
            jobRequisitions.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{job.requestedBy}</TableCell>
                <TableCell>{job.preApprovedBy}</TableCell>
                <TableCell>{job.acceptedBy}</TableCell>
                <TableCell>{job.date}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: job.status === 'Accepted' ? 'green' : 'orange',
                    }}
                  >
                    {job.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={(event) => handleOpenMenu(event, job)}
                  >
                    View More
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No Job Requisitions Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Menu for View More */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleApproveJobRequisition}>
          <IconButton color="success">
            <CheckCircleIcon />
          </IconButton>
          Approve Job Requisition
        </MenuItem>
        <MenuItem onClick={handleDeclineJobRequisition}>
          <IconButton color="error">
            <CancelIcon />
          </IconButton>
          Decline Job Requisition
        </MenuItem>
        <MenuItem onClick={handleOpenDescriptionModal}>
        <IconButton color="primary">
          <ReceiptLongIcon fontSize="small" />
          </IconButton>
          <Button variant="text">View Job Description</Button>
        </MenuItem>
      </Menu>

      {/* Modal for Job Description */}
      <Dialog
        open={openDescriptionModal}
        onClose={handleCloseDescriptionModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Job Description</DialogTitle>
        <DialogContent>
          <Typography>
            {selectedJob?.description || 'No description available.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDescriptionModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 

export default JobRequisitionTable;
