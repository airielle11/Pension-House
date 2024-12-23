import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ItemRequisitionTable from './rh-item-req-table'; // Adjust path as necessary
import JobRequisitionTable from './rh-item-req-table';

function RRTable({ setHideAnalytics }) {
    const navigate = useNavigate(); // Initialize useNavigate
    const [anchorEl, setAnchorEl] = useState(null);
    const [view, setView] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [requisitionType, setRequisitionType] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewProduct = () => {
        setRequisitionType('product');
        setOpenModal(true);
        handleClose();
    };

    const handleViewJob = () => {
        setRequisitionType('job');
        setOpenModal(true);
        handleClose();
    };

    const handleCreateRequisitionForm = () => {
        navigate('/requisitions'); // Navigate to Requisition.jsx
    };

    const handleGoBack = () => {
        setView(null);
        setHideAnalytics(false);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleModalConfirm = () => {
        setOpenModal(false);
        setHideAnalytics(true);
        if (requisitionType === 'product') {
            setView('product');
        } else if (requisitionType === 'job') {
            setView('job');
        }
    };

    // Static data
    const requests = [
        { id: 1, roomNo: 101, roomType: 'Single', floorNo: 3, requestedBy: 'John Doe', date: '2024-12-06', status: 'Pending' },
        { id: 2, roomNo: 102, roomType: 'Double', floorNo: 2, requestedBy: 'Jane Smith', date: '2024-12-05', status: 'Accepted' },
        { id: 3, roomNo: 103, roomType: 'Suite', floorNo: 5, requestedBy: 'Michael Johnson', date: '2024-12-04', status: 'Pending' },
    ];

    return (
        <Box sx={{ overflowX: 'auto' }}>
            {view === null && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                        Initial Request
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S/N</TableCell>
                                <TableCell>Room No.</TableCell>
                                <TableCell>Room Type</TableCell>
                                <TableCell>Floor No.</TableCell>
                                <TableCell>Requested by</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.id}</TableCell>
                                    <TableCell>{request.roomNo}</TableCell>
                                    <TableCell>{request.roomType}</TableCell>
                                    <TableCell>{request.floorNo}</TableCell>
                                    <TableCell>{request.requestedBy}</TableCell>
                                    <TableCell>{request.date}</TableCell>
                                    <TableCell>
                                        <Typography sx={{ color: request.status === 'Accepted' ? 'green' : 'orange' }}>
                                            {request.status}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="text" color="primary" onClick={handleClick}>
                                            View more
                                        </Button>
                                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                            <MenuItem onClick={handleViewProduct}>
                                                <IconButton color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                                View Product Requisition
                                            </MenuItem>
                                            <MenuItem onClick={handleViewJob}>
                                                <IconButton color="secondary">
                                                    <DeleteIcon />
                                                </IconButton>
                                                View Job Requisition
                                            </MenuItem>
                                            <MenuItem onClick={handleCreateRequisitionForm}>
                                                <IconButton color="secondary">
                                                    <EditIcon />
                                                </IconButton>
                                                Create Requisition Form
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}

            {/* Modal for confirming the view selection */}
            <Dialog open={openModal} onClose={handleModalClose}>
                <DialogTitle>Confirm View</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to view this requisition?
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

            {view === 'product' && (
                <Box>
                    <Button variant="contained" color="primary" onClick={handleGoBack} sx={{ mb: 2 }}>
                        Go Back
                    </Button>
                    <ItemRequisitionTable/>
                </Box>
            )}

            {view === 'job' && (
                <Box>
                    <Button variant="contained" color="primary" onClick={handleGoBack} sx={{ mb: 2 }}>
                        Go Back
                    </Button>
                    <JobRequisitionTable />
                </Box>
            )}
        </Box>
    );
}

export default RRTable;
