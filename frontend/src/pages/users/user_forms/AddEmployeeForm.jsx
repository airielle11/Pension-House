import React, { useState } from "react";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/system";
import Swal from "sweetalert2";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Document, Page, Text, PDFDownloadLink, pdf } from "@react-pdf/renderer";
import styles from '../Styles.module.css';

export default function AddEmployeeForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    lname: "",
    mname: "",
    fname: "",
    birth_date: "",
    phone: "",
    hired_date: "",
    pos_id: "",
  });
  const [generatedPassword, setGeneratedPassword] = useState("");

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
    setGeneratedPassword("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Disable submit button once clicked to prevent multiple submission
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/add_employee/`, formData);

      if (response.status === 200) {
        const tempPassword = response.data.temp_password;
        setGeneratedPassword(tempPassword);

        // Automatically generate and download the PDF
        downloadPDF(tempPassword);

        Swal.fire({
          title: "Success!",
          text: `Temporary Password: ${tempPassword}`,
          icon: "success",
          customClass: {
            container: styles.swalContainer,
          },
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleClose();
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message || "Failed to add employee. Please try again.",
          icon: "error",
          customClass: {
            container: styles.swalContainer,
          },
        });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add employee. Please check your network connection and try again.",
        icon: "error",
        customClass: {
          container: styles.swalContainer,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async (tempPassword) => {
    const { email } = formData;

    // Define the PDF document
    const PDFDocument = (
      <Document>
        <Page style={{ padding: 20 }}>
          {/* Centered Header */}
          <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
            New Employee Details
          </Text>
    
          {/* Adding an Image */}
          <Image
            src="https://via.placeholder.com/150" // Replace with your image URL
            style={{ width: 100, height: 100, margin: "0 auto", marginBottom: 20 }}
          />
    
          {/* Employee Details */}
          <Text>Email: {email}</Text>
          <Text>Temporary Password: {tempPassword}</Text>
        </Page>
      </Document>
    );    

    // Generate the PDF blob and trigger download
    const blob = await pdf(PDFDocument).toBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "NewEmployeeDetails.pdf";
    link.click();
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <TextField fullWidth label="Last Name" name="lname" value={formData.lname} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Middle Name" name="mname" value={formData.mname} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="First Name" name="fname" value={formData.fname} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Birth Date" name="birth_date" value={formData.birth_date} onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} type="email" variant="outlined" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Contact Number" name="phone" value={formData.phone} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Hire Date" name="hired_date" value={formData.hired_date} onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Position ID" name="pos_id" value={formData.pos_id} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: true }} />
            </div>

            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading} // Disable while loading
              >
                {loading ? "Creating..." : "Create"}
              </Button>
              <Button sx={{ marginLeft: "10px" }} variant="contained" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
