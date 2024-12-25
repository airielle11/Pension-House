import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import MainCard from '../../components/MainCard';
import AddNewEmployeeForm from './user_forms/AddEmployeeForm';
import EmployeesTable from './user_components/ActiveEmployeesTable';
import Search from '../../components/Search';
import axios from 'axios';

export default function ActiveEmployees() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/employees/`)
      .then((response) => {
        if (response.data.employees) {
          setEmployees(response.data.employees);
        } else {
          console.error(response.data.error);
        }
      })
      .catch((err) => console.error('Error fetching employees:', err));
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (empId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.emp_id !== empId)
    );
  };

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <MainCard sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 className="page-title">Employees</h3>
        <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      </Box>
      <Box mt={2}>
        <AddNewEmployeeForm />
      </Box>
      <EmployeesTable
        filteredRows={filteredEmployees}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleDelete={handleDelete} // Pass delete handler to child
      />
    </MainCard>
  );
}
