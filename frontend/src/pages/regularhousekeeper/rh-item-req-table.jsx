import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function ItemRequisitionTable({ productRequisitions }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Item Requisitions
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Requested by</TableCell>
              <TableCell>Pre-approved by</TableCell>
              <TableCell>Accepted by</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(productRequisitions) && productRequisitions.length > 0 ? (
              productRequisitions.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.requestedBy}</TableCell>
                  <TableCell>{product.preApprovedBy}</TableCell>
                  <TableCell>{product.acceptedBy}</TableCell>
                  <TableCell>{product.date}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: product.status === 'Accepted' ? 'green' : 'orange',
                      }}
                    >
                      {product.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Product Requisitions Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default function App() {
  const sampleData = [
    {
      requestedBy: 'John Doe',
      preApprovedBy: 'Jane Smith',
      acceptedBy: 'Robert Johnson',
      date: '2024-12-01',
      status: 'Accepted',
    },
    {
      requestedBy: 'Alice Green',
      preApprovedBy: 'Michael Brown',
      acceptedBy: 'Sarah White',
      date: '2024-12-02',
      status: 'Pending',
    },
  ];

  return <ItemRequisitionTable productRequisitions={sampleData} />;
}
