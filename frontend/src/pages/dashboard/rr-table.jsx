import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function RRTable({ setHideAnalytics }) {
    const navigate = useNavigate(); // Initialize useNavigate
    const [requests, setRequests] = useState([]); // State for fetched data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch data from the backend API
        axios
            .get(`${import.meta.env.VITE_API_URL}/get-rooms`)
            .then((response) => {
                const rooms = response.data.rooms || [];
                setRequests(rooms);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch room data.');
                console.error('Error fetching rooms:', err);
                setLoading(false);
            });
    }, []);

    const handleCreateRequisitionForm = () => {
        navigate('/requisitions');
    };

    const handleGoBack = () => {
        setHideAnalytics(false);
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (requests.length === 0) {
        return (
            <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center', mt: 4 }}>
                No Rooms Found.
            </Typography>
        );
    }

    return (
        <Box sx={{ overflowX: 'auto' }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                    List of Rooms
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Room No. and Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell>{request.id}</TableCell>
                                <TableCell>{request.room}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
}

export default RRTable;
