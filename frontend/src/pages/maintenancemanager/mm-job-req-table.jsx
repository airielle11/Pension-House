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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

function JobRequisitionTable() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenMenu = (event, job) => {
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };

  const handleViewJobDescription = () => {
    setIsModalOpen(true);
    handleCloseMenu();
  };

  const handleAcceptRequest = () => {
    alert(`Accepted Request for ${selectedJob?.title}`);
    handleCloseMenu();
  };

  const handleMarkJobAsFinished = () => {
    alert(`Marked Job ${selectedJob?.title} as Finished`);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const jobRequisitions = [
    {
      requestedBy: 'John Doe',
      preApprovedBy: 'Jane Smith',
      acceptedBy: 'Michael Johnson',
      date: '2024-12-08',
      status: 'Pending',
      description:
        'This role involves developing, testing, and maintaining software applications for our IT department.',
    },
    {
      requestedBy: 'Alice Brown',
      preApprovedBy: 'Chris Green',
      acceptedBy: 'Emma White',
      date: '2024-11-30',
      status: 'Accepted',
      description:
        'This position requires overseeing marketing campaigns and managing a team to boost brand awareness.',
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
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
                <TableCell colSpan={7} align="center">
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
          PaperProps={{
            style: {
              padding: '10px',
              borderRadius: '10px',
            },
          }}
        >
          <MenuItem onClick={handleViewJobDescription}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Job Description</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleAcceptRequest}>
            <ListItemIcon>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Accept Request</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMarkJobAsFinished}>
            <ListItemIcon>
              <DoneAllIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mark Job as Finished</ListItemText>
          </MenuItem>
        </Menu>

        {/* Modal for Job Description */}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="job-description-title"
          aria-describedby="job-description-content"
        >
          <Paper sx={modalStyle}>
            <Typography id="job-description-title" variant="h6" component="h2">
              {selectedJob?.title}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <strong>Requested By:</strong> {selectedJob?.requestedBy}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Description:</strong> {selectedJob?.description}
            </Typography>
            <Button
              sx={{ mt: 3 }}
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Paper>
        </Modal>
      </Paper>
    </Box>
  );
}

export default JobRequisitionTable;
