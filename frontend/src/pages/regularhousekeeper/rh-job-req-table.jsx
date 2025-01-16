import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function JobRequisitionTable() {
  const jobRequisitions = [
    {
      title: 'Software Engineer',
      department: 'IT',
      requestedBy: 'John Doe',
      preApprovedBy: 'Jane Smith',
      acceptedBy: 'Michael Johnson',
      date: '2024-12-08',
      status: 'Pending',
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      requestedBy: 'Alice Brown',
      preApprovedBy: 'Chris Green',
      acceptedBy: 'Emma White',
      date: '2024-11-30',
      status: 'Accepted',
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Job Requisitions</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Requested by</TableCell>
            <TableCell>Pre-approved by</TableCell>
            <TableCell>Accepted by</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobRequisitions.length > 0 ? (
            jobRequisitions.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.department}</TableCell>
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No Job Requisitions Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
}

export default JobRequisitionTable;
