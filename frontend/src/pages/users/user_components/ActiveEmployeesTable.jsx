import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Tooltip,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import styles from '../Styles.module.css';

const columns = [
  { id: "emp_id", label: "ID", minWidth: 100 },
  { id: "full_name", label: "Name", minWidth: 250 },
  { id: "birth_date", label: "Date of Birth", minWidth: 200 },
  { id: "hired_date", label: "Hired Date", minWidth: 200 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "phone", label: "Phone", minWidth: 200 },
  { id: "image_name", label: "Image", minWidth: 200 },
  { id: "position_and_management", label: "Position & Management", minWidth: 200 },
  { id: "actions", label: "Actions", minWidth: 200 },
];

function EmployeesTable({ filteredRows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, handleDelete }) {
  const onDelete = async (empId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("1 EMP ID IS: ", empId)
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/delete_employee/`, {
            params: { p_emp_id: empId },
          }); 

          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: response.data.message || "Employee has been deleted successfully.",
              icon: "success",
              customClass: {
                container: styles.swalContainer
              },
            });

            // Notify parent to update state after delete
            handleDelete(empId); 
          } else {
            Swal.fire({
              title: "Error!",
              text: response.data.message || "Failed to delete employee. Please try again.",
              icon: "error",
              customClass: {
                container: styles.swalContainer
              },
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Error deleting employee:", error,
            icon: "error",
            customClass: {
              container: styles.swalContainer
            },
          });
        }
      }
    });
  };

  return (
    <Paper className="mt-3" style={{ width: "100%" }}>
      <div style={{ overflowX: "auto" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f8f9fa" } }}>
                      {columns.map((column) => (
                        <TableCell key={column.id}>{row[column.id]}</TableCell>
                      ))}
                      <TableCell>
                        <Tooltip title="View">
                          <Button variant="contained" color="secondary" size="small" sx={{ marginRight: 1 }}>
                            <FontAwesomeIcon icon={faEye} />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <Button variant="contained" color="primary" size="small" sx={{ marginRight: 1 }}>
                            <FontAwesomeIcon icon={faPen} />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <Button variant="contained" color="error" size="small" onClick={() => onDelete(row.emp_id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
}

export default EmployeesTable;
