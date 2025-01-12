import React, { useState } from 'react';
import { Box } from '@mui/material';
import MainCard from '../../components/MainCard';
import PurchaseOrderForm from './purchasing_forms/PurchaseOrderForm';
import PurchaseOrderTable from './purchasing_components/PurchaseOrderTable';
import Search from '../../components/Search'; 

const rows = [
  { poNumber: '202202061228B8#PO', poDate: '06-Feb-2022', poStatus: 'Completed', vendor: 'To the merry ecclesiastics' },
  { poNumber: '20211111497DDB#PO', poDate: '15-Jun-2021', poStatus: 'Completed', vendor: 'To the merry ecclesiastics' },
  { poNumber: '2021111489ABB#PO', poDate: '15-Jul-2021', poStatus: 'Completed', vendor: 'To the merry ecclesiastics' },
    
  // Add more rows as needed
];

export default function PurchaseOrder() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <MainCard sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 className="page-title">Purchase Order List</h3>
        <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      </Box>

      {/* Replacing Create Button with Modal */}
      <Box mt={2}>
        <PurchaseOrderForm />
      </Box>

      <PurchaseOrderTable
        filteredRows={filteredRows}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </MainCard>
  );
}
