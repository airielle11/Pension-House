import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Tooltip, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

const columns = [
  { id: 'poNumber', label: 'PO Number', minWidth: 120 },
  { id: 'poDate', label: 'PO Date', minWidth: 120 },
  { id: 'poStatus', label: 'PO Status', minWidth: 120 },
  { id: 'vendor', label: 'Vendor', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

function PurchaseOrderTable({ filteredRows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  return (
    <TableContainer component={Paper} className="mt-3">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} style={{ minWidth: column.minWidth, fontWeight: 'bold' }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f8f9fa' },
                }}
              >
                <TableCell>{row.poNumber}</TableCell>
                <TableCell>{row.poDate}</TableCell>
                <TableCell>
                  <span
                    style={{
                      backgroundColor: '#28a745',
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  >
                    {row.poStatus}
                  </span>
                </TableCell>
                <TableCell>{row.vendor}</TableCell>
                <TableCell>
                  <Tooltip title="View">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{ marginRight: 1, minWidth: 'auto', padding: '4px 2px', alignItems: 'center' }}
                      startIcon={<FontAwesomeIcon icon={faEye} style={{ marginLeft: '10px' }} />}
                    />
                  </Tooltip>
                  <Tooltip title="Edit">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ marginRight: 1, minWidth: 'auto', padding: '4px 2px', alignItems: 'center' }}
                      startIcon={<FontAwesomeIcon icon={faPen} style={{ marginLeft: '10px' }} />}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ marginRight: 1, minWidth: 'auto', padding: '4px 2px', alignItems: 'center' }}
                      startIcon={<FontAwesomeIcon icon={faTrash} style={{ marginLeft: '10px' }} />}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default PurchaseOrderTable;