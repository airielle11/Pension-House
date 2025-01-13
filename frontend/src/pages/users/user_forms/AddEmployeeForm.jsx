import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/system";
import Swal from "sweetalert2";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import style from "../Styles.module.css";
import logo from "../../../assets/images/penistock_logo.png";

export default function AddEmployeeForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState([]); // State to store positions
  const [formData, setFormData] = useState({
    email: "",
    lname: "",
    mname: "",
    fname: "",
    birth_date: "",
    phone: "",
    hired_date: "",
    pos_id: "", // Stores the selected position ID
  });

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/positions/`
        );
        setPositions(response.data.data || []); // Adjust to match the actual API response structure
      } catch (error) {
        console.error("Error fetching positions:", error);
         
      }
    };

    fetchPositions();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      email: "",
      lname: "",
      mname: "",
      fname: "",
      birth_date: "",
      phone: "",
      hired_date: "",
      pos_id: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add_employee/`,
        formData
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          customClass: {
            container: style.swalContainer,
          },
          confirmButtonText: "OK",
        })
          .then((result) => {
            if (result.isConfirmed) {
              handleClose();
            }
          })
          .then(handleClose);
      } else {
        Swal.fire({
          title: "Error",
          text:
            response.data.message ||
            "Failed to add employee. Please try again.",
          icon: "error",
          customClass: {
            container: style.swalContainer,
          },
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleClose();
          }
        });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to add employee. Please check your network connection and try again.",
        icon: "error",
        customClass: {
          container: style.swalContainer,
        },
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          handleClose();
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Button
          variant="contained"
          sx={{ borderRadius: "8px" }}
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={handleOpen}
        >
          Add Employee
        </Button>
      </Stack>

      {/* Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "35%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "8px",
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h5" mb={2}>
            Add New Employee
          </Typography>

          <form>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <TextField
                fullWidth
                label="Last Name"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Middle Name"
                name="mname"
                value={formData.mname}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="First Name"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Birth Date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Contact Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Hire Date"
                name="hired_date"
                value={formData.hired_date}
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
              />

              {/* Position Dropdown */}
              <FormControl>
                <InputLabel id="position-label">Position</InputLabel>
                <Select
                  labelId="position-label"
                  name="pos_id"
                  value={formData.pos_id || ""}
                  onChange={handleChange}
                  disabled={positions.length === 0} // Disable dropdown if no positions are available
                >
                  {positions.map((position) => (
                    <MenuItem key={position.id} value={position.id}>
                      {position.position} {/* Correct position name display */}
                    </MenuItem>
                  ))}
                  {positions.length === 0 && (
                    <MenuItem disabled>No positions available</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>

            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </Button>
              <Button
                sx={{ marginLeft: "10px" }}
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
